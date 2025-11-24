import { DollarQuote, DollarQuoteSource } from "../../domain/models/DollarQuote";
import { config } from "../config/env";

interface DolarApiResponse {
  moneda: string;
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

export class DolarApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || config.dolarApiBaseUrl;
  }

  async getCurrentQuotes(): Promise<DollarQuote[]> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/dolares`);

      if (!response.ok) {
        throw new Error(
          `DolarAPI error: ${response.status} ${response.statusText}`
        );
      }

      const data = (await response.json()) as DolarApiResponse[];

      return data.map((item) => this.mapToDollarQuote(item));
    } catch (error) {
      console.error("Error fetching from DolarAPI:", error);
      throw new Error("Failed to fetch current quotes from DolarAPI");
    }
  }

  private mapToDollarQuote(item: DolarApiResponse): DollarQuote {
    return {
      source: "dolarapi" as DollarQuoteSource,
      casa: item.casa,
      nombre: item.nombre,
      moneda: item.moneda,
      fecha: new Date(item.fechaActualizacion),
      compra: item.compra,
      venta: item.venta,
    };
  }
}

