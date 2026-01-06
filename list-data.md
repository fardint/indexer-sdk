# Token Data Fields Reference

This document lists all available token data fields, organized by provider.

---

## DexscreenerClient

| Field | Type | Description |
|-------|------|-------------|
| chainId | string | Blockchain (solana, ethereum, etc.) |
| dexId | string | DEX identifier (raydium, uniswap, etc.) |
| pairAddress | string | Liquidity pair contract address |
| baseToken.address | string | Base token address |
| baseToken.name | string | Base token name |
| baseToken.symbol | string | Base token symbol |
| quoteToken.address | string | Quote token address |
| quoteToken.name | string | Quote token name |
| quoteToken.symbol | string | Quote token symbol |
| priceNative | string | Price in native token |
| priceUsd | string | Price in USD |
| priceChange.m5 | number | 5 min % change |
| priceChange.h1 | number | 1h % change |
| priceChange.h6 | number | 6h % change |
| priceChange.h24 | number | 24h % change |
| txns.m5.buys | number | 5 min buy txs |
| txns.m5.sells | number | 5 min sell txs |
| txns.h1.buys | number | 1h buy txs |
| txns.h1.sells | number | 1h sell txs |
| txns.h24.buys | number | 24h buy txs |
| txns.h24.sells | number | 24h sell txs |
| volume.m5 | number | 5 min volume |
| volume.h1 | number | 1h volume |
| volume.h6 | number | 6h volume |
| volume.h24 | number | 24h volume |
| liquidity.usd | number | Liquidity in USD |
| liquidity.base | number | Base token liquidity |
| liquidity.quote | number | Quote token liquidity |
| marketCap | number | Market cap USD |
| fdv | number | Fully diluted valuation |
| pairCreatedAt | number | Pair creation timestamp |
| info.imageUrl | string | Token image URL |
| labels | string[] | Token labels |

**Methods:** `getPairsByToken()`, `searchPairs()`, `getPairByChainAndAddress()`, `getTokenPools()`

---

## GeckoTerminalClient

| Field | Type | Description |
|-------|------|-------------|
| address | string | Token address |
| name | string | Token name |
| symbol | string | Token symbol |
| decimals | number | Token decimals |
| image_url | string | Token logo URL |
| coingecko_coin_id | string | CoinGecko ID |
| total_supply | string | Total supply |
| price_usd | string \| null | Current USD price |
| fdv_usd | string \| null | FDV USD |
| market_cap_usd | string | Market cap USD |
| volume_usd.h24 | string | 24h volume USD |
| total_reserve_in_usd | string | Total reserves USD |
| reserve_in_usd | string | Pool reserve USD |
| base_token.address | string | Base token address |
| base_token.name | string | Base token name |
| base_token.symbol | string | Base token symbol |
| base_token_price_usd | string | Base token price USD |
| quote_token.address | string | Quote token address |
| price_change_percentage.m5 | string | 5 min % change |
| price_change_percentage.h1 | string | 1h % change |
| price_change_percentage.h6 | string | 6h % change |
| price_change_percentage.h24 | string | 24h % change |
| transactions.m5.buys | number | 5 min buys |
| transactions.m5.sells | number | 5 min sells |
| transactions.h24.buys | number | 24h buys |
| transactions.h24.sells | number | 24h sells |
| pool_created_at | string | Pool creation time |

**Methods:** `getToken()`, `getPool()`, `getNetworks()`, `getDexes()`, `getTrendingPools()`, `getPoolOHLCV()`

---

## MoralisClient

