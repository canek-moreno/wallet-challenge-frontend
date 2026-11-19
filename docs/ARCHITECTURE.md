# Arquitectura Frontend - Wallet

Este documento define la arquitectura de la aplicación frontend de la wallet, las herramientas elegidas y la justificación de cada una.

## 1. Resumen

| Capa | Herramienta |
| --- | --- |
| Framework | Next.js (App Router) |
| Lenguaje | TypeScript (modo estricto) |
| Estilos | Tailwind CSS (mobile-first) |
| Arquitectura | Clean Architecture por feature |
| Estado global de UI | Redux Toolkit (store y un slice mínimo) |
| Datos de servidor | RTK Query (lecturas y comandos) |
| Inyección de dependencias | Módulo composition root (`container.ts`) |
| Formularios | React Hook Form + Zod |
| Testing | Vitest, Testing Library, Playwright |

## 2. Principios

1. **El dominio no depende de nada externo.** Las reglas financieras son TypeScript puro, sin React, Next.js, Redux ni `fetch`.
2. **Dependencias hacia adentro.** `presentation` → `application` → `domain`. `infrastructure` implementa los puertos definidos en `domain`.
3. **Un solo mecanismo por necesidad.** Cada tipo de estado tiene una herramienta. No se mezclan dos formas de resolver lo mismo.
4. **El servidor es la fuente de verdad.** El saldo y el historial no se calculan ni se persisten en el cliente.
5. **Renderizado mixto.** Server Components por defecto. Client Components solo donde hay interacción.
6. **Responsive sin árboles separados.** Un solo conjunto de componentes con clases Tailwind mobile-first (375px y 1440px). Solo la navegación cambia por viewport.
7. **Ejecutable sin backend.** La aplicación incluye una API simulada con Route Handlers que implementa el contrato HTTP final. Los adaptadores de `infrastructure` la consumen igual que consumirían el backend real.

## 3. Estructura de carpetas

