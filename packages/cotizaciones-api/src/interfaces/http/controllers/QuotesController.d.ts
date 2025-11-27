import { Request, Response } from "express";
import { GetCurrentQuotesUseCase } from "../../../application/usecases/GetCurrentQuotesUseCase";
import { GetHistoricalQuotesUseCase } from "../../../application/usecases/GetHistoricalQuotesUseCase";
export declare class QuotesController {
    private readonly getCurrentQuotesUseCase;
    private readonly getHistoricalQuotesUseCase;
    constructor(getCurrentQuotesUseCase: GetCurrentQuotesUseCase, getHistoricalQuotesUseCase: GetHistoricalQuotesUseCase);
    getCurrent(req: Request, res: Response): Promise<void>;
    getHistorical(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=QuotesController.d.ts.map