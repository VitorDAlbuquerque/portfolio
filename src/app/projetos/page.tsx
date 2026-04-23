"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { projetos } from "@/data/projects";

type SortKey = "recent" | "semestre" | "destaque";

function comparePeriodoDesc(a: string, b: string) {
  // formato esperado: "YYYY.N"
  const [ya, sa] = a.split(".").map((v) => Number(v));
  const [yb, sb] = b.split(".").map((v) => Number(v));
  if (Number.isFinite(yb) && Number.isFinite(ya) && yb !== ya) return yb - ya;
  if (Number.isFinite(sb) && Number.isFinite(sa) && sb !== sa) return sb - sa;
  return b.localeCompare(a, "pt-BR");
}

export default function ProjetosPage() {
  const semestres = useMemo(() => {
    const s = new Set<string>();
    projetos.forEach((p) => s.add(p.semestre));
    return Array.from(s).sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, []);

  const tipos = useMemo(() => {
    const s = new Set<string>();
    projetos.forEach((p) => s.add(p.tipo));
    return Array.from(s).sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, []);

  const tecnologias = useMemo(() => {
    const s = new Set<string>();
    projetos.forEach((p) => p.tecnologias.forEach((t) => s.add(t)));
    return Array.from(s).sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, []);

  const [q, setQ] = useState("");
  const [semestre, setSemestre] = useState<string | "">("");
  const [tipo, setTipo] = useState<string | "">("");
  const [tecnologia, setTecnologia] = useState<string | "">("");
  const [onlyDestaque, setOnlyDestaque] = useState(false);
  const [sort, setSort] = useState<SortKey>("recent");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const base = projetos.filter((p) => {
      if (semestre && p.semestre !== semestre) return false;
      if (tipo && p.tipo !== tipo) return false;
      if (tecnologia && !p.tecnologias.includes(tecnologia)) return false;
      if (onlyDestaque && !p.destaque) return false;

      if (!query) return true;
      const hay = [
        p.titulo,
        p.descricaoCurta,
        p.semestre,
        p.tipo,
        p.periodo,
        ...(p.tecnologias ?? []),
        ...(p.disciplinas ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });

    const sorted = [...base].sort((a, b) => {
      if (sort === "destaque") {
        if (!!b.destaque !== !!a.destaque) return b.destaque ? 1 : -1;
        return comparePeriodoDesc(a.periodo, b.periodo);
      }
      if (sort === "semestre") {
        return a.semestre.localeCompare(b.semestre, "pt-BR");
      }
      return comparePeriodoDesc(a.periodo, b.periodo);
    });

    return sorted;
  }, [onlyDestaque, q, semestre, sort, tecnologia, tipo]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-serif text-3xl text-ink-900 dark:text-ink-50">Projetos</h1>
        <p className="mt-3 text-ink-600 dark:text-ink-300">
          Busque e filtre por semestre, tipo e tecnologia. Os cards mantêm hierarquia e truncamento
          estáveis graças ao Pretext.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900/40">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">
                Busca
              </label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Título, tecnologia, semestre…"
                className="mt-2 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 outline-none ring-accent/30 focus:ring-4 dark:border-ink-800 dark:bg-ink-950/40 dark:text-ink-50"
              />
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">
                Semestre
              </label>
              <select
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
                className="mt-2 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 dark:border-ink-800 dark:bg-ink-950/40 dark:text-ink-50"
              >
                <option value="">Todos</option>
                {semestres.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">
                Tipo
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="mt-2 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 dark:border-ink-800 dark:bg-ink-950/40 dark:text-ink-50"
              >
                <option value="">Todos</option>
                {tipos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">
                Tecnologia
              </label>
              <select
                value={tecnologia}
                onChange={(e) => setTecnologia(e.target.value)}
                className="mt-2 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 dark:border-ink-800 dark:bg-ink-950/40 dark:text-ink-50"
              >
                <option value="">Todas</option>
                {tecnologias.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-700 dark:text-ink-200">
              <input
                type="checkbox"
                checked={onlyDestaque}
                onChange={(e) => setOnlyDestaque(e.target.checked)}
                className="h-4 w-4 accent-ink-900 dark:accent-ink-100"
              />
              Apenas destaques
            </label>

            <div>
              <label className="text-xs font-medium uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">
                Ordenação
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="mt-2 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 dark:border-ink-800 dark:bg-ink-950/40 dark:text-ink-50"
              >
                <option value="recent">Mais recente primeiro</option>
                <option value="semestre">Por semestre</option>
                <option value="destaque">Destaques primeiro</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setQ("");
                setSemestre("");
                setTipo("");
                setTecnologia("");
                setOnlyDestaque(false);
                setSort("recent");
              }}
              className="w-full rounded-md border border-ink-300 px-4 py-2 text-sm font-medium text-ink-900 transition hover:bg-ink-100 dark:border-ink-600 dark:text-ink-50 dark:hover:bg-ink-900"
            >
              Limpar filtros
            </button>
          </div>
        </aside>

        <div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.id} projeto={p} />
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 text-sm text-ink-600 dark:text-ink-400">
              Nenhum projeto encontrado com os filtros atuais.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
