"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentQuotesUseCase = void 0;
class GetCurrentQuotesUseCase {
    dolarApiClient;
    constructor(dolarApiClient) {
        this.dolarApiClient = dolarApiClient;
    }
    async execute(casa) {
        const quotes = await this.dolarApiClient.getCurrentQuotes();
        if (casa) {
            return quotes.filter((quote) => quote.casa === casa);
        }
        return quotes;
    }
}
exports.GetCurrentQuotesUseCase = GetCurrentQuotesUseCase;
//# sourceMappingURL=GetCurrentQuotesUseCase.js.map