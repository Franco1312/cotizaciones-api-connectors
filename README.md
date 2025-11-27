# Cotizaciones API Connectors - Monorepo

Monorepo para servicios de cotizaciones y APIs relacionadas.

## Estructura del Proyecto

```
.
├── packages/
│   ├── cotizaciones-api/    # API de cotizaciones del dólar
│   ├── config/               # Configuración común del monorepo
│   └── binance-stream/       # WebSocket stream de Binance para precios de crypto
├── src/                      # Servidor HTTP principal
├── package.json              # Configuración root con workspaces
└── tsconfig.json            # Configuración base de TypeScript
```

## Instalación

```bash
npm install
```

Esto instalará todas las dependencias de todos los packages del monorepo.

## Scripts Disponibles

### Servidor Compartido (Root)

El servidor se levanta desde la raíz y registra las rutas de todos los packages:

```bash
# Desarrollo (con hot reload)
npm run dev
# O específicamente para crypto API:
npm run dev:crypto-api

# Build (compila todos los packages + servidor root)
npm run build

# Producción
npm start

# Tests
npm test
```

### Scripts Individuales

```bash
# Limpiar node_modules y dist de todos los packages
npm run clean
```

## Agregar un Nuevo Package

1. Crear carpeta en `packages/nuevo-servicio/`
2. Crear `package.json` con el nombre del servicio
3. Ejecutar `npm install` desde la raíz para que se detecte el workspace
4. Agregar scripts en el `package.json` root si es necesario

Ejemplo de estructura para un nuevo package:

```
packages/nuevo-servicio/
├── src/
├── package.json
└── tsconfig.json
```

## API Endpoints

### Cotizaciones del Dólar
- Endpoints del package `cotizaciones-api` (ver documentación del package)

### Precios de Criptomonedas
- `GET /api/crypto/prices` - Devuelve los últimos precios de todas las criptomonedas suscritas

Ejemplo de respuesta:
```json
{
  "BTCUSDT": {
    "symbol": "BTCUSDT",
    "lastPrice": "42000.00",
    "openPrice": "41000.00",
    "highPrice": "43000.00",
    "lowPrice": "40000.00",
    "volume": "12345.67",
    "quoteVolume": "123456789.00",
    "eventTime": 1672515782136
  },
  "ETHUSDT": { ... }
}
```

## Configuración

Variables de entorno (crear archivo `.env` en la raíz):

```env
# HTTP Server Port
HTTP_PORT=3000

# Binance WebSocket URL (opcional, default: wss://stream.binance.com:9443/ws)
BINANCE_WS_URL=wss://stream.binance.com:9443/ws

# Crypto pairs a suscribir (separados por coma, minúsculas)
# Default: 20 pares más populares
CRYPTO_PAIRS=btcusdt,ethusdt,bnbusdt,solusdt,adausdt,xrpusdt,dogeusdt,dotusdt,maticusdt,avaxusdt,linkusdt,ltcusdt,uniusdt,atomusdt,etcusdt,xlmusdt,nearusdt,algousdt,vetusdt,icpusdt
```

## Workspaces

Este monorepo usa [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) para gestionar múltiples packages en un solo repositorio.

Los packages se definen en `packages/*` y se gestionan automáticamente por npm.

### Packages

- **config**: Configuración común (variables de entorno, defaults)
- **binance-stream**: Cliente WebSocket para Binance con cache en memoria
- **cotizaciones-api**: API de cotizaciones del dólar en Argentina
