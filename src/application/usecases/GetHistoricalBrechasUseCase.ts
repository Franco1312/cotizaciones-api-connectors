import { Brecha } from "../../domain/models/Brecha";
import { ArgentinaDatosClient } from "../../infrastructure/http/ArgentinaDatosClient";

function calculateAveragePrice(compra: number, venta: number): number {
  return (compra + venta) / 2;
}

function calculateBrecha(
  basePrecio: number,
  againstPrecio: number
): number {
  return ((againstPrecio - basePrecio) / basePrecio) * 100;
}

function normalizeDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export class GetHistoricalBrechasUseCase {
  constructor(
    private readonly argentinaDatosClient: ArgentinaDatosClient
  ) {}

  async execute(
    baseCasa: string,
    againstCasa: string,
    from?: Date,
    to?: Date
  ): Promise<Brecha[]> {
    const [baseQuotes, againstQuotes] = await Promise.all([
      this.argentinaDatosClient.getByCasa(baseCasa),
      this.argentinaDatosClient.getByCasa(againstCasa),
    ]);

    let filteredBase = baseQuotes;
    let filteredAgainst = againstQuotes;

    if (from) {
      filteredBase = filteredBase.filter((quote) => quote.fecha >= from);
      filteredAgainst = filteredAgainst.filter((quote) => quote.fecha >= from);
    }

    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      filteredBase = filteredBase.filter((quote) => quote.fecha <= toDate);
      filteredAgainst = filteredAgainst.filter(
        (quote) => quote.fecha <= toDate
      );
    }

    const baseByDate = new Map<string, typeof filteredBase[0]>();
    for (const quote of filteredBase) {
      const dateKey = normalizeDate(quote.fecha);
      baseByDate.set(dateKey, quote);
    }

    const brechas: Brecha[] = [];

    for (const againstQuote of filteredAgainst) {
      const dateKey = normalizeDate(againstQuote.fecha);
      const baseQuote = baseByDate.get(dateKey);

      if (!baseQuote) {
        continue;
      }

      const basePrecio = calculateAveragePrice(
        baseQuote.compra,
        baseQuote.venta
      );
      const againstPrecio = calculateAveragePrice(
        againstQuote.compra,
        againstQuote.venta
      );

      const brechaPorcentaje = calculateBrecha(basePrecio, againstPrecio);

      brechas.push({
        baseCasa,
        againstCasa,
        fecha: baseQuote.fecha,
        basePrecio,
        againstPrecio,
        brechaPorcentaje,
      });
    }

    return brechas.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
  }
}

