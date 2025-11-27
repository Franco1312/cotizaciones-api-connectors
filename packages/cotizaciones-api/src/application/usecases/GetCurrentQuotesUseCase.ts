import { DollarQuote } from "@domain/models/DollarQuote";
import { DolarApiClient } from "@infrastructure/http/DolarApiClient";

export class GetCurrentQuotesUseCase {
  constructor(private readonly dolarApiClient: DolarApiClient) {}

  async execute(casa?: string): Promise<DollarQuote[]> {
    const quotes = await this.dolarApiClient.getCurrentQuotes();

    if (casa) {
      return quotes.filter((quote) => quote.casa === casa);
    }

    return quotes;
  }
}

