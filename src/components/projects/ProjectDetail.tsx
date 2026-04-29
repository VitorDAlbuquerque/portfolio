"use client";

import { ExternalLink, Github, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { BalancedText } from "@/components/pretext/BalancedText";
import { MultiColumnText } from "@/components/pretext/MultiColumnText";
import { ResponsiveHeading } from "@/components/pretext/ResponsiveHeading";
import type { Projeto } from "@/types/project";
import { PRETEXT_SANS, PRETEXT_SERIF } from "@/lib/font-stacks";
import { fetchRepoInfo, type RepoInfo } from "@/lib/github/fetchRepoInfo";

type ProjectDetailProps = {
  projeto: Projeto;
};

export function ProjectDetail({ projeto }: ProjectDetailProps) {
  const text = (projeto.descricaoLonga ?? projeto.descricaoCurta).trim();
  const parts = text.split(/\n\n+/);
  const head = parts[0] ?? "";
  const tail = parts.slice(1).join("\n\n");
  const coverImages = projeto.imagens?.length ? projeto.imagens : null;
  const primaryRepo =
    projeto.repositorios.principal ?? projeto.repositorios.frontend ?? projeto.repositorios.backend ?? null;

  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);
  const [repoLoading, setRepoLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!primaryRepo) return;
      setRepoLoading(true);
      const info = await fetchRepoInfo(primaryRepo);
      if (cancelled) return;
      setRepoInfo(info);
      setRepoLoading(false);
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [primaryRepo]);

  const repoLinks = useMemo(() => {
    const links: Array<{ label: string; url: string }> = [];
    if (projeto.repositorios.frontend) links.push({ label: "Frontend", url: projeto.repositorios.frontend });
    if (projeto.repositorios.backend) links.push({ label: "Backend", url: projeto.repositorios.backend });
    if (projeto.repositorios.principal) links.push({ label: "Repositório", url: projeto.repositorios.principal });
    return links;
  }, [projeto.repositorios.backend, projeto.repositorios.frontend, projeto.repositorios.principal]);

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <ResponsiveHeading
          as="h1"
          minSize={26}
          maxSize={48}
          mode="box"
          maxLines={3}
          lineHeightRatio={1.12}
          fontFamily={PRETEXT_SANS}
          fontWeight={600}
        >
          {projeto.titulo}
        </ResponsiveHeading>
        <div className="flex flex-wrap items-center gap-2 text-sm text-frieren-text-sm">
          <span className="rounded-sm bg-frieren-surface border border-frieren-border px-3 py-1">
            {projeto.semestre}
          </span>
          <span className="rounded-sm bg-frieren-surface border border-frieren-border px-3 py-1">
            {projeto.periodo}
          </span>
          <span className="rounded-sm bg-frieren-surface border border-frieren-border px-3 py-1">
            {projeto.tipo}
          </span>
          {projeto.colaborativo ? (
            <span className="rounded-sm bg-frieren-amber-deep border border-frieren-amber-dim px-3 py-1 text-frieren-amber-md">
              Colaborativo
            </span>
          ) : null}
          {projeto.destaque ? (
            <span className="rounded-sm bg-frieren-purple-deep border border-frieren-purple-dim px-3 py-1 text-frieren-purple-md">
              Destaque
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {projeto.tecnologias.map((t) => (
            <span
              key={t}
              className="rounded-sm border border-frieren-border px-3 py-1 text-xs text-frieren-text-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {coverImages ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {coverImages.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative aspect-[16/10] overflow-hidden rounded-sm border border-frieren-border bg-frieren-surface"
            >
              <Image
                src={src}
                alt={`Ilustração ${i + 1} do projeto`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      ) : null}

      {repoLinks.length ? (
        <section className="space-y-3">
          <h2 className="font-display font-light tracking-wide text-frieren-text text-xl">Repositórios</h2>
          <div className="flex flex-wrap gap-2">
            {repoLinks.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-frieren-border px-4 py-2 text-sm text-frieren-text-md transition-colors hover:border-frieren-border-md hover:text-frieren-text"
              >
                <Github className="h-4 w-4" aria-hidden />
                {l.label}
                <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
              </a>
            ))}
          </div>

          {repoLoading ? (
            <p className="text-sm text-frieren-text-md">Carregando informações do GitHub…</p>
          ) : repoInfo ? (
            <div className="grid gap-3 rounded-sm border border-frieren-border bg-frieren-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-frieren-text-md">
                <span>{repoInfo.linguagemPrincipal ? `Linguagem: ${repoInfo.linguagemPrincipal}` : "GitHub"}</span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4" aria-hidden />
                  {repoInfo.estrelas}
                </span>
              </div>
              {repoInfo.descricao ? (
                <p className="text-sm text-frieren-text-md">{repoInfo.descricao}</p>
              ) : null}
              {repoInfo.tecnologias.length ? (
                <div className="flex flex-wrap gap-2">
                  {repoInfo.tecnologias.slice(0, 10).map((t) => (
                    <span
                      key={t}
                      className="rounded-sm bg-frieren-deep border border-frieren-border px-2.5 py-0.5 text-xs text-frieren-text-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}

      {tail ? (
        <section className="space-y-4">
          <h2 className="font-display font-light tracking-wide text-frieren-text text-xl">Resumo</h2>
          <MultiColumnText
            columns={2}
            gapRem={1.5}
            fontFamily={PRETEXT_SERIF}
            fontSizePx={17}
            lineHeightPx={28}
          >
            {head}
          </MultiColumnText>
        </section>
      ) : null}

      <section className="space-y-4">
        <h2 className="font-display font-light tracking-wide text-frieren-text text-xl">
          {tail ? "Desenvolvimento" : "Descrição do projeto"}
        </h2>
        <BalancedText fontFamily={PRETEXT_SERIF} fontSizePx={17} lineHeightPx={28} justify>
          {tail ? tail : text}
        </BalancedText>
      </section>

      <section className="space-y-3">
        <h2 className="font-display font-light tracking-wide text-frieren-text text-xl">Tecnologias</h2>
        <ul className="grid list-none gap-2 sm:grid-cols-2">
          {projeto.tecnologias.map((t) => (
            <li
              key={t}
              className="rounded-sm border border-frieren-border px-3 py-2 text-sm text-frieren-text"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
