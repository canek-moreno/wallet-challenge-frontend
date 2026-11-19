import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type StatusTone = "success" | "error" | "warning";

const toneClasses: Record<StatusTone, string> = {
  success: "bg-mint text-primary",
  error: "bg-error-tint text-danger",
  warning: "bg-warning-tint text-warning",
};

export function StatusIcon({ tone, children }: { tone: StatusTone; children: ReactNode }) {
  return (
    <span aria-hidden="true" className={cn("flex size-12 items-center justify-center rounded-icon", toneClasses[tone])}>
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </span>
  );
}

export function StatusView({
  tone,
  icon,
  title,
  description,
  children,
  details,
}: {
  tone: StatusTone;
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
  details?: ReactNode;
}) {
  return (
    <section role="alert" className="flex w-full max-w-[560px] flex-col gap-5 rounded-card border border-border bg-surface p-6">
      <StatusIcon tone={tone}>{icon}</StatusIcon>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold text-ink">{title}</h1>
        <p className="text-sm text-muted">{description}</p>
      </div>
      {details}
      {children ? <div className="flex flex-col gap-3 sm:flex-row">{children}</div> : null}
    </section>
  );
}
