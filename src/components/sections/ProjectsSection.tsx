import { ProjectCard } from "@/components/projects/ProjectCard";
import { projetos } from "@/data/projetos";

function comparePeriodoDesc(a: string, b: string) {
  const [ya, sa] = a.split(".").map((v) => Number(v));
  const [yb, sb] = b.split(".").map((v) => Number(v));
  if (Number.isFinite(yb) && Number.isFinite(ya) && yb !== ya) return yb - ya;
  if (Number.isFinite(sb) && Number.isFinite(sa) && sb !== sa) return sb - sa;
  return b.localeCompare(a, "pt-BR");
}

export function ProjectsSection() {
  const sortedProjects = [...projetos].sort((a, b) => comparePeriodoDesc(a.periodo, b.periodo));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <p className="mb-2 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-frieren-text-muted">
          Floresta
          <span className="forest-vine-divider h-6 flex-1" />
        </p>
        <h2 className="font-display text-3xl font-light tracking-wide text-frieren-text">Projetos</h2>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sortedProjects.map((p) => (
          <ProjectCard key={p.id} projeto={p} />
        ))}
      </div>
    </div>
  );
}
