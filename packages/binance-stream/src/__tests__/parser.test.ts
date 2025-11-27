import { parseMiniTickerMessage } from "@infrastructure/websocket/MessageParser";
import { BinanceMiniTickerMessage } from "@infrastructure/websocket/BinanceWebSocketMessage";

describe("parseMiniTickerMessage", () => {
  it("should correctly parse a Binance miniTicker message", () => {
    const binanceMessage: BinanceMiniTickerMessage = {
      e: "24hrMiniTicker",
      E: 1672515782136,
      s: "BTCUSDT",
      c: "42000.00",
      o: "41000.00",
      h: "43000.00",
      l: "40000.00",
      v: "12345.67",
      q: "123456789.00",
    };

    const result = parseMiniTickerMessage(binanceMessage);

    expect(result).toEqual({
      symbol: "BTCUSDT",
      lastPrice: "42000.00",
      openPrice: "41000.00",
      highPrice: "43000.00",
      lowPrice: "40000.00",
      volume: "12345.67",
      quoteVolume: "123456789.00",
      eventTime: 1672515782136,
    });
  });

  it("should handle different symbols correctly", () => {
    const binanceMessage: BinanceMiniTickerMessage = {
      e: "24hrMiniTicker",
      E: 1672515782136,
      s: "ETHUSDT",
      c: "2500.50",
      o: "2400.00",
      h: "2600.00",
      l: "2300.00",
      v: "5678.90",
      q: "14197225.00",
    };

    const result = parseMiniTickerMessage(binanceMessage);

    expect(result.symbol).toBe("ETHUSDT");
    expect(result.lastPrice).toBe("2500.50");
    expect(result.eventTime).toBe(1672515782136);
  });
});
