import { DolarApiClient } from "@infrastructure/http/DolarApiClient";
import { ArgentinaDatosClient } from "@infrastructure/http/ArgentinaDatosClient";
import { GetCurrentQuotesUseCase } from "@application/usecases/GetCurrentQuotesUseCase";
import { GetHistoricalQuotesUseCase } from "@application/usecases/GetHistoricalQuotesUseCase";
import { GetCurrentBrechasUseCase } from "@application/usecases/GetCurrentBrechasUseCase";
import { GetHistoricalBrechasUseCase } from "@application/usecases/GetHistoricalBrechasUseCase";
import { QuotesController } from "@interfaces/http/controllers/QuotesController";
import { BrechasController } from "@interfaces/http/controllers/BrechasController";
import { createRoutes } from "@interfaces/http/routes";
import { Router } from "express";

export function bootstrapCotizacionesRoutes(): Router {
  const dolarApiClient = new DolarApiClient();
  const argentinaDatosClient = new ArgentinaDatosClient();

  const getCurrentQuotesUseCase = new GetCurrentQuotesUseCase(dolarApiClient);
  const getHistoricalQuotesUseCase = new GetHistoricalQuotesUseCase(
    argentinaDatosClient
  );
  const getCurrentBrechasUseCase = new GetCurrentBrechasUseCase(
    getCurrentQuotesUseCase
  );
  const getHistoricalBrechasUseCase = new GetHistoricalBrechasUseCase(
    argentinaDatosClient
  );

  const quotesController = new QuotesController(
    getCurrentQuotesUseCase,
    getHistoricalQuotesUseCase
  );
  const brechasController = new BrechasController(
    getCurrentBrechasUseCase,
    getHistoricalBrechasUseCase
  );

  return createRoutes(quotesController, brechasController);
}

