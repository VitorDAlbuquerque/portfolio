import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { getProjetoById, projetos } from "@/data/projects";

type Props = { params: { id: string } };

export function generateStaticParams() {
  return projetos.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProjetoById(params.id);
  if (!p) return { title: "Projeto" };
  return { title: p.titulo, description: p.descricaoCurta };
}

export default function ProjetoPage({ params }: Props) {
  const projeto = getProjetoById(params.id);
  if (!projeto) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/projetos"
        className="mb-10 inline-block text-sm text-ink-600 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-100"
      >
        ← Voltar aos projetos
      </Link>
      <ProjectDetail projeto={projeto} />
    </div>
  );
}
