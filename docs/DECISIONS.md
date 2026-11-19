# Decisiones de diseño

Este documento explica por qué el proyecto está organizado como está, cómo separamos la interfaz de la lógica de negocio, qué casos borde se consideraron y qué cambiaría con más tiempo. Complementa a `docs/ARCHITECTURE.md`, que describe la arquitectura, y a `contracts/openapi.yaml`, que define el contrato HTTP.

## 1. Por qué esta estructura

### Clean Architecture por feature, sin capas globales

Cada dominio (`auth`, `accounts`, `transactions`, `contacts`, `transfers`) tiene sus propias capas: `domain`, `application`, `infrastructure` y `presentation`.

- **Por qué por feature y no por tipo técnico.** Una carpeta `components/` global crece sin control y mezcla dominios. Con features, cambiar transferencias no obliga a tocar contactos.
- **Por qué esas cuatro capas.** `domain` contiene las reglas de negocio puras (validar un monto, validar una CLABE). `application` orquesta casos de uso sobre puertos. `infrastructure` implementa esos puertos contra HTTP. `presentation` muestra la interfaz. Las reglas de negocio pueden probarse sin React, Redux ni red.
- **Costo asumido.** Hay más archivos que en una estructura plana. Lo aceptamos porque el objetivo es un producto financiero que debe escalar y tener varios equipos. Para una pantalla sin reglas, la capa `application` puede ser un pasamanos. Preferimos esa redundancia pequeña a mezclar reglas con componentes.

### Dependencias hacia adentro, verificadas por lint

La dirección es `presentation → application → domain`, e `infrastructure` implementa los puertos de `domain`. ESLint lo verifica con `no-restricted-imports` en `eslint.config.mjs`: `domain` no puede importar React, Redux, Next.js, infraestructura ni la composición de dependencias. Probamos que la regla detecta imports prohibidos.

### Route Handlers como API simulada

La aplicación se ejecuta sin backend. La API simulada vive en `app/api` y usa el mismo contrato que tendrá el backend real.

- **Por qué no MSW ni json-server.** Los Route Handlers funcionan igual en el navegador y en el servidor. Así las rutas que se renderizan en el servidor y los componentes cliente usan la misma URL, sin procesos adicionales.
- **Por qué un contrato OpenAPI.** Frontend y backend se alinean con un documento revisable. Las rutas `planned` marcan lo que aún no existe.

### Estado: Redux Toolkit con RTK Query, sin thunks ni Context

Tres herramientas resolvían el mismo problema, así que nos quedamos con dos piezas:

- **RTK Query** para todo dato de servidor, tanto lecturas como comandos (`mutation`). Da caché, invalidación por etiquetas y estados de carga sin código manual.
- **Un slice de Redux** solo para estado de UI que es global (ocultar saldos, flujo de transferencia).

Descartamos `createAsyncThunk`, porque duplicaba lo que RTK Query ya hace. Descartamos React Context para la inyección de dependencias: `src/container.ts` exporta las instancias, funciona igual en servidor y cliente, y no añade proveedores ni re-renders.

### Renderizado mixto

Las pantallas públicas son estáticas (`/login`, `/help`). Las pantallas con datos del usuario y la interacción se renderizan en cliente, porque la mayoría consultan la API simulada a través de RTK Query. La decisión de llamar casos de uso directamente desde Server Components quedó pendiente.

### Next.js App Router, no Pages Router ni React Router

App Router es el sistema de rutas actual de Next.js y permite layouts anidados y route groups. React Router entra en conflicto con el router de Next.js, y Pages Router está en modo de mantenimiento para proyectos nuevos.

### Tailwind v4 con tokens espejados

Los tokens de color, radio y tipografía se extrajeron de Figma y viven en `src/presentation/theme/tokens.ts`. Se espejan en `app/globals.css` (`@theme`). Una prueba verifica que coincidan, para que un cambio en uno no se quede sin reflejar en el otro.

## 2. Cómo separamos la interfaz y la lógica de negocio

