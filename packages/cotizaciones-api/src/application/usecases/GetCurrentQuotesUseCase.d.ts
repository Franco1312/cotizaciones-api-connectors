import { DollarQuote } from "../../domain/models/DollarQuote";
import { DolarApiClient } from "../../infrastructure/http/DolarApiClient";
export declare class GetCurrentQuotesUseCase {
    private readonly dolarApiClient;
    constructor(dolarApiClient: DolarApiClient);
    execute(casa?: string): Promise<DollarQuote[]>;
}
//# sourceMappingURL=GetCurrentQuotesUseCase.d.ts.map