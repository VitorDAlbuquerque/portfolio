import Image from "next/image";
import Link from "next/link";

import { ResponsiveHeading } from "@/components/pretext/ResponsiveHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ForestAbout } from "@/components/sobre/ForestAbout";
import { cursosExtensao } from "@/data/cursosExtensao";
import { educacao } from "@/data/educacao";
import { experiencias } from "@/data/experiencias";
import { projetos } from "@/data/projetos";
import { perfil } from "@/data/perfil";
import { calculateAge } from "@/lib/date/calculateAge";
import { PRETEXT_SANS } from "@/lib/font-stacks";

type TimelineEntry = {
  id: string;
  titulo: string;
  subtitulo: string;
  periodo: string;
  descricao: string;
  sigla?: string;
  logoUrl?: string;
  logoAlt?: string;
};

function TimelineList({ items }: { items: TimelineEntry[] }) {
  return (
    <div className="mt-8 space-y-4">
      {items.map((item, index) => (
        <article key={item.id} className="relative pl-20 sm:pl-24">
          <div className="absolute left-0 top-2 flex w-16 flex-col items-center sm:w-20">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-md border border-frieren-border bg-white p-1.5 sm:h-16 sm:w-16">
              {item.logoUrl ? (
                <Image
                  src={item.logoUrl}
                  alt={item.logoAlt ?? `Logo de ${item.subtitulo}`}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xs font-semibold tracking-wider text-frieren-purple-md">
                  {item.sigla ?? item.subtitulo.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            {index < items.length - 1 ? (
              <span className="mt-2 h-16 border-l border-dashed border-frieren-border" aria-hidden />
            ) : null}
          </div>

          <div className="rounded-sm border border-frieren-border bg-frieren-surface p-5 sm:p-6">
            <h3 className="font-display text-2xl font-light tracking-wide text-frieren-purple">
              {item.titulo}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-frieren-text-sm">
              <span className="rounded-sm border border-frieren-border bg-frieren-deep px-2 py-1 text-frieren-text-md">
                {item.subtitulo}
              </span>
              <span aria-hidden>•</span>
              <span>{item.periodo}</span>
            </div>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-frieren-text-md">
              {item.descricao}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ForestSilhouette() {
  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-0 top-0 h-full w-auto max-w-[45%] select-none pointer-events-none"
      aria-hidden
    >
      <polygon points="260,480 200,200 320,200" fill="#0E1A0C" opacity="0.9" />
      <polygon points="290,480 240,260 340,260" fill="#0E1A0C" opacity="0.7" />
      <polygon points="220,480 150,180 290,180" fill="#1A2C18" opacity="0.85" />
      <polygon points="310,480 255,220 365,220" fill="#1A2C18" opacity="0.6" />
      <polygon points="180,480 110,160 250,160" fill="#243A22" opacity="0.9" />
      <polygon points="260,480 205,210 315,210" fill="#243A22" opacity="0.75" />
      <rect x="140" y="380" width="180" height="100" fill="#0B1210" />
      <defs>
        <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B1210" stopOpacity="0" />
          <stop offset="100%" stopColor="#0B1210" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect x="0" y="300" width="320" height="180" fill="url(#mist)" />
    </svg>
  );
}

export default function HomePage() {
  const destaques = projetos
    .filter((p) => p.destaque)
    .sort((a, b) => b.periodo.localeCompare(a.periodo))
    .slice(0, 3);
  const idade = calculateAge(perfil.dataNascimento);

  return (
    <div>
      <section id="inicio" className="spa-section relative overflow-hidden bg-frieren-base">
        <ForestSilhouette />
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-frieren-text-muted flex items-center gap-3">
            {perfil.nome} - {idade} anos
            <span className="forest-vine-divider h-5 flex-1" />
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
            Olá! Sou um desenvolvedor full stack :)
          </ResponsiveHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-frieren-text-md">
            Navegue para conhecer mais sobre a minha trajetória na área da computação
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="#projetos"
              className="rounded-sm bg-frieren-purple-deep px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-frieren-purple border border-frieren-purple-dim hover:bg-frieren-purple-dim hover:border-frieren-purple-md transition-colors duration-300"
            >
              Meus projetos
            </Link>
            <Link
              href="#sobre"
              className="rounded-sm border border-frieren-border px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-frieren-text-md hover:border-frieren-border-md hover:text-frieren-text transition-colors duration-300"
            >
              Sobre mim
            </Link>
          </div>
        </div>
      </section>
      <div className="section-vine-divider" aria-hidden />

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-frieren-text-muted flex items-center gap-3 mb-2">
              Seleção
              <span className="forest-vine-divider h-5 flex-1" />
            </p>
            <h2 className="font-display font-light tracking-wide text-frieren-text text-2xl">Projetos em destaque</h2>
          </div>
          <Link
            href="#projetos"
            className="inline-flex items-center gap-1 text-sm text-frieren-purple-md underline-offset-4 hover:underline hover:text-frieren-purple transition-colors"
          >
            Todos os projetos
            <Image
              src="/svg/forest_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 opacity-80"
              aria-hidden
            />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {destaques.map((p) => (
            <ProjectCard key={p.id} projeto={p} />
          ))}
        </div>
      </section>

      <section id="sobre" className="spa-section py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-frieren-text-muted">
            Experiência profissional
            <span className="forest-vine-divider h-6 flex-1" />
          </p>
          <h2 className="font-display text-3xl font-light tracking-wide text-frieren-text">Experiências</h2>
          <TimelineList
            items={experiencias.map((e) => ({
              id: e.id,
              titulo: e.cargo,
              subtitulo: e.empresa,
              periodo: e.periodo,
              descricao: e.descricao,
              sigla: e.sigla,
              logoUrl: e.logoUrl,
              logoAlt: e.logoAlt,
            }))}
          />
        </div>
        <div className="pt-10">
          <ForestAbout />
        </div>
      </section>
      <div className="section-vine-divider" aria-hidden />

      <section id="educacao" className="spa-section py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-frieren-text-muted">
            Formação acadêmica
            <span className="forest-vine-divider h-6 flex-1" />
          </p>
          <h2 className="font-display text-3xl font-light tracking-wide text-frieren-text">Formação</h2>
          <TimelineList
            items={educacao.map((e) => ({
              id: e.id,
              titulo: e.curso,
              subtitulo: e.instituicao,
              periodo: e.periodo,
              descricao: e.descricao,
              sigla: e.sigla,
              logoUrl: e.logoUrl,
              logoAlt: e.logoAlt,
            }))}
          />

          {cursosExtensao.length > 0 && (
            <>
              <div className="mt-12">
                <h3 className="font-display text-3xl font-light tracking-wide text-frieren-text">
                  Cursos de extensão
                </h3>
              </div>
              <TimelineList
                items={cursosExtensao.map((e) => ({
                  id: e.id,
                  titulo: e.curso,
                  subtitulo: e.instituicao,
                  periodo: e.periodo,
                  descricao: e.descricao,
                  sigla: e.sigla,
                  logoUrl: e.logoUrl,
                  logoAlt: e.logoAlt,
                }))}
              />
            </>
          )}
        </div>
      </section>
      <div className="section-vine-divider" aria-hidden />

      <section id="skills" className="spa-section py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-frieren-text-muted">
            Competências
            <span className="forest-vine-divider h-6 flex-1" />
          </p>
          <h2 className="font-display text-3xl font-light tracking-wide text-frieren-text">Skills</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-sm border border-frieren-border bg-frieren-surface p-5 sm:p-6">
              <h3 className="font-display text-2xl font-light tracking-wide text-frieren-purple">Hard Skills</h3>
              <ul className="mt-4 space-y-2 text-base text-frieren-text-md">
                <li>TypeScript</li>
                <li>React.JS</li>
                <li>Python</li>
                <li>Java</li>
                <li>SQLServer</li>
                <li>MongoDB</li>
              </ul>
            </article>

            <article className="rounded-sm border border-frieren-border bg-frieren-surface p-5 sm:p-6">
              <h3 className="font-display text-2xl font-light tracking-wide text-frieren-purple">Soft Skills</h3>
              <ul className="mt-4 space-y-2 text-base text-frieren-text-md">
                <li>Comunicação</li>
                <li>Aprendizagem contínua</li>
                <li>Curiosidade</li>
                <li>Resolução de problemas</li>
              </ul>
            </article>

            <article className="rounded-sm border border-frieren-border bg-frieren-surface p-5 sm:p-6">
              <h3 className="font-display text-2xl font-light tracking-wide text-frieren-purple">Idiomas</h3>
              <ul className="mt-4 space-y-2 text-base text-frieren-text-md">
                <li>Português - Língua materna</li>
                <li>Inglês - avançado</li>
                <li>Mandarim - básico</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
      <div className="section-vine-divider" aria-hidden />

      <section id="projetos" className="spa-section bg-frieren-base">
        <ProjectsSection />
      </section>
    </div>
  );
}
