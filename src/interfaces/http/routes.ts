import { Router, Request, Response } from "express";
import { QuotesController } from "./controllers/QuotesController";
import { BrechasController } from "./controllers/BrechasController";

export function createRoutes(
  quotesController: QuotesController,
  brechasController: BrechasController
): Router {
  const router = Router();

  router.get("/health", (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  router.get("/quotes/current", (req: Request, res: Response) => {
    quotesController.getCurrent(req, res).catch((err) => {
      console.error("Unhandled error in getCurrent:", err);
      res.status(500).json({ error: "Internal server error" });
    });
  });

  router.get("/quotes/historical", (req: Request, res: Response) => {
    quotesController.getHistorical(req, res).catch((err) => {
      console.error("Unhandled error in getHistorical:", err);
      res.status(500).json({ error: "Internal server error" });
    });
  });

  router.get("/brechas/current", (req: Request, res: Response) => {
    brechasController.getCurrent(req, res).catch((err) => {
      console.error("Unhandled error in getCurrent brechas:", err);
      res.status(500).json({ error: "Internal server error" });
    });
  });

  router.get("/brechas/historical", (req: Request, res: Response) => {
    brechasController.getHistorical(req, res).catch((err) => {
      console.error("Unhandled error in getHistorical brechas:", err);
      res.status(500).json({ error: "Internal server error" });
    });
  });

  return router;
}

