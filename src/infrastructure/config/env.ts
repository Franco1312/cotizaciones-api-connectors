import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  dolarApiBaseUrl: process.env.DOLAR_API_BASE_URL || "https://dolarapi.com",
  argentinaDatosBaseUrl:
    process.env.ARGENTINA_DATOS_BASE_URL || "https://api.argentinadatos.com",
};

