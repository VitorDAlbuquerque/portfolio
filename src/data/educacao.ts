export type Educacao = {
  id: string;
  instituicao: string;
  curso: string;
  periodo: string;
  descricao: string;
  sigla?: string;
  logoUrl?: string;
  logoAlt?: string;
};

export const educacao: Educacao[] = [
  {
    id: "fatec-dsm",
    instituicao: "Fatec Zona Leste",
    curso: "Desenvolvimento de Software Multiplataforma",
    periodo: "Cursando",
    descricao:
      "Graduação focada em desenvolvimento full stack, arquitetura de software e práticas de engenharia aplicadas a projetos interdisciplinares.",
    sigla: "FATEC",
    logoUrl: "/images/FATEC_ZONA_LESTE.png",
    logoAlt: "Logo da Fatec Zona Leste",
  },
  {
    id: "etec-ii",
    instituicao: "Etec São Mateus",
    curso: "Informática para Internet integrado ao Ensino Médio",
    periodo: "Concluído",
    descricao:
      "Formação técnica em programação, web e fundamentos de computação, consolidando a base para atuação prática em desenvolvimento.",
    sigla: "ETEC",
    logoUrl: "/images/ETEC_SAO_MATEUS.png",
    logoAlt: "Logo da Etec São Mateus",
  },
];