| Field | Type | Description |
|-------|------|-------------|
| tokenName | string | Token name |
| tokenSymbol | string | Token symbol |
| tokenLogo | string | Token logo URL |
| tokenDecimals | string | Token decimals |
| tokenAddress | string | Token address |
| usdPrice | number | Current USD price |
| usdPriceFormatted | string | Formatted USD price |
| 24hrPercentChange | string | 24h % change |
| usdPrice24h | number | Price 24h ago |
| usdPrice24hrUsdChange | number | 24h USD change |
| usdPrice24hrPercentChange | number | 24h % change |
| nativePrice | string | Native token price |
| exchangeAddress | string | Exchange address |
| exchangeName | string | Exchange name |
| pairAddress | string | Pair address |
| pairTotalLiquidityUsd | string | Pair liquidity USD |
| verifiedContract | boolean | Is verified |
| possibleSpam | string | Spam indicator |
| securityScore | number | Security score (0-100) |

**Methods:** `getERC20TokenPrice()`, `validateTokenData()`

---

## GoldRushClient (Covalent)

| Field | Type | Description |
|-------|------|-------------|
| contract_name | string | Token name |
| contract_ticker_symbol | string | Token symbol |
| contract_decimals | number | Decimals |
| balance | string | Token balance |
| quote | number | USD value |
| quote_rate | number | USD price |

**getTokenBalancesForWalletAddress():**
| Field | Type | Description |
|-------|------|-------------|
| address | string | Holder address |
| balance | string | Holder balance |
| quote | number | USD value |
| last_transfer_timestamp | string | Last transfer time |

**getHistoricalTokenPrices():**
| Field | Type | Description |
|-------|------|-------------|
| date | string | Date (YYYY-MM-DD) |
| price | number | Token price |
| currency | string | Currency |

**getTokenHoldersV2ForTokenAddress():**
| Field | Type | Description |
|-------|------|-------------|
| holder_address | string | Holder address |
| balance | string | Balance |
| quote | number | USD value |

---

## DefiLlamaClient

**getProtocols():**
| Field | Type | Description |
|-------|------|-------------|
| id | string | Protocol ID |
| name | string | Protocol name |
| slug | string | URL slug |
| symbol | string | Protocol symbol |
| category | string | Category |
| tvl | number | Total Value Locked |
| change_1h | number | 1h TVL change |
| change_1d | number | 24h TVL change |
| change_7d | number | 7d TVL change |
| chainTvls | object | TVL by chain |
| chains | string[] | Supported chains |
| logo | string | Logo URL |
| url | string | Website |

**getStablecoins():**
| Field | Type | Description |
|-------|------|-------------|
| id | string | Stablecoin ID |
| name | string | Stablecoin name |
| symbol | string | Symbol |
| gecko_id | string | CoinGecko ID |
| pegType | string | Peg type (fiat/crypto/algorithmic) |
| pegMechanism | string | Peg mechanism |
| price | number | Current price |
| chains | string[] | Available chains |
| circulating | object | Supply by chain |

---

## DexguruClient

| Field | Type | Description |
|-------|------|-------------|
| inventory | object | Token inventory |
| market | object | Market data |
| marketHistory | array | Price history OHLCV |
| swaps | array | Swap transactions |
| burns | array | Burn transactions |
| mints | array | Mint transactions |
| transfers | array | Transfer transactions |
| transactions | array | All transactions |

**marketHistory:**
| Field | Type | Description |
|-------|------|-------------|
| timestamp | number | Unix timestamp |
| open | number | Open price |
| high | number | High price |
| low | number | Low price |
| close | number | Close price |
| volume | number | Volume |

**Methods:** `getTokenInventory()`, `getTokenMarket()`, `getTokenMarketHistory()`, `getTokenSwaps()`, `getTokenTransfers()`

---

## Erc20IndexerClient

**On-chain indexer contract**

| Field | Type | Description |
|-------|------|-------------|
| n | string | Token name |
| s | string | Token symbol |
| d | number | Token decimals |
| ts | bigint | Total supply |
| bal | bigint | Owner balance |
| alw | bigint | Allowance |

**Methods:** `get(token, tokenOwner, spender)`, `getBatch()`

---

## AddressIndexerClient

**On-chain indexer contract**

