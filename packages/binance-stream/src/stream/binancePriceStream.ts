// Bootstrap is at root level, using relative import as it's not in a standard layer
import { startBinanceStream as startBinanceStreamInternal, getLatestPrices as getLatestPricesInternal } from "../bootstrap";
import { MiniTicker } from "@domain/models/MiniTicker";

/**
 * Start the Binance price stream (WebSocket)
 * Opens a single WebSocket connection and subscribes to miniTicker for all configured symbols
 */
export function startPriceStream(): void {
  startBinanceStreamInternal();
}

/**
 * Get the latest prices for all subscribed symbols
 * @returns Record of symbol -> MiniTicker with the latest price data
 */
export function getLatestPrices(): Record<string, MiniTicker> {
  return getLatestPricesInternal() as Record<string, MiniTicker>;
}

