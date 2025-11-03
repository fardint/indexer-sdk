export interface DexscreenerTokenInfo {
	address: string;
	name: string;
	symbol: string;
}

export interface DexscreenerTxnWindowStats {
	buys: number;
	sells: number;
}

export interface DexscreenerTxns {
	m5?: DexscreenerTxnWindowStats;
	h1?: DexscreenerTxnWindowStats;
	h6?: DexscreenerTxnWindowStats;
	h24?: DexscreenerTxnWindowStats;
}

export interface DexscreenerVolume {
	m5?: number;
	h1?: number;
	h6?: number;
	h24?: number;
}

export interface DexscreenerLiquidity {
	usd?: number;
	base?: number;
	quote?: number;
}

export interface DexscreenerPairInfo {
	imageUrl?: string;
	header?: string;
	openGraph?: string;
}

export interface DexscreenerPairItem {
	chainId: string; // e.g., "solana", "ethereum"
	dexId: string; // e.g., "raydium"
	url: string;
	pairAddress: string;
	labels?: string[];
	baseToken: DexscreenerTokenInfo;
	quoteToken: DexscreenerTokenInfo;
	priceNative?: string;
	priceUsd?: string;
	txns?: DexscreenerTxns;
	volume?: DexscreenerVolume;
	priceChange?: Record<string, number>;
	liquidity?: DexscreenerLiquidity;
	fdv?: number;
	marketCap?: number;
	pairCreatedAt?: number; // ms epoch
	info?: DexscreenerPairInfo;
}

export interface DexscreenerPairsResponse {
	schemaVersion: string;
	pairs: DexscreenerPairItem[];
}

export interface DexscreenerClientConfig {
	/** Optionally override base URL, defaults to public Dexscreener API */
	baseUrl?: string;
	/** Request timeout in ms (default: 15_000) */
	timeoutMs?: number;
	/** Number of retries on transient failures (default: 2) */
	retries?: number;
}

export class DexscreenerClient {
	private readonly baseUrl: string;
	private readonly timeoutMs: number;
	private readonly retries: number;

	constructor(config: DexscreenerClientConfig = {}) {
		this.baseUrl = config.baseUrl ?? "https://api.dexscreener.com";
		this.timeoutMs = config.timeoutMs ?? 15_000;
		this.retries = config.retries ?? 2;
	}

	public async getPairsByToken(tokenAddress: string): Promise<DexscreenerPairsResponse> {
		const path = `/latest/dex/tokens/${encodeURIComponent(tokenAddress)}`;
		return await this.request<DexscreenerPairsResponse>(path);
	}

	private async request<T>(path: string): Promise<T> {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
		const url = `${this.baseUrl}${path}`;

		let lastError: unknown = undefined;
		for (let attempt = 0; attempt <= this.retries; attempt++) {
			try {
				const resp = await fetch(url, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
					signal: controller.signal,
				});
				if (!resp.ok) {
					throw new Error(`HTTP ${resp.status}`);
				}
				const data = (await resp.json()) as T;
				clearTimeout(timeout);
				return data;
			} catch (err) {
				lastError = err;
				// small backoff before retrying (except on final attempt)
				if (attempt < this.retries) {
					await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
				}
			}
		}
		clearTimeout(timeout);
		throw lastError instanceof Error ? lastError : new Error("Dexscreener request failed");
	}
}


