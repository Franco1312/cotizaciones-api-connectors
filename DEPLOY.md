# Deployment Guide for Render

## Configuración en Render

### Build Command
```bash
npm install && npm run build
```

**Nota**: El build compila todos los packages primero y luego el servidor principal. Los imports apuntan a `dist/` para evitar problemas de tipos.

### Start Command
```bash
npm start
```

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