```text
wallet-challenge-frontend/
├── app/                                      # Rutas Next.js (App Router): solo componen
│   ├── layout.tsx                            # Providers, tema, fuente Inter
│   ├── (auth)/login/page.tsx                 # Pantalla de autenticación
│   ├── (main)/
│   │   ├── layout.tsx                        # Header + BottomNav (móvil) / SideNav (escritorio)
│   │   ├── page.tsx                          # Dashboard
│   │   ├── products/[id]/page.tsx            # Detalle de producto
│   │   ├── transactions/page.tsx             # Historial con filtros
│   │   ├── contacts/page.tsx                 # Directorio de contactos
│   │   ├── transfer/
│   │   │   ├── page.tsx                      # Paso 1: destino (cuentas propias / contactos)
│   │   │   ├── contact/page.tsx              # Paso 2: selección o nuevo contacto
│   │   │   ├── amount/page.tsx               # Paso 3: monto y concepto
│   │   │   ├── review/page.tsx               # Paso 4: resumen y confirmación
│   │   │   └── success/page.tsx              # Comprobante
│   │   ├── statements/page.tsx               # Estado de cuenta
│   │   ├── receive/page.tsx                  # QR de recepción
│   │   └── bill-payments/page.tsx            # Pago de servicios
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── domain/
│   │   │   │   ├── entities/Session.ts
│   │   │   │   ├── errors/AuthError.ts
│   │   │   │   └── ports/AuthRepository.ts
│   │   │   ├── application/
│   │   │   │   ├── Login.ts
│   │   │   │   ├── LoginWithPasskey.ts
│   │   │   │   └── RequestPasswordReset.ts
│   │   │   ├── infrastructure/
│   │   │   │   ├── http/HttpAuthRepository.ts
│   │   │   │   └── passkey/WebAuthnAdapter.ts
│   │   │   ├── presentation/
│   │   │   │   ├── components/
│   │   │   │   │   ├── LoginCard.tsx
│   │   │   │   │   ├── PasswordField.tsx     # Mostrar/ocultar contraseña
│   │   │   │   │   └── PasskeyButton.tsx
│   │   │   │   └── api/authApi.ts
│   │   │   └── index.ts
│   │   ├── accounts/                         # Patrimonio y productos (débito, crédito, bóveda)
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── Account.ts
│   │   │   │   │   ├── Card.ts               # Tipo, número enmascarado, expiración, red
│   │   │   │   │   └── NetWorth.ts           # Suma de productos
│   │   │   │   ├── rules/cardMasking.ts
│   │   │   │   ├── errors/AccountError.ts
│   │   │   │   └── ports/AccountRepository.ts
│   │   │   ├── application/
│   │   │   │   ├── GetNetWorth.ts
│   │   │   │   ├── ListProducts.ts
│   │   │   │   └── ToggleCardFreeze.ts
│   │   │   ├── infrastructure/
│   │   │   │   ├── http/HttpAccountRepository.ts
│   │   │   │   ├── dto/
│   │   │   │   └── mappers/accountMapper.ts
│   │   │   ├── presentation/
│   │   │   │   ├── components/
│   │   │   │   │   ├── NetWorthWidget.tsx    # Con modo ocultar saldos
│   │   │   │   │   ├── CardCarousel.tsx      # Carrusel / pila de tarjetas
│   │   │   │   │   ├── CardVisual.tsx        # Tarjeta con red Visa / Mastercard
│   │   │   │   │   └── ProductQuickActions.tsx  # Estado, transferir, recibir, pagar, apagar
│   │   │   │   ├── hooks/useBalanceVisibility.ts
│   │   │   │   └── api/accountsApi.ts
│   │   │   └── index.ts
│   │   ├── transactions/
│   │   │   ├── domain/
│   │   │   │   ├── entities/Transaction.ts   # Ingreso / egreso, comercio, categoría
│   │   │   │   ├── rules/groupByDate.ts
│   │   │   │   └── ports/TransactionRepository.ts
│   │   │   ├── application/ListTransactions.ts
│   │   │   ├── infrastructure/http/HttpTransactionRepository.ts
│   │   │   ├── presentation/
│   │   │   │   ├── components/
│   │   │   │   │   ├── TransactionList.tsx   # Agrupada por fecha
│   │   │   │   │   ├── TransactionRow.tsx    # Logo, categoría, monto con color
│   │   │   │   │   └── FilterTabs.tsx        # Todos / Ingresos / Egresos
│   │   │   │   └── api/transactionsApi.ts
│   │   │   └── index.ts
│   │   ├── contacts/
│   │   │   ├── domain/
│   │   │   │   ├── entities/Contact.ts       # Nombre, banco, CLABE / IBAN, alias
│   │   │   │   ├── rules/validateContact.ts
│   │   │   │   ├── errors/ContactError.ts
│   │   │   │   └── ports/ContactRepository.ts
│   │   │   ├── application/
│   │   │   │   ├── ListContacts.ts
│   │   │   │   ├── SearchContacts.ts
│   │   │   │   └── CreateContact.ts
│   │   │   ├── infrastructure/http/HttpContactRepository.ts
│   │   │   ├── presentation/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ContactSearch.tsx     # Filtro instantáneo
│   │   │   │   │   ├── FavoritesCarousel.tsx # Favoritos y recientes
│   │   │   │   │   ├── ContactList.tsx       # Alfabética, con "Enviar"
│   │   │   │   │   ├── ContactForm.tsx       # RHF + Zod
│   │   │   │   │   └── NewContactCta.tsx
│   │   │   │   ├── schemas/contactSchema.ts  # Zod: forma del formulario
│   │   │   │   └── api/contactsApi.ts
│   │   │   └── index.ts
│   │   ├── transfers/
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── Transfer.ts
│   │   │   │   │   └── Money.ts
│   │   │   │   ├── rules/
│   │   │   │   │   ├── validateTransfer.ts   # Saldo, límites, monto > 0
│   │   │   │   │   └── calculateFee.ts       # Comisión ($0.00 por ahora)
│   │   │   │   ├── errors/TransferError.ts   # InsufficientFunds, Timeout, Network, Unknown
│   │   │   │   └── ports/TransferRepository.ts
│   │   │   ├── application/
│   │   │   │   ├── SendMoney.ts              # Incluye clave de idempotencia
│   │   │   │   └── GetTransferReceipt.ts
│   │   │   ├── infrastructure/
│   │   │   │   ├── http/HttpTransferRepository.ts
│   │   │   │   └── dto/
│   │   │   ├── presentation/
│   │   │   │   ├── components/
│   │   │   │   │   ├── DestinationSegmented.tsx  # Cuentas propias / contactos
│   │   │   │   │   ├── ContactSheet.tsx          # Sheet de selección
│   │   │   │   │   ├── AmountKeypad.tsx          # Teclado numérico
│   │   │   │   │   ├── AvailableBalance.tsx
│   │   │   │   │   ├── ReviewDrawer.tsx          # Resumen y slide to confirm
│   │   │   │   │   └── Receipt.tsx               # Comprobante, compartir, descargar
│   │   │   │   ├── hooks/useTransferFlow.ts      # Estado del flujo (RHF)
│   │   │   │   ├── schemas/transferSchema.ts     # Zod
│   │   │   │   └── api/transfersApi.ts           # Mutation de RTK Query
│   │   │   └── index.ts
│   │   ├── statements/                       # Estado de cuenta (misma estructura)
│   │   ├── receive/                          # QR de recepción
│   │   ├── bill-payments/                    # Pago de servicios
│   │   └── notifications/                    # Campana y badge
│   ├── store/
│   │   ├── index.ts                          # configureStore, RootState, AppDispatch
│   │   ├── hooks.ts                          # useAppSelector, useAppDispatch tipados
│   │   ├── baseApi.ts                        # createApi base y tags
│   │   └── uiSlice.ts                        # hideBalances, selectedCardId, modales
│   ├── container.ts                          # Composition root
│   ├── presentation/
│   │   ├── components/
│   │   │   ├── ui/                           # Button, Input, Badge, Card, Sheet, Modal
│   │   │   ├── layout/
│   │   │   │   ├── AppHeader.tsx             # Saludo, campana, avatar, ocultar saldos
│   │   │   │   ├── BottomNav.tsx             # Móvil 375px
│   │   │   │   └── SideNav.tsx               # Escritorio 1440px
│   │   │   └── status/                       # Feedback y edge cases
│   │   │       ├── NetworkErrorView.tsx      # Sin internet, Reintentar
│   │   │       ├── InsufficientFundsView.tsx # Alerta, recargar o ajustar monto
│   │   │       ├── TimeoutView.tsx           # Revisar movimientos antes de reintentar
│   │   │       ├── GenericErrorView.tsx      # Código de referencia, soporte
│   │   │       └── SuccessView.tsx           # Checkmark, comprobante
│   │   ├── providers/StoreProvider.tsx
│   │   └── theme/
│   │       ├── tokens.ts                     # Colores, radios, sombras
│   │       └── fonts.ts                      # Inter / Plus Jakarta Sans
│   ├── shared/
│   │   ├── domain/
│   │   │   ├── Result.ts
│   │   │   └── Money.ts                      # Solo si se usa en más de una feature
│   │   ├── infrastructure/
│   │   │   ├── http/httpClient.ts
│   │   │   ├── http/ApiError.ts
│   │   │   └── config/env.ts
│   │   ├── lib/
│   │   │   ├── formatCurrency.ts
│   │   │   ├── formatDate.ts
│   │   │   ├── maskCard.ts
│   │   │   └── cn.ts
│   │   └── types/
│   └── styles/globals.css                    # Tailwind base y variables
├── public/
│   ├── logos/                                # Comercios, bancos, Visa, Mastercard
│   └── icons/
├── tests/
│   ├── setup/                                # Config de Vitest, matchers, render con providers
│   │   ├── vitest.setup.ts
│   │   └── renderWithProviders.tsx           # Store Redux y tema para componentes
│   ├── integration/                          # Adaptadores HTTP contra Route Handlers
│   └── e2e/                                  # Playwright: login, transferir, errores
├── docs/ARCHITECTURE.md
├── eslint.config.mjs                         # Regla: domain no importa otras capas
├── tailwind.config.ts                        # Breakpoints 375 / 1440, tokens
├── tsconfig.json                             # Alias @/* -> ./src/*
└── package.json
```

