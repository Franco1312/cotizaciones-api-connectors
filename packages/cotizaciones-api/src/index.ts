// Este archivo ahora solo exporta las rutas
// El servidor se levanta desde la raíz del monorepo
export { createRoutes, QuotesController, BrechasController } from "./interfaces/http";
export { bootstrapCotizacionesRoutes } from "./bootstrap";
