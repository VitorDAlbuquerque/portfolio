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
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-frieren-border border-t-2 border-t-frieren-purple-dim bg-frieren-surface transition-colors duration-300 hover:border-frieren-border-md hover:border-t-frieren-purple">
      <Link
        href={`/projetos/${projeto.id}`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-frieren-deep"
      >
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
        <div className="flex flex-wrap items-center gap-2 text-xs text-frieren-text-sm">
          <span className="rounded-sm bg-frieren-surface border border-frieren-border px-2 py-0.5">
            {projeto.semestre}
          </span>
          <span className="inline-flex items-center gap-1 rounded-sm bg-frieren-surface border border-frieren-border px-2 py-0.5">
            <TipoIcon className="h-3.5 w-3.5" aria-hidden />
            {projeto.tipo}
          </span>
          {projeto.colaborativo ? (
            <span className="rounded-sm bg-frieren-amber-deep border border-frieren-amber-dim px-2 py-0.5 text-frieren-amber-md">
              Colaborativo
            </span>
          ) : null}
          {projeto.destaque ? (
            <span className="rounded-sm bg-frieren-purple-deep border border-frieren-purple-dim px-2 py-0.5 text-frieren-purple-md">
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
              className="rounded-sm bg-frieren-surface border border-frieren-border px-2 py-0.5 text-xs text-frieren-text-sm"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs text-frieren-text-md">
          <span className="truncate">{projeto.periodo}</span>
          <Link
            href={`/projetos/${projeto.id}`}
            className="inline-flex items-center gap-1 text-frieren-purple-md underline-offset-4 hover:text-frieren-purple hover:underline transition-colors"
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
              className="text-frieren-text-md underline-offset-4 hover:underline hover:text-frieren-text transition-colors"
            >
              Frontend
            </a>
          ) : null}
          {projeto.repositorios.backend ? (
            <a
              href={projeto.repositorios.backend}
              target="_blank"
              rel="noreferrer"
              className="text-frieren-text-md underline-offset-4 hover:underline hover:text-frieren-text transition-colors"
            >
              Backend
            </a>
          ) : null}
          {repoPrimary ? (
            <a
              href={repoPrimary}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1 text-frieren-text-md underline-offset-4 hover:underline hover:text-frieren-text transition-colors"
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
