import { GetKlinesUseCase } from "@application/usecases/GetKlinesUseCase";
import { BinanceRestClient } from "@infrastructure/http/BinanceRestClient";
import { createBinanceConfig } from "@infrastructure/config/BinanceConfig";
import { config } from "@cotizaciones/config";
import { FetchKlinesParams } from "@infrastructure/http/BinanceRestClient";
import { Kline } from "@domain/models/Kline";

// Singleton instances
let getKlinesUseCase: GetKlinesUseCase | null = null;

function getKlinesUseCaseInstance(): GetKlinesUseCase {
  if (!getKlinesUseCase) {
    const binanceConfig = createBinanceConfig(
      config.binance.wsUrl,
      config.binance.restUrl,
      config.binance.cryptoPairs
    );
    const binanceRestClient = new BinanceRestClient(binanceConfig);
    getKlinesUseCase = new GetKlinesUseCase(binanceRestClient);
  }
  return getKlinesUseCase;
}

export async function fetchKlines(params: FetchKlinesParams): Promise<Kline[]> {
  const useCase = getKlinesUseCaseInstance();
  return useCase.execute(params);
}

export type { FetchKlinesParams } from "@infrastructure/http/BinanceRestClient";
