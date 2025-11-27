import { HistoricalQuote } from "../../domain/models/HistoricalQuote";
import { ArgentinaDatosClient } from "../../infrastructure/http/ArgentinaDatosClient";
export declare class GetHistoricalQuotesUseCase {
    private readonly argentinaDatosClient;
    constructor(argentinaDatosClient: ArgentinaDatosClient);
    execute(casa: string, from?: Date, to?: Date): Promise<HistoricalQuote[]>;
}
//# sourceMappingURL=GetHistoricalQuotesUseCase.d.ts.map