### 3.1 Mapa de rutas

| Ruta | Archivo | Render | Feature principal |
| --- | --- | --- | --- |
| `/login` | `app/(auth)/login/page.tsx` | SSG | `auth` |
| `/` | `app/(main)/page.tsx` | SSR | `accounts`, `transactions` |
| `/products` | `app/(main)/products/page.tsx` | CSR | `accounts` |
| `/products/[id]` | `app/(main)/products/[id]/page.tsx` | SSR + CSR | `accounts` |
| `/transactions` | `app/(main)/transactions/page.tsx` | SSR + CSR | `transactions` |
| `/contacts` | `app/(main)/contacts/page.tsx` | SSR + CSR | `contacts` |
| `/transfer` | `app/(main)/transfer/page.tsx` | CSR | `transfers`, `contacts` |
| `/transfer/contact` | `app/(main)/transfer/contact/page.tsx` | CSR | `transfers`, `contacts` |
| `/transfer/amount` | `app/(main)/transfer/amount/page.tsx` | CSR | `transfers` |
| `/transfer/review` | `app/(main)/transfer/review/page.tsx` | CSR | `transfers` |
| `/transfer/success` | `app/(main)/transfer/success/page.tsx` | CSR | `transfers` |
| `/statements` | `app/(main)/statements/page.tsx` | SSR | `statements` |
| `/receive` | `app/(main)/receive/page.tsx` | CSR | `receive` |
| `/bill-payments` | `app/(main)/bill-payments/page.tsx` | CSR | `bill-payments` |
| `/help` | `app/(main)/help/page.tsx` | SSG | `help` |

