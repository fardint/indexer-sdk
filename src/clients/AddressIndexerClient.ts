import type { Address, Chain } from "viem";
import { BaseClient, type BaseClientOptions } from "./BaseClient";
import { ADDRESS_INDEXER_ABI } from "../contracts/abis";

export class AddressIndexerClient<TChain extends Chain | undefined = Chain | undefined> extends BaseClient<TChain> {
	constructor(address: Address, options: BaseClientOptions<TChain> = {}) {
		super(address, options);
	}

	public async get(account: Address) {
		const tuple = (await this.client.readContract({
			abi: ADDRESS_INDEXER_ABI,
			address: this.address,
			functionName: "get",
			args: [account],
		})) as readonly [bigint, boolean, `0x${string}`];
		const [bal, isContract, codehash] = tuple;
		return { bal, isContract, codehash };
	}

	public async getBatch(accounts: Address[]) {
		const res = (await this.client.readContract({
			abi: ADDRESS_INDEXER_ABI,
			address: this.address,
			functionName: "getBatch",
			args: [accounts],
		})) as { balances: bigint[]; isContracts: boolean[]; codehashes: `0x${string}`[] };
		return res;
	}
}


