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
        <div className="flex flex-wrap items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
          <span className="rounded-full bg-ink-100 px-3 py-1 dark:bg-ink-800">{projeto.semestre}</span>
          <span className="rounded-full bg-ink-100 px-3 py-1 dark:bg-ink-800">{projeto.periodo}</span>
          <span className="rounded-full bg-ink-100 px-3 py-1 dark:bg-ink-800">{projeto.tipo}</span>
          {projeto.colaborativo ? (
            <span className="rounded-full bg-ink-900 px-3 py-1 text-white dark:bg-ink-100 dark:text-ink-900">
              Colaborativo
            </span>
          ) : null}
          {projeto.destaque ? (
            <span className="rounded-full bg-accent px-3 py-1 text-white dark:bg-accent-muted dark:text-ink-950">
              Destaque
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {projeto.tecnologias.map((t) => (
            <span
              key={t}
              className="rounded-full border border-ink-200 px-3 py-1 text-xs text-ink-700 dark:border-ink-700 dark:text-ink-200"
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
              className="relative aspect-[16/10] overflow-hidden rounded-lg border border-ink-200 bg-ink-100 dark:border-ink-800 dark:bg-ink-900"
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
          <h2 className="font-serif text-xl text-ink-900 dark:text-ink-50">Repositórios</h2>
          <div className="flex flex-wrap gap-2">
            {repoLinks.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-ink-300 px-4 py-2 text-sm font-medium text-ink-900 transition hover:bg-ink-100 dark:border-ink-600 dark:text-ink-50 dark:hover:bg-ink-900"
              >
                <Github className="h-4 w-4" aria-hidden />
                {l.label}
                <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
              </a>
            ))}
          </div>

          {repoLoading ? (
            <p className="text-sm text-ink-600 dark:text-ink-300">Carregando informações do GitHub…</p>
          ) : repoInfo ? (
            <div className="grid gap-3 rounded-lg border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900/40">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-ink-600 dark:text-ink-300">
                <span>{repoInfo.linguagemPrincipal ? `Linguagem: ${repoInfo.linguagemPrincipal}` : "GitHub"}</span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4" aria-hidden />
                  {repoInfo.estrelas}
                </span>
              </div>
              {repoInfo.descricao ? (
                <p className="text-sm text-ink-700 dark:text-ink-200">{repoInfo.descricao}</p>
              ) : null}
              {repoInfo.tecnologias.length ? (
                <div className="flex flex-wrap gap-2">
                  {repoInfo.tecnologias.slice(0, 10).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-ink-100 px-2.5 py-0.5 text-xs text-ink-700 dark:bg-ink-800 dark:text-ink-200"
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
          <h2 className="font-serif text-xl text-ink-900 dark:text-ink-50">Resumo</h2>
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
        <h2 className="font-serif text-xl text-ink-900 dark:text-ink-50">
          {tail ? "Desenvolvimento" : "Texto"}
        </h2>
        <BalancedText fontFamily={PRETEXT_SERIF} fontSizePx={17} lineHeightPx={28} justify>
          {tail ? tail : text}
        </BalancedText>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl text-ink-900 dark:text-ink-50">Tecnologias e métodos</h2>
        <ul className="grid list-none gap-2 sm:grid-cols-2">
          {projeto.tecnologias.map((t) => (
            <li
              key={t}
              className="rounded-md border border-ink-200 px-3 py-2 text-sm text-ink-800 dark:border-ink-800 dark:text-ink-100"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
