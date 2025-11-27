import swaggerJsdoc from "swagger-jsdoc";
import type { SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Quotes API Connectors",
    version: "1.0.0",
    description:
      "API to get dollar quotes and real-time cryptocurrency prices",
    contact: {
      name: "API Support",
    },
  },
  servers: [
    {
      url: process.env.API_BASE_URL || "http://localhost:3000",
      description: process.env.NODE_ENV === "production" ? "Production server" : "Development server",
    },
  ],
  tags: [
    {
      name: "Crypto",
      description: "Endpoints related to cryptocurrency prices",
    },
    {
      name: "Quotes",
      description: "Endpoints related to dollar quotes",
    },
  ],
  components: {
    schemas: {
      MiniTicker: {
        type: "object",
        properties: {
          symbol: {
            type: "string",
            example: "BTCUSDT",
            description: "Trading pair symbol",
          },
          lastPrice: {
            type: "string",
            example: "90879.76000000",
            description: "Last closing price",
          },
          openPrice: {
            type: "string",
            example: "87892.81000000",
            description: "Opening price (24h)",
          },
          highPrice: {
            type: "string",
            example: "91236.00000000",
            description: "Highest price (24h)",
          },
          lowPrice: {
            type: "string",
            example: "86306.77000000",
            description: "Lowest price (24h)",
          },
          volume: {
            type: "string",
            example: "22637.26072000",
            description: "Trading volume (24h)",
          },
          quoteVolume: {
            type: "string",
            example: "2007276197.22822570",
            description: "Volume in quote currency (24h)",
          },
          eventTime: {
            type: "number",
            example: 1764209126028,
            description: "Event timestamp in milliseconds",
          },
        },
        required: [
          "symbol",
          "lastPrice",
          "openPrice",
          "highPrice",
          "lowPrice",
          "volume",
          "quoteVolume",
          "eventTime",
        ],
      },
      CryptoPricesResponse: {
        type: "object",
        description: "Response with the latest prices of all subscribed cryptocurrencies",
        additionalProperties: {
          $ref: "#/components/schemas/MiniTicker",
        },
        example: {
          BTCUSDT: {
            symbol: "BTCUSDT",
            lastPrice: "90879.76000000",
            openPrice: "87892.81000000",
            highPrice: "91236.00000000",
            lowPrice: "86306.77000000",
            volume: "22637.26072000",
            quoteVolume: "2007276197.22822570",
            eventTime: 1764209126028,
          },
          ETHUSDT: {
            symbol: "ETHUSDT",
            lastPrice: "3041.89000000",
            openPrice: "2969.64000000",
            highPrice: "3057.30000000",
            lowPrice: "2888.69000000",
            volume: "366264.91940000",
            quoteVolume: "1087302556.42002300",
            eventTime: 1764209126028,
          },
        },
      },
      Kline: {
        type: "object",
        properties: {
          openTime: {
            type: "number",
            example: 1732575600000,
            description: "Open time in milliseconds",
          },
          open: {
            type: "string",
            example: "42000.00",
            description: "Open price",
          },
          high: {
            type: "string",
            example: "43000.00",
            description: "High price",
          },
          low: {
            type: "string",
            example: "41500.00",
            description: "Low price",
          },
          close: {
            type: "string",
            example: "42850.00",
            description: "Close price",
          },
          volume: {
            type: "string",
            example: "1234.567",
            description: "Base asset volume",
          },
          closeTime: {
            type: "number",
            example: 1732579199999,
            description: "Close time in milliseconds",
          },
          quoteVolume: {
            type: "string",
            example: "123456789.00",
            description: "Quote asset volume",
          },
          numberOfTrades: {
            type: "number",
            example: 1234,
            description: "Number of trades",
          },
          takerBuyBaseVolume: {
            type: "string",
            example: "567.89",
            description: "Taker buy base asset volume",
          },
          takerBuyQuoteVolume: {
            type: "string",
            example: "56789012.34",
            description: "Taker buy quote asset volume",
          },
        },
        required: [
          "openTime",
          "open",
          "high",
          "low",
          "close",
          "volume",
          "closeTime",
          "quoteVolume",
          "numberOfTrades",
          "takerBuyBaseVolume",
          "takerBuyQuoteVolume",
        ],
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            example: "Validation error",
          },
          details: {
            type: "array",
            items: {
              type: "object",
              properties: {
                path: {
                  type: "string",
                  example: "symbol",
                },
                message: {
                  type: "string",
                  example: "Required",
                },
              },
            },
          },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/**/*.ts"], // paths to files containing OpenAPI definitions
};

export const swaggerSpec = swaggerJsdoc(options);

