// Update the imports at the top of the file
import { COINMARKETCAP_API_KEY, COINMARKETCAP_API_URL } from "./config"

// Replace the hardcoded values with the imported config
// const CMC_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
// const CMC_API_URL = "https://pro-api.coinmarketcap.com/v1";

// CoinMarketCap API integration
const CMC_API_KEY = COINMARKETCAP_API_KEY || ""
const CMC_API_URL = COINMARKETCAP_API_URL

// Rate limiting helper to avoid hitting API limits
const queue: (() => Promise<any>)[] = []
let processing = false

const processQueue = async () => {
  if (processing || queue.length === 0) return

  processing = true
  const request = queue.shift()

  try {
    if (request) await request()
  } catch (error) {
    console.error("Error processing queue:", error)
  } finally {
    processing = false
    // Wait 1.5 seconds between requests to respect rate limits
    setTimeout(() => processQueue(), 1500)
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

// API request helper with authentication
const fetchCMC = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
  const url = new URL(`${CMC_API_URL}${endpoint}`);
  
  // Add parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return enqueueRequest(async () => {
    const response = await fetch(url.toString(), {
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY,
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`CoinMarketCap API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json() as Promise<T>;
  });
};

// Types for CoinMarketCap API responses
export interface CMCListingResponse {
  data: CMCCoin[];
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  };
}

export interface CMCCoin {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[];
  max_supply: number | null;
  circulating_supply: number;
  total_supply: number;
  platform: {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    token_address: string;
  } | null;
  cmc_rank: number;
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;
  tvl_ratio: number | null;
  last_updated: string;
  quote: {
    [currency: string]: {
      price: number;
      volume_24h: number;
      volume_change_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      market_cap: number;
      market_cap_dominance: number;
      fully_diluted_market_cap: number;
      tvl: number | null;
      last_updated: string;
    };
  };
}

export interface CMCGainersLosersResponse {
  data: {
    top_gainers: CMCCoin[];
    top_losers: CMCCoin[];
  };
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  };
}

export interface CMCTrendingResponse {
  data: CMCCoin[];
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  };
}

export interface CMCCategoryResponse {
  data: {
    id: string;
    name: string;
    title: string;
    description: string;
    num_tokens: number;
    avg_price_change: number;
    market_cap: number;
    market_cap_change: number;
    volume: number;
    volume_change: number;
    coins: CMCCoin[];
  }[];
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  };
}

// API functions
export const getLatestListings = async (limit = 100, start = 1, convert = 'USD'): Promise<CMCListingResponse> => {
  return fetchCMC<CMCListingResponse>('/cryptocurrency/listings/latest', {
    limit: limit.toString(),
    start: start.toString(),
    convert,
  });
};

export const getGainersLosers = async (limit = 20, convert = 'USD', time_period = '24h'): Promise<CMCGainersLosersResponse> => {
  return fetchCMC<CMCGainersLosersResponse>('/cryptocurrency/trending/gainers-losers', {
    limit: limit.toString(),
    convert,
    time_period,
  });
};

export const getTrending = async (limit = 20, convert = 'USD', time_period = '24h'): Promise<CMCTrendingResponse> => {
  return fetchCMC<CMCTrendingResponse>('/cryptocurrency/trending/latest', {
    limit: limit.toString(),
    convert,
    time_period,
  });
};

export const getMemeCoins = async (limit = 50, convert = 'USD'): Promise<CMCCategoryResponse> => {
  return fetchCMC<CMCCategoryResponse>('/cryptocurrency/category', {
    id: 'meme-token',
    limit: limit.toString(),
    convert,
  });
};

// Helper functions
export const formatCurrency = (value: number, maximumFractionDigits = 2): string => {
  if (value >= 1) {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits,
    });
  } else {
    // For very small values, use more decimal places
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 8,
    });
  }
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(2)}B`;
  } else if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`;
  } else {
    return `$${num.toFixed(2)}`;
  }
};

export const getColorForChange = (change: number): string => {
  return change >= 0 ? 'text-[#4BCC00]' : 'text-red-500';
};

