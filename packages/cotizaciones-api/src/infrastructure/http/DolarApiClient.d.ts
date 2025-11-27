import { DollarQuote } from "../../domain/models/DollarQuote";
export declare class DolarApiClient {
    private readonly baseUrl;
    constructor(baseUrl?: string);
    getCurrentQuotes(): Promise<DollarQuote[]>;
    private mapToDollarQuote;
}
//# sourceMappingURL=DolarApiClient.d.ts.map