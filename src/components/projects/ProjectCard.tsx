"use client";

import { ArrowUpRight, BadgeCheck, GitBranch, Github, Laptop, Server, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ResponsiveHeading } from "@/components/pretext/ResponsiveHeading";
import { TruncatedText } from "@/components/pretext/TruncatedText";
import type { Projeto } from "@/types/project";
import { PRETEXT_SANS } from "@/lib/font-stacks";

type ProjectCardProps = {
  projeto: Projeto;
};

function getTipoIcon(tipo: Projeto["tipo"]) {
  switch (tipo) {
    case "Mobile + Backend":
      return Smartphone;
    case "Frontend":
      return Laptop;
    case "Backend":
      return Server;
    case "Full-stack":
      return GitBranch;
    default:
      return BadgeCheck;
  }
}

export function ProjectCard({ projeto }: ProjectCardProps) {
  const cover = projeto.imagens?.[0] ?? "/images/placeholder-1.svg";
  const TipoIcon = getTipoIcon(projeto.tipo);
  const repoPrimary =
    projeto.repositorios.principal ?? projeto.repositorios.frontend ?? projeto.repositorios.backend ?? null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-ink-800 dark:bg-ink-900/40">
      <Link href={`/projetos/${projeto.id}`} className="relative block aspect-[16/10] w-full overflow-hidden bg-ink-100 dark:bg-ink-800">
        <Image
          src={cover}
          alt=""
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-600 dark:text-ink-300">
          <span className="rounded-full bg-ink-100 px-2.5 py-1 dark:bg-ink-800">{projeto.semestre}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-2.5 py-1 dark:bg-ink-800">
            <TipoIcon className="h-3.5 w-3.5" aria-hidden />
            {projeto.tipo}
          </span>
          {projeto.colaborativo ? (
            <span className="rounded-full bg-ink-900 px-2.5 py-1 text-white dark:bg-ink-100 dark:text-ink-900">
              Colaborativo
            </span>
          ) : null}
          {projeto.destaque ? (
            <span className="rounded-full bg-accent px-2.5 py-1 text-white dark:bg-accent-muted dark:text-ink-950">
              Destaque
            </span>
          ) : null}
        </div>

        <div className="min-h-[3.5rem]">
          <ResponsiveHeading
            as="h2"
            minSize={15}
            maxSize={22}
            mode="box"
            maxLines={2}
            lineHeightRatio={1.2}
            fontFamily={PRETEXT_SANS}
            fontWeight={600}
          >
            {projeto.titulo}
          </ResponsiveHeading>
        </div>

        <div className="min-h-[4.5rem]">
          <TruncatedText lines={3} fontSizePx={15} lineHeightPx={24}>
            {projeto.descricaoCurta}
          </TruncatedText>
        </div>

        <div className="flex flex-wrap gap-2">
          {projeto.tecnologias.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full bg-ink-100 px-2.5 py-0.5 text-xs text-ink-700 dark:bg-ink-800 dark:text-ink-200"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs text-ink-500 dark:text-ink-400">
          <span className="truncate">{projeto.periodo}</span>
          <Link
            href={`/projetos/${projeto.id}`}
            className="inline-flex items-center gap-1 font-medium text-accent dark:text-accent-muted"
          >
            Ver projeto
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <div className="flex items-center gap-3 pt-1 text-xs">
          {projeto.repositorios.frontend ? (
            <a
              href={projeto.repositorios.frontend}
              target="_blank"
              rel="noreferrer"
              className="text-ink-600 underline-offset-4 hover:underline dark:text-ink-300"
            >
              Frontend
            </a>
          ) : null}
          {projeto.repositorios.backend ? (
            <a
              href={projeto.repositorios.backend}
              target="_blank"
              rel="noreferrer"
              className="text-ink-600 underline-offset-4 hover:underline dark:text-ink-300"
            >
              Backend
            </a>
          ) : null}
          {repoPrimary ? (
            <a
              href={repoPrimary}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1 text-ink-600 underline-offset-4 hover:underline dark:text-ink-300"
              aria-label="Abrir no GitHub"
              title="Abrir no GitHub"
            >
              <Github className="h-4 w-4" aria-hidden />
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