`/statements`, `/receive` y `/bill-payments` muestran una pantalla "Este módulo estará disponible muy pronto" (`presentation/components/status/ComingSoonView.tsx`) hasta que tengan diseño y endpoint.

Los route groups `(auth)` y `(main)` no aparecen en la URL. Sirven para aplicar layouts distintos: `(auth)` no muestra navegación, `(main)` muestra header y navegación.

### 3.2 Sistema de rutas

Se usa **App Router** de Next.js (directorio `app/`).

- **No se usa Pages Router** (`pages/`). Es el sistema anterior, sin Server Components, y está en modo de mantenimiento para proyectos nuevos.
- **No se usa React Router.** Tiene conflicto con el router de Next.js.
- La carpeta `src/pages/` de la propuesta FSD no aplica aquí. Las pantallas viven en `features/*/presentation/` y las rutas de `app/` solo las importan.

### 3.3 API simulada (backend mock)

Mientras no exista el backend real, la aplicación incluye su propia API simulada con **Route Handlers** de Next.js. Los adaptadores HTTP de `infrastructure` llaman a estas rutas con el mismo contrato que usarían contra el backend final.

El contrato HTTP es la fuente de verdad y vive en `contracts/openapi.yaml`. Los endpoints marcados con `x-status: planned` aún no están implementados en el mock.

```text
wallet-challenge-frontend/
├── app/api/                                  # Route Handlers: contrato HTTP simulado
│   ├── auth/
│   │   ├── login/route.ts                    # POST: crea sesión (cookie httpOnly)
│   │   ├── passkey/route.ts                  # POST: login con passkey simulado
│   │   ├── password-reset/route.ts           # POST
│   │   └── logout/route.ts                   # POST
│   ├── accounts/
│   │   ├── route.ts                          # GET: productos y patrimonio
│   │   └── [id]/freeze/route.ts              # PATCH: apagar / encender producto
│   ├── transactions/route.ts                 # GET: historial con filtros
│   ├── contacts/route.ts                     # GET (búsqueda), POST (crear)
│   ├── transfers/
│   │   ├── route.ts                          # POST: enviar dinero (idempotente)
│   │   └── [id]/route.ts                     # GET: comprobante
│   ├── statements/route.ts                   # GET
│   └── bill-payments/route.ts                # POST
├── proxy.ts                                  # Protege (main) y redirige a /login (Next.js 16)
└── src/mock-api/                             # Lógica del backend simulado (fuera de app/)
    ├── seed/                                 # Datos iniciales deterministas
    │   ├── users.ts
    │   ├── accounts.ts
    │   ├── transactions.ts
    │   └── contacts.ts
    ├── store/
    │   └── memoryStore.ts                    # Estado en memoria del proceso
    ├── services/                             # Reglas simuladas por recurso
    │   ├── authService.ts
    │   ├── accountsService.ts
    │   ├── transactionsService.ts
    │   ├── contactsService.ts
    │   └── transfersService.ts
    ├── scenarios/scenarios.ts                # Errores y latencias controlados
    ├── idempotency.ts                        # Respuesta por Idempotency-Key
    └── http.ts                               # Helpers de respuesta y errores
```

