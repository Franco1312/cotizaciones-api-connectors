import { Request, Response } from "express";
import { GetCurrentBrechasUseCase } from "@application/usecases/GetCurrentBrechasUseCase";
import { GetHistoricalBrechasUseCase } from "@application/usecases/GetHistoricalBrechasUseCase";

export class BrechasController {
  constructor(
    private readonly getCurrentBrechasUseCase: GetCurrentBrechasUseCase,
    private readonly getHistoricalBrechasUseCase: GetHistoricalBrechasUseCase
  ) {}

  async getCurrent(req: Request, res: Response): Promise<void> {
    try {
      const baseCasa = req.query.baseCasa as string | undefined;

      if (!baseCasa) {
        res.status(400).json({
          error: "Bad request",
          message: "Query parameter 'baseCasa' is required",
        });
        return;
      }

      const againstStr = req.query.against as string | undefined;

      if (!againstStr) {
        res.status(400).json({
          error: "Bad request",
          message: "Query parameter 'against' is required (comma-separated list)",
        });
        return;
      }

      const againstCasas = againstStr.split(",").map((c) => c.trim());

      const brechas = await this.getCurrentBrechasUseCase.execute(
        baseCasa,
        againstCasas
      );
      res.json(brechas);
    } catch (error) {
      console.error("Error in getCurrent brechas:", error);
      if (error instanceof Error && error.message.includes("No se encontró")) {
        res.status(404).json({
          error: "Not found",
          message: error.message,
        });
        return;
      }
      res.status(503).json({
        error: "Service unavailable",
        message: "Failed to fetch current brechas",
      });
    }
  }

  async getHistorical(req: Request, res: Response): Promise<void> {
    try {
      const baseCasa = req.query.baseCasa as string | undefined;
      const againstCasa = req.query.againstCasa as string | undefined;

      if (!baseCasa) {
        res.status(400).json({
          error: "Bad request",
          message: "Query parameter 'baseCasa' is required",
        });
        return;
      }

      if (!againstCasa) {
        res.status(400).json({
          error: "Bad request",
          message: "Query parameter 'againstCasa' is required",
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

      const brechas = await this.getHistoricalBrechasUseCase.execute(
        baseCasa,
        againstCasa,
        from,
        to
      );
      res.json(brechas);
    } catch (error) {
      console.error("Error in getHistorical brechas:", error);
      res.status(503).json({
        error: "Service unavailable",
        message: "Failed to fetch historical brechas",
      });
    }
  }
}

