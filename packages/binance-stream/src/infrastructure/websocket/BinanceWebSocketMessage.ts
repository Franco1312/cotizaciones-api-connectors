export interface BinanceMiniTickerMessage {
  e: string; // event type
  E: number; // event time
  s: string; // symbol
  c: string; // close price
  o: string; // open price
  h: string; // high price
  l: string; // low price
  v: string; // volume
  q: string; // quote volume
}

