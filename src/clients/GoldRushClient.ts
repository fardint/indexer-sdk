import { GoldRushClient as CovalentGoldRushClient } from "@covalenthq/client-sdk";
import type { OnChainConfig } from "./types";

export interface GetTokenBalancesParams {
	chainName: string;
	walletAddress: string;
	quoteCurrency?:
		| "USD"
		| "CAD"
		| "EUR"
		| "SGD"
		| "INR"
		| "JPY"
		| "VND"
		| "CNY"
		| "KRW"
		| "RUB"
		| "TRY"
		| "NGN"
		| "ARS"
		| "AUD"
		| "CHF"
		| "GBP";
	noSpam?: boolean;
}

export class GoldrushClient {
	private readonly client: CovalentGoldRushClient;

	constructor(_config: OnChainConfig) {
		const apiKey = process.env.GOLDRUSH_API_KEY;
		if (!apiKey) throw new Error("Missing GoldRush API key. Set GOLDRUSH_API_KEY.");
		this.client = new CovalentGoldRushClient(apiKey);
	}

	public async getTokenBalancesForWalletAddress(params: GetTokenBalancesParams) {
		const resp = await (this.client as any).BalanceService.getTokenBalancesForWalletAddress({
			chainName: params.chainName,
			walletAddress: params.walletAddress,
			"quote-currency": params.quoteCurrency,
			"no-spam": params.noSpam,
		});
		return resp.data as any;
	}

	public async getHistoricalTokenPrices(params: {
		chainName: string;
		quoteCurrency:
			| "USD"
			| "CAD"
			| "EUR"
			| "SGD"
			| "INR"
			| "JPY"
			| "VND"
			| "CNY"
			| "KRW"
			| "RUB"
			| "TRY"
			| "NGN"
			| "ARS"
			| "AUD"
			| "CHF"
			| "GBP";
		contractAddresses: string[] | string;
		from?: string; // YYYY-MM-DD
		to?: string; // YYYY-MM-DD
		pricesAtAsc?: boolean;
	}) {
		const contractAddress = Array.isArray(params.contractAddresses)
			? params.contractAddresses.join(",")
			: params.contractAddresses;
		const resp = await (this.client as any).PricingService.getTokenPrices(
			params.chainName,
			params.quoteCurrency,
			contractAddress,
			{ from: params.from, to: params.to, pricesAtAsc: params.pricesAtAsc },
		);
		return resp.data as any;
	}

	public async getTokenHoldersV2ForTokenAddress(params: {
		chainName: string;
		tokenAddress: string;
		blockHeight?: number;
		date?: string; // YYYY-MM-DD
		pageSize?: 100 | 1000;
		pageNumber?: number;
		noSnapshot?: boolean;
	}) {
		const it = (this.client as any).BalanceService.getTokenHoldersV2ForTokenAddress(
			params.chainName,
			params.tokenAddress,
			{
				blockHeight: params.blockHeight,
				pageSize: params.pageSize,
				pageNumber: params.pageNumber,
				date: params.date,
				noSnapshot: params.noSnapshot,
			},
		);
		const pages: any[] = [];
		for await (const page of it) {
			pages.push(page.data);
		}
		return pages;
	}

	public async getTokenHoldersV2ForTokenAddressByPage(params: {
		chainName: string;
		tokenAddress: string;
		blockHeight?: number;
		date?: string; // YYYY-MM-DD
		pageSize?: 100 | 1000;
		pageNumber?: number;
		noSnapshot?: boolean;
	}) {
		const resp = await (this.client as any).BalanceService.getTokenHoldersV2ForTokenAddressByPage(
			params.chainName,
			params.tokenAddress,
			{
				blockHeight: params.blockHeight,
				pageSize: params.pageSize,
				pageNumber: params.pageNumber,
				date: params.date,
				noSnapshot: params.noSnapshot,
			},
		);
		return resp.data as any;
	}
}

// Global singleton helpers
let __goldrushSingleton: GoldrushClient | null = null;

export function initGoldrushClient(config: OnChainConfig = {}) {
	__goldrushSingleton = new GoldrushClient(config);
	return __goldrushSingleton;
}

export function getGoldrushClient() {
	if (__goldrushSingleton) return __goldrushSingleton;
	const apiKey = process.env.GOLDRUSH_API_KEY;
	if (!apiKey) {
		throw new Error(
			"GoldRush API key not initialized. Call initGoldrushClient() or set GOLDRUSH_API_KEY.",
		);
	}
	__goldrushSingleton = new GoldrushClient({});
	return __goldrushSingleton;
}


