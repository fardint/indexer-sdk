# Token Data Migration Guide

This guide shows what data can be fetched for a token address and which providers can provide each data type.

---

## Quick Lookup

| Data Needed | Providers |
|-------------|-----------|
| Token Name | GoldRush, GeckoTerminal, Dexscreener, Moralis, Aptoscan, AptosIndexer, Erc20Indexer |
| Token Symbol | GoldRush, GeckoTerminal, Dexscreener, Moralis, Aptoscan, AptosIndexer, Erc20Indexer, Xrpscan |
| Token Decimals | Erc20Indexer, GeckoTerminal, Moralis, Aptoscan, AptosIndexer |
| Token Logo | GeckoTerminal, Moralis, Dexguru, Aptoscan, AptosIndexer |
| Current Price (USD) | Dexscreener, GeckoTerminal, Moralis, GoldRush, Aptoscan, Xrpscan |
| 24h Price Change | Dexscreener, GeckoTerminal, Moralis |
| Market Cap | Dexscreener, GeckoTerminal, Xrpscan |
| FDV | Dexscreener, GeckoTerminal |
| Total Supply | GoldRush, GeckoTerminal, Erc20Indexer, Aptoscan, Xrpscan, Stellar |
| Token Balance (wallet) | GoldRush, Erc20Indexer, AddressIndexer |
| Token Holders | GoldRush, Aptoscan, Xrpscan, Stellar |
| Holder List | GoldRush |
| Liquidity (DEX Pool) | Dexscreener, GeckoTerminal, Moralis, UniswapV2Indexer |
| Trading Volume | Dexscreener, GeckoTerminal, Stellar |
| Transaction Count | Dexscreener, GeckoTerminal, Dexguru |
| Transaction History | GoldRush, Dexguru |
| Historical Prices | GoldRush, Dexguru |
| OHLCV Data | GeckoTerminal, Dexguru |
| DEX Pairs | Dexscreener, GeckoTerminal, UniswapV2Indexer |
| Address Balance (native) | AddressIndexer |
| Is Contract | AddressIndexer |
| Contract Code Hash | AddressIndexer |
| Token Allowance | Erc20Indexer |
| Security Score | Moralis |
| Spam Detection | Moralis |
| Protocol TVL | DefiLlama |
| Stablecoin Data | DefiLlama |

---

## Detailed Migration Reference

### Basic Token Info

```
name
  → Erc20Indexer (n), GeckoTerminal (name), Dexscreener (baseToken.name), 
    Moralis (tokenName), Aptoscan (name), AptosIndexer (name), 
    StellarExpert (toml_info.name)

symbol
  → Erc20Indexer (s), GeckoTerminal (symbol), Dexscreener (baseToken.symbol), 
    Moralis (tokenSymbol), Aptoscan (symbol), AptosIndexer (symbol), 
    Xrpscan (code)

decimals
  → Erc20Indexer (d), GeckoTerminal (decimals), Moralis (tokenDecimals), 
    Aptoscan (decimals), AptosIndexer (decimals), StellarExpert (toml_info.decimals)

address
  → Erc20Indexer (input), GeckoTerminal (address), Dexscreener (baseToken.address), 
    Moralis (tokenAddress), Aptoscan (address), AptosIndexer (asset_type)
```

### Price Data

```
priceUsd
  → Dexscreener (priceUsd), GeckoTerminal (base_token_price_usd), 
    Moralis (usdPrice), Aptoscan (current_price), Xrpscan (price)

priceNative
  → Dexscreener (priceNative), GeckoTerminal (base_token_price_native_currency), 
    Moralis (nativePrice)

priceChange.m5, h1, h6, h24
  → Dexscreener (priceChange.m5/h1/h6/h24), 
    GeckoTerminal (price_change_percentage.m5/h1/h6/h24), 
    Moralis (usdPrice24hrPercentChange, 24hrPercentChange)

usdPrice24h, usdPrice24hrUsdChange
  → Moralis (usdPrice24h, usdPrice24hrUsdChange)

historicalPrices
  → GoldRush (getHistoricalTokenPrices - date, price, currency)

quote_rate
  → GoldRush (USD price in token balances)
```

### Market Data

