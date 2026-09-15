export type Trilha = {
  sigla: string;
  nome: string;
  descricao: string;
  modulos: number;
  concluidos: number;
};

export const trilhas: Trilha[] = [
  {
    sigla: "ANA",
    nome: "Anatomia veterinária",
    descricao: "Osteologia, miologia e sistemas do cão e do gato.",
    modulos: 22,
    concluidos: 18,
  },
  {
    sigla: "FAR",
    nome: "Farmacologia",
    descricao: "Cinética, classes de fármacos e posologia clínica.",
    modulos: 18,
    concluidos: 12,
  },
  {
    sigla: "CLI",
    nome: "Clínica de pequenos animais",
    descricao: "Semiologia, diagnóstico diferencial e urgências.",
    modulos: 26,
    concluidos: 11,
  },
  {
    sigla: "PAT",
    nome: "Patologia e microbiologia",
    descricao: "Agentes infecciosos, lesões e interpretação laboratorial.",
    modulos: 16,
    concluidos: 5,
  },
];

export type Flashcard = {
  disciplina: string;
  pergunta: string;
  resposta: string;
};

export const flashcards: Flashcard[] = [
  {
    disciplina: "Farmacologia",
    pergunta:
      "Após quantas meias-vidas um fármaco administrado em intervalos regulares atinge o estado estacionário?",
    resposta:
      "Cerca de 4 a 5 meias-vidas. Para antecipar o efeito, usa-se dose de ataque.",
  },
  {
    disciplina: "Anatomia",
    pergunta: "Quantas vértebras torácicas o cão possui normalmente?",
    resposta:
      "Treze (T1–T13), acompanhando os treze pares de costelas — nove esternais e quatro asternais.",
  },
  {
    disciplina: "Toxicologia",
    pergunta: "Qual o princípio tóxico do chocolate para cães e qual o antídoto?",
    resposta:
      "Teobromina. Não há antídoto específico: descontaminação, carvão ativado, fluidoterapia e controle de convulsões.",
  },
  {
    disciplina: "Clínica",
    pergunta: "O que caracteriza a tríade da cetoacidose diabética felina?",
    resposta:
      "Hiperglicemia, cetonemia/cetonúria e acidose metabólica, geralmente com desidratação acentuada.",
  },
  {
    disciplina: "Patologia",
    pergunta: "Qual exame confirma a leptospirose canina em fase aguda?",
    resposta:
      "Soroaglutinação microscópica (MAT) com títulos pareados, associada a PCR em sangue ou urina.",
  },
  {
    disciplina: "Anestesiologia",
    pergunta: "Por que a acepromazina é evitada em pacientes hipovolêmicos?",
    resposta:
      "Causa bloqueio alfa-1 com vasodilatação e hipotensão prolongada, sem antagonista disponível.",
  },
];

export type Farmaco = {
  nome: string;
  dose: number;
  unidade: string;
  via: string;
  intervalo: string;
  concentracao: number;
  especies: string;
};

export const farmacos: Farmaco[] = [
  { nome: "Meloxicam", dose: 0.2, unidade: "mg/kg", via: "SC/VO", intervalo: "24 h", concentracao: 2, especies: "Cão" },
  { nome: "Amoxicilina + clavulanato", dose: 12.5, unidade: "mg/kg", via: "VO", intervalo: "12 h", concentracao: 50, especies: "Cão e gato" },
  { nome: "Tramadol", dose: 4, unidade: "mg/kg", via: "VO", intervalo: "8 h", concentracao: 50, especies: "Cão" },
  { nome: "Enrofloxacina", dose: 5, unidade: "mg/kg", via: "SC/VO", intervalo: "24 h", concentracao: 25, especies: "Cão" },
  { nome: "Metoclopramida", dose: 0.3, unidade: "mg/kg", via: "SC", intervalo: "8 h", concentracao: 5, especies: "Cão e gato" },
  { nome: "Furosemida", dose: 2, unidade: "mg/kg", via: "IV/IM", intervalo: "12 h", concentracao: 10, especies: "Cão e gato" },
];

export type Caso = {
  area: string;
  titulo: string;
  paciente: string;
  questoes: number;
  nivel: "Básico" | "Intermediário" | "Avançado";
};

export const casos: Caso[] = [
  {
    area: "Cardiologia",
    titulo: "Insuficiência cardíaca congestiva esquerda",
    paciente: "Golden retriever · 6 anos · 32 kg",
    questoes: 14,
    nivel: "Intermediário",
  },
  {
    area: "Toxicologia",
    titulo: "Convulsões após ingestão de chocolate amargo",
    paciente: "SRD · 4 anos · 11 kg",
    questoes: 10,
    nivel: "Básico",
  },
  {
    area: "Endocrinologia",
    titulo: "Poliúria e emagrecimento em felino diabético",
    paciente: "Siamês · 9 anos · 4,2 kg",
    questoes: 12,
    nivel: "Intermediário",
  },
  {
    area: "Cirurgia",
    titulo: "Obstrução intestinal por corpo estranho linear",
    paciente: "Border collie · 2 anos · 18 kg",
    questoes: 16,
    nivel: "Avançado",
  },
];
