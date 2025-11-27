import express, { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { bootstrapCotizacionesRoutes } from "../packages/cotizaciones-api/dist";
import { startPriceStream, bootstrapCryptoRoutes } from "../packages/binance-stream/dist";
import { config } from "../packages/config/dist";
import { swaggerSpec } from "./config/swagger.config";
import { logger, LOG_EVENTS } from "./infrastructure/logger";

const PORT = config.http.port;

function createServer(): Express {
  const app = express();

  // Middleware global
  app.use(cors());
  app.use(express.json());

  // Swagger documentation
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Registrar rutas de cada package
  // Cotizaciones API
  const cotizacionesRoutes = bootstrapCotizacionesRoutes();
  app.use("/api", cotizacionesRoutes);

  // Crypto prices API
  const cryptoRoutes = bootstrapCryptoRoutes();
  app.use("/api", cryptoRoutes);

  return app;
}

function startServer(): void {
  // Iniciar Binance WebSocket stream
  startPriceStream();

  const app = createServer();

  app.listen(PORT, "0.0.0.0", () => {
    logger.info({
      event: LOG_EVENTS.SERVER_STARTED,
      msg: "Server started successfully",
      data: {
        port: PORT,
        host: "0.0.0.0",
        endpoints: {
          health: `/api/health`,
          cryptoPrices: `/api/crypto/prices`,
          apiDocs: `/api-docs`,
        },
        packages: ["cotizaciones-api", "binance-stream"],
      },
    });
  });
}

startServer();

