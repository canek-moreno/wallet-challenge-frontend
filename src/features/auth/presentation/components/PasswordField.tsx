"use client";

import { useState, type ComponentPropsWithRef } from "react";

type PasswordFieldProps = Omit<ComponentPropsWithRef<"input">, "type"> & { label: string };

export function PasswordField({ label, id, ...inputProps }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-ink">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-card border border-border bg-surface px-4 py-3.5">
        <input
          id={id}
          type={visible ? "text" : "password"}
          className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="text-sm font-medium text-primary"
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      </div>
    </div>
  );
}
