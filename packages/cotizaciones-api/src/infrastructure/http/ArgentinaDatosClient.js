"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgentinaDatosClient = void 0;
const env_1 = require("../config/env");
class ArgentinaDatosClient {
    baseUrl;
    constructor(baseUrl) {
        this.baseUrl = baseUrl || env_1.config.argentinaDatosBaseUrl;
    }
    async getAllQuotes() {
        try {
            const response = await fetch(`${this.baseUrl}/v1/cotizaciones/dolares`);
            if (!response.ok) {
                throw new Error(`ArgentinaDatos error: ${response.status} ${response.statusText}`);
            }
            const data = (await response.json());
            return data.map((item) => this.mapToHistoricalQuote(item));
        }
        catch (error) {
            console.error("Error fetching from ArgentinaDatos:", error);
            throw new Error("Failed to fetch historical quotes from ArgentinaDatos");
        }
    }
    async getByCasa(casa) {
        try {
            const response = await fetch(`${this.baseUrl}/v1/cotizaciones/dolares/${casa}`);
            if (!response.ok) {
                throw new Error(`ArgentinaDatos error: ${response.status} ${response.statusText}`);
            }
            const data = (await response.json());
            return data.map((item) => this.mapToHistoricalQuote(item));
        }
        catch (error) {
            console.error(`Error fetching historical quotes for casa ${casa} from ArgentinaDatos:`, error);
            throw new Error(`Failed to fetch historical quotes for casa ${casa} from ArgentinaDatos`);
        }
    }
    mapToHistoricalQuote(item) {
        return {
            casa: item.casa,
            fecha: new Date(item.fecha),
            compra: item.compra,
            venta: item.venta,
        };
    }
}
exports.ArgentinaDatosClient = ArgentinaDatosClient;
//# sourceMappingURL=ArgentinaDatosClient.js.map