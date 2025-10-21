import { mainnet } from "viem/chains";
import type { Address } from "viem";
import {
	getModuleAddresses,
	AddressIndexerClient,
	Erc20IndexerClient,
	UniswapV2IndexerClient,
} from "./src";

const RPC_URL = "https://eth-mainnet.g.alchemy.com/v2/GwL4E_7jzhO6_eH_aV3tkKlELSh7UQEO";
const CHAIN_ID = 1;

// Sample mainnet addresses
const ZERO: Address = "0x0000000000000000000000000000000000000000";
const WETH: Address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC: Address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const UNISWAP_V2_FACTORY: Address = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

async function main() {
	const addrs = getModuleAddresses(CHAIN_ID);

	const addressClient = new AddressIndexerClient(addrs.addressIndexerProxy, {
		rpcUrl: RPC_URL,
		chain: mainnet,
	});
	const erc20Client = new Erc20IndexerClient(addrs.erc20IndexerProxy, {
		rpcUrl: RPC_URL,
		chain: mainnet,
	});
	const uniClient = new UniswapV2IndexerClient(addrs.uniswapV2IndexerProxy, {
		rpcUrl: RPC_URL,
		chain: mainnet,
	});

	console.log("AddressIndexer.get(ZERO):");
	const addrView = await addressClient.get(ZERO);
	console.log(addrView);

	console.log("ERC20Indexer.get(WETH, ZERO owner/spender):");
	const erc20View = await erc20Client.get(WETH, ZERO, ZERO);
	console.log(erc20View);

	console.log("UniswapV2Indexer.findPair(Factory, WETH, USDC):");
	const pair = await uniClient.findPair(UNISWAP_V2_FACTORY, WETH, USDC);
	console.log(pair);

    console.log("UniswapV2Indexer.findPairsForTokenInFactory(Factory, WETH, 0, 10):");
    const pairs = await uniClient.findPairsForTokenInFactory(UNISWAP_V2_FACTORY, WETH, 0n, 10n);
    console.log(pairs);
}

main().catch((err) => {
	console.error(err);
});


