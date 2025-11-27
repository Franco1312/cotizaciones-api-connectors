const { register } = require("tsconfig-paths");
const path = require("path");

// Register paths for root src files to use packages
register({
  baseUrl: __dirname,
  paths: {
    "@cotizaciones/config": ["packages/config/src"],
    "@cotizaciones/binance-stream": ["packages/binance-stream/src"],
    "@cotizaciones/cotizaciones-api": ["packages/cotizaciones-api/src"],
  },
});

// Register paths for binance-stream package internal imports
register({
  baseUrl: path.resolve(__dirname, "./packages/binance-stream/src"),
  paths: {
    "@domain/*": ["domain/*"],
    "@application/*": ["application/*"],
    "@infrastructure/*": ["infrastructure/*"],
    "@interfaces/*": ["interfaces/*"],
  },
});

// Register paths for cotizaciones-api package internal imports
register({
  baseUrl: path.resolve(__dirname, "./packages/cotizaciones-api/src"),
  paths: {
    "@domain/*": ["domain/*"],
    "@application/*": ["application/*"],
    "@infrastructure/*": ["infrastructure/*"],
    "@interfaces/*": ["interfaces/*"],
  },
});

