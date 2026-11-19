"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  placement?: "center" | "bottom";
};

export function Modal({ open, onClose, title, children, placement = "center" }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex bg-ink/40 p-4",
        placement === "center" ? "items-center justify-center" : "items-end justify-center",
      )}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
        className={cn(
          "w-full bg-surface p-6 shadow-lg",
          placement === "center" ? "max-w-[560px] rounded-card" : "max-w-[560px] rounded-t-card",
        )}
      >
        {children}
      </div>
    </div>
  );
}
