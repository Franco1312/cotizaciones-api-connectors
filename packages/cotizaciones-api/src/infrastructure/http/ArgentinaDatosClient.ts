import { HistoricalQuote } from "@domain/models/HistoricalQuote";
import { config } from "@infrastructure/config/env";

interface ArgentinaDatosResponse {
  moneda: string;
  casa: string;
  fecha: string;
  compra: number;
  venta: number;
}

export class ArgentinaDatosClient {
  private readonly baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || config.argentinaDatosBaseUrl;
  }

  async getAllQuotes(): Promise<HistoricalQuote[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v1/cotizaciones/dolares`
      );

      if (!response.ok) {
        throw new Error(
          `ArgentinaDatos error: ${response.status} ${response.statusText}`
        );
      }

      const data = (await response.json()) as ArgentinaDatosResponse[];

      return data.map((item) => this.mapToHistoricalQuote(item));
    } catch (error) {
      console.error("Error fetching from ArgentinaDatos:", error);
      throw new Error("Failed to fetch historical quotes from ArgentinaDatos");
    }
  }

  async getByCasa(casa: string): Promise<HistoricalQuote[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v1/cotizaciones/dolares/${casa}`
      );

      if (!response.ok) {
        throw new Error(
          `ArgentinaDatos error: ${response.status} ${response.statusText}`
        );
      }

      const data = (await response.json()) as ArgentinaDatosResponse[];

      return data.map((item) => this.mapToHistoricalQuote(item));
    } catch (error) {
      console.error(
        `Error fetching historical quotes for casa ${casa} from ArgentinaDatos:`,
        error
      );
      throw new Error(
        `Failed to fetch historical quotes for casa ${casa} from ArgentinaDatos`
      );
    }
  }

  private mapToHistoricalQuote(
    item: ArgentinaDatosResponse
  ): HistoricalQuote {
    return {
      casa: item.casa,
      fecha: new Date(item.fecha),
      compra: item.compra,
      venta: item.venta,
    };
  }
}