La regla general es que los componentes no toman decisiones de negocio. Cada decisión vive en una capa.

| Decisión | Dónde vive | Ejemplo |
| --- | --- | --- |
| Si un monto es válido frente al saldo | `domain/rules` | `validateTransfer` |
| Si una CLABE o un IBAN tienen formato válido | `domain/rules` | `isValidAccountNumber` |
| Si un teléfono es internacional y cómo se normaliza | `domain/rules` | `identifierKind`, `normalizeIdentifier` |
| Agrupar movimientos por fecha | `domain/rules` | `groupByDate` |
| Qué pasa al enviar una transferencia | `application` | `makeSendMoney` |
| Cómo se llama al servidor y cómo se traducen sus errores | `infrastructure` | `HttpTransferRepository` |
| Qué se muestra cuando algo falla | `presentation` | `TransferErrorState` |
| Qué datos se guardan en la sesión del flujo | Slice de Redux | `transferFlowSlice` |

Consecuencias prácticas:

- **Las reglas se prueban sin interfaz.** `validateTransfer`, `groupByDate` y `identifierKind` tienen pruebas puras.
- **Los errores de negocio son datos, no excepciones.** Los casos de uso devuelven `Result<T, E>`. Cada error es una unión discriminada (`TransferError`), y la interfaz la traduce a una vista. Un `switch` sobre `kind` obliga a cubrir cada caso.
- **Los errores del servidor se traducen en la frontera.** `HttpTransferRepository` convierte un 422 en `InsufficientFunds`, y un abort por timeout en `Timeout`. Ninguna pantalla conoce códigos HTTP.
- **Los montos son enteros en centavos.** Evitamos errores de punto flotante en cálculos de saldo. El formateo a moneda ocurre solo en la presentación.
- **Validación en dos niveles.** Zod valida la forma del formulario y el DTO. Las reglas de negocio (saldo, moneda) viven en `domain`. Zod nunca decide si una transferencia es válida.

## 3. Casos borde considerados

### Transferencias

- **Doble envío.** Cada intento genera una `Idempotency-Key` que se guarda en el flujo. Reenviar tras un error de red o timeout usa la misma clave, así que el servidor devuelve la misma respuesta y no debita dos veces.
- **Nueva clave al cambiar el monto.** Si el usuario regresa a corregir el importe, la clave anterior se descarta en el flujo y se genera otra. Así un cambio de monto no se confunde con un reintento.
- **Timeout del cliente menor que el del servidor.** El cliente corta a los 15 segundos. El mock responde en 30. Así se prueba que la interfaz maneja la espera excesiva y no se queda colgada.
- **Saldo insuficiente.** La validación ocurre en el cliente antes de enviar (el botón "Continuar" queda deshabilitado), y el servidor también valida. El cliente nunca confía en su propia validación para aprobar un débito.
- **Moneda distinta.** Si la moneda del monto no coincide con la cuenta, el dominio devuelve `CurrencyMismatch`.
- **Monto cero o negativo.** Se rechaza en el dominio.
- **Cuenta congelada.** Congelar bloquea solo el uso físico. El mock permite transferencias digitales desde una cuenta congelada, según lo definido con el equipo de producto.
- **Recargar la página a mitad del flujo.** El flujo vive en Redux y no persiste. Al recargar, el usuario vuelve a `/transfer`. Preferimos perder el flujo a persistir datos financieros en el navegador.
- **Respuesta inesperada del servidor.** Si el cuerpo no coincide con el DTO de Zod, el repositorio devuelve `Unknown` y se muestra la vista genérica con una referencia.

### Autenticación

- **Correo o teléfono.** Un teléfono sin código de país se rechaza. Los espacios, guiones y paréntesis se eliminan antes de validar. El correo se normaliza a minúsculas para comparar.
- **Credenciales incorrectas no revelan cuál dato falló.** El mensaje es el mismo para usuario inexistente y contraseña incorrecta.
- **Sesión expirada.** Si `/auth/me` responde 401, la interfaz lo trata como `Unauthorized` y no como error de red.
- **Rutas protegidas.** `proxy.ts` redirige a `/login` si no hay cookie de sesión.
- **Cierre de sesión.** Borra la cookie y limpia la caché de RTK Query, para que el siguiente usuario no vea datos anteriores.

