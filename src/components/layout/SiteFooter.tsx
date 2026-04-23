import Link from "next/link";

import { Github, Linkedin } from "lucide-react";

import { perfil } from "@/data/perfil";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-200 bg-ink-100/50 py-10 dark:border-ink-800 dark:bg-ink-950/50">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-serif text-base text-ink-900 dark:text-ink-50">Portfólio acadêmico</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            Tipografia mediada por Pretext para medições sem reflow desnecessário no navegador.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={perfil.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-ink-200 px-3 py-2 text-sm text-ink-700 hover:bg-ink-100 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-900"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
              LinkedIn
            </a>
            <a
              href={perfil.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-ink-200 px-3 py-2 text-sm text-ink-700 hover:bg-ink-100 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-900"
            >
              <Github className="h-4 w-4" aria-hidden />
              GitHub
            </a>
          </div>
        </div>
        <div className="text-sm text-ink-600 dark:text-ink-300">
          <p>
            Código em{" "}
            <Link className="text-accent underline-offset-4 hover:underline dark:text-accent-muted" href="https://nextjs.org">
              Next.js
            </Link>{" "}
            +{" "}
            <Link
              className="text-accent underline-offset-4 hover:underline dark:text-accent-muted"
              href="https://github.com/chenglou/pretext"
            >
              @chenglou/pretext
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
