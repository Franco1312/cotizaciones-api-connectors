"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentBrechasUseCase = void 0;
function calculateAveragePrice(compra, venta) {
    return (compra + venta) / 2;
}
function calculateBrecha(basePrecio, againstPrecio) {
    return ((againstPrecio - basePrecio) / basePrecio) * 100;
}
class GetCurrentBrechasUseCase {
    getCurrentQuotesUseCase;
    constructor(getCurrentQuotesUseCase) {
        this.getCurrentQuotesUseCase = getCurrentQuotesUseCase;
    }
    async execute(baseCasa, againstCasas) {
        const allQuotes = await this.getCurrentQuotesUseCase.execute();
        const baseQuote = allQuotes.find((quote) => quote.casa === baseCasa);
        if (!baseQuote) {
            throw new Error(`No se encontró cotización para la casa base: ${baseCasa}`);
        }
        const basePrecio = calculateAveragePrice(baseQuote.compra, baseQuote.venta);
        const fecha = baseQuote.fecha;
        const brechas = [];
        for (const againstCasa of againstCasas) {
            const againstQuote = allQuotes.find((quote) => quote.casa === againstCasa);
            if (!againstQuote) {
                continue;
            }
            const againstPrecio = calculateAveragePrice(againstQuote.compra, againstQuote.venta);
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
exports.GetCurrentBrechasUseCase = GetCurrentBrechasUseCase;
//# sourceMappingURL=GetCurrentBrechasUseCase.js.map