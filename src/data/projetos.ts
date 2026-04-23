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
  periodo: string; // ex: 2024.1
  disciplinas: string[];
  tipo: "Full-stack" | "Mobile + Backend" | "Frontend" | "Backend" | "Outro";
  colaborativo?: boolean;
  destaque?: boolean;
  imagens?: string[];
}

export const projetos: Projeto[] = [
  {
    id: "pi-1-sem",
    semestre: "1º Semestre",
    titulo: "Projeto Interdisciplinar - 1º Semestre",
    descricaoCurta: "Primeiro projeto interdisciplinar do curso",
    repositorios: {
      principal: "https://github.com/VitorDAlbuquerque/PI-1sem",
    },
    tecnologias: [],
    periodo: "2023.1",
    disciplinas: [],
    tipo: "Outro",
  },
  {
    id: "pi-2-sem",
    semestre: "2º Semestre",
    titulo: "Projeto Interdisciplinar - 2º Semestre",
    descricaoCurta: "Projeto full-stack do segundo semestre",
    repositorios: {
      frontend: "https://github.com/VitorDAlbuquerque/PI-2sem",
      backend: "https://github.com/VitorDAlbuquerque/p1-2sem-back",
    },
    tecnologias: [],
    periodo: "2023.2",
    disciplinas: [],
    tipo: "Full-stack",
  },
  {
    id: "pi-3-sem-lune",
    semestre: "3º Semestre",
    titulo: "Lune",
    descricaoCurta: "Projeto Lune - Desenvolvimento Full-stack",
    repositorios: {
      frontend: "https://github.com/ec-mv-2/Lune-front",
      backend: "https://github.com/ec-mv-2/Lune-back",
    },
    tecnologias: [],
    periodo: "2024.1",
    disciplinas: [],
    tipo: "Full-stack",
    colaborativo: true,
  },
  {
    id: "pi-4-sem",
    semestre: "4º Semestre",
    titulo: "Semaismenos",
    descricaoCurta: "Projeto Semaismenos - Sistema Full-stack",
    repositorios: {
      frontend: "https://github.com/Kauan-afk/pi4",
      backend: "https://github.com/VitorDAlbuquerque/pi4-back",
    },
    tecnologias: [],
    periodo: "2024.2",
    disciplinas: [],
    tipo: "Full-stack",
    colaborativo: true,
  },
  {
    id: "pi-5-sem-agroconecta",
    semestre: "5º Semestre",
    titulo: "AgroConecta",
    descricaoCurta: "Aplicativo mobile para conexão no agronegócio",
    repositorios: {
      frontend: "https://github.com/PI5-AgroConecta-Mobile/AgroConecta",
      backend: "https://github.com/PI5-AgroConecta-Mobile/AGROCONECTA-AP-",
    },
    tecnologias: ["React Native"],
    periodo: "2025.1",
    disciplinas: [],
    tipo: "Mobile + Backend",
    colaborativo: true,
    destaque: true,
  },
];

export function getProjetoById(id: string): Projeto | undefined {
  return projetos.find((p) => p.id === id);
}

