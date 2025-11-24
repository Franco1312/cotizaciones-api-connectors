import { Brecha } from "../../domain/models/Brecha";
import { GetCurrentQuotesUseCase } from "./GetCurrentQuotesUseCase";

function calculateAveragePrice(compra: number, venta: number): number {
  return (compra + venta) / 2;
}

function calculateBrecha(
  basePrecio: number,
  againstPrecio: number
): number {
  return ((againstPrecio - basePrecio) / basePrecio) * 100;
}

export class GetCurrentBrechasUseCase {
  constructor(
    private readonly getCurrentQuotesUseCase: GetCurrentQuotesUseCase
  ) {}

  async execute(
    baseCasa: string,
    againstCasas: string[]
  ): Promise<Brecha[]> {
    const allQuotes = await this.getCurrentQuotesUseCase.execute();

    const baseQuote = allQuotes.find((quote) => quote.casa === baseCasa);

    if (!baseQuote) {
      throw new Error(`No se encontró cotización para la casa base: ${baseCasa}`);
    }

    const basePrecio = calculateAveragePrice(
      baseQuote.compra,
      baseQuote.venta
    );
    const fecha = baseQuote.fecha;

    const brechas: Brecha[] = [];

    for (const againstCasa of againstCasas) {
      const againstQuote = allQuotes.find(
        (quote) => quote.casa === againstCasa
      );

      if (!againstQuote) {
        continue;
      }

      const againstPrecio = calculateAveragePrice(
        againstQuote.compra,
        againstQuote.venta
      );

      const brechaPorcentaje = calculateBrecha(basePrecio, againstPrecio);

      brechas.push({
        baseCasa,
        againstCasa,
        fecha,
        basePrecio,
        againstPrecio,
        brechaPorcentaje,
      });
    }

    return brechas;
  }
}

