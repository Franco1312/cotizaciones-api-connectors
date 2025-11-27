import WebSocket from "ws";
import { MiniTicker } from "@domain/models/MiniTicker";
import { BinanceMiniTickerMessage } from "./BinanceWebSocketMessage";
import { BinanceConfig } from "@infrastructure/config/BinanceConfig";
import { parseMiniTickerMessage } from "./MessageParser";
import { logger, LOG_EVENTS } from "@infrastructure/logger";

export interface IWebSocketClient {
  connect(): void;
  disconnect(): void;
  isConnected(): boolean;
  onMessage(callback: (ticker: MiniTicker) => void): void;
  onError(callback: (error: Error) => void): void;
  onClose(callback: () => void): void;
}

export class BinanceWebSocketClient implements IWebSocketClient {
  private ws: WebSocket | null = null;
  private messageCallbacks: Array<(ticker: MiniTicker) => void> = [];
  private errorCallbacks: Array<(error: Error) => void> = [];
  private closeCallbacks: Array<() => void> = [];

  constructor(private readonly config: BinanceConfig) {}

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      this.ws = new WebSocket(this.config.wsUrl);

      this.ws.on("open", () => {
        logger.info({
          event: LOG_EVENTS.BINANCE_STREAM_CONNECTED,
          msg: "Binance WebSocket connected",
        });
        this.subscribe();
      });

      this.ws.on("message", (data: WebSocket.Data) => {
        try {
          const message = JSON.parse(data.toString());
          this.handleMessage(message);
        } catch (error) {
          logger.error({
            event: LOG_EVENTS.BINANCE_MESSAGE_PARSE_ERROR,
            msg: "Error parsing Binance WebSocket message",
            err: error,
          });
        }
      });

      this.ws.on("error", (error: Error) => {
        logger.error({
          event: LOG_EVENTS.BINANCE_STREAM_ERROR,
          msg: "Binance WebSocket error",
          err: error,
        });
        this.errorCallbacks.forEach((callback) => callback(error));
      });

      this.ws.on("close", () => {
        logger.info({
          event: LOG_EVENTS.BINANCE_STREAM_DISCONNECTED,
          msg: "Binance WebSocket closed",
        });
        this.closeCallbacks.forEach((callback) => callback());
      });
    } catch (error) {
      logger.error({
        event: LOG_EVENTS.BINANCE_STREAM_ERROR,
        msg: "Error creating Binance WebSocket",
        err: error,
      });
      throw error;
    }
  }

  private subscribe(): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    const streams = this.config.cryptoPairs.map(
      (pair: string) => `${pair}@miniTicker`
    );

    const subscribeMessage = {
      method: "SUBSCRIBE",
      params: streams,
      id: 1,
    };

    this.ws.send(JSON.stringify(subscribeMessage));
    logger.info({
      event: LOG_EVENTS.BINANCE_STREAM_SUBSCRIBED,
      msg: `Subscribed to ${streams.length} streams`,
      data: { streamCount: streams.length },
    });
  }

  private handleMessage(message: unknown): void {
    // Ignore subscription confirmation
    if (
      typeof message === "object" &&
      message !== null &&
      "result" in message
    ) {
      return;
    }

    // Handle miniTicker update
    if (
      typeof message === "object" &&
      message !== null &&
      "e" in message &&
      (message as { e: string }).e === "24hrMiniTicker"
    ) {
      const tickerData = message as BinanceMiniTickerMessage;
      const miniTicker = parseMiniTickerMessage(tickerData);
      this.messageCallbacks.forEach((callback) => callback(miniTicker));
    }
  }


  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  onMessage(callback: (ticker: MiniTicker) => void): void {
    this.messageCallbacks.push(callback);
  }

  onError(callback: (error: Error) => void): void {
    this.errorCallbacks.push(callback);
  }

  onClose(callback: () => void): void {
    this.closeCallbacks.push(callback);
  }
}

