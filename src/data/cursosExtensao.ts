export type CursoExtensao = {
  id: string;
  instituicao: string;
  curso: string;
  periodo: string;
  descricao: string;
  sigla?: string;
  logoUrl?: string;
  logoAlt?: string;
};

export const cursosExtensao: CursoExtensao[] = [
  {
    id: "curso-google",
    instituicao: "Google Cloud",
    curso: "Computing Foundations",
    periodo: "Concluído",
    descricao: "Google cloud computing foundations.",
    sigla: "GC",
    logoUrl: "/images/cloudComputingFoundations.png",
    logoAlt: "Google cloud badge",
  },
];
