"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, Input } from "@/presentation/components/ui";
import { BANKS } from "../../domain/banks";
import type { Contact } from "../../domain/entities/Contact";
import { useCreateContactMutation } from "../api/contactsApi";
import { contactFormSchema, type ContactFormValues } from "../schemas/contactFormSchema";

export function ContactForm({ onSaved, onCancel }: { onSaved?: (contact: Contact) => void; onCancel?: () => void }) {
  const router = useRouter();
  const [createContact, { isLoading, isError }] = useCreateContactMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { fullName: "", bank: undefined, accountNumber: "", alias: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    const result = await createContact({ ...values, alias: values.alias || undefined });
    if ("error" in result || !result.data) return;
    if (onSaved) onSaved(result.data);
    else router.push("/contacts");
  };

  return (
    <form className="flex w-full max-w-[560px] flex-col gap-5 rounded-card border border-border bg-surface p-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input id="fullName" label="Nombre completo" placeholder="Ana García" error={errors.fullName?.message} {...register("fullName")} />
      <div className="flex flex-col gap-2">
        <label htmlFor="bank" className="text-[13px] font-medium text-ink">
          Banco
        </label>
        <select
          id="bank"
          aria-invalid={errors.bank ? true : undefined}
          className="rounded-card border border-border bg-surface px-4 py-3.5 text-sm text-ink outline-none focus:ring-2 focus:ring-primary"
          defaultValue=""
          {...register("bank")}
        >
          <option value="" disabled>
            Selecciona un banco
          </option>
          {BANKS.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </select>
        {errors.bank ? <p className="text-xs text-danger">{errors.bank.message}</p> : null}
      </div>
      <Input
        id="accountNumber"
        label="CLABE o número de cuenta"
        inputMode="numeric"
        placeholder="012180001234568901"
        error={errors.accountNumber?.message}
        {...register("accountNumber")}
      />
      <Input id="alias" label="Alias (opcional)" placeholder="Ana" error={errors.alias?.message} {...register("alias")} />
      <div className="flex flex-col gap-2 rounded-card bg-mint p-3.5">
        <p className="text-[13px] font-semibold text-primary">Verifica antes de guardar</p>
        <p className="text-xs text-muted">Confirma la cuenta con tu contacto para evitar envíos incorrectos.</p>
      </div>
      {isError ? (
        <p role="alert" className="rounded-button bg-error-tint p-3 text-sm text-danger">
          No pudimos guardar el contacto. Intenta de nuevo.
        </p>
      ) : null}
      <Button type="submit" disabled={isLoading}>
        Guardar y continuar
      </Button>
      <Button variant="secondary" onClick={onCancel ?? (() => router.push("/contacts"))}>
        Cancelar
      </Button>
    </form>
  );
}
