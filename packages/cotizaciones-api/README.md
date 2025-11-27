# Cotizaciones API

Backend API para cotizaciones del dólar en Argentina. Obtiene datos en tiempo real desde APIs públicas y calcula brechas entre distintos tipos de dólar.

## Instalación

Desde la raíz del monorepo:

```bash
npm install
```

## Desarrollo

Desde la raíz del monorepo:

```bash
npm run dev:cotizaciones
```

O desde este directorio:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Producción

```bash
npm start
```

## Variables de Entorno

Crea un archivo `.env` en este directorio:

```env
PORT=3000
DOLAR_API_BASE_URL=https://dolarapi.com
ARGENTINA_DATOS_BASE_URL=https://api.argentinadatos.com
```

## Endpoints

Ver documentación completa en el README principal del monorepo o en `API_EXAMPLES.md`.

