import { env } from "@/shared/infrastructure/config/env";

export function HelpCenter() {
  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-semibold">Estamos para ti</h1>
      <p className="text-sm">Ayuda cuando la necesitas.</p>
      {env.helpCenterUrl && (
        <a href={env.helpCenterUrl} target="_blank" rel="noreferrer" className="text-sm font-medium underline">
          Centro de ayuda ↗
        </a>
      )}
      {env.supportEmail && (
        <a href={`mailto:${env.supportEmail}`} className="text-sm font-medium underline">
          Escríbenos a soporte
        </a>
      )}
    </main>
  );
}