**Escenarios de error simulados.** Cada confirmación elige al azar uno de los cinco resultados, y cada uno se muestra con la vista de `presentation/components/status/`:

| Escenario | Respuesta simulada | Vista esperada |
| --- | --- | --- |
| Éxito | 200 con id de transacción y movimiento agregado | `SuccessView` (comprobante) |
| Error de red | 503 con código `NETWORK` | `NetworkErrorView` (reintentar) |
| Fondos insuficientes | 422 con `INSUFFICIENT_FUNDS` | `InsufficientFundsView` |
| Timeout | Respuesta tras 30 s; el cliente aborta a los 15 s | `TimeoutView` |
| Error desconocido | 500 con código de referencia | `GenericErrorView` |

Un monto igual o mayor a 100,000 siempre responde fondos insuficientes. Para fijar un escenario en pruebas, envía el header `X-Mock-Scenario` con uno de los cinco nombres (`success`, `network`, `insufficient`, `timeout`, `generic`).

**Reglas de la API simulada:**

- Los Route Handlers solo validan la entrada y delegan en `src/mock-api/services`. No contienen lógica de negocio.
- Los schemas Zod de `infrastructure/dto` se usan tanto en el adaptador como en la ruta. Hay un solo contrato.
- Las rutas devuelven 404 si `ENABLE_MOCK_API` no está en `true`. La autenticación simulada no debe llegar a producción.
- Cambiar al backend real es cambiar `API_BASE_URL`. Componentes, casos de uso y dominio no cambian.
- Los Server Components usan la URL absoluta de `API_BASE_URL` (en desarrollo, `http://localhost:3000/api`).
- El estado de `memoryStore` se reinicia al reiniciar el servidor. Es suficiente para desarrollo y demostración, no para múltiples instancias.

### 3.4 Mapeo de pantallas a rutas, features y endpoints

Fuente de pantallas: archivo de Figma `wallet-challenge` (nodo 3311:7). Desktop: 01–09. Móvil: 01–13.

Estado de los endpoints: **implementado** (en el mock y en `contracts/openapi.yaml`), **planeado** (en el contrato con `x-status: planned`) o **sin endpoint** (sin contrato todavía).

| Pantalla Figma (desktop / móvil) | Ruta | Feature | Endpoints | Estado |
| --- | --- | --- | --- | --- |
| 01 Acceso / 01 Acceso móvil | `/login` | `auth` | `POST /auth/login` | implementado |
| | | | `POST /auth/passkey` (acceso con passkey) | planeado |
| | | | `POST /auth/password-reset` (olvidé mi contraseña) | planeado |
| 02 Inicio / 02 Inicio móvil | `/` | `accounts`, `transactions` | `GET /accounts` (patrimonio y tarjetas) | implementado |
| | | | `GET /transactions?limit=3` (recientes) | implementado |
| | | | `GET /notifications/summary` (badge de campana) | planeado |
| 03 Producto / 03 Producto móvil | `/products/[id]` | `accounts`, `transactions` | `GET /accounts` (selección del producto) | implementado |
| | | | `PATCH /accounts/{accountId}/freeze` (apagar producto) | implementado |
| | | | `GET /transactions?accountId=&filter=` (historial del producto) | implementado |
| 04 Contactos / 04 Contactos móvil | `/contacts` | `contacts` | `GET /contacts?q=` (búsqueda) | implementado |
| | | | `GET /contacts?favorites=true` (carrusel de favoritos) | implementado |
| | | | `POST /contacts` (agregar nuevo contacto) | implementado |
| 05 Destino / 05 Destino móvil | `/transfer` | `transfers`, `contacts`, `accounts` | `GET /accounts` (cuentas propias) | implementado |
| | | | `GET /contacts` (a contactos) | implementado |
| 06 Importe (desktop) / 07 Importe móvil | `/transfer/amount` | `transfers`, `accounts` | Saldo disponible desde `GET /accounts` | implementado |
| 06 Nuevo contacto móvil | `/transfer/contact` (sheet) | `contacts` | `POST /contacts` | implementado |
| 07 Revisión / 08 Revisión móvil | `/transfer/review` | `transfers` | `POST /transfers` (con `Idempotency-Key`) | implementado |
| 08 Comprobante / 09 Comprobante móvil | `/transfer/success` | `transfers` | Respuesta de `POST /transfers`. Comprobante completo: `GET /transfers/{transferId}` | parcial (planeado) |
| 09 Estados de error (desktop) / 10 Sin conexión / 11 Fondos insuficientes / 12 Tiempo agotado / 13 Error general (móvil) | Vistas en `presentation/components/status/`, mostradas desde `/transfer/review` | `transfers` | Mapeo de `POST /transfers`: 503 `NETWORK`, 422 `INSUFFICIENT_FUNDS`, 504 `TIMEOUT`, 500 `UNKNOWN` | implementado |
| Ayuda (tarjeta en la barra lateral de 02 Inicio) | `/help` | `help` | Sin endpoints. Configuración por entorno | no requiere endpoint |
| Estado de cuenta (acción rápida) | `/statements` | `statements` | `GET /statements` | planeado; pantalla "próximamente" |
| Recibir (acción rápida) | `/receive` | `receive` | `GET /accounts/{accountId}/receive` | planeado; pantalla "próximamente" |
| Pagar servicios (acción rápida) | `/bill-payments` | `bill-payments` | `POST /bill-payments` | planeado; pantalla "próximamente" |
| Campana de notificaciones | Acción en el header | `notifications` | `GET /notifications/summary` | planeado |
| Registro de usuario ("Crear una cuenta") | Sin ruta | Sin feature | Sin endpoint | fuera de alcance |

