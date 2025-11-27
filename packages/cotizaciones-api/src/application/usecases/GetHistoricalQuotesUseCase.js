"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHistoricalQuotesUseCase = void 0;
class GetHistoricalQuotesUseCase {
    argentinaDatosClient;
    constructor(argentinaDatosClient) {
        this.argentinaDatosClient = argentinaDatosClient;
    }
    async execute(casa, from, to) {
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
exports.GetHistoricalQuotesUseCase = GetHistoricalQuotesUseCase;
//# sourceMappingURL=GetHistoricalQuotesUseCase.js.map