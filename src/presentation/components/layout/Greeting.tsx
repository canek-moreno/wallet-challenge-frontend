"use client";

import { useGetSessionQuery } from "@/features/auth";

export function Greeting() {
  const { data } = useGetSessionQuery();
  const firstName = data?.name.split(" ")[0];

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[30px] font-semibold tracking-[-0.6px] text-ink">{firstName ? `Hola, ${firstName}` : "Hola"}</h1>
      <p className="text-sm text-muted">Tu dinero está listo para lo que sigue.</p>
    </div>
  );
}
