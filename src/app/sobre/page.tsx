import Image from "next/image";

import { BalancedText } from "@/components/pretext/BalancedText";
import { perfil } from "@/data/perfil";
import { PRETEXT_SERIF } from "@/lib/font-stacks";
import { calculateAge } from "@/lib/date/calculateAge";

export const metadata = {
  title: "Sobre",
};

export default function SobrePage() {
  const idade = calculateAge(perfil.dataNascimento);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl text-ink-900 dark:text-ink-50">Sobre</h1>
      <div className="mt-8 space-y-8">
        <section className="flex flex-col gap-6 rounded-lg border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900/50 sm:flex-row sm:items-start">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-ink-200 bg-ink-100 dark:border-ink-800 dark:bg-ink-900">
            {perfil.fotoUrl ? (
              <Image src={perfil.fotoUrl} alt={`Foto de ${perfil.nome}`} fill className="object-cover" sizes="112px" />
            ) : null}
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl text-ink-900 dark:text-ink-50">{perfil.nome}</h2>
            <p className="text-sm text-ink-600 dark:text-ink-300">
              {idade} anos · {perfil.trabalho}
            </p>
            <p className="text-sm text-ink-600 dark:text-ink-300">
              {perfil.cursoAtual.curso} — {perfil.cursoAtual.instituicao} ({perfil.cursoAtual.status})
            </p>
          </div>
        </section>

        <BalancedText fontFamily={PRETEXT_SERIF} fontSizePx={18} lineHeightPx={30} justify>
          {`Este site organiza meus projetos interdisciplinares por semestre — trabalhos que conectam requisitos, implementação e documentação em uma narrativa clara.

A tipografia é parte do conteúdo: o Pretext mede texto para manter hierarquia estável e evitar quebras inesperadas em diferentes larguras de tela.`}
        </BalancedText>

        <section className="rounded-lg border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900/50">
          <h2 className="font-serif text-xl text-ink-900 dark:text-ink-50">Formação</h2>
          <ol className="mt-4 space-y-4">
            <li className="rounded-md border border-ink-200 p-4 dark:border-ink-800">
              <p className="text-sm font-medium text-ink-900 dark:text-ink-50">{perfil.cursoAtual.instituicao}</p>
              <p className="text-sm text-ink-600 dark:text-ink-300">{perfil.cursoAtual.curso}</p>
              <p className="text-xs text-ink-500 dark:text-ink-400">{perfil.cursoAtual.status}</p>
            </li>
            <li className="rounded-md border border-ink-200 p-4 dark:border-ink-800">
              <p className="text-sm font-medium text-ink-900 dark:text-ink-50">{perfil.formacao.instituicao}</p>
              <p className="text-sm text-ink-600 dark:text-ink-300">{perfil.formacao.curso}</p>
              <p className="text-xs text-ink-500 dark:text-ink-400">{perfil.formacao.status}</p>
            </li>
          </ol>
        </section>

        <section className="rounded-lg border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900/50">
          <h2 className="font-serif text-xl text-ink-900 dark:text-ink-50">Critérios do portfólio</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-700 dark:text-ink-200">
            <li>Clareza na descrição do problema e do recorte.</li>
            <li>Articulação honesta entre disciplinas e limitações.</li>
            <li>Documentação reprodutível quando aplicável.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
