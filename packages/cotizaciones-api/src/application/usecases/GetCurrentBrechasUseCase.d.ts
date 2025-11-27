import { Brecha } from "../../domain/models/Brecha";
import { GetCurrentQuotesUseCase } from "./GetCurrentQuotesUseCase";
export declare class GetCurrentBrechasUseCase {
    private readonly getCurrentQuotesUseCase;
    constructor(getCurrentQuotesUseCase: GetCurrentQuotesUseCase);
    execute(baseCasa: string, againstCasas: string[]): Promise<Brecha[]>;
}
//# sourceMappingURL=GetCurrentBrechasUseCase.d.ts.map