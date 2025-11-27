"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function parseCryptoPairs(envValue) {
    if (!envValue) {
        return [
            "btcusdt",
            "ethusdt",
            "bnbusdt",
            "solusdt",
            "adausdt",
            "xrpusdt",
            "dogeusdt",
            "dotusdt",
            "maticusdt",
            "avaxusdt",
            "linkusdt",
            "ltcusdt",
            "uniusdt",
            "atomusdt",
            "etcusdt",
            "xlmusdt",
            "nearusdt",
            "algousdt",
            "vetusdt",
            "icpusdt",
        ];
    }
    return envValue.split(",").map((pair) => pair.trim().toLowerCase());
}
exports.config = {
    binance: {
        wsUrl: process.env.BINANCE_WS_URL || "wss://stream.binance.com:9443/ws",
        cryptoPairs: parseCryptoPairs(process.env.CRYPTO_PAIRS),
    },
    http: {
        port: parseInt(process.env.HTTP_PORT || process.env.PORT || "3000", 10),
    },
};
//# sourceMappingURL=index.js.map