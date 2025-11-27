# Arquitectura y Guías de Código

## Principios de Arquitectura

Este monorepo sigue **Clean Architecture** y principios **SOLID** en todos los packages.

### Estructura de Carpetas Estándar

Todos los packages deben seguir esta estructura:

```
package-name/
├── src/
│   ├── domain/           # Entidades y reglas de negocio
│   │   ├── models/       # Modelos de dominio
│   │   ├── repositories/ # Interfaces de repositorios
│   │   └── interfaces/   # Interfaces de dominio
│   ├── application/      # Casos de uso
│   │   └── usecases/     # Implementación de casos de uso
│   ├── infrastructure/   # Implementaciones técnicas
│   │   ├── http/         # Clientes HTTP
│   │   ├── websocket/    # Clientes WebSocket
│   │   ├── repositories/ # Implementaciones de repositorios
│   │   └── config/       # Configuración
│   ├── interfaces/       # Interfaces de entrada (opcional)
│   │   └── http/         # Controllers, routes, etc.
│   ├── bootstrap.ts      # Inicialización y DI
│   └── index.ts          # Exports públicos
├── dist/                 # Build output
├── package.json
└── tsconfig.json
```

## Imports Absolutos

### Regla General
**TODOS los imports deben ser absolutos usando paths configurados en `tsconfig.json`.**

### Configuración de Paths

Cada package debe tener en su `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@domain/*": ["domain/*"],
      "@application/*": ["application/*"],
      "@infrastructure/*": ["infrastructure/*"],
      "@interfaces/*": ["interfaces/*"]
    }
  }
}
```

**Nota importante**: Para imports entre packages, los paths deben apuntar a `dist` en `tsconfig.json` (para compilación), pero `tsconfig-paths.config.js` en la raíz del monorepo maneja el desarrollo apuntando a `src` para hot reload.

Ejemplo para `binance-stream` que importa otros packages:
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@domain/*": ["domain/*"],
      "@application/*": ["application/*"],
      "@infrastructure/*": ["infrastructure/*"],
      "@interfaces/*": ["interfaces/*"],
      "@cotizaciones/config": ["../../config/dist"],
      "@cotizaciones/logger": ["../../logger/dist"]
    }
  }
}
```

### Imports entre Packages

Para imports entre packages del monorepo, usar paths absolutos desde la raíz:

```typescript
// ✅ CORRECTO
import { config } from "@cotizaciones/config";
import { logger } from "@cotizaciones/logger";
import { GetKlinesUseCase } from "@cotizaciones/binance-stream";

// ❌ INCORRECTO
import { config } from "../../config/src/index";
import { logger } from "../../../../logger/src/index";
```

### Imports Internos del Package

```typescript
// ✅ CORRECTO
import { MiniTicker } from "@domain/models/MiniTicker";
import { GetLatestPricesUseCase } from "@application/usecases/GetLatestPricesUseCase";
import { BinanceRestClient } from "@infrastructure/http/BinanceRestClient";

// ❌ INCORRECTO
import { MiniTicker } from "../domain/models/MiniTicker";
import { GetLatestPricesUseCase } from "../../application/usecases/GetLatestPricesUseCase";
```

## Patrones de Código

### 1. Use Cases (Application Layer)

- **Siempre usar clases**
- **Inyección de dependencias por constructor**
- **Método `execute()` para la lógica principal**

```typescript
export class GetKlinesUseCase {
  constructor(
    private readonly binanceRestClient: IBinanceRestClient
  ) {}

  async execute(params: FetchKlinesParams): Promise<Kline[]> {
    return this.binanceRestClient.fetchKlines(params);
  }
}
```

### 2. Controllers (Interfaces Layer)

- **Siempre usar clases**
- **Recibir use cases por constructor**
- **Métodos async que manejan Request/Response**

```typescript
export class CryptoController {
  constructor(
    private readonly getKlinesUseCase: GetKlinesUseCase
  ) {}

  async getKlines(req: Request, res: Response): Promise<void> {
    // Validación, llamada al use case, respuesta
  }
}
```

### 3. HTTP Clients (Infrastructure Layer)

- **Siempre usar clases**
- **Implementar interfaces**
- **Usar logger para logs estructurados**

```typescript
export interface IBinanceRestClient {
  fetchKlines(params: FetchKlinesParams): Promise<Kline[]>;
}

export class BinanceRestClient implements IBinanceRestClient {
  constructor(private readonly config: BinanceConfig) {}

  async fetchKlines(params: FetchKlinesParams): Promise<Kline[]> {
    // Implementación
  }
}
```

### 4. Bootstrap (Dependency Injection)

- **Función `bootstrap*()` que retorna instancias configuradas**
- **Singleton pattern para recursos compartidos**
- **Inyección de dependencias explícita**

```typescript
export function bootstrapBinanceStream(): StreamManager {
  // Crear instancias y configurar DI
}
```

## Logging

- **Usar siempre el logger compartido `@cotizaciones/logger`**
- **Logs estructurados con eventos definidos en `LOG_EVENTS`**
- **Nunca usar `console.log` o `console.error`**

```typescript
import { logger, LOG_EVENTS } from "@cotizaciones/logger";

logger.info({
  event: LOG_EVENTS.API_REQUEST,
  msg: "Fetching klines",
  data: { symbol, interval }
});
```

## TypeScript

### Configuración Estándar

Todos los packages deben usar la misma configuración base:

- `strict: true`
- `esModuleInterop: true`
- `skipLibCheck: true`
- `noImplicitAny: true`
- `strictNullChecks: true`

### Tipos

- **Usar interfaces para contratos**
- **Usar types para uniones y alias**
- **Evitar `any`, usar `unknown` cuando sea necesario**

## Testing

- **Tests unitarios para use cases**
- **Tests de integración para clients HTTP/WebSocket**
- **Usar Jest como framework**
- **Mocks para dependencias externas**

## Naming Conventions

- **Clases**: PascalCase (`GetKlinesUseCase`)
- **Interfaces**: PascalCase con prefijo `I` opcional (`IBinanceRestClient`)
- **Funciones**: camelCase (`fetchKlines`)
- **Constantes**: UPPER_SNAKE_CASE (`LOG_EVENTS`)
- **Archivos**: camelCase para archivos de código (`binanceKlines.ts`)

## Checklist para Nuevos Packages

- [ ] Estructura de carpetas según estándar
- [ ] `tsconfig.json` con paths configurados
- [ ] Todos los imports son absolutos
- [ ] Use cases como clases con DI
- [ ] Controllers como clases
- [ ] HTTP clients implementan interfaces
- [ ] Bootstrap function para DI
- [ ] Logger estructurado
- [ ] Tests unitarios básicos

