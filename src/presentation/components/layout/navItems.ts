export const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/products", label: "Mis productos" },
  { href: "/contacts", label: "Contactos" },
  { href: "/transfer", label: "Transferencias" },
  { href: "/help", label: "Ayuda" },
] as const;

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