```
marketCap
  → Dexscreener (marketCap), GeckoTerminal (market_cap_usd), Xrpscan (marketcap)

fdv
  → Dexscreener (fdv), GeckoTerminal (fdv_usd)
```

### Liquidity & Reserves

```
liquidity.usd
  → Dexscreener (liquidity.usd), GeckoTerminal (reserve_in_usd), 
    Moralis (pairTotalLiquidityUsd)

liquidity.base, liquidity.quote
  → Dexscreener (liquidity.base, liquidity.quote)

total_reserve_in_usd
  → GeckoTerminal (total_reserve_in_usd)

reserve0, reserve1
  → UniswapV2Indexer (reserve0, reserve1)

price0, price1
  → UniswapV2Indexer (price0, price1)
```

### Volume

```
volume.m5, h1, h6, h24
  → Dexscreener (volume.m5/h1/h6/h24), 
    GeckoTerminal (volume_usd.m5/h1/h6/h24)

volume, volume7d
  → StellarExpert (volume, volume7d)
```

### Supply & Balance

```
totalSupply
  → Erc20Indexer (ts), GeckoTerminal (total_supply), 
    GoldRush (from balances), Aptoscan (total_supply), 
    Xrpscan (supply), Stellar (supply)

balance (token balance)
  → Erc20Indexer (bal), GoldRush (balance from tokenBalances)

balance (native balance)
  → AddressIndexer (bal)

allowance
  → Erc20Indexer (alw)

supply
  → Xrpscan (supply), Stellar (supply)
```

### Holders

```
holders (count)
  → GoldRush (getTokenHoldersV2ForTokenAddress - returns list with count), 
    Aptoscan (current_num_holder), Xrpscan (holders), 
    StellarExpert (trustlines.total)

holderList
  → GoldRush (getTokenHoldersV2ForTokenAddress - returns array with addresses, balances)

trustlines.authorized, funded
  → StellarExpert (trustlines.authorized, trustlines.funded)
```

### Transactions

```
txns.m5/h1/h24.buys/sells
  → Dexscreener (txns.m5/h1/h24.buys/sells), 
    GeckoTerminal (transactions.m5/h1/h24.buys/sells)

swaps
  → Dexguru (getTokenSwaps)

burns
  → Dexguru (getTokenBurns)

mints
  → Dexguru (getTokenMints)

transfers
  → Dexguru (getTokenTransfers)

payments, payments_amount
  → StellarExpert (payments, payments_amount)
```

### Pair/Pool Information

```
pairAddress
  → Dexscreener (pairAddress), Moralis (pairAddress)

dexId
  → Dexscreener (dexId)

chainId
  → Dexscreener (chainId)

url
  → Dexscreener (url)

pairCreatedAt
  → Dexscreener (pairCreatedAt)

baseToken, quoteToken
  → Dexscreener (baseToken, quoteToken), 
    GeckoTerminal (base_token, quote_token)

token0, token1, pair
  → UniswapV2Indexer (token0, token1, pair)

exchangeAddress, exchangeName
  → Moralis (exchangeAddress, exchangeName)

pool_created_at
  → GeckoTerminal (pool_created_at)
```

### Address Information

```
isContract
  → AddressIndexer (isContract)

codehash
  → AddressIndexer (codehash)

bal
  → AddressIndexer (bal)
```

### Token Metadata

```
logo, logo_url, tokenLogo, image_url
  → Dexguru (logo), Aptoscan (logo_url), Moralis (tokenLogo), 
    GeckoTerminal (image_url), AptosIndexer (icon_uri)

project_url, project_uri
  → Aptoscan (project_url), AptosIndexer (project_uri)

coingecko_coin_id
  → GeckoTerminal (coingecko_coin_id)
```

### Security

```
verifiedContract
  → Moralis (verifiedContract)

securityScore
  → Moralis (securityScore)

possibleSpam
  → Moralis (possibleSpam)

reputation
  → Aptoscan (reputation)

score, blackholed
  → Xrpscan (score, blackholed)

rating (age, trades, payments, trustlines, volume7d, average)
  → StellarExpert (rating)
```

### OHLCV Data

```
ohlcv (open, high, low, close, volume)
  → GeckoTerminal (getPoolOHLCV), 
    Dexguru (getTokenMarketHistory, getTradingViewHistory)
```

### Wallet Data

