# luma. — Web Wallet (frontend)

Aplicación web de billetera digital construida con Next.js (App Router). Incluye una API simulada (Route Handlers) para poder ejecutarla sin backend.

Documentación del proyecto:

- `docs/ARCHITECTURE.md`: arquitectura, estructura de carpetas, decisiones y mapeo de pantallas.
- `contracts/openapi.yaml`: contrato HTTP entre frontend y backend.
- `docs/AI_USAGE.md`: herramientas y prompts de IA usados en el proyecto.

## Requisitos

- Node.js 22.x (versión aprobada por Spin). Probado con Node 26.
- npm 10 o superior.
- Google Chrome instalado en el sistema, solo si vas a correr las pruebas E2E.

## Instalación y ejecución

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000/login`.

Variables de entorno (`.env.local`, ignorado por git):

| Variable | Valor de ejemplo | Descripción |
| --- | --- | --- |
| `API_BASE_URL` | `http://localhost:3000/api` | URL base de la API para el servidor. El cliente siempre usa `/api`. |
| `ENABLE_MOCK_API` | `true` | Activa la API simulada en `app/api`. Sin este valor, todas las rutas `/api` responden 404. Debe estar apagada en producción. |
| `NEXT_PUBLIC_HELP_CENTER_URL` | (vacío) | Enlace al centro de ayuda. Opcional. |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | (vacío) | Correo de soporte. Opcional. |

Next.js lee las variables solo al arrancar. Si cambias `.env.local`, reinicia `npm run dev`.

Si el puerto 3000 está ocupado, Next.js usa el 3001. Ajusta la URL o detén el proceso anterior.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint, incluye reglas de límites entre capas |
| `npm run typecheck` | Verificación de tipos con TypeScript |
| `npm test` | Pruebas unitarias y de componentes (Vitest) |
| `npm run test:watch` | Pruebas en modo observación |
| `npm run test:e2e` | Pruebas end-to-end (Playwright, mobile 375×812 y desktop 1440×900) |

Para validar el contrato:

```bash
npx @redocly/cli lint contracts/openapi.yaml
```

## Usuarios de demostración

No hay registro de usuarios en esta versión. Usa cualquiera de estos dos:

| Nombre | Correo | Teléfono | Contraseña |
| --- | --- | --- | --- |
| Mariana López | `mariana.lopez@email.com` | `+52 55 1234 5678` | `demo1234` |
| Diego Ramírez | `diego.ramirez@email.com` | `+52 55 9876 5432` | `demo5678` |

El login acepta correo o teléfono con código de país, con o sin espacios. Por ejemplo, `+52 55 1234 5678` o `+525512345678`.

Estos datos son solo para pruebas y viven en `src/mock-api/seed/accounts.ts`.

## Funcionalidad disponible

- Login con correo o teléfono, y cierre de sesión.
- Inicio con patrimonio, carrusel de tarjetas y movimientos recientes.
- Mis productos y detalle de producto, con congelar uso físico de la tarjeta.
- Contactos: búsqueda, favoritos, alta con validación de CLABE o IBAN.
- Transferir: destino (cuentas propias o contactos, incluido el alta de un contacto nuevo), monto, revisión y envío.
- Resultado de la transferencia aleatorio en la API simulada: éxito, error de red, fondos insuficientes, timeout o error desconocido. Cada uno tiene su pantalla.
- Ayuda.
- Estado de cuenta, Recibir y Pagar servicios muestran la pantalla "Este módulo estará disponible muy pronto".

## Librerías principales

Dependencias de ejecución (`package.json`):

| Librería | Versión | Uso |
| --- | --- | --- |
| next | 16.4.6 | Framework (App Router, Route Handlers, proxy) |
| react / react-dom | 19.1.10 | UI |
| @reduxjs/toolkit | 2.14.0 | Store global y RTK Query (datos de servidor) |
| react-redux | 9.3.1 | Enlace de React con Redux |
| react-hook-form | 7.91.0 | Formularios |
| zod | 4.6.7 | Validación de esquemas y DTOs |
| @hookform/resolvers | 7.0.5 | Enlace entre React Hook Form y Zod |

Herramientas de desarrollo y pruebas:

