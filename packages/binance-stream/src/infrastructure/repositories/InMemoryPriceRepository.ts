import { IPriceRepository } from "@domain/repositories/IPriceRepository";
import { MiniTicker } from "@domain/models/MiniTicker";

export class InMemoryPriceRepository implements IPriceRepository {
  private prices: Record<string, MiniTicker> = {};

  save(symbol: string, ticker: MiniTicker): void {
    this.prices[symbol] = ticker;
  }

  get(symbol: string): MiniTicker | undefined {
    return this.prices[symbol];
  }

  getAll(): Record<string, MiniTicker> {
    return { ...this.prices };
  }
}

