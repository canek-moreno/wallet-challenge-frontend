export type Contact = Readonly<{
  id: string;
  fullName: string;
  bank: string;
  accountNumber: string;
  alias: string | null;
  favorite: boolean;
}>;

export type NewContact = Readonly<{
  fullName: string;
  bank: string;
  accountNumber: string;
  alias?: string;
}>;
