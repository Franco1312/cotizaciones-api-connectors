import { MiniTicker } from "@domain/models/MiniTicker";
import { IPriceRepository } from "@domain/repositories/IPriceRepository";

export class GetLatestPricesUseCase {
  constructor(private readonly priceRepository: IPriceRepository) {}

  execute(): Record<string, MiniTicker> {
    return this.priceRepository.getAll();
  }
}

