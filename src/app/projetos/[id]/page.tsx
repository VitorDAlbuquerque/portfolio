import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { getProjetoById, projetos } from "@/data/projetos";

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
        href="/#projetos"
        className="mb-10 inline-block text-sm text-frieren-text-md hover:text-frieren-text transition-colors"
      >
        Voltar ao início
      </Link>
      <ProjectDetail projeto={projeto} />
    </div>
  );
}
