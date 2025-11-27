// Stream exports (WebSocket prices)
export { startPriceStream, getLatestPrices } from "./stream/binancePriceStream";

// Klines exports (REST candles)
export { fetchKlinesForSymbol, fetchKlines } from "./klines";
export type { FetchKlinesParams } from "./klines";

// Use cases exports
export {
  getGetLatestPricesUseCase,
  getGetKlinesUseCase,
} from "./bootstrap";
export { GetLatestPricesUseCase } from "./application/usecases/GetLatestPricesUseCase";
export { GetKlinesUseCase } from "./application/usecases/GetKlinesUseCase";

// HTTP Routes exports
export { bootstrapCryptoRoutes } from "./bootstrap";
export { CryptoController } from "./interfaces/http/controllers/CryptoController";
export { createCryptoRoutes } from "./interfaces/http/routes";

// Types
export type { MiniTicker } from "./domain/models/MiniTicker";
export type { Kline, Interval } from "./domain/models/Kline";

// Backward compatibility
export {
  startBinanceStream,
  stopBinanceStream,
} from "./bootstrap";
