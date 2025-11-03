import { Address } from "viem";
import { buildOnChain, type NetworkInput, DexscreenerClient } from "./src";
import { base, mainnet } from "viem/chains";

const ZERO: Address = "0x0000000000000000000000000000000000000000";
const WETH: Address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC: Address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const TOKEN: Address = "0x808507121B80c02388fAd14726482e061B8da827";

const inputs: NetworkInput[] = [
  {
    chainId: 1,
    chainName: "eth-mainnet",
    rpcUrl: "https://eth-mainnet.g.alchemy.com/v2/GwL4E_7jzhO6_eH_aV3tkKlELSh7UQEO",
    factory: ["0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"],
    base: ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"],
    walletAddress: ZERO,
    quoteCurrency: "USD",
    chain: mainnet,
  },
];

const nets = buildOnChain(inputs);
const { erc20Client, uniClient, addressClient, goldrushClient } = nets[0];

// console.log(await erc20Client.get(TOKEN, ZERO, ZERO));
// console.log(await erc20Client.get(USDC, ZERO, ZERO));
// console.log(await uniClient.findPairsForTokenInFactory(nets[0].config.factory[0], TOKEN , 0n, 464n));
// console.log(await addressClient.get(TOKEN));

// console.log(
//   JSON.stringify(
//     await goldrushClient.getHistoricalTokenPrices({
//       chainName: nets[0].config.chainName,
//       quoteCurrency: "USD",
//       contractAddresses: TOKEN,
//       from: "2025-10-27",
//       to: "2025-10-28",
//     }),
//     null,
//     2
//   )
// );


// Dexscreener sample: fetch pairs for a token on Solana (USD1)
const dexscreener = new DexscreenerClient();
const dsData = await dexscreener.getPairsByToken("USD1ttGY1N17NEEHLmELoaybftRBUSErhqYiQzvEmuB");
console.log(
  JSON.stringify(
    dsData,
    null,
    2
  )
);

// console.log(JSON.stringify(await goldrushClient.getTokenHoldersV2ForTokenAddress({
// 	chainName: nets[0].config.chainName,
// 	tokenAddress: TOKEN,
// 	pageSize: 100,
// 	pageNumber: 0,
// 	noSnapshot: false,
// }),null, 2));