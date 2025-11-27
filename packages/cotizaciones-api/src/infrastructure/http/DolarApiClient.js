"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DolarApiClient = void 0;
const env_1 = require("../config/env");
class DolarApiClient {
    baseUrl;
    constructor(baseUrl) {
        this.baseUrl = baseUrl || env_1.config.dolarApiBaseUrl;
    }
    async getCurrentQuotes() {
        try {
            const response = await fetch(`${this.baseUrl}/v1/dolares`);
            if (!response.ok) {
                throw new Error(`DolarAPI error: ${response.status} ${response.statusText}`);
            }
            const data = (await response.json());
            return data.map((item) => this.mapToDollarQuote(item));
        }
        catch (error) {
            console.error("Error fetching from DolarAPI:", error);
            throw new Error("Failed to fetch current quotes from DolarAPI");
        }
    }
    mapToDollarQuote(item) {
        return {
            source: "dolarapi",
            casa: item.casa,
            nombre: item.nombre,
            moneda: item.moneda,
            fecha: new Date(item.fechaActualizacion),
            compra: item.compra,
            venta: item.venta,
        };
    }
}
exports.DolarApiClient = DolarApiClient;
//# sourceMappingURL=DolarApiClient.js.map