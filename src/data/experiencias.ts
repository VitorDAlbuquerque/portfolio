export type Experiencia = {
  id: string;
  cargo: string;
  empresa: string;
  periodo: string;
  descricao: string;
  sigla?: string;
  logoUrl?: string;
  logoAlt?: string;
};

export const experiencias: Experiencia[] = [
  {
    id: "labware-lims-consultant-intern",
    cargo: "Estagiário de consultor LIMS",
    empresa: "LabWare",
    periodo: "Jan 2025 - Atual",
    descricao: "Automação de laboratórios utilizando LIMS",
    sigla: "LW",
    logoUrl: "/images/labware_logo.jfif",
    logoAlt: "Logo da LabWare",
  },
  {
    id: "Monitor de algoritmos e lógica de programação",
    cargo: "Monitor de algoritmos e lógica de programação",
    empresa: "Fatec Zona Leste",
    periodo: "Jan 2024 - Dez 2024",
    descricao: "Auxilio ao professor na disciplina de algoritmos e lógica de programação",
    sigla: "FATEC",
    logoUrl: "/images/FATEC_ZONA_LESTE.png",
    logoAlt: "Logo da Fatec Zona leste",
  },
];

