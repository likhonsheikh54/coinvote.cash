import { DEXSCREENER_API_URL } from "./config"

// Rate limiting helper to avoid hitting API limits
const queue: (() => Promise<any>)[] = []
let processing = false

const processQueue = async () => {
  if (processing || queue.length === 0) return

  processing = true
  const requestFunc = queue.shift()

  try {
    if (requestFunc) await requestFunc()
  } catch (error) {
    console.error("Error processing queue:", error)
  } finally {
    processing = false
    // Wait 1 second between requests to respect rate limits
    // DexScreener has different rate limits for different endpoints (60 or 300 requests per minute)
    setTimeout(() => processQueue(), 1000)
  }
}

const enqueueRequest = <T>(request: () => Promise<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    queue.push(async () => {
      try {
        const result = await request();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
    
    if (!processing) processQueue();
  });
};

// API request helper
const fetchDexScreener = async <T>(endpoint: string): Promise<T> => {
  return enqueueRequest(async () => {
    const response = await fetch(`${DEXSCREENER_API_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`DexScreener API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json() as Promise<T>;
  });
};

// Types for DexScreener API responses
export interface TokenProfile {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon: string;
  header: string;
  description: string;
  links: {
    type: string;
    label: string;
    url: string;
  }[];
}

export interface TokenBoost extends TokenProfile {
  amount: number;
  totalAmount: number;
}

export interface Order {
  type: string;
  status: string;
  paymentTimestamp: number;
}

export interface Token {
  address: string;
  name: string;
  symbol: string;
}

export interface Pair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  labels?: string[];
  baseToken: Token;
  quoteToken: Token;
  priceNative: string;
  priceUsd: string;
  txns: {
    [timeframe: string]: {
      buys: number;
      sells: number;
    };
  };
  volume: {
    [timeframe: string]: number;
  };
  priceChange: {
    [timeframe: string]: number;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv?: number;
  marketCap?: number;
  pairCreatedAt: number;
  info?: {
    imageUrl?: string;
    websites?: { url: string }[];
    socials?: { platform: string; handle: string }[];
  };
  boosts?: {
    active: number;
  };
}

export interface PairsResponse {
  schemaVersion: string;
  pairs: Pair[];
}

// API functions (rate-limit 60 requests per minute)
export const getLatestTokenProfiles = async (): Promise<TokenProfile[]> => {
  return fetchDexScreener<TokenProfile[]>('/token-profiles/latest/v1');
};

export const getLatestBoostedTokens = async (): Promise<TokenBoost[]> => {
  return fetchDexScreener<TokenBoost[]>('/token-boosts/latest/v1');
};

export const getTopBoostedTokens = async (): Promise<TokenBoost[]> => {
  return fetchDexScreener<TokenBoost[]>('/token-boosts/top/v1');
};

export const checkTokenOrders = async (chainId: string, tokenAddress: string): Promise<Order[]> => {
  return fetchDexScreener<Order[]>(`/orders/v1/${chainId}/${tokenAddress}`);
};

// API functions (rate-limit 300 requests per minute)
export const getPairsByChainAndAddress = async (chainId: string, pairId: string): Promise<PairsResponse> => {
  return fetchDexScreener<PairsResponse>(`/latest/dex/pairs/${chainId}/${pairId}`);
};

export const searchPairs = async (query: string): Promise<PairsResponse> => {
  return fetchDexScreener<PairsResponse>(`/latest/dex/search?q=${encodeURIComponent(query)}`);
};

export const getTokenPools = async (chainId: string, tokenAddress: string): Promise<Pair[]> => {
  return fetchDexScreener<Pair[]>(`/token-pairs/v1/${chainId}/${tokenAddress}`);
};

export const getPairsByTokenAddresses = async (chainId: string, tokenAddresses: string[]): Promise<Pair[]> => {
  // DexScreener allows up to 30 addresses in a single request
  if (tokenAddresses.length > 30) {
    throw new Error('Maximum of 30 token addresses allowed per request');
  }
  
  const addresses = tokenAddresses.join(',');
  return fetchDexScreener<Pair[]>(`/tokens/v1/${chainId}/${addresses}`);
};

// Helper functions
export const formatLiquidity = (liquidity: number): string => {
  if (liquidity >= 1000000000) {
    return `$${(liquidity / 1000000000).toFixed(2)}B`;
  } else if (liquidity >= 1000000) {
    return `$${(liquidity / 1000000).toFixed(2)}M`;
  } else if (liquidity >= 1000) {
    return `$${(liquidity / 1000).toFixed(2)}K`;
  } else {
    return `$${liquidity.toFixed(2)}`;
  }
};

export const getColorForPriceChange = (change: number): string => {
  return change >= 0 ? 'text-[#4BCC00]' : 'text-red-500';
};

export const formatPriceChange = (change: number): string => {
  return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
};

export const getChainName = (chainId: string): string => {
  const chainNames: Record<string, string> = {
    'ethereum': 'Ethereum',
    'bsc': 'BNB Chain',
    'polygon': 'Polygon',
    'avalanche': 'Avalanche',
    'fantom': 'Fantom',
    'arbitrum': 'Arbitrum',
    'optimism': 'Optimism',
    'solana': 'Solana',
    'base': 'Base',
    'cronos': 'Cronos',
    'kava': 'Kava',
    'metis': 'Metis',
    'celo': 'Celo',
    'harmony': 'Harmony',
    'moonbeam': 'Moonbeam',
    'moonriver': 'Moonriver',
    'aurora': 'Aurora',
    'oasis': 'Oasis',
    'heco': 'HECO',
    'okc': 'OKC',
    'fuse': 'Fuse',
    'gnosis': 'Gnosis',
    'klaytn': 'Klaytn',
    'iotex': 'IoTeX',
    'telos': 'Telos',
    'sui': 'Sui',
    'aptos': 'Aptos',
    'linea': 'Linea',
    'zksync': 'zkSync',
    'scroll': 'Scroll',
    'mantle': 'Mantle',
    'blast': 'Blast',
    'manta': 'Manta',
    'mode': 'Mode',
  };
  
  return chainNames[chainId] || chainId;
};

export const getChainLogo = (chainId: string): string => {
  return `/chains/${chainId}.png`;
};