| Field | Type | Description |
|-------|------|-------------|
| bal | bigint | Native balance (ETH/BNB/etc.) |
| isContract | boolean | Is contract address |
| codehash | string | Contract code hash |

**Methods:** `get(account)`, `getBatch()`

---

## UniswapV2IndexerClient

**On-chain indexer contract**

| Field | Type | Description |
|-------|------|-------------|
| found | boolean | Pair found |
| pair | Address | Pair contract address |
| token0 | Address | Token0 address |
| token1 | Address | Token1 address |
| reserve0 | bigint | Token0 reserve |
| reserve1 | bigint | Token1 reserve |
| price0 | bigint | Token0 price |
| price1 | bigint | Token1 price |

**Methods:** `findPair()`, `findPairsForTokenInFactory()`, `findPairsForTokenAgainstBases()`

---

## AptoscanClient

| Field | Type | Description |
|-------|------|-------------|
| coin_id | string | Coin ID |
| name | string | Token name |
| symbol | string | Token symbol |
| decimals | number | Token decimals |
| address | string | Token address |
| current_price | number | Current price |
| current_num_holder | number | Number of holders |
| total_supply | number | Total supply |
| logo_url | string | Logo URL |
| project_url | string | Project URL |
| creator_address | string | Creator address |
| coin_standard | string | Coin standard (v1/v2) |
| reputation | string | Reputation status |
| isFungibleAsset | boolean | Is fungible asset |

**Methods:** `getFungibleAsset()`

---

## AptosIndexerClient

| Field | Type | Description |
|-------|------|-------------|
| symbol | string | Token symbol |
| name | string | Token name |
| decimals | number | Token decimals |
| asset_type | string | Asset type |
| project_uri | string | Project URL |
| icon_uri | string | Icon URL |
| supply_v2 | string | Supply v2 |
| last_transaction_timestamp | string | Last tx time |

**Methods:** `getFungibleAssetMetadata()`

---

## XrpscanClient

| Field | Type | Description |
|-------|------|-------------|
| code | string | Token code |
| currency | string | Currency code |
| issuer | string | Issuer address |
| price | number | Token price |
| marketcap | number | Market cap |
| supply | number | Total supply |
| holders | number | Number of holders |
| amms | number | AMM pool count |
| blackholed | boolean | Is blackholed |
| score | number | Trust score |
| createdAt | string | Creation date |
| updatedAt | string | Update date |

**Methods:** `getToken()`

---

## StellarExpertClient

| Field | Type | Description |
|-------|------|-------------|
| asset | string | Asset code |
| created | number | Creation timestamp |
| supply | number | Total supply |
| trustlines.total | number | Total trustlines |
| trustlines.authorized | number | Authorized trustlines |
| trustlines.funded | number | Funded trustlines |
| payments | number | Payment count |
| payments_amount | number | Payment amount |
| volume | number | Total volume |
| volume7d | number | 7-day volume |
| home_domain | string | Home domain |
| toml_info.code | string | TOML code |
| toml_info.name | string | TOML name |
| toml_info.decimals | number | Decimals |
| toml_info.issuer | string | Issuer |
| rating.age | number | Age score |
| rating.trades | number | Trade score |
| rating.payments | number | Payment score |
| rating.trustlines | number | Trustline score |
| rating.volume7d | number | Volume score |
| rating.average | number | Average rating |

**Methods:** `getAsset()`

---

## Summary Helper Functions

| Function | Provider | Output Fields |
|----------|----------|---------------|
| buildDexscreenerTokenSummary | DexscreenerClient | tokenAddress, tokenName, tokenSymbol, chains, numPairs, liquidityUsdTotal, volume24hTotal, transactions24h, primaryPair |
| buildGeckoTerminalTokenSummary | GeckoTerminalClient | tokenAddress, tokenName, tokenSymbol, network, numPools, liquidityUsdTotal, volume24hTotal, transactions24h, primaryPool |
