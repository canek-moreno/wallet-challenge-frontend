"use client";

import type { ComponentProps } from "react";
import { Modal } from "./Modal";

export function Sheet(props: Omit<ComponentProps<typeof Modal>, "placement">) {
  return <Modal {...props} placement="bottom" />;
}
