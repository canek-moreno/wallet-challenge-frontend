import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type IconName =
  | "home"
  | "card"
  | "users"
  | "transfer"
  | "help"
  | "bell"
  | "eye"
  | "eyeOff"
  | "receive"
  | "bill"
  | "statement"
  | "lock"
  | "plus"
  | "search"
  | "logout";

const figmaFiles: Partial<Record<IconName, string>> = {
  home: "home.svg",
  card: "card.svg",
  users: "people.svg",
  transfer: "transfer.svg",
  help: "help.svg",
  bell: "bell.svg",
  eye: "eye.svg",
  receive: "receive.svg",
  bill: "bill.svg",
  lock: "lock.svg",
};

const strokes: Partial<Record<IconName, ReactNode>> = {
  eyeOff: (
    <>
      <path d="M17.9 17.9A10.8 10.8 0 0 1 12 19c-7 0-11-7-11-7a20 20 0 0 1 5.1-5.9M9.9 4.2A10.9 10.9 0 0 1 12 4c7 0 11 7 11 7a20 20 0 0 1-2.2 3.2M1 1l22 22" />
    </>
  ),
  statement: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </>
  ),
  logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const file = figmaFiles[name];
  if (file) {
    return (
      <Image
        src={`/icons/figma/${file}`}
        alt=""
        aria-hidden="true"
        width={20}
        height={20}
        unoptimized
        className={cn("size-5 shrink-0", className)}
      />
    );
  }
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className={cn("size-5 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {strokes[name]}
    </svg>
  );
}
