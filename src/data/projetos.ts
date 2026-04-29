import type { Projeto } from "@/types/project";

export const projetos: Projeto[] = [
  {
    id: "pi-1-sem",
    semestre: "1º Semestre",
    titulo: "Glowing Sea",
    descricaoCurta: "Primeiro projeto interdisciplinar, ecommerce de produtos com foco em animais marinhos",
    repositorios: {
      principal: "https://github.com/VitorDAlbuquerque/PI-1sem",
    },
    tecnologias: ["Html", "CSS", "JavaScript"],
    periodo: "2023.2",
    disciplinas: ["Desenvolvimento Web", "Engenharia de Software"],
    tipo: "Frontend",
    imagens: ["/images/pi1Imagem.jpg"],
  },
  {
    id: "pi-2-sem",
    semestre: "2º Semestre",
    titulo: "Kiwi",
    descricaoCurta: "Segundo projeto interdisciplinar, sistema de gerenciamento de filmes",
    repositorios: {
      frontend: "https://github.com/VitorDAlbuquerque/PI-2sem",
      backend: "https://github.com/VitorDAlbuquerque/p1-2sem-back",
    },
    tecnologias: ["Html", "CSS", "TypeScript", "React", "Node.js", "postgreSQL"],
    periodo: "2024.1",
    disciplinas: ["Desenvolvimento Web", "Engenharia de Software", "Banco de dados relacional"],
    tipo: "Full-stack",
    destaque: true,
    imagens: ["/images/PI2Imagemjpg.jpg"],
  },
  {
    id: "pi-3-sem-lune",
    semestre: "3º Semestre",
    titulo: "Lune",
    descricaoCurta: "Terceiro projeto interdisciplinar, sistema para facilitar a procura de trabalho",
    repositorios: {
      frontend: "https://github.com/ec-mv-2/Lune-front",
      backend: "https://github.com/ec-mv-2/Lune-back",
    },
    tecnologias: ["Html", "CSS", "TypeScript", "React", "Node.js", "MongoDB"],
    periodo: "2024.2",
    disciplinas: ["Banco de dados não relacional", "Desenvolvimento Web", "Gestão ágil de projetos de software"],
    tipo: "Full-stack",
    colaborativo: true,
    imagens: ["/images/pi3Imagemjpg.jpg"],
  },
  {
    id: "pi-4-sem",
    semestre: "4º Semestre",
    titulo: "Semaismenos",
    descricaoCurta: "Quarto projeto interdisciplinar, parser feito para encontrar imóveis de leilão",
    repositorios: {
      frontend: "https://github.com/Kauan-afk/pi4",
      backend: "https://github.com/VitorDAlbuquerque/pi4-back",
    },
    tecnologias: ["TypeScript", "React", "Python", "Firebase", "Tailwind CSS"],
    periodo: "2025.1",
    disciplinas: ["Laboratório de desenvolvimento web", "Integração e entrega contínua"],
    tipo: "Full-stack",
    colaborativo: true,
    destaque: true,
    imagens: ["/images/pi4imagemjpg.jpg"],
  },
  {
    id: "pi-5-sem-agroconecta",
    semestre: "5º Semestre",
    titulo: "AgroConecta",
    descricaoCurta: "Quinto projeto interdisciplinar, aplicativo mobile para intermédio de produtos agrícolas",
    repositorios: {
      frontend: "https://github.com/PI5-AgroConecta-Mobile/AgroConecta",
      backend: "https://github.com/PI5-AgroConecta-Mobile/AGROCONECTA-AP-",
    },
    tecnologias: ["React Native"],
    periodo: "2025.2",
    disciplinas: ["Laboratório de desenvolvimento para dispositivos móveis", "Programação para dispositivos móveis"],
    tipo: "Mobile + Backend",
    colaborativo: true,
    destaque: true,
    imagens: ["/images/pi5imagemjpg.jpg"],
  },
];

export function getProjetoById(id: string): Projeto | undefined {
  return projetos.find((p) => p.id === id);
}

