"use client";

import Link from "next/link";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { Button } from "../ui/Button";
import { StatusView } from "./StatusView";

export function NetworkErrorView({ onRetry }: { onRetry: () => void }) {
  return (
    <StatusView
      tone="error"
      title="Sin conexión"
      description="Revisa tu internet e intenta de nuevo. No se cobró nada."
      icon={<path d="M1 1l22 22M5 12.5a10 10 0 0 1 4-2.5M19 12.5a10 10 0 0 0-3-2M8.5 16a5 5 0 0 1 3.5-1.5M12 20h.01" />}
    >
      <Button onClick={onRetry}>Reintentar</Button>
    </StatusView>
  );
}

export function InsufficientFundsView({
  availableCents,
  currency,
  onAdjust,
  reloadHref,
}: {
  availableCents: number;
  currency: string;
  onAdjust: () => void;
  reloadHref: string;
}) {
  return (
    <StatusView
      tone="warning"
      title="Fondos insuficientes"
      description={`Tu saldo disponible es ${formatCurrency(availableCents, currency)}. Ajusta el monto o recarga tu tarjeta.`}
      icon={<path d="M12 8v5M12 17h.01M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />}
    >
      <Button onClick={onAdjust}>Ajustar monto</Button>
      <Link href={reloadHref} className="inline-flex items-center justify-center rounded-button border border-border px-[18px] py-[13px] text-sm font-semibold text-ink">
        Recargar tarjeta
      </Link>
    </StatusView>
  );
}

export function TimeoutView({ onCheck, onRetry }: { onCheck: () => void; onRetry: () => void }) {
  return (
    <StatusView
      tone="warning"
      title="Tiempo de espera agotado"
      description="No confirmamos tu transferencia. Revisa tus movimientos antes de intentar de nuevo para evitar un cobro duplicado."
      icon={<path d="M12 7v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" />}
    >
      <Button variant="secondary" onClick={onCheck}>
        Ver movimientos
      </Button>
      <Button onClick={onRetry}>Reintentar</Button>
    </StatusView>
  );
}

export function GenericErrorView({ reference, onRetry }: { reference: string; onRetry?: () => void }) {
  return (
    <StatusView
      tone="error"
      title="Algo no salió bien"
      description={`Tu transferencia no se completó. Si necesitas ayuda, comparte este código de referencia con soporte: ${reference}`}
      icon={<path d="M12 8v4M12 16h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" />}
    >
      {onRetry ? <Button onClick={onRetry}>Reintentar</Button> : null}
      <Link href="/help" className="inline-flex items-center justify-center rounded-button border border-border px-[18px] py-[13px] text-sm font-semibold text-ink">
        Contactar soporte
      </Link>
    </StatusView>
  );
}

export function SuccessView({
  amountCents,
  feeCents,
  currency,
  destinationLabel,
  reference,
  createdAt,
  canShare,
  onShare,
  onHome,
}: {
  amountCents: number;
  feeCents: number;
  currency: string;
  destinationLabel: string;
  reference: string;
  createdAt: string;
  canShare: boolean;
  onShare: () => void;
  onHome: () => void;
}) {
  const rows = [
    ["Monto", formatCurrency(amountCents, currency)],
    ["Comisión", formatCurrency(feeCents, currency)],
    ["Total", formatCurrency(amountCents + feeCents, currency)],
    ["Destino", destinationLabel],
    ["Fecha", new Date(createdAt).toLocaleString("es-MX")],
    ["Folio", reference],
  ] as const;

  return (
    <StatusView
      tone="success"
      title="¡Transferencia enviada!"
      description="Tu transferencia se realizó correctamente."
      icon={<path d="M20 6L9 17l-5-5" />}
      details={
        <dl className="flex flex-col divide-y divide-border rounded-button border border-border">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <dt className="text-muted">{label}</dt>
              <dd className="font-medium text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      }
    >
      {canShare ? (
        <Button variant="secondary" onClick={onShare}>
          Compartir comprobante
        </Button>
      ) : null}
      <Button onClick={onHome}>Volver al inicio</Button>
    </StatusView>
  );
}
