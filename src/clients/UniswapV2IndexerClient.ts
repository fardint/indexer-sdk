import type { Address, Chain } from "viem";
import { BaseClient, type BaseClientOptions } from "./BaseClient";
import { UNISWAP_V2_INDEXER_ABI } from "../contracts/abis";

export interface PairView {
	pair: Address;
	token0: Address;
	token1: Address;
	reserve0: bigint;
	reserve1: bigint;
	price0: bigint;
	price1: bigint;
}

export class UniswapV2IndexerClient<TChain extends Chain | undefined = Chain | undefined> extends BaseClient<TChain> {
	constructor(address: Address, options: BaseClientOptions<TChain> = {}) {
		super(address, options);
	}

	public async findPair(factory: Address, tokenA: Address, tokenB: Address) {
		const tuple = (await this.client.readContract({
			abi: UNISWAP_V2_INDEXER_ABI,
			address: this.address,
			functionName: "findPair",
			args: [factory, tokenA, tokenB],
		})) as readonly [boolean, PairView];
		const [found, view] = tuple;
		return { found, view };
	}

	public async findPairsForTokenInFactory(factory: Address, token: Address, offset: bigint, limit: bigint) {
		const tuple = (await this.client.readContract({
			abi: UNISWAP_V2_INDEXER_ABI,
			address: this.address,
			functionName: "findPairsForTokenInFactory",
			args: [factory, token, offset, limit],
		})) as readonly [PairView[], bigint, bigint];
		const [results, nextOffset, totalPairs] = tuple;
		return { results, nextOffset, totalPairs };
	}

	public async findPairsForTokenAgainstBases(
		factory: Address,
		token: Address,
		bases: Address[],
		offset: bigint,
		limit: bigint,
	) {
		const tuple = (await this.client.readContract({
			abi: UNISWAP_V2_INDEXER_ABI,
			address: this.address,
			functionName: "findPairsForTokenAgainstBases",
			args: [factory, token, bases, offset, limit],
		})) as readonly [PairView[], bigint];
		const [results, nextOffset] = tuple;
		return { results, nextOffset };
	}
}


