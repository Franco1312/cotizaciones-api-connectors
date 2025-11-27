import { IBinanceRestClient, FetchKlinesParams } from "@infrastructure/http/BinanceRestClient";
import { Kline } from "@domain/models/Kline";

export class GetKlinesUseCase {
  constructor(private readonly binanceRestClient: IBinanceRestClient) {}

  async execute(params: FetchKlinesParams): Promise<Kline[]> {
    return this.binanceRestClient.fetchKlines(params);
  }
}

