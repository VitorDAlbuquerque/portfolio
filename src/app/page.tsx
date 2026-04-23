import Link from "next/link";

import { ResponsiveHeading } from "@/components/pretext/ResponsiveHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projetos } from "@/data/projects";
import { perfil } from "@/data/perfil";
import { PRETEXT_SANS } from "@/lib/font-stacks";
import { calculateAge } from "@/lib/date/calculateAge";

export default function HomePage() {
  const destaques = projetos
    .filter((p) => p.destaque)
    .sort((a, b) => b.periodo.localeCompare(a.periodo))
    .slice(0, 3);
  const idade = calculateAge(perfil.dataNascimento);

  return (
    <div>
      <section className="border-b border-ink-200 bg-gradient-to-b from-ink-50 to-ink-100/60 dark:border-ink-800 dark:from-ink-950 dark:to-ink-900/60">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
            {perfil.nome} · {idade} anos · {perfil.cursoAtual.instituicao}
          </p>
          <ResponsiveHeading
            as="h1"
            minSize={28}
            maxSize={56}
            mode="box"
            maxLines={3}
            lineHeightRatio={1.08}
            fontFamily={PRETEXT_SANS}
            fontWeight={600}
            className="max-w-4xl"
          >
            Portfólio interdisciplinar por semestre
          </ResponsiveHeading>
          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700 dark:text-ink-200">
            Projetos do curso de{" "}
            <span className="text-ink-900 dark:text-ink-50">{perfil.cursoAtual.curso}</span>, com tipografia
            responsiva medida por{" "}
            <span className="text-ink-900 dark:text-ink-50">@chenglou/pretext</span> para caber ao
            viewport sem overflow e com hierarquia estável entre breakpoints.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/projetos"
              className="rounded-md bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800 dark:bg-ink-100 dark:text-ink-900 dark:hover:bg-white"
            >
              Ver todos os projetos
            </Link>
            <Link
              href="/sobre"
              className="rounded-md border border-ink-300 px-5 py-2.5 text-sm font-medium text-ink-900 transition hover:bg-ink-100 dark:border-ink-600 dark:text-ink-50 dark:hover:bg-ink-900"
            >
              Sobre mim
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-ink-900 dark:text-ink-50">Em destaque</h2>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
              Cards com título ajustado e resumo truncado por linhas, via Pretext.
            </p>
          </div>
          <Link href="/projetos" className="text-sm font-medium text-accent dark:text-accent-muted">
            Galeria completa →
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {destaques.map((p) => (
            <ProjectCard key={p.id} projeto={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <div className="rounded-xl border border-ink-200 bg-white p-8 dark:border-ink-800 dark:bg-ink-900/40">
          <h2 className="font-serif text-2xl text-ink-900 dark:text-ink-50">Sobre</h2>
          <p className="mt-3 text-ink-700 dark:text-ink-200">
            Trabalho com {perfil.trabalho}. Aqui você encontra meus projetos interdisciplinares do curso,
            organizados por semestre, com links para os repositórios.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/sobre"
              className="rounded-md border border-ink-300 px-5 py-2.5 text-sm font-medium text-ink-900 transition hover:bg-ink-100 dark:border-ink-600 dark:text-ink-50 dark:hover:bg-ink-900"
            >
              Ler mais
            </Link>
            <a
              href={perfil.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800 dark:bg-ink-100 dark:text-ink-900 dark:hover:bg-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
