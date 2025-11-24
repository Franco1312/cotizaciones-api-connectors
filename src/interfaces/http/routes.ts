import { Router } from "express";
import { QuotesController } from "./controllers/QuotesController";
import { BrechasController } from "./controllers/BrechasController";

export function createRoutes(
  quotesController: QuotesController,
  brechasController: BrechasController
): Router {
  const router = Router();

  router.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  router.get("/quotes/current", (req, res) => {
    quotesController.getCurrent(req, res).catch((err) => {
      console.error("Unhandled error in getCurrent:", err);
      res.status(500).json({ error: "Internal server error" });
    });
  });

  router.get("/quotes/historical", (req, res) => {
    quotesController.getHistorical(req, res).catch((err) => {
      console.error("Unhandled error in getHistorical:", err);
      res.status(500).json({ error: "Internal server error" });
    });
  });

  router.get("/brechas/current", (req, res) => {
    brechasController.getCurrent(req, res).catch((err) => {
      console.error("Unhandled error in getCurrent brechas:", err);
      res.status(500).json({ error: "Internal server error" });
    });
  });

  router.get("/brechas/historical", (req, res) => {
    brechasController.getHistorical(req, res).catch((err) => {
      console.error("Unhandled error in getHistorical brechas:", err);
      res.status(500).json({ error: "Internal server error" });
    });
  });

  return router;
}

