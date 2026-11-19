"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, Input } from "@/presentation/components/ui";
import { useCreateContactMutation } from "../api/contactsApi";
import { contactFormSchema, type ContactFormValues } from "../schemas/contactFormSchema";

export function ContactForm() {
  const router = useRouter();
  const [createContact, { isLoading, isError }] = useCreateContactMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { fullName: "", bank: "", accountNumber: "", alias: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    const result = await createContact({ ...values, alias: values.alias || undefined });
    if (!("error" in result)) router.push("/contacts");
  };

  return (
    <form className="flex max-w-[480px] flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input id="fullName" label="Nombre completo" error={errors.fullName?.message} {...register("fullName")} />
      <Input id="bank" label="Banco" error={errors.bank?.message} {...register("bank")} />
      <Input
        id="accountNumber"
        label="CLABE o IBAN"
        inputMode="numeric"
        error={errors.accountNumber?.message}
        {...register("accountNumber")}
      />
      <Input id="alias" label="Alias (opcional)" error={errors.alias?.message} {...register("alias")} />
      {isError ? (
        <p role="alert" className="rounded-button bg-error-tint p-3 text-sm text-danger">
          No pudimos guardar el contacto. Intenta de nuevo.
        </p>
      ) : null}
      <Button type="submit" disabled={isLoading}>
        Guardar contacto
      </Button>
    </form>
  );
}