```
tokenBalances (contract_name, contract_ticker_symbol, contract_decimals, balance, quote)
  → GoldRush (getTokenBalancesForWalletAddress)
```

### Network Information

```
networks
  → GeckoTerminal (getNetworks)

dexes
  → GeckoTerminal (getDexes)

trendingPools
  → GeckoTerminal (getTrendingPools)
```

### Issuer Information

```
issuer
  → StellarExpert (issuer), Xrpscan (issuer)

creator_address
  → Aptoscan (creator_address)

home_domain, orgName
  → StellarExpert (home_domain, orgName)

anchorAsset, anchorAssetType
  → StellarExpert (anchorAsset, anchorAssetType)
```

### Timestamps

```
created, createdAt, updatedAt
  → StellarExpert (created), Xrpscan (createdAt, updatedAt), 
    AptosIndexer (last_transaction_timestamp)

listedAt
  → DefiLlama (listedAt for protocols)
```

### AMM Data

```
amms
  → Xrpscan (amms)
```

### DeFi Protocol Data

```
protocols (id, name, slug, symbol, category, tvl, change_1h/1d/7d, chainTvls, chains, logo, url)
  → DefiLlama (getProtocols)

stablecoins (id, name, symbol, gecko_id, pegType, pegMechanism, price, chains, circulating)
  → DefiLlama (getStablecoins)
```

---

## Migration Decision Tree

```
Start: What data do you need?

├── Basic Token Info (name, symbol, decimals)
│   └── Use: Erc20Indexer or GoldRush
│
├── Current Price
│   ├── Need price + volume + liquidity
│   │   └── Use: Dexscreener or GeckoTerminal
│   │
│   ├── Need price + security score
│   │   └── Use: Moralis
│   │
│   └── Need historical prices
│       └── Use: GoldRush or Dexguru
│
├── Supply & Holders
│   ├── Need total supply
│   │   └── Use: Erc20Indexer or GoldRush
│   │
│   └── Need holder list
│       └── Use: GoldRush
│
├── Trading Activity
│   ├── Need simple buy/sell counts
│   │   └── Use: Dexscreener or GeckoTerminal
│   │
│   └── Need detailed transaction history
│       └── Use: Dexguru
│
├── On-Chain Data
│   ├── Need ERC20 data (name, symbol, decimals, supply, balance)
│   │   └── Use: Erc20Indexer
│   │
│   ├── Need address info (balance, isContract)
│   │   └── Use: AddressIndexer
│   │
│   └── Need Uniswap V2 pair data
│       └── Use: UniswapV2Indexer
│
└── Alternative Chains
    ├── Need Aptos data
    │   ├── Use: Aptoscan (REST API)
    │   └── Use: AptosIndexer (GraphQL)
    │
    ├── Need XRP Ledger data
    │   └── Use: Xrpscan
    │
    └── Need Stellar data
        └── Use: StellarExpert
```

---

## Summary Helper Functions

```
buildDexscreenerTokenSummary
  → Aggregates: tokenAddress, tokenName, tokenSymbol, chains, numPairs, 
                liquidityUsdTotal, volume24hTotal, transactions24h, primaryPair

buildGeckoTerminalTokenSummary
  → Aggregates: tokenAddress, tokenName, tokenSymbol, network, numPools, 
                liquidityUsdTotal, volume24hTotal, transactions24h, primaryPool
```

---

## Available Providers

| Provider | Description |
|----------|-------------|
| Erc20Indexer | On-chain ERC20 data via deployed smart contracts |
| AddressIndexer | On-chain address data via deployed smart contracts |
| UniswapV2Indexer | On-chain Uniswap V2 pair data via deployed contracts |
| GoldRush | Covalent/GoldRush API for analytics and historical data |
| Dexscreener | DexScreener API for DEX pair data |
| GeckoTerminal | GeckoTerminal API for token/pool data |
| Moralis | Moralis API for ERC20 price and metadata |
| Dexguru | DexGuru API for market data and transactions |
| DefiLlama | DeFi Llama API for DeFi protocols and stablecoins |
| StellarExpert | Stellar Expert API for Stellar network assets |
| Aptoscan | Aptoscan API for Aptos fungible assets |
| AptosIndexer | Aptos GraphQL Indexer for asset metadata |
| Xrpscan | XRPScan API for XRP Ledger tokens |
