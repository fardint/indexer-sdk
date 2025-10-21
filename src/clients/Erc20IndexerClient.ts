import type { Address, Chain } from "viem";
import { BaseClient, type BaseClientOptions } from "./BaseClient";
import { ERC20_INDEXER_ABI } from "../contracts/abis";

export interface Erc20IndexerGetResult {
	n: string; // name
	s: string; // symbol
	d: number; // decimals
	ts: bigint; // totalSupply
	bal: bigint; // balanceOf
	alw: bigint; // allowance
}

export class Erc20IndexerClient<TChain extends Chain | undefined = Chain | undefined> extends BaseClient<TChain> {
	constructor(address: Address, options: BaseClientOptions<TChain> = {}) {
		super(address, options);
	}

	public async get(token: Address, tokenOwner: Address, spender: Address): Promise<Erc20IndexerGetResult> {
		const tuple = (await this.client.readContract({
			abi: ERC20_INDEXER_ABI,
			address: this.address,
			functionName: "get",
			args: [token, tokenOwner, spender],
		})) as readonly [string, string, number | bigint, bigint, bigint, bigint];
		const [n, s, dRaw, ts, bal, alw] = tuple;
		return { n, s, d: Number(dRaw), ts, bal, alw } as Erc20IndexerGetResult;
	}

	public async getBatch(tokens: Address[], tokenOwner: Address, spender: Address) {
		const res = (await this.client.readContract({
			abi: ERC20_INDEXER_ABI,
			address: this.address,
			functionName: "getBatch",
			args: [tokens, tokenOwner, spender],
		})) as {
			names: string[];
			symbols: string[];
			decimalsList: Array<number | bigint>;
			totalSupplies: bigint[];
			balances: bigint[];
			allowances: bigint[];
		};
		return res as any;
	}
}


