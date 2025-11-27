import { HistoricalQuote } from "../../domain/models/HistoricalQuote";
export declare class ArgentinaDatosClient {
    private readonly baseUrl;
    constructor(baseUrl?: string);
    getAllQuotes(): Promise<HistoricalQuote[]>;
    getByCasa(casa: string): Promise<HistoricalQuote[]>;
    private mapToHistoricalQuote;
}
//# sourceMappingURL=ArgentinaDatosClient.d.ts.map