"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHistoricalBrechasUseCase = void 0;
function calculateAveragePrice(compra, venta) {
    return (compra + venta) / 2;
}
function calculateBrecha(basePrecio, againstPrecio) {
    return ((againstPrecio - basePrecio) / basePrecio) * 100;
}
function normalizeDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
class GetHistoricalBrechasUseCase {
    argentinaDatosClient;
    constructor(argentinaDatosClient) {
        this.argentinaDatosClient = argentinaDatosClient;
    }
    async execute(baseCasa, againstCasa, from, to) {
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
            filteredAgainst = filteredAgainst.filter((quote) => quote.fecha <= toDate);
        }
        const baseByDate = new Map();
        for (const quote of filteredBase) {
            const dateKey = normalizeDate(quote.fecha);
            baseByDate.set(dateKey, quote);
        }
        const brechas = [];
        for (const againstQuote of filteredAgainst) {
            const dateKey = normalizeDate(againstQuote.fecha);
            const baseQuote = baseByDate.get(dateKey);
            if (!baseQuote) {
                continue;
            }
            const basePrecio = calculateAveragePrice(baseQuote.compra, baseQuote.venta);
            const againstPrecio = calculateAveragePrice(againstQuote.compra, againstQuote.venta);
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
exports.GetHistoricalBrechasUseCase = GetHistoricalBrechasUseCase;
//# sourceMappingURL=GetHistoricalBrechasUseCase.js.map