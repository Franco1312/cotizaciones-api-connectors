import { BinanceWebSocketClient } from "@infrastructure/websocket/BinanceWebSocketClient";
import { InMemoryPriceRepository } from "@infrastructure/repositories/InMemoryPriceRepository";
import { StreamManager } from "@infrastructure/websocket/StreamManager";
import { createBinanceConfig } from "@infrastructure/config/BinanceConfig";
import { GetLatestPricesUseCase } from "@application/usecases/GetLatestPricesUseCase";
import { GetKlinesUseCase } from "@application/usecases/GetKlinesUseCase";
import { BinanceRestClient } from "@infrastructure/http/BinanceRestClient";
import { config } from "@cotizaciones/config";

let streamManager: StreamManager | null = null;
let priceRepository: InMemoryPriceRepository | null = null;
let getLatestPricesUseCase: GetLatestPricesUseCase | null = null;
let getKlinesUseCase: GetKlinesUseCase | null = null;

function getBinanceConfig() {
  return createBinanceConfig(
    config.binance.wsUrl,
    config.binance.restUrl,
    config.binance.cryptoPairs
  );
}

function getPriceRepository(): InMemoryPriceRepository {
  if (!priceRepository) {
    priceRepository = new InMemoryPriceRepository();
  }
  return priceRepository;
}

export function bootstrapBinanceStream(): StreamManager {
  if (!streamManager) {
    const binanceConfig = getBinanceConfig();
    const webSocketClient = new BinanceWebSocketClient(binanceConfig);
    const repo = getPriceRepository();
    streamManager = new StreamManager(webSocketClient, repo);
  }
  return streamManager;
}

export function getGetLatestPricesUseCase(): GetLatestPricesUseCase {
  if (!getLatestPricesUseCase) {
    const repo = getPriceRepository();
    getLatestPricesUseCase = new GetLatestPricesUseCase(repo);
  }
  return getLatestPricesUseCase;
}

export function getGetKlinesUseCase(): GetKlinesUseCase {
  if (!getKlinesUseCase) {
    const binanceConfig = getBinanceConfig();
    const binanceRestClient = new BinanceRestClient(binanceConfig);
    getKlinesUseCase = new GetKlinesUseCase(binanceRestClient);
  }
  return getKlinesUseCase;
}

export function startBinanceStream(): void {
  const manager = bootstrapBinanceStream();
  manager.start();
}

export function stopBinanceStream(): void {
  if (streamManager) {
    streamManager.stop();
  }
}

export function getLatestPrices(): Record<string, unknown> {
  if (!streamManager) {
    return {};
  }
  return streamManager.getLatestPrices();
}

// Bootstrap for HTTP routes
import { CryptoController } from "@interfaces/http/controllers/CryptoController";
import { createCryptoRoutes } from "@interfaces/http/routes";
import { Router } from "express";

export function bootstrapCryptoRoutes(): Router {
  const cryptoController = new CryptoController();
  return createCryptoRoutes(cryptoController);
}

