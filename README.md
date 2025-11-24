# Cotizaciones API Connectors

Backend API para cotizaciones del dólar en Argentina. Obtiene datos en tiempo real desde APIs públicas y calcula brechas entre distintos tipos de dólar.

## Stack Tecnológico

- Node.js 20+
- TypeScript
- Express
- Clean Architecture (simplificada)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000` (o el puerto configurado en `PORT`).

## Build

```bash
npm run build
```

Esto genera los archivos JavaScript en la carpeta `dist/`.

## Producción

```bash
npm start
```

Asegúrate de haber ejecutado `npm run build` primero.

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (puedes copiar `.env.example`):

```env
PORT=3000
DOLAR_API_BASE_URL=https://dolarapi.com
ARGENTINA_DATOS_BASE_URL=https://api.argentinadatos.com
```

## Endpoints

### Health Check

```
GET /api/health
```

### Cotizaciones Actuales

```
GET /api/quotes/current
GET /api/quotes/current?casa=blue
```

### Cotizaciones Históricas

```
GET /api/quotes/historical?casa=blue
GET /api/quotes/historical?casa=blue&from=2024-01-01&to=2024-01-31
```

### Brechas Actuales

```
GET /api/brechas/current?baseCasa=oficial&against=blue,bolsa,contadoconliqui
```

### Brechas Históricas

```
GET /api/brechas/historical?baseCasa=oficial&againstCasa=blue
GET /api/brechas/historical?baseCasa=oficial&againstCasa=blue&from=2024-01-01&to=2024-01-31
```

## Tipos de Dólar Soportados

- `oficial`
- `blue`
- `bolsa` (MEP)
- `contadoconliqui` (CCL)
- `cripto`
- `mayorista`
- `solidario`
- `turista`

## Docker

### Build

```bash
docker build -t cotizaciones-api .
```

### Run

```bash
docker run -p 3000:3000 cotizaciones-api
```

## Estructura del Proyecto

```
src/
├── domain/
│   └── models/          # Modelos de dominio
├── application/
│   └── usecases/        # Casos de uso
├── infrastructure/
│   ├── http/            # Clients HTTP para APIs externas
│   └── config/          # Configuración
└── interfaces/
    └── http/            # Controllers, routes, server Express
```
