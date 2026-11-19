export const BANKS = ["BBVA", "Santander", "Banorte", "Citibanamex", "HSBC", "Scotiabank", "Inbursa", "Nu", "SPIN"] as const;

export type Bank = (typeof BANKS)[number];
