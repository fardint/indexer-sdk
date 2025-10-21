import type { Address, Chain, PublicClient } from "viem";
import { createPublicClient, http } from "viem";

export interface BaseClientOptions<TChain extends Chain | undefined = Chain | undefined> {
	rpcUrl?: string;
	chain?: TChain;
}

export abstract class BaseClient<TChain extends Chain | undefined = Chain | undefined> {
	protected readonly client: any;
	protected readonly address: Address;

	protected constructor(address: Address, options: BaseClientOptions<TChain> = {}) {
		this.address = address;
		this.client = createPublicClient({
			chain: options.chain,
			transport: http(options.rpcUrl),
		});
	}
}


