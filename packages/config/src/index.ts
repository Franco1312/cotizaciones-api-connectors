import dotenv from "dotenv";

dotenv.config();

export interface Config {
  binance: {
    wsUrl: string;
    restUrl: string;
    cryptoPairs: string[];
  };
  http: {
    port: number;
  };
}

function parseCryptoPairs(envValue: string | undefined): string[] {
  if (!envValue) {
    return [
      "btcusdt",
      "ethusdt",
      "bnbusdt",
      "solusdt",
      "adausdt",
      "xrpusdt",
      "dogeusdt",
      "dotusdt",
      "maticusdt",
      "avaxusdt",
      "linkusdt",
      "ltcusdt",
      "uniusdt",
      "atomusdt",
      "etcusdt",
      "xlmusdt",
      "nearusdt",
      "algousdt",
      "vetusdt",
      "icpusdt",
    ];
  }
  return envValue.split(",").map((pair) => pair.trim().toLowerCase());
}

export const config: Config = {
  binance: {
    wsUrl: process.env.BINANCE_WS_URL || "wss://stream.binance.com/ws",
    restUrl: process.env.BINANCE_REST_URL || "https://api.binance.com",
    cryptoPairs: parseCryptoPairs(process.env.CRYPTO_PAIRS),
  },
  http: {
    port: parseInt(process.env.HTTP_PORT || process.env.PORT || "3000", 10),
  },
};

