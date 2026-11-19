import { cn } from "@/shared/lib/cn";

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <span
      role="img"
      aria-label={name}
      className={cn("flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-raised text-xs font-medium text-white", className)}
    >
      {initials}
    </span>
  );
}