**Pendientes del mapeo:**

- **"Mis productos" en la barra lateral:** resuelto. Apunta a `/products`, que muestra la lista completa de productos y enlaza a `/products/[id]`. El carrusel del inicio se queda en `/`.
- **"Nuevo contacto" en escritorio** no tiene frame propio en Figma. Se usa el frame móvil adaptado al ancho de escritorio.
- **Navegación móvil** no está diseñada en Figma. Hoy el header temporal solo expone "Ayuda".
- **Errores de transferencia:** se muestran dentro de `/transfer/review`, sin ruta propia. El documento no define rutas para cada error.

## 4. Reglas de dependencia

- `domain` no importa React, Redux, Next.js, `fetch` ni módulos de `infrastructure`.
- `application` solo importa de `domain`. Depende de puertos.
- `infrastructure` implementa los puertos de `domain` y usa `shared/infrastructure`.
- `presentation` llama casos de uso a través de `container.ts` o de los endpoints de RTK Query. Nunca importa `infrastructure` directamente.
- `shared` no conoce features.
- Cada feature se importa solo a través de su `index.ts`.
- Las rutas de `app/` solo importan desde `features/*/index.ts` y `presentation/`. No contienen lógica.
- `app/api/` solo valida y delega en `src/mock-api/`. Ninguna feature importa `src/mock-api/` directamente.

## 5. Flujo de datos

**Lectura (ej. historial):**
`Componente` → hook de RTK Query → endpoint en `presentation/api` → `queryFn` → caso de uso (`application`) → puerto (`domain`) → adaptador HTTP (`infrastructure`).

**Comando (ej. transferir):**
`Formulario` (RHF + Zod) → `mutation` de RTK Query → `queryFn` → caso de uso `SendMoney` → reglas de `domain` → adaptador HTTP. Al terminar, `invalidatesTags` refresca saldo e historial.

## 6. Justificación de herramientas

### Next.js (App Router)

- **Por qué:** SSR para el primer render autenticado, SSG para páginas públicas y CSR para interacción, todo en la misma aplicación.
- **Alternativas descartadas:** React Router (conflicto con Next.js) y Pages Router (modelo anterior, sin Server Components).
- **Alcance:** las rutas de `app/` solo componen. No contienen lógica.

### TypeScript (modo estricto)

- **Por qué:** los contratos entre capas (puertos, DTOs, entidades) se verifican en compilación. Es indispensable en un producto financiero.

### Tailwind CSS

- **Por qué:** estilos mobile-first con breakpoints explícitos (375px y 1440px), sin hojas CSS por componente. Encaja con componentes pequeños y reutilizables.

### Clean Architecture por feature

- **Por qué:** las reglas financieras (límites, comisiones, validaciones) quedan aisladas en `domain` y se testean sin React ni red. Cambiar el backend o la librería de estado no toca las reglas.
- **Costo:** más archivos que una estructura plana. Se justifica porque el objetivo es escalar y tener varios equipos.
- **Control de tamaño:** `domain` se mantiene pequeño. No se crea un caso de uso por cada acción trivial de UI.

