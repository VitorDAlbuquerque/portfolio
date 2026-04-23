"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfólio — contato de ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
    window.location.href = `mailto:seu.email@instituicao.edu?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink-800 dark:text-ink-100">
          Nome
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-ink-900 shadow-sm outline-none ring-accent/40 focus:ring-2 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-50"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink-800 dark:text-ink-100">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-ink-900 shadow-sm outline-none ring-accent/40 focus:ring-2 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-50"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink-800 dark:text-ink-100">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-ink-900 shadow-sm outline-none ring-accent/40 focus:ring-2 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-50"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-md bg-ink-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-ink-800 dark:bg-ink-100 dark:text-ink-900 dark:hover:bg-white"
      >
        <Send className="h-4 w-4" aria-hidden />
        Enviar (cliente de e-mail)
      </button>
      {status === "sent" ? (
        <p className="text-sm text-ink-600 dark:text-ink-300">
          Abrindo seu aplicativo de e-mail. Ajuste o endereço mailto no componente se necessário.
        </p>
      ) : null}
    </form>
  );
}
