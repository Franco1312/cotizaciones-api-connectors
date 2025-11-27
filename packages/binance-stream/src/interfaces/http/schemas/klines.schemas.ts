// @ts-ignore - zod is installed in root node_modules
import { z } from "zod";

export const IntervalSchema = z.enum([
  "1m",
  "3m",
  "5m",
  "15m",
  "30m",
  "1h",
  "2h",
  "4h",
  "6h",
  "8h",
  "12h",
  "1d",
  "3d",
  "1w",
  "1M",
]);

export const KlinesQuerySchema = z.object({
  symbol: z.string().min(1, "Symbol is required"),
  interval: IntervalSchema,
  limit: z
    .string()
    .optional()
    .transform((val: string | undefined) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().min(1).max(1000).optional()),
  startTime: z
    .string()
    .optional()
    .transform((val: string | undefined) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().positive().optional()),
  endTime: z
    .string()
    .optional()
    .transform((val: string | undefined) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().positive().optional()),
});

export type KlinesQuery = z.infer<typeof KlinesQuerySchema>;