### Redux Toolkit (store y slice mínimo)

- **Por qué:** store predecible, devtools y middleware. Se usa solo para estado de UI global (ocultar saldos, tarjeta seleccionada, modales, sesión).
- **Límite:** no guarda datos de servidor. Eso lo gestiona RTK Query.

### RTK Query

- **Por qué:** resuelve caché, deduplicación, estados de carga y error, e invalidación por tags, tanto en lecturas como en comandos. Evita escribir esa lógica a mano.
- **Integración con la arquitectura:** `queryFn` llama a los casos de uso. El endpoint es el adaptador de entrada; la lógica sigue en `application`.
- **Decisión:** `createAsyncThunk` se descartó. Tener thunks y RTK Query para lo mismo duplica patrones.

### Redux slice mínimo

- **Por qué:** para estado que no es de servidor y debe ser global.
- **Criterio:** si el estado puede ser local a un componente o a la URL, no va en Redux.

### Módulo `container.ts` (en lugar de React Context)

- **Por qué:** exporta las instancias de repositorios y casos de uso. Funciona igual en servidor y en cliente, no añade providers ni re-renders.
- **Cuándo cambiar:** si se necesitan instancias distintas por sesión o por prueba, se revisa esta decisión.

### React Hook Form + Zod

- **Por qué:** RHF minimiza re-renders en formularios. Zod define el esquema una vez y valida en el cliente; el mismo esquema puede reutilizarse en la capa de entrada del servidor.
- **Alcance:** la validación de reglas de negocio sigue en `domain`. Zod valida forma, no negocio.

### Route Handlers como API simulada (en lugar de MSW o json-server)

- **Por qué:** funcionan igual en el navegador y en el servidor (SSR), así que la misma URL sirve a Server Components y a Client Components. Viven en el mismo proyecto, sin procesos adicionales.
- **Alternativas descartadas:** MSW intercepta peticiones en el navegador y requiere configuración extra para SSR. json-server es un proceso externo que hay que levantar aparte.
- **Costo:** la lógica simulada vive en el mismo repositorio. Se mitiga con el flag `ENABLE_MOCK_API` y con la separación en `src/mock-api/`.

### Testing

- **Vitest:** runner para todas las pruebas unitarias. Rápido, con soporte nativo de TypeScript.
- **Testing Library:** componentes y hooks, desde el comportamiento visible para el usuario.
- **Playwright:** flujos críticos de punta a punta (login, transferir, vistas de error).

**Ubicación de las pruebas unitarias:** colocadas junto al código que prueban (`*.test.ts` o `*.test.tsx`). Así, al mover o eliminar un módulo, su prueba se mueve con él. `tests/` queda para integración, E2E y utilidades compartidas.

**Qué se prueba en cada capa:**

| Capa | Tipo de prueba | Ejemplos críticos |
| --- | --- | --- |
| `domain/rules` | Unitaria pura, sin mocks | `validateTransfer` (saldo, límites, monto mayor a cero), `calculateFee`, `validateContact` (CLABE e IBAN), `maskCard` |
| `domain/entities` | Unitaria pura | `Money` (precisión decimal, suma y comparación entre monedas), transiciones de `Transfer` |
| `application` | Unitaria con puertos falsos | `SendMoney` (idempotencia, manejo de `TransferError`), `ToggleCardFreeze` |
| `presentation/hooks` | Unitaria con `renderHook` y repositorio falso | `useTransferFlow` (avance y retroceso de pasos, bloqueo sin datos válidos), `useBalanceVisibility` |
| `presentation/components` críticos | Testing Library | `AmountKeypad` (entrada decimal, tope de dígitos), `SendMoneyForm` (errores de campo, deshabilitar al enviar), `ReviewDrawer` (confirmación), `PasswordField` (mostrar y ocultar), y cada vista de `status/` |
| `infrastructure` | Integración | `HttpTransferRepository` contra los Route Handlers, incluidos los escenarios de error |
| Flujos completos | E2E | Login, transferir hasta el comprobante, cada error de la tabla de escenarios |

