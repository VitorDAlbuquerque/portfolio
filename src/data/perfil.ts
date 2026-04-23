export type CursoInfo = {
  instituicao: string;
  curso: string;
  status: string;
};

export type Perfil = {
  nome: string;
  dataNascimento: string; // ISO yyyy-mm-dd
  trabalho: string;
  cursoAtual: CursoInfo;
  formacao: CursoInfo;
  linkedin: string;
  github: string;
  fotoUrl?: string;
};

export const perfil: Perfil = {
  nome: "Vitor Albuquerque",
  dataNascimento: "2005-03-02",
  trabalho: "Automação de laboratório utilizando LIMS",
  cursoAtual: {
    instituicao: "Fatec Zona Leste",
    curso: "Desenvolvimento de Software Multiplataforma",
    status: "Cursando",
  },
  formacao: {
    instituicao: "Etec São Mateus",
    curso: "Informática para Internet (Integrado ao Ensino Médio)",
    status: "Concluído",
  },
  linkedin: "https://www.linkedin.com/in/vitor-albuquerque-2027b6229/",
  github: "https://github.com/VitorDAlbuquerque",
};

