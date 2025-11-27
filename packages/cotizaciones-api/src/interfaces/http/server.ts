import express, { Express } from "express";
import cors from "cors";
import { createRoutes } from "./routes";
import { QuotesController } from "./controllers/QuotesController";
import { BrechasController } from "./controllers/BrechasController";

export function createApp(
  quotesController: QuotesController,
  brechasController: BrechasController
): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const routes = createRoutes(quotesController, brechasController);
  app.use("/api", routes);

  return app;
}

