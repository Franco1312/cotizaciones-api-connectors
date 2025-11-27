"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotesController = void 0;
class QuotesController {
    getCurrentQuotesUseCase;
    getHistoricalQuotesUseCase;
    constructor(getCurrentQuotesUseCase, getHistoricalQuotesUseCase) {
        this.getCurrentQuotesUseCase = getCurrentQuotesUseCase;
        this.getHistoricalQuotesUseCase = getHistoricalQuotesUseCase;
    }
    async getCurrent(req, res) {
        try {
            const casa = req.query.casa;
            const quotes = await this.getCurrentQuotesUseCase.execute(casa);
            res.json(quotes);
        }
        catch (error) {
            console.error("Error in getCurrent:", error);
            res.status(503).json({
                error: "Service unavailable",
                message: "Failed to fetch current quotes",
            });
        }
    }
    async getHistorical(req, res) {
        try {
            const casa = req.query.casa;
            if (!casa) {
                res.status(400).json({
                    error: "Bad request",
                    message: "Query parameter 'casa' is required",
                });
                return;
            }
            const startDateStr = req.query.startDate;
            const endDateStr = req.query.endDate;
            let startDate;
            let endDate;
            if (startDateStr) {
                startDate = new Date(startDateStr);
                if (isNaN(startDate.getTime())) {
                    res.status(400).json({
                        error: "Bad request",
                        message: "Invalid date format for 'startDate' parameter (expected ISO format YYYY-MM-DD)",
                    });
                    return;
                }
                startDate.setHours(0, 0, 0, 0);
            }
            if (endDateStr) {
                endDate = new Date(endDateStr);
                if (isNaN(endDate.getTime())) {
                    res.status(400).json({
                        error: "Bad request",
                        message: "Invalid date format for 'endDate' parameter (expected ISO format YYYY-MM-DD)",
                    });
                    return;
                }
                endDate.setHours(23, 59, 59, 999);
            }
            const quotes = await this.getHistoricalQuotesUseCase.execute(casa, startDate, endDate);
            res.json(quotes);
        }
        catch (error) {
            console.error("Error in getHistorical:", error);
            res.status(503).json({
                error: "Service unavailable",
                message: "Failed to fetch historical quotes",
            });
        }
    }
}
exports.QuotesController = QuotesController;
//# sourceMappingURL=QuotesController.js.map