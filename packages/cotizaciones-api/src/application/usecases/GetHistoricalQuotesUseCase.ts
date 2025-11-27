import { HistoricalQuote } from "@domain/models/HistoricalQuote";
import { ArgentinaDatosClient } from "@infrastructure/http/ArgentinaDatosClient";

export class GetHistoricalQuotesUseCase {
  constructor(
    private readonly argentinaDatosClient: ArgentinaDatosClient
  ) {}

  async execute(
    casa: string,
    from?: Date,
    to?: Date
  ): Promise<HistoricalQuote[]> {
    const quotes = await this.argentinaDatosClient.getByCasa(casa);

    let filtered = quotes;

    if (from) {
      filtered = filtered.filter((quote) => quote.fecha >= from);
    }

    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((quote) => quote.fecha <= toDate);
    }

    return filtered.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
  }
}

