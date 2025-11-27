import { Request, Response } from "express";
import { GetCurrentBrechasUseCase } from "../../../application/usecases/GetCurrentBrechasUseCase";
import { GetHistoricalBrechasUseCase } from "../../../application/usecases/GetHistoricalBrechasUseCase";
export declare class BrechasController {
    private readonly getCurrentBrechasUseCase;
    private readonly getHistoricalBrechasUseCase;
    constructor(getCurrentBrechasUseCase: GetCurrentBrechasUseCase, getHistoricalBrechasUseCase: GetHistoricalBrechasUseCase);
    getCurrent(req: Request, res: Response): Promise<void>;
    getHistorical(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=BrechasController.d.ts.map