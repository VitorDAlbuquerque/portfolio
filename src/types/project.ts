export type ProjetoTipo = "Full-stack" | "Mobile + Backend" | "Frontend" | "Backend" | "Outro";

export interface Projeto {
  id: string;
  semestre: string;
  titulo: string;
  descricaoCurta: string;
  descricaoLonga?: string;
  repositorios: {
    principal?: string;
    frontend?: string;
    backend?: string;
  };
  tecnologias: string[];
  periodo: string;
  disciplinas: string[];
  tipo: ProjetoTipo;
  colaborativo?: boolean;
  destaque?: boolean;
  imagens?: string[];
}
