# Uso de IA en el proyecto

Este documento registra los prompts y herramientas de IA usados para construir el proyecto, junto con su propósito.

## 1. Diseño de UI en Figma

**Herramienta:** generador de UI de Figma.
**Propósito:** generar las pantallas de referencia de la wallet (desktop 1440px y mobile 375px) antes de implementar los componentes en código.
**Relacionado con:** `docs/ARCHITECTURE.md` (sección 3, mapa de rutas) y la estructura de `features/` y `presentation/`.

### Prompt utilizado

```text
Role: Senior Fintech UI/UX Designer & Design System Specialist.
Task: Create a modern, clean, premium, and fully responsive Web Wallet application (Desktop 1440px and Mobile 375px viewpoints).

Visual Style & UI Guidelines:
- Aesthetic: Modern fintech (neobanking style like Revolut / Wise / Apple Wallet). Clean, minimalist, high contrast, elegant typography (Inter or Plus Jakarta Sans), subtle glassmorphism or soft elevation shadows (no heavy skeuomorphism), rounded corners (border-radius: 12px to 16px).
- Color Palette: Deep slate/charcoal background or crisp light mode (#F8F9FA) with an energetic accent color (electric emerald green, vibrant indigo, or violet) indicating liquidity and positive balances. Semantic alert colors (red for errors, amber for timeouts, green for success).
- Responsiveness: Auto Layout enabled on all containers, scalable grid system (12-column desktop, fluid 4-column mobile).

Required Screens & Components:

1. Authentication (Login):
   - Centered auth card with brand logo and subtle micro-copy.
   - Input fields: Email/Document ID and Password (with show/hide toggle).
   - Biometric/Passkey quick login button + "Forgot password?" link.
   - High-contrast primary CTA button: "Iniciar sesión".

2. Dashboard / Home:
   - Header: User greeting, notification bell with badge, profile avatar, and privacy toggle ("hide balances").
   - Total Net Worth balance widget.
   - Card Carousel / Stack: Showcase available products/cards (Debit Card, Credit Card, Virtual Vault) displaying card type, masked number (**** 4321), expiration date, network badge (Visa/Mastercard), and dynamic balance.
   - Quick global actions bar: Transfer, Receive, Pay Services.

3. Selected Product Detail & Dynamic Actions:
   - Focused state of the selected card with visual highlight.
   - Contextual Quick Actions grid (visible upon selecting the card):
     * Estado de cuenta (Statement icon)
     * Transferir (Transfer arrow icon)
     * Recibir (QR/Receive icon)
     * Pagar servicios (Utility bill icon)
     * Apagar producto (Card freeze/toggle switch with lock indicator)
   - Recent Transactions List: Filter tabs (All, Income, Expense), date grouping, merchant logos, transaction name, category chip, timestamp, and colored amount (+ $X.XX green, - $X.XX dark).

4. Contact Directory (Contactos):
   - Search bar with instant filter.
   - "Agregar nuevo contacto" CTA at the top.
   - Favorite / Recent transfers avatar carousel.
   - Alphabetical contact list displaying name, bank badge, account/CLABE/IBAN snippet, and quick "Enviar" action.

5. Transfer Flow:
   - Step 1: Destination Selector: Segmented control between "Cuentas propias" and "A contactos".
   - Step 2: Contact selection modal/sheet (Select existing or "Nuevo contacto" form: Full name, Bank, Account number, Alias).
   - Step 3: Amount entry screen with dynamic numeric keypad/input, available balance indicator, conversion/fee note ($0.00), and optional reference/concept field.
   - Step 4: Summary/Review drawer showing source account, destination, amount, and slide/button to confirm.

6. Feedback & Edge Cases (Status Screens / Modals):
   - Success State: Celebratory icon/checkmark, transfer receipt breakdown, share/download voucher button, and "Volver al inicio" CTA.
   - Error States (Include dedicated modal or full-screen feedback components for each):
     * Error de red (No internet icon, "Reintentar" button).
     * Fondos insuficientes (Alert badge, options to reload card or adjust amount).
     * Timeout / Tiempo de espera agotado (Clock icon, instruction to check movements before retrying).
     * Error genérico (Illustration/icon, transaction reference code, support CTA).
```

## 2. Herramientas de IA por etapa

| Etapa | Herramienta | Uso |
| --- | --- | --- |
| Diseño inicial de la funcionalidad | Gemini (Notebook) | Definición de la funcionalidad y refinamiento del prompt para Figma |
| UX de escritorio y móvil | Figma Make | Creación de las pantallas de escritorio (1440px) y móvil (375px) |
| Modelado de la arquitectura | Devin + Claude Haiku 5.5 | Decisiones de arquitectura, estructura de carpetas y documentación en `docs/ARCHITECTURE.md` |
| Generación del boilerplate | Devin + Claude Haiku 5.5 | Scaffold de Next.js, store, features, mock API y pruebas |
| Conexión a Figma vía MCP | Devin + Claude Haiku 5.5 | Consulta de nodos, descarga de iconos y tokens de diseño desde el archivo de Figma |
| Documentación | Devin + Claude Haiku 5.5 | `docs/ARCHITECTURE.md`, `contracts/openapi.yaml` y este archivo |