### Contactos

- **Recientes sin duplicados.** Un contacto reciente aparece en "RECIENTES" y no se repite en "TODOS", salvo cuando hay una búsqueda activa.
- **Alta de contacto con banco fijo.** Un banco fuera de la lista se rechaza en el DTO del servidor y en el esquema del formulario.
- **CLABE o IBAN.** Se valida el formato. No se valida el dígito verificador (ver pendientes).

### Interfaz

- **Montos ocultos.** Ocultar saldos cambia la representación en todas las pantallas que muestran dinero, desde un mismo estado de Redux.
- **Estados de carga y error.** Cada consulta muestra carga, error o vacío, no solo el caso feliz.
- **Enlaces de funcionalidad pendiente.** Los módulos sin backend muestran una pantalla de "próximamente" en lugar de un 404.

## 4. Qué haría diferente con más tiempo

### Contratos y backend

- **Generar tipos desde el contrato.** Hoy los DTO de Zod se escriben a mano y pueden divergir de `openapi.yaml`. Con generación de tipos desde el contrato, una diferencia se detecta en compilación.
- **Pruebas de contrato.** Validar que la API simulada responde lo que dice el contrato, de forma automática.
- **Eliminar el acoplamiento entre features.** `transfers` importa `accounts` y `contacts` a través de sus índices. Lo ideal es un puerto de lectura de destinos que transfers defina, y que cada feature lo implemente.
- **Mover `Money` a un kernel compartido.** Hoy `accounts` y `transactions` importan el tipo `Currency` desde `transfers`. Es un acoplamiento que debería estar en `shared`.

### Estado y flujo

- **Persistir el flujo de transferencia en la URL o en el servidor.** Así sobrevive a recargas sin guardar datos sensibles en el navegador.
- **Selector de cuenta origen.** Hoy la cuenta origen es siempre la de débito. El diseño no define el selector, y falta decidir cómo se presenta.
- **Datos del servidor en Server Components.** El inicio y el detalle de producto podrían cargar datos en el servidor, reduciendo el JavaScript del cliente.

### Seguridad y producción

- **Autenticación real.** Hoy el token es de demostración. Con un backend real: token httpOnly con rotación, expiración y renovación.
- **Verificación de CLABE.** Calcular el dígito verificador y no solo el formato.
- **Autorización.** Reglas por rol y por producto, no solo sesión válida.
- **Eliminar el riesgo del mock.** Hoy `ENABLE_MOCK_API` es un flag. En producción, la API simulada debería excluirse del build.

### Calidad y operación

- **Pruebas E2E en móvil de forma continua.** Hoy se corren de forma manual.
- **Regresión visual.** Comparar capturas contra Figma en 375 y 1440 px de forma automática.
- **Auditoría de accesibilidad.** Revisar foco, contraste y lectores de pantalla en todos los flujos, no solo en los componentes críticos.
- **Observabilidad.** Métricas de éxito y error por escenario de transferencia, y trazas en el flujo de pago.
- **Internacionalización.** Los textos están escritos directamente en español. Un catálogo de textos permitiría otros idiomas.
- **Revisar el límite de longitud de línea de la documentación.** Hoy hay avisos `MD013` en los documentos, que decidimos no corregir por ahora.

## 5. Pendientes conocidos

Estas decisiones quedaron abiertas y se listan también en `README.md`:

- Los colores de error (`#b42318`) y advertencia (`#b54708`) son provisionales.
- La CLABE se valida por formato, no por dígito verificador.
- Los teléfonos se validan por formato, no se verifica que existan.
- El registro de usuarios y la recuperación de contraseña no existen.
- Passkey y notificaciones están deshabilitados.
