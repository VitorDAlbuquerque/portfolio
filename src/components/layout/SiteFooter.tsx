import { Github, Linkedin } from "lucide-react";

import { perfil } from "@/data/perfil";

export function SiteFooter() {
  return (
    <footer className="border-t border-frieren-border bg-frieren-deep py-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <a
              href={perfil.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-frieren-border p-2.5 text-frieren-text-md transition-colors hover:border-frieren-border-md hover:text-frieren-text"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="h-5 w-5" aria-hidden />
            </a>
            <a
              href={perfil.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-frieren-border p-2.5 text-frieren-text-md transition-colors hover:border-frieren-border-md hover:text-frieren-text"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>
        <a
          href={perfil.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-right font-display text-lg tracking-wide text-frieren-text transition-colors hover:text-frieren-purple"
        >
          Vitor D Albuquerque
        </a>
      </div>
    </footer>
  );
}
