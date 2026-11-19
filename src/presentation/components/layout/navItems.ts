import type { IconName } from "../ui/Icon";

export const navItems = [
  { href: "/", label: "Inicio", icon: "home" },
  { href: "/products", label: "Mis productos", icon: "card" },
  { href: "/contacts", label: "Contactos", icon: "users" },
  { href: "/transfer", label: "Transferencias", icon: "transfer" },
  { href: "/help", label: "Ayuda", icon: "help" },
] as const satisfies readonly { href: string; label: string; icon: IconName }[];

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
