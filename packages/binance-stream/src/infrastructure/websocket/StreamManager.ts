import { IWebSocketClient } from "./BinanceWebSocketClient";
import { IPriceRepository } from "@domain/repositories/IPriceRepository";
import { StartStreamUseCase } from "@application/usecases/StartStreamUseCase";
import { GetLatestPricesUseCase } from "@application/usecases/GetLatestPricesUseCase";
import { logger, LOG_EVENTS } from "@infrastructure/logger";

export class StreamManager {
  private startStreamUseCase: StartStreamUseCase;
  private getLatestPricesUseCase: GetLatestPricesUseCase;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 3000; // 3 seconds
  private reconnectTimer: NodeJS.Timeout | null = null;

  constructor(
    private readonly webSocketClient: IWebSocketClient,
    priceRepository: IPriceRepository
  ) {
    this.startStreamUseCase = new StartStreamUseCase(
      webSocketClient,
      priceRepository
    );
    this.getLatestPricesUseCase = new GetLatestPricesUseCase(priceRepository);

    this.setupReconnection();
  }

  private setupReconnection(): void {
    this.webSocketClient.onClose(() => {
      this.scheduleReconnect();
    });

    this.webSocketClient.onError((error: Error) => {
      logger.error({
        event: LOG_EVENTS.BINANCE_STREAM_ERROR,
        msg: "Stream error occurred",
        err: error,
      });
      this.scheduleReconnect();
    });
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) {
      return;
    }

    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      logger.error({
        event: LOG_EVENTS.BINANCE_STREAM_RECONNECT_FAILED,
        msg: "Max reconnection attempts reached. Please restart the service.",
        data: {
          attempts: this.reconnectAttempts,
          maxAttempts: this.maxReconnectAttempts,
        },
        err: new Error("Max reconnection attempts reached"),
      });
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * this.reconnectAttempts;

    logger.info({
      event: LOG_EVENTS.BINANCE_STREAM_RECONNECTING,
      msg: `Reconnecting in ${delay / 1000}s`,
      data: {
        attempt: this.reconnectAttempts,
        maxAttempts: this.maxReconnectAttempts,
        delaySeconds: delay / 1000,
      },
    });

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.reconnectAttempts = 0; // Reset on successful connection
      this.startStreamUseCase.execute();
    }, delay);
  }

  start(): void {
    this.reconnectAttempts = 0;
    this.startStreamUseCase.execute();
  }

  stop(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.webSocketClient.disconnect();
    logger.info({
      event: LOG_EVENTS.BINANCE_STREAM_STOPPED,
      msg: "Binance WebSocket stream stopped",
    });
  }

  getLatestPrices(): Record<string, unknown> {
    return this.getLatestPricesUseCase.execute();
  }
}

