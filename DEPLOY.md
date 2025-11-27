# Deployment Guide for Render

## Configuración en Render

### Build Command
```bash
npm install && npm run build
```

**Nota**: 
- El build compila los packages en orden: primero `config` y `logger`, luego `binance-stream` y `cotizaciones-api`, y finalmente el servidor principal
- `tsc-alias` resuelve los paths absolutos internos de cada package
- `tsconfig-paths` está en `dependencies` para que esté disponible en producción
- Las dependencias se instalan en el root del monorepo y se comparten entre packages (workspaces)

### Start Command
```bash
npm start
```

**Nota**: El comando `npm start` ejecuta `node -r tsconfig-paths/register dist/index.js`. 
- `tsconfig-paths/register` es necesario porque los imports entre packages (`@cotizaciones/*`) se resuelven en runtime
- `tsconfig-paths` está en `dependencies` para que esté disponible en producción

### Variables de Entorno

Configura estas variables de entorno en Render:

#### Requeridas:
- `NODE_ENV`: `production`
- `PORT`: Render lo asigna automáticamente (no necesitas configurarlo)

#### Opcionales (con valores por defecto):
- `LOG_LEVEL`: `info` (opciones: debug, info, warn, error)
- `BINANCE_WS_URL`: `wss://stream.binance.com:9443/ws` (default)
- `CRYPTO_PAIRS`: Lista de pares separados por coma (default: 20 pares más populares)
- `API_BASE_URL`: URL base para Swagger (se detecta automáticamente en producción)

### Ejemplo de configuración mínima:

```
NODE_ENV=production
LOG_LEVEL=info
```

### Notas importantes:

1. **Puerto**: El servidor ya está configurado para escuchar en `0.0.0.0` y usar la variable `PORT` que Render asigna automáticamente.

2. **Build**: El comando de build compila todos los packages del monorepo y luego el servidor principal.

3. **WebSocket**: El stream de Binance se conecta automáticamente al iniciar el servidor.

4. **Logs**: En producción, los logs se generan en formato JSON (no pino-pretty).

5. **Swagger**: Disponible en `/api-docs` una vez desplegado.

