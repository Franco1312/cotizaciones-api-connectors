import { BinanceConfig } from "@infrastructure/config/BinanceConfig";
import { Kline } from "@domain/models/Kline";
import { Interval } from "@domain/models/Kline";
import { logger, LOG_EVENTS } from "@infrastructure/logger";

export interface FetchKlinesParams {
  symbol: string;
  interval: Interval;
  limit?: number;
  startTime?: number;
  endTime?: number;
}

export interface IBinanceRestClient {
  fetchKlines(params: FetchKlinesParams): Promise<Kline[]>;
}

export class BinanceRestClient implements IBinanceRestClient {
  constructor(private readonly config: BinanceConfig) {}

  async fetchKlines(params: FetchKlinesParams): Promise<Kline[]> {
    const { symbol, interval, limit = 200, startTime, endTime } = params;

    try {
      const url = new URL(`${this.config.restUrl}/api/v3/klines`);
      url.searchParams.set("symbol", symbol.toUpperCase());
      url.searchParams.set("interval", interval);
      url.searchParams.set("limit", limit.toString());

      if (startTime) {
        url.searchParams.set("startTime", startTime.toString());
      }
      if (endTime) {
        url.searchParams.set("endTime", endTime.toString());
      }

      logger.info({
        event: LOG_EVENTS.API_REQUEST,
        msg: `Fetching klines for ${symbol}`,
        data: { symbol, interval, limit },
      });

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Binance API error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = (await response.json()) as unknown[][];

      const klines: Kline[] = data.map((kline) => this.mapToKline(kline));

      logger.info({
        event: LOG_EVENTS.API_REQUEST,
        msg: `Successfully fetched ${klines.length} klines for ${symbol}`,
        data: { symbol, interval, count: klines.length },
      });

      return klines;
    } catch (error) {
      logger.error({
        event: LOG_EVENTS.API_ERROR,
        msg: `Error fetching klines for ${symbol}`,
        err: error,
        data: { symbol, interval },
      });
      throw error;
    }
  }

  private mapToKline(kline: unknown[]): Kline {
    return {
      openTime: kline[0] as number,
      open: kline[1] as string,
      high: kline[2] as string,
      low: kline[3] as string,
      close: kline[4] as string,
      volume: kline[5] as string,
      closeTime: kline[6] as number,
      quoteVolume: kline[7] as string,
      numberOfTrades: kline[8] as number,
      takerBuyBaseVolume: kline[9] as string,
      takerBuyQuoteVolume: kline[10] as string,
    };
  }
}

