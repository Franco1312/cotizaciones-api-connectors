import { MiniTicker } from "@domain/models/MiniTicker";
import { BinanceMiniTickerMessage } from "./BinanceWebSocketMessage";

export function parseMiniTickerMessage(
  data: BinanceMiniTickerMessage
): MiniTicker {
  return {
    symbol: data.s,
    lastPrice: data.c,
    openPrice: data.o,
    highPrice: data.h,
    lowPrice: data.l,
    volume: data.v,
    quoteVolume: data.q,
    eventTime: data.E,
  };
}

