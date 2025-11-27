import { Request, Response } from "express";
import { GetCurrentQuotesUseCase } from "@application/usecases/GetCurrentQuotesUseCase";
import { GetHistoricalQuotesUseCase } from "@application/usecases/GetHistoricalQuotesUseCase";

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

      const startDateStr = req.query.startDate as string | undefined;
      const endDateStr = req.query.endDate as string | undefined;

      let startDate: Date | undefined;
      let endDate: Date | undefined;

      if (startDateStr) {
        startDate = new Date(startDateStr);
        if (isNaN(startDate.getTime())) {
          res.status(400).json({
            error: "Bad request",
            message:
              "Invalid date format for 'startDate' parameter (expected ISO format YYYY-MM-DD)",
          });
          return;
        }
        startDate.setHours(0, 0, 0, 0);
      }

      if (endDateStr) {
        endDate = new Date(endDateStr);
        if (isNaN(endDate.getTime())) {
          res.status(400).json({
            error: "Bad request",
            message:
              "Invalid date format for 'endDate' parameter (expected ISO format YYYY-MM-DD)",
          });
          return;
        }
        endDate.setHours(23, 59, 59, 999);
      }

      const quotes = await this.getHistoricalQuotesUseCase.execute(
        casa,
        startDate,
        endDate
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

