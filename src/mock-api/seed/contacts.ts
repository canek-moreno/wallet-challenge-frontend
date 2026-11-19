export type SeedContact = {
  id: string;
  fullName: string;
  bank: string;
  accountNumber: string;
  alias: string | null;
  favorite: boolean;
  lastTransferAt: string | null;
};

export const seedContacts: SeedContact[] = [
  { id: "ct-1", fullName: "Luis Hernández", bank: "BBVA", accountNumber: "012180001234567891", alias: "Luis casa", favorite: true, lastTransferAt: "2026-11-15T10:00:00.000Z" },
  { id: "ct-2", fullName: "María Torres", bank: "Santander", accountNumber: "014180009876543210", alias: null, favorite: true, lastTransferAt: null },
  { id: "ct-3", fullName: "Carlos Mendoza", bank: "Banorte", accountNumber: "072180001111222233", alias: "Carlos", favorite: false, lastTransferAt: "2026-11-12T18:30:00.000Z" },
  { id: "ct-4", fullName: "Andrea Ruiz", bank: "Nu", accountNumber: "638180004444555566", alias: null, favorite: false, lastTransferAt: "2026-11-17T09:00:00.000Z" },
  { id: "ct-5", fullName: "Ana Paula Soto", bank: "BBVA", accountNumber: "012180007777888899", alias: null, favorite: false, lastTransferAt: null },
];
