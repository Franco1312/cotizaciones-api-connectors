import { IWebSocketClient } from "@infrastructure/websocket/BinanceWebSocketClient";
import { IPriceRepository } from "@domain/repositories/IPriceRepository";
import { MiniTicker } from "@domain/models/MiniTicker";
import { logger, LOG_EVENTS } from "@cotizaciones/logger";

export class StartStreamUseCase {
  constructor(
    private readonly webSocketClient: IWebSocketClient,
    private readonly priceRepository: IPriceRepository
  ) {}

  execute(): void {
    if (this.webSocketClient.isConnected()) {
      logger.info({
        event: LOG_EVENTS.BINANCE_STREAM_STARTED,
        msg: "Binance stream already running",
      });
      return;
    }

    logger.info({
      event: LOG_EVENTS.BINANCE_STREAM_STARTED,
      msg: "Starting Binance WebSocket stream",
    });

    this.webSocketClient.onMessage((ticker: MiniTicker) => {
      this.priceRepository.save(ticker.symbol, ticker);
    });

    this.webSocketClient.onError((error: Error) => {
      console.error("❌ Stream error:", error);
    });

    this.webSocketClient.onClose(() => {
      logger.info({
        event: LOG_EVENTS.BINANCE_STREAM_DISCONNECTED,
        msg: "Stream closed, will attempt to reconnect",
      });
    });

    this.webSocketClient.connect();
  }
}

