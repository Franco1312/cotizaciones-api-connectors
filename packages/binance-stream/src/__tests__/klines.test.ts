import { BinanceRestClient } from "../infrastructure/http/BinanceRestClient";
import { createBinanceConfig } from "@infrastructure/config/BinanceConfig";
import { FetchKlinesParams } from "../infrastructure/http/BinanceRestClient";

// Mock fetch globally
global.fetch = jest.fn();

describe("BinanceRestClient", () => {
  const mockConfig = createBinanceConfig(
    "wss://test.com",
    "https://api.test.com",
    ["btcusdt"]
  );

  let client: BinanceRestClient;

  beforeEach(() => {
    jest.clearAllMocks();
    client = new BinanceRestClient(mockConfig);
  });

  it("should parse Binance klines response correctly", async () => {
    const mockKlineData = [
      [
        1732575600000, // openTime
        "42000.00", // open
        "43000.00", // high
        "41500.00", // low
        "42850.00", // close
        "1234.567", // volume
        1732579199999, // closeTime
        "123456789.00", // quoteVolume
        1234, // numberOfTrades
        "567.89", // takerBuyBaseVolume
        "56789012.34", // takerBuyQuoteVolume
      ],
      [
        1732579200000,
        "42850.00",
        "43200.00",
        "42700.00",
        "43000.00",
        "2345.678",
        1732582799999,
        "234567890.00",
        2345,
        "1234.56",
        "123456789.00",
      ],
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockKlineData,
    });

    const params: FetchKlinesParams = {
      symbol: "BTCUSDT",
      interval: "1h",
      limit: 2,
    };

    const result = await client.fetchKlines(params);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      openTime: 1732575600000,
      open: "42000.00",
      high: "43000.00",
      low: "41500.00",
      close: "42850.00",
      volume: "1234.567",
      closeTime: 1732579199999,
      quoteVolume: "123456789.00",
      numberOfTrades: 1234,
      takerBuyBaseVolume: "567.89",
      takerBuyQuoteVolume: "56789012.34",
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("symbol=BTCUSDT")
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("interval=1h")
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("limit=2")
    );
  });

  it("should handle API errors correctly", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      text: async () => "Invalid symbol",
    });

    const params: FetchKlinesParams = {
      symbol: "INVALID",
      interval: "1h",
    };

    await expect(client.fetchKlines(params)).rejects.toThrow(
      "Binance API error"
    );
  });

  it("should include optional parameters in URL", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const params: FetchKlinesParams = {
      symbol: "BTCUSDT",
      interval: "1d",
      limit: 100,
      startTime: 1732575600000,
      endTime: 1732662000000,
    };

    await client.fetchKlines(params);

    const callUrl = (global.fetch as jest.Mock).mock.calls[0][0];
    expect(callUrl).toContain("startTime=1732575600000");
    expect(callUrl).toContain("endTime=1732662000000");
  });
});

