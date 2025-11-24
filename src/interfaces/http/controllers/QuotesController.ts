import { Request, Response } from "express";
import { GetCurrentQuotesUseCase } from "../../../application/usecases/GetCurrentQuotesUseCase";
import { GetHistoricalQuotesUseCase } from "../../../application/usecases/GetHistoricalQuotesUseCase";

export class QuotesController {
  constructor(
    private readonly getCurrentQuotesUseCase: GetCurrentQuotesUseCase,
    private readonly getHistoricalQuotesUseCase: GetHistoricalQuotesUseCase
  ) {}

  async getCurrent(req: Request, res: Response): Promise<void> {
    try {
      const casa = req.query.casa as string | undefined;
      const quotes = await this.getCurrentQuotesUseCase.execute(casa);
      res.json(quotes);
    } catch (error) {
      console.error("Error in getCurrent:", error);
      res.status(503).json({
        error: "Service unavailable",
        message: "Failed to fetch current quotes",
      });
    }
  }

  async getHistorical(req: Request, res: Response): Promise<void> {
    try {
      const casa = req.query.casa as string | undefined;

      if (!casa) {
        res.status(400).json({
          error: "Bad request",
          message: "Query parameter 'casa' is required",
        });
        return;
      }

      const fromStr = req.query.from as string | undefined;
      const toStr = req.query.to as string | undefined;

      const from = fromStr ? new Date(fromStr) : undefined;
      const to = toStr ? new Date(toStr) : undefined;

      if (fromStr && isNaN(from!.getTime())) {
        res.status(400).json({
          error: "Bad request",
          message: "Invalid date format for 'from' parameter (expected ISO format YYYY-MM-DD)",
        });
        return;
      }

      if (toStr && isNaN(to!.getTime())) {
        res.status(400).json({
          error: "Bad request",
          message: "Invalid date format for 'to' parameter (expected ISO format YYYY-MM-DD)",
        });
        return;
      }

      const quotes = await this.getHistoricalQuotesUseCase.execute(
        casa,
        from,
        to
      );
      res.json(quotes);
    } catch (error) {
      console.error("Error in getHistorical:", error);
      res.status(503).json({
        error: "Service unavailable",
        message: "Failed to fetch historical quotes",
      });
    }
  }
}

