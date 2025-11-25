# Ejemplos de llamadas a la API

Base URL: `https://cotizaciones-api-connectors.onrender.com`

## 1. Health Check

```bash
curl https://cotizaciones-api-connectors.onrender.com/api/health
```

## 2. Cotizaciones Actuales (Todas)

```bash
curl https://cotizaciones-api-connectors.onrender.com/api/quotes/current
```

## 3. Cotizaciones Actuales (Filtradas por tipo)

```bash
# Dólar Blue
curl "https://cotizaciones-api-connectors.onrender.com/api/quotes/current?casa=blue"

# Dólar Oficial
curl "https://cotizaciones-api-connectors.onrender.com/api/quotes/current?casa=oficial"

# Dólar Bolsa (MEP)
curl "https://cotizaciones-api-connectors.onrender.com/api/quotes/current?casa=bolsa"

# Dólar CCL
curl "https://cotizaciones-api-connectors.onrender.com/api/quotes/current?casa=contadoconliqui"
```

## 4. Cotizaciones Históricas

```bash
# Histórico completo del dólar blue
curl "https://cotizaciones-api-connectors.onrender.com/api/quotes/historical?casa=blue"

# Histórico del dólar blue con rango de fechas
curl "https://cotizaciones-api-connectors.onrender.com/api/quotes/historical?casa=blue&startDate=2024-01-01&endDate=2024-01-31"

# Histórico del dólar oficial
curl "https://cotizaciones-api-connectors.onrender.com/api/quotes/historical?casa=oficial&startDate=2024-01-01&endDate=2024-01-31"
```

## 5. Brechas Actuales

```bash
# Brecha del dólar blue vs oficial
curl "https://cotizaciones-api-connectors.onrender.com/api/brechas/current?baseCasa=oficial&against=blue"

# Brecha del dólar oficial vs múltiples tipos
curl "https://cotizaciones-api-connectors.onrender.com/api/brechas/current?baseCasa=oficial&against=blue,bolsa,contadoconliqui"

# Brecha del dólar blue vs bolsa y CCL
curl "https://cotizaciones-api-connectors.onrender.com/api/brechas/current?baseCasa=blue&against=bolsa,contadoconliqui"
```

## 6. Brechas Históricas

```bash
# Brecha histórica oficial vs blue
curl "https://cotizaciones-api-connectors.onrender.com/api/brechas/historical?baseCasa=oficial&againstCasa=blue"

# Brecha histórica oficial vs blue con rango de fechas
curl "https://cotizaciones-api-connectors.onrender.com/api/brechas/historical?baseCasa=oficial&againstCasa=blue&startDate=2024-01-01&endDate=2024-01-31"

# Brecha histórica blue vs bolsa
curl "https://cotizaciones-api-connectors.onrender.com/api/brechas/historical?baseCasa=blue&againstCasa=bolsa&startDate=2024-01-01&endDate=2024-01-31"
```

## Ejemplos con formato JSON (usando jq)

```bash
# Health check formateado
curl -s https://cotizaciones-api-connectors.onrender.com/api/health | jq .

# Cotizaciones actuales formateadas
curl -s https://cotizaciones-api-connectors.onrender.com/api/quotes/current | jq .

# Solo las primeras 3 cotizaciones
curl -s https://cotizaciones-api-connectors.onrender.com/api/quotes/current | jq '.[0:3]'
```

