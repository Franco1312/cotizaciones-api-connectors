import { Router } from "express";
import { CryptoController } from "@interfaces/http/controllers/CryptoController";
import { validateQuery } from "@interfaces/http/middleware/validation.middleware";
import { KlinesQuerySchema } from "@interfaces/http/schemas/klines.schemas";

/**
 * @swagger
 * /api/crypto/prices:
 *   get:
 *     summary: Get latest cryptocurrency prices
 *     description: Returns the latest prices for all subscribed cryptocurrencies from Binance WebSocket stream
 *     tags: [Crypto]
 *     responses:
 *       200:
 *         description: Successfully retrieved cryptocurrency prices
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CryptoPricesResponse'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/crypto/klines:
 *   get:
 *     summary: Get cryptocurrency klines (candles) for charts
 *     description: Returns historical klines data from Binance REST API for a specific symbol and interval
 *     tags: [Crypto]
 *     parameters:
 *       - in: query
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         example: BTCUSDT
 *       - in: query
 *         name: interval
 *         required: true
 *         schema:
 *           type: string
 *           enum: [1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M]
 *         example: 1h
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 1000
 *           default: 200
 *         example: 168
 *       - in: query
 *         name: startTime
 *         required: false
 *         schema:
 *           type: integer
 *         example: 1732575600000
 *       - in: query
 *         name: endTime
 *         required: false
 *         schema:
 *           type: integer
 *         example: 1732579199999
 *     responses:
 *       200:
 *         description: Successfully retrieved klines
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
export function createCryptoRoutes(cryptoController: CryptoController): Router {
  const router = Router();

  router.get("/crypto/prices", (req, res) => {
    cryptoController.getPrices(req, res);
  });

  router.get(
    "/crypto/klines",
    validateQuery(KlinesQuerySchema),
    (req, res) => {
      cryptoController.getKlines(req, res);
    }
  );

  return router;
}

