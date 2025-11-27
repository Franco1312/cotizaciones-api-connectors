export interface BinanceConfig {
  wsUrl: string;
  restUrl: string;
  cryptoPairs: string[];
}

// This function will be called from bootstrap with the actual config
export function createBinanceConfig(
  wsUrl: string,
  restUrl: string,
  cryptoPairs: string[]
): BinanceConfig {
  return {
    wsUrl,
    restUrl,
    cryptoPairs,
  };
}

