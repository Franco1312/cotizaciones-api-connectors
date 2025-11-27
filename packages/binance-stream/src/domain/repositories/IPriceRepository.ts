import { MiniTicker } from "@domain/models/MiniTicker";

export interface IPriceRepository {
  save(symbol: string, ticker: MiniTicker): void;
  get(symbol: string): MiniTicker | undefined;
  getAll(): Record<string, MiniTicker>;
}

