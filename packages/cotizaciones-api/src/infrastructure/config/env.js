"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: parseInt(process.env.PORT || "3000", 10),
    dolarApiBaseUrl: process.env.DOLAR_API_BASE_URL || "https://dolarapi.com",
    argentinaDatosBaseUrl: process.env.ARGENTINA_DATOS_BASE_URL || "https://api.argentinadatos.com",
};
//# sourceMappingURL=env.js.map