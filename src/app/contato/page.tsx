import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

import { ContactForm } from "@/components/contato/ContactForm";

export const metadata = {
  title: "Contato",
};

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl text-ink-900 dark:text-ink-50">Contato</h1>
      <p className="mt-3 text-ink-600 dark:text-ink-300">
        Links rápidos e formulário que monta uma mensagem via seu cliente de e-mail padrão.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
            Redes
          </h2>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                className="inline-flex items-center gap-2 text-ink-800 hover:text-accent dark:text-ink-100 dark:hover:text-accent-muted"
                href="https://github.com/"
              >
                <Github className="h-4 w-4" aria-hidden />
                GitHub
              </Link>
            </li>
            <li>
              <Link
                className="inline-flex items-center gap-2 text-ink-800 hover:text-accent dark:text-ink-100 dark:hover:text-accent-muted"
                href="https://www.linkedin.com/"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </Link>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 text-ink-800 hover:text-accent dark:text-ink-100 dark:hover:text-accent-muted"
                href="mailto:seu.email@instituicao.edu"
              >
                <Mail className="h-4 w-4" aria-hidden />
                seu.email@instituicao.edu
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
            Mensagem
          </h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
