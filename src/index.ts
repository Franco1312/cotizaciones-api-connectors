import { config } from "./infrastructure/config/env";
import { DolarApiClient } from "./infrastructure/http/DolarApiClient";
import { ArgentinaDatosClient } from "./infrastructure/http/ArgentinaDatosClient";
import { GetCurrentQuotesUseCase } from "./application/usecases/GetCurrentQuotesUseCase";
import { GetHistoricalQuotesUseCase } from "./application/usecases/GetHistoricalQuotesUseCase";
import { GetCurrentBrechasUseCase } from "./application/usecases/GetCurrentBrechasUseCase";
import { GetHistoricalBrechasUseCase } from "./application/usecases/GetHistoricalBrechasUseCase";
import { QuotesController } from "./interfaces/http/controllers/QuotesController";
import { BrechasController } from "./interfaces/http/controllers/BrechasController";
import { createApp } from "./interfaces/http/server";

function bootstrap(): void {
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

  const app = createApp(quotesController, brechasController);

  const port = config.port;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Health check: http://localhost:${port}/api/health`);
  });
}

bootstrap();

