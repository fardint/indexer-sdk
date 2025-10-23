# Backend Integration Guide for The Block Indexer SDK

This guide explains how backend services should use this SDK to fetch on-chain data daily and cache it (Redis recommended) for serving APIs and other services.

## Goals
- Use the SDK to fetch token, pair, and address data once per day.
- Cache "live" or frequently requested objects (prices, balances, pairs) in Redis for low-latency API responses.
- Provide a reliable scheduled job with good error handling and monitoring.

## What this SDK provides
- Clients for on-chain indexers that read pre-deployed indexing contracts:
  - `AddressIndexerClient` — address metadata: balance, isContract, codehash.
  - `Erc20IndexerClient` — token metadata and balances.
  - `UniswapV2IndexerClient` — pair discovery and reserves/prices.
  - `GoldrushClient` — Covalent GoldRush HTTP client (historical prices, holders, balances).
- A builder helper `buildOnChain` / `buildOnChainForNetwork` that creates a set of clients for a given network input.

Key exports (from `src/index.ts`):
- `buildOnChain(inputs)` — build clients for multiple networks.
- `buildOnChainForNetwork(input)` — build clients for a single network.
- `AddressIndexerClient`, `Erc20IndexerClient`, `UniswapV2IndexerClient`, `GoldrushClient`.

## Quick initialization
1. Install package (if published) or use local package.

2. Provide RPC URL and (optionally) `viem` chain object when building clients.

Example builder usage (TypeScript):

```ts
import { buildOnChain } from "the-block-indexer-sdk";

const nets = buildOnChain([
  {
    chainId: 1,
    chainName: "eth-mainnet",
    rpcUrl: process.env.ETH_RPC_URL!,
    factory: ["0x..."],
    base: ["0x..."],
    walletAddress: "0x...",
    quoteCurrency: "USD",
  },
]);

const net = nets[0];
// net.addressClient, net.erc20Client, net.uniClient, net.goldrushClient
```

## Daily fetch pattern (recommended)
- Run a scheduled job (cron, systemd timer, or cloud scheduler) once per day (or more often if desired).
- For each network you manage, call a deterministic set of SDK methods to gather the data you need.
- Store results in Redis with short TTLs for ephemeral live data or long TTLs for daily snapshot data.
- Use optimistic retries for RPC errors, but avoid unlimited retries.

Suggested snapshot contents to store once per day:
- Token list metadata: name, symbol, decimals, totalSupply (via `erc20Client.getBatch`).
- Token balances for key wallets (via `goldrushClient.getTokenBalancesForWalletAddress` or `erc20Client.get` for single tokens).
- Pair discovery and reserves for tracked tokens (via `uniClient.findPairsForTokenInFactory`).
- Address metadata for important addresses (via `addressClient.getBatch`).
- Historical prices (via `goldrushClient.getHistoricalTokenPrices`).

Suggested Redis keys (example namespace: `indexer:<chainName>:`):
- `indexer:eth-mainnet:tokens:snapshot:2025-10-23` (daily snapshot json)
- `indexer:eth-mainnet:token:<address>:meta` (token metadata, TTL: 24h)
- `indexer:eth-mainnet:pair:<pairAddress>:view` (pair view + reserves, TTL: 1h)
- `indexer:eth-mainnet:address:<address>` (address metadata, TTL: 24h)

## Example script
A starter example `scripts/daily-fetch.ts` is included in this repo. It demonstrates:
- Initializing the clients with `buildOnChain`.
- Fetching a small set of tokens/pairs/addresses.
- Pushing results to Redis.

Important notes in the script:
- Set `GOLDRUSH_API_KEY` in the environment for Goldrush usage.
- Set `REDIS_URL` for the Redis connection.
- Configure concurrency carefully to avoid RPC rate limits.

## Error handling and retries
- Use exponential backoff for retryable errors (network, 5xx responses).
- For non-retryable errors (invalid args, missing env), fail fast and alert.
- Log failures with structured logs that include chainName, network RPC URL, and request details.

## Scheduling and running the job
- Example cron (UTC) to run daily at 02:00: 0 2 * * *
- In Windows Task Scheduler use an equivalent daily task.
- In cloud environments use their scheduler/cron-like services; ensure environment variables are available.

## Monitoring and alerts
- Track job success/failure with metrics: job_duration_seconds, job_success (bool), last_success_timestamp.
- Send alert on repeated failures (e.g., >3 consecutive failures).
- Monitor Redis memory and eviction to ensure snapshots are not evicted unexpectedly.

## Redis schema & TTL guidance
- Keep snapshot keys with date suffix for historical debugging (no TTL or long TTL e.g., 30d).
- Keep live keys short (1h or less) and refresh them every fetch run if needed.
- Consider using Redis Hashes for small structured objects to reduce memory overhead.

## Example TypeScript snippet: cache to Redis

```ts
import Redis from "ioredis";
import { buildOnChain } from "the-block-indexer-sdk";

const redis = new Redis(process.env.REDIS_URL);
const nets = buildOnChain([/* ... */]);
const net = nets[0];

// fetch token meta and cache
const tokenAddresses = ["0x...", "0x..."];
const meta = await net.erc20Client.getBatch(tokenAddresses as any, net.config.walletAddress, "0x0000000000000000000000000000000000000000");
await redis.set(`indexer:${net.config.chainName}:tokens:meta`, JSON.stringify(meta), "EX", 60 * 60 * 24);
```

## Security
- Do not commit API keys. Use environment variables or a secrets manager.
- Limit network access for the scheduled job where possible.

## Next steps (recommended)
- Wire the included `scripts/daily-fetch.ts` into your cron/CI pipeline.
- Add tests around the data transformation logic you use before writing to Redis.
- Add metrics and alerts for the job.

---
If you'd like, I can also:
- Add the `scripts/daily-fetch.ts` starter script to this repository (I already did).
- Add a small README snippet showing Windows Task Scheduler or a cron example.
- Create a lightweight Dockerfile to run the fetch job in containers.

Tell me which extras you'd like and I'll add them.