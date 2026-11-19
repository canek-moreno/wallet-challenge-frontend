export const colors = {
  canvas: "#f7f9f8",
  surface: "#ffffff",
  border: "#dfe7e2",
  ink: "#172e29",
  muted: "#63756f",
  primary: "#087f5b",
  brandDark: "#102d25",
  brandRaised: "#1b3b30",
  brandActive: "#28473c",
  brandMuted: "#b4c8bf",
  accentLime: "#d6f5a6",
  mint: "#eaf3ee",
  creditTint: "#e4ebe5",
  errorTint: "#fcecee",
  warningTint: "#fff3da",
  danger: "#b42318",
  warning: "#b54708",
} as const;

export const radius = {
  chip: "6px",
  nav: "10px",
  button: "12px",
  icon: "14px",
  card: "16px",
} as const;

export type ColorToken = keyof typeof colors;
export type RadiusToken = keyof typeof radius;
