"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrechasController = void 0;
class BrechasController {
    getCurrentBrechasUseCase;
    getHistoricalBrechasUseCase;
    constructor(getCurrentBrechasUseCase, getHistoricalBrechasUseCase) {
        this.getCurrentBrechasUseCase = getCurrentBrechasUseCase;
        this.getHistoricalBrechasUseCase = getHistoricalBrechasUseCase;
    }
    async getCurrent(req, res) {
        try {
            const baseCasa = req.query.baseCasa;
            if (!baseCasa) {
                res.status(400).json({
                    error: "Bad request",
                    message: "Query parameter 'baseCasa' is required",
                });
                return;
            }
            const againstStr = req.query.against;
            if (!againstStr) {
                res.status(400).json({
                    error: "Bad request",
                    message: "Query parameter 'against' is required (comma-separated list)",
                });
                return;
            }
            const againstCasas = againstStr.split(",").map((c) => c.trim());
            const brechas = await this.getCurrentBrechasUseCase.execute(baseCasa, againstCasas);
            res.json(brechas);
        }
        catch (error) {
            console.error("Error in getCurrent brechas:", error);
            if (error instanceof Error && error.message.includes("No se encontró")) {
                res.status(404).json({
                    error: "Not found",
                    message: error.message,
                });
                return;
            }
            res.status(503).json({
                error: "Service unavailable",
                message: "Failed to fetch current brechas",
            });
        }
    }
    async getHistorical(req, res) {
        try {
            const baseCasa = req.query.baseCasa;
            const againstCasa = req.query.againstCasa;
            if (!baseCasa) {
                res.status(400).json({
                    error: "Bad request",
                    message: "Query parameter 'baseCasa' is required",
                });
                return;
            }
            if (!againstCasa) {
                res.status(400).json({
                    error: "Bad request",
                    message: "Query parameter 'againstCasa' is required",
                });
                return;
            }
            const fromStr = req.query.from;
            const toStr = req.query.to;
            const from = fromStr ? new Date(fromStr) : undefined;
            const to = toStr ? new Date(toStr) : undefined;
            if (fromStr && isNaN(from.getTime())) {
                res.status(400).json({
                    error: "Bad request",
                    message: "Invalid date format for 'from' parameter (expected ISO format YYYY-MM-DD)",
                });
                return;
            }
            if (toStr && isNaN(to.getTime())) {
                res.status(400).json({
                    error: "Bad request",
                    message: "Invalid date format for 'to' parameter (expected ISO format YYYY-MM-DD)",
                });
                return;
            }
            const brechas = await this.getHistoricalBrechasUseCase.execute(baseCasa, againstCasa, from, to);
            res.json(brechas);
        }
        catch (error) {
            console.error("Error in getHistorical brechas:", error);
            res.status(503).json({
                error: "Service unavailable",
                message: "Failed to fetch historical brechas",
            });
        }
    }
}
exports.BrechasController = BrechasController;
//# sourceMappingURL=BrechasController.js.map