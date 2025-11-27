"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapCotizacionesRoutes = bootstrapCotizacionesRoutes;
const DolarApiClient_1 = require("./infrastructure/http/DolarApiClient");
const ArgentinaDatosClient_1 = require("./infrastructure/http/ArgentinaDatosClient");
const GetCurrentQuotesUseCase_1 = require("./application/usecases/GetCurrentQuotesUseCase");
const GetHistoricalQuotesUseCase_1 = require("./application/usecases/GetHistoricalQuotesUseCase");
const GetCurrentBrechasUseCase_1 = require("./application/usecases/GetCurrentBrechasUseCase");
const GetHistoricalBrechasUseCase_1 = require("./application/usecases/GetHistoricalBrechasUseCase");
const QuotesController_1 = require("./interfaces/http/controllers/QuotesController");
const BrechasController_1 = require("./interfaces/http/controllers/BrechasController");
const routes_1 = require("./interfaces/http/routes");
function bootstrapCotizacionesRoutes() {
    const dolarApiClient = new DolarApiClient_1.DolarApiClient();
    const argentinaDatosClient = new ArgentinaDatosClient_1.ArgentinaDatosClient();
    const getCurrentQuotesUseCase = new GetCurrentQuotesUseCase_1.GetCurrentQuotesUseCase(dolarApiClient);
    const getHistoricalQuotesUseCase = new GetHistoricalQuotesUseCase_1.GetHistoricalQuotesUseCase(argentinaDatosClient);
    const getCurrentBrechasUseCase = new GetCurrentBrechasUseCase_1.GetCurrentBrechasUseCase(getCurrentQuotesUseCase);
    const getHistoricalBrechasUseCase = new GetHistoricalBrechasUseCase_1.GetHistoricalBrechasUseCase(argentinaDatosClient);
    const quotesController = new QuotesController_1.QuotesController(getCurrentQuotesUseCase, getHistoricalQuotesUseCase);
    const brechasController = new BrechasController_1.BrechasController(getCurrentBrechasUseCase, getHistoricalBrechasUseCase);
    return (0, routes_1.createRoutes)(quotesController, brechasController);
}
//# sourceMappingURL=bootstrap.js.map