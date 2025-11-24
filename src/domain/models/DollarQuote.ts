export type DollarQuoteSource = "dolarapi" | "argentinadatos";

export interface DollarQuote {
  source: DollarQuoteSource;
  casa: string;
  nombre: string;
  moneda: string;
  fecha: Date;
  compra: number;
  venta: number;
}

