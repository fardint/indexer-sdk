export { getModuleAddresses, addressesByChainId, type ModuleAddresses } from "./contracts/addresses";
export { ERC20_INDEXER_ABI, ADDRESS_INDEXER_ABI, UNISWAP_V2_INDEXER_ABI } from "./contracts/abis";
export { BaseClient, type BaseClientOptions } from "./clients/BaseClient";
export { Erc20IndexerClient, type Erc20IndexerGetResult } from "./clients/Erc20IndexerClient";
export { UniswapV2IndexerClient, type PairView } from "./clients/UniswapV2IndexerClient";
export { AddressIndexerClient } from "./clients/AddressIndexerClient";

