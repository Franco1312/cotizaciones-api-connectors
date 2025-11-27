import { fetchKlines } from "./binanceKlines";
import { FetchKlinesParams } from "./binanceKlines";
import { Interval } from "@domain/models/Kline";

export async function fetchKlinesForSymbol(params: {
  symbol: string;
  interval: string;
  limit?: number;
  startTime?: number;
  endTime?: number;
}): Promise<unknown[]> {
  const fetchParams: FetchKlinesParams = {
    symbol: params.symbol,
    interval: params.interval as Interval,
    limit: params.limit,
    startTime: params.startTime,
    endTime: params.endTime,
  };
  return fetchKlines(fetchParams);
}

export { fetchKlines };
export type { FetchKlinesParams };

