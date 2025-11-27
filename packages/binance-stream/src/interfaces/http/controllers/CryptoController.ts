import { Request, Response } from "express";
// Bootstrap is at root level, using relative import
import {
  getGetLatestPricesUseCase,
  getGetKlinesUseCase,
} from "../../../bootstrap";
import { CryptoPricesResponseSchema } from "@interfaces/http/schemas/crypto.schemas";
import { KlinesQuerySchema } from "@interfaces/http/schemas/klines.schemas";
import { logger, LOG_EVENTS } from "@cotizaciones/logger";

export class CryptoController {
  async getPrices(_req: Request, res: Response): Promise<void> {
    try {
      const getLatestPricesUseCase = getGetLatestPricesUseCase();
      const prices = getLatestPricesUseCase.execute();
      const validatedPrices = CryptoPricesResponseSchema.parse(prices);
      const symbolCount = Object.keys(validatedPrices).length;

      logger.info({
        event: LOG_EVENTS.CRYPTO_PRICES_FETCHED,
        msg: "Crypto prices fetched successfully",
        data: { symbolCount },
      });

      res.json(validatedPrices);
    } catch (error) {
      logger.error({
        event: LOG_EVENTS.CRYPTO_PRICES_ERROR,
        msg: "Error getting crypto prices",
        err: error,
      });
      res.status(500).json({ error: "Failed to get crypto prices" });
    }
  }

  async getKlines(req: Request, res: Response): Promise<void> {
    try {
      const validatedQuery = KlinesQuerySchema.parse(req.query);
      const { symbol, interval, limit, startTime, endTime } = validatedQuery;

      const getKlinesUseCase = getGetKlinesUseCase();
      const klines = await getKlinesUseCase.execute({
        symbol,
        interval,
        limit,
        startTime,
        endTime,
      });

      logger.info({
        event: LOG_EVENTS.API_REQUEST,
        msg: `Klines fetched for ${symbol}`,
        data: { symbol, interval, count: klines.length },
      });

      res.json({
        symbol,
        interval,
        limit: limit || 200,
        klines,
      });
    } catch (error) {
      logger.error({
        event: LOG_EVENTS.API_ERROR,
        msg: "Error fetching klines",
        err: error,
        data: {
          symbol: req.query.symbol,
          interval: req.query.interval,
        },
      });
      res.status(500).json({ error: "Failed to fetch klines" });
    }
  }
}