**Criterios de aceptación:**
- Toda regla de `domain/rules` tiene pruebas para el caso válido y para cada caso inválido.
- Cada `TransferError` tiene una prueba que verifica su vista en `presentation/components/status/`.
- Los componentes críticos se prueban por comportamiento visible (roles, textos, estados), no por detalles de implementación.
- La cobertura se mide en `domain` y `application`. En `presentation` se exige cubrir los componentes críticos, no un porcentaje global.
- Las pruebas se ejecutan en CI antes de integrar a la rama principal.

## 7. Renderizado

| Pantalla | Render | Motivo |
| --- | --- | --- |
| Landing y login | SSG | Contenido público y estable |
| Shell autenticado | SSR | Protección desde el servidor y primer render completo |
| Saldo y transacciones iniciales | SSR sin caché compartida | Datos personalizados |
| Formulario de transferencia | CSR | Interacción y validación local |
| Actualización de saldo | CSR con RTK Query | Refetch e invalidación |

## 8. Reglas de seguridad y de negocio

- No cachear saldos ni transacciones en CDN o caché compartida.
- La cookie de sesión se reenvía desde el servidor a la API. Los tokens no se exponen al cliente.
- No persistir datos sensibles en `localStorage` ni en Redux Persist.
- Cada comando de transferencia envía una clave de idempotencia generada por intento.
- El saldo mostrado siempre proviene de la respuesta del servidor.
- El número de tarjeta se muestra enmascarado (por ejemplo, `**** 4321`). El número completo nunca se almacena en el cliente.
- Congelar un producto bloquea solo su uso físico. Las transferencias y pagos digitales siguen disponibles, y el front muestra el cambio de estado.

## 8.1 Marca y módulos

- La marca es **luma.**. Aparece en el título de la aplicación, en el header y en el panel de marca del login.
- El módulo **Ayuda** (`/help`) muestra la sección "Estamos para ti". El enlace al centro de ayuda y el correo de soporte se configuran con `NEXT_PUBLIC_HELP_CENTER_URL` y `NEXT_PUBLIC_SUPPORT_EMAIL`. Si no están definidos, no se muestran.
- Los módulos Estado de cuenta, Recibir y Pagar servicios redirigen a una pantalla de "próximamente" hasta contar con diseño y endpoint.
- La aplicación tiene dos usuarios de demostración dados de alta. No hay registro de usuarios en esta versión.
- En contactos solo se muestran favoritos. No hay recientes en esta versión.

## 9. Límites y decisiones abiertas

- Si el dominio crece sin reglas complejas, esta arquitectura puede simplificarse a FSD con la misma stack de estado.
- Falta definir el contrato de la API del backend para completar los puertos.
- Pendiente validar con el equipo el uso de Server Components para llamadas directas a casos de uso.
- Decisiones de implementación (fases 2 a 10):
  - El flujo de transferencia vive en Redux (`transferFlow`). No se persiste: al recargar la página se regresa a `/transfer`.
  - La cuenta origen es la de débito por defecto. Figma no define selector de origen.
  - Los errores de transferencia se muestran dentro de `/transfer/review`. "Deslizar para confirmar" se implementó como botón.
  - No existe `/transfer/contact`. Los contactos se seleccionan en `/transfer` y el alta se hace en `/contacts/new`.
  - La validación de CLABE verifica formato (18 dígitos), no el dígito verificador.
  - Los iconos de las vistas de estado son SVG propios. No se usaron los assets de Figma.
  - La campana de notificaciones está deshabilitada hasta tener endpoint.
  - Las pruebas E2E usan Chrome instalado en el sistema (`channel: "chrome"`), porque la descarga de Chromium de Playwright falló por red.
  - El mock comparte cuentas, movimientos y contactos entre los dos usuarios de demostración.
- Resuelto: los tokens de color, radio y tipografía se extrajeron de Figma y viven en `src/presentation/theme/tokens.ts`, espejados en `app/globals.css` (`@theme`). Una prueba verifica que coincidan. Los colores de texto de error (`#b42318`) y de advertencia (`#b54708`) son provisionales: no aparecen como valores en el código de Figma y hay que confirmarlos.
- Resuelto: con Next.js 16.4.6 la protección de rutas usa `proxy.ts` (`middleware.ts` está deprecado).
- Resuelto: el seed incluye dos usuarios de demostración (Mariana López y Diego Ramírez). Los productos, movimientos y contactos son compartidos por ambos en el mock.
