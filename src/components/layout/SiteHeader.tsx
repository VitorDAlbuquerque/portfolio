"use client";

import { Github, Linkedin, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { perfil } from "@/data/perfil";

const links = [
  { href: "/", label: "Início" },
  { href: "/projetos", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/80 bg-ink-50/90 backdrop-blur-md dark:border-ink-800 dark:bg-ink-950/85">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="font-serif text-lg tracking-tight text-ink-900 dark:text-ink-50">
          Portfólio interdisciplinar
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors ${
                  active
                    ? "text-accent font-medium dark:text-accent-muted"
                    : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="ml-2 flex items-center gap-2">
            <a
              href={perfil.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-ink-200 p-2 text-ink-700 hover:bg-ink-100 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-900"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={perfil.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-ink-200 p-2 text-ink-700 hover:bg-ink-100 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-900"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github className="h-4 w-4" aria-hidden />
            </a>
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-md border border-ink-200 p-2 text-ink-800 dark:border-ink-700 dark:text-ink-100"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-ink-200 bg-ink-50 px-4 py-3 dark:border-ink-800 dark:bg-ink-950 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-ink-800 dark:text-ink-100"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <a
                href={perfil.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-ink-200 px-3 py-2 text-sm text-ink-800 dark:border-ink-700 dark:text-ink-100"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
              <a
                href={perfil.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-ink-200 px-3 py-2 text-sm text-ink-800 dark:border-ink-700 dark:text-ink-100"
              >
                <Github className="h-4 w-4" aria-hidden />
                GitHub
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
