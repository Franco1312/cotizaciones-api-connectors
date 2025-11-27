// @ts-ignore - zod is installed in root node_modules
import { z } from "zod";

export const MiniTickerSchema = z.object({
  symbol: z.string(),
  lastPrice: z.string(),
  openPrice: z.string(),
  highPrice: z.string(),
  lowPrice: z.string(),
  volume: z.string(),
  quoteVolume: z.string(),
  eventTime: z.number(),
});

export const CryptoPricesResponseSchema = z.record(
  z.string(),
  MiniTickerSchema
);

export type MiniTicker = z.infer<typeof MiniTickerSchema>;
export type CryptoPricesResponse = z.infer<typeof CryptoPricesResponseSchema>;

