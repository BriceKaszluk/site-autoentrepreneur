"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message trop court").max(2000, "Trop long"),
  consent: z.boolean().refine(v => v === true, { message: "Consentement requis" }),
  turnstileToken: z.string().min(1, "Vérification requise"),
  website: z.string().optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle"|"ok"|"error">("idle");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: { consent: false, turnstileToken: "" },
    });

  const onSubmit = async (values: FormValues) => {
    setStatus("idle"); setError("");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      router.push("/merci");
      return;
    }
    setStatus("ok");
    reset({ name: "", email: "", phone: "", message: "", consent: false, turnstileToken: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      {/* Honeypot */}
      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />

      <div>
        <label className="block text-sm font-medium">Nom</label>
        <input className="mt-1 w-full rounded-md border p-2" {...register("name")} />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input type="email" className="mt-1 w-full rounded-md border p-2" {...register("email")} />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Téléphone (optionnel)</label>
        <input className="mt-1 w-full rounded-md border p-2" {...register("phone")} />
      </div>

      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea rows={5} className="mt-1 w-full rounded-md border p-2" {...register("message")} />
        {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input id="consent" type="checkbox" className="mt-1" {...register("consent")} />
        <label htmlFor="consent" className="text-sm text-gray-700">
          J’accepte que mes données soient utilisées pour me recontacter. (RGPD)
        </label>
      </div>
      {errors.consent && <p className="text-sm text-red-600">{errors.consent.message}</p>}

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
        onSuccess={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
        options={{ theme: "light" }}
      />
      {errors.turnstileToken && <p className="text-sm text-red-600">{errors.turnstileToken.message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 rounded-md bg-black text-white disabled:opacity-60"
      >
        {isSubmitting ? "Envoi…" : "Envoyer"}
      </button>

      {status === "ok" && <p className="text-green-700">Merci ! Votre message a été envoyé.</p>}
      {status === "error" && <p className="text-red-600">Erreur : {error}</p>}
    </form>
  );
}
