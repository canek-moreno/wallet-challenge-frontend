export function LoginBrandPanel() {
  return (
    <aside className="hidden w-[640px] shrink-0 flex-col gap-8 bg-brand-dark p-16 md:flex">
      <p className="text-[32px] font-bold tracking-[-0.64px] text-accent-lime">luma.</p>
      <span className="inline-flex w-fit rounded-chip bg-brand-active px-1.5 py-1.5 text-[11px] font-medium text-accent-lime">
        TU PRÓXIMO MOVIMIENTO
      </span>
      <p className="text-[52px] font-semibold leading-[1.2] tracking-[-1.04px] text-white">
        Más claridad.
        <br />
        Más posibilidades.
        <br />
        Más tú.
      </p>
      <p className="text-[17px] text-brand-muted">
        Tu dinero, tus planes y cada nuevo comienzo.
        <br />
        Todo en un solo lugar.
      </p>
      <div className="flex max-w-[460px] flex-col gap-4 rounded-card bg-accent-lime p-6 text-ink">
        <p className="text-[23px] font-bold tracking-[-0.46px]">luma.</p>
        <p className="text-sm font-medium">•••• 4321</p>
      </div>
      <p className="flex items-center gap-2.5 text-[13px] text-brand-muted">Tu tranquilidad siempre va primero.</p>
    </aside>
  );
}
