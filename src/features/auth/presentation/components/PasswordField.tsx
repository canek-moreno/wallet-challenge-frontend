"use client";

import { useState, type InputHTMLAttributes } from "react";

type PasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string };

export function PasswordField({ label, id, ...inputProps }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-card bg-white px-4 py-3 shadow-sm">
        <input
          id={id}
          type={visible ? "text" : "password"}
          className="flex-1 bg-transparent outline-none"
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="text-sm font-medium"
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      </div>
    </div>
  );
}
