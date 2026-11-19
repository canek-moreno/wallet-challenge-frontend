import { ContactsView } from "@/features/contacts";

export default function ContactsPage() {
  return (
    <main className="flex flex-col gap-6 p-4 md:p-10">
      <h1 className="text-[30px] font-semibold tracking-[-0.6px] text-ink">Contactos</h1>
      <ContactsView />
    </main>
  );
}