| Herramienta | Versión | Uso |
| --- | --- | --- |
| typescript | 5.9.3 | Tipado estricto |
| tailwindcss / @tailwindcss/postcss | 4.3.5 | Estilos |
| eslint / eslint-config-next | 10.14.0 / 16.4.6 | Lint |
| vitest / @vitest/coverage-v8 | 5.1.0 | Pruebas unitarias |
| @testing-library/react, dom, user-event, jest-dom | 16.3.3, 10.4.2, 14.6.9, 7.0.1 | Pruebas de componentes |
| jsdom | 31.0.0 | Entorno DOM para Vitest |
| @playwright/test | 1.65.0 | Pruebas E2E |
| @vitejs/plugin-react | 6.3.0 | Transformación para Vitest |

Las versiones están fijadas con `--save-exact`. Se eligieron versiones publicadas hace más de 7 días.

## Estructura

```text
app/              Rutas de Next.js (solo componen)
app/api/          API simulada (Route Handlers)
src/features/     Módulos por dominio: auth, accounts, transactions, contacts, transfers
src/presentation/ Componentes compartidos, layout, vistas de estado y tema
src/store/        Store de Redux y RTK Query
src/mock-api/     Lógica de la API simulada: seed, servicios y escenarios
src/shared/       Utilidades e infraestructura compartida
contracts/        Contrato OpenAPI
tests/e2e/        Pruebas Playwright
```

Cada feature se divide en `domain`, `application`, `infrastructure` y `presentation`. Las reglas de dependencia se verifican con ESLint.

## Limitaciones conocidas

### Mock y datos

- La API simulada guarda el estado en memoria. Al reiniciar el servidor, los saldos, movimientos y contactos vuelven a los valores iniciales.
- Ambos usuarios de demostración comparten las mismas cuentas, movimientos y contactos.
- Una transferencia desde una cuenta congelada se procesa. Congelar solo está pensado para el uso físico, y el mock no bloquea transferencias digitales.
- El resultado de una transferencia es aleatorio. Para fijar un escenario en pruebas, envía el header `X-Mock-Scenario` (`success`, `network`, `insufficient`, `timeout`, `generic`).

### Funcionalidad pendiente

- Registro de usuarios y restablecimiento de contraseña (planeados en el contrato).
- Passkey o biometría (deshabilitado en la interfaz).
- Notificaciones: la campana está deshabilitada.
- Estado de cuenta, Recibir, Pagar servicios y comprobante descargable: solo hay pantalla de "próximamente" o no existen.
- Recientes en Contactos: se muestran en el paso de destino de la transferencia, pero el listado de la sección Contactos solo muestra favoritos.

### Flujo de transferencia

- El estado del flujo vive en Redux y no sobrevive a recargar la página. Al recargar, el usuario vuelve a `/transfer`.
- La cuenta origen es siempre la cuenta de débito. No hay selector de origen.
- "Deslizar para confirmar" está implementado como botón.
- Las vistas de error de transferencia se muestran dentro de `/transfer/review`, sin rutas propias.

### Validaciones

- La CLABE se valida por formato (18 dígitos), no por dígito verificador.
- Los teléfonos se validan como formato internacional (`+` seguido de 8 a 15 dígitos). No se verifica que el número exista.
- El banco de un contacto se elige de una lista fija.

### Diseño

- Los colores de texto de error (`#b42318`) y advertencia (`#b54708`) son provisionales. No aparecen como valores en Figma.
- Los iconos que Figma no tiene son trazos propios.
- Las pantallas se verificaron en Chrome con pruebas automatizadas, pero no hay una revisión visual completa a 375 y 1440 px.

### Pruebas

- Las pruebas E2E usan Chrome instalado en el sistema (`channel: "chrome"`). La descarga de Chromium de Playwright puede fallar sin red.
- Las pruebas E2E de móvil no se han corrido en la última iteración.

### Seguridad

- La autenticación es simulada. La cookie de sesión es httpOnly, pero su valor es un token de demostración.
- `ENABLE_MOCK_API` debe apagarse antes de cualquier despliegue.

## Desarrollo

- Ramas: `feature/CHA-XXX-descripcion`.
- Commits firmados.
- Antes de un commit, corre `npm run typecheck`, `npm run lint` y `npm test`.
