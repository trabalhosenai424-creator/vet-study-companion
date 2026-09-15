import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Brain, CheckCircle2, Filter, RotateCcw, Sparkles, Target, Trophy, XCircle } from "lucide-react";
import { flashcards, trilhas } from "@/data/conteudo";

export const Route = createFileRoute("/questoes")({
  head: () => ({ meta: [{ title: "VetPro — Banco de questões" }, { name: "description", content: "Banco de questões e simulados de Medicina Veterinária." }] }),
  component: Questoes,
});

type Question = { id: number; discipline: string; topic: string; question: string; options: string[]; answer: number; explanation: string };

const questions: Question[] = [
  { id: 1, discipline: "Farmacologia", topic: "Farmacocinética", question: "Qual processo descreve a passagem de um fármaco do local de administração para a circulação sistêmica?", options: ["Distribuição", "Absorção", "Metabolismo", "Excreção"], answer: 1, explanation: "Absorção é a entrada do fármaco na circulação sistêmica a partir do local de administração, quando essa etapa é necessária." },
  { id: 2, discipline: "Clínica de pequenos animais", topic: "Toxicologia", question: "Em um cão com suspeita de intoxicação por chocolate, qual informação é especialmente importante para estimar o risco?", options: ["Cor dos olhos", "Peso corporal e quantidade/tipo de chocolate ingerido", "Comprimento da cauda", "Raça isoladamente"], answer: 1, explanation: "A avaliação do risco depende de fatores como peso corporal e exposição à teobromina/cafeína, relacionados à quantidade e ao tipo de chocolate." },
  { id: 3, discipline: "Clínica de pequenos animais", topic: "Endocrinologia", question: "Qual alteração metabólica é característica da cetoacidose diabética?", options: ["Acidose metabólica associada à produção de corpos cetônicos", "Alcalose respiratória isolada", "Hipoglicemia obrigatória", "Ausência de alterações eletrolíticas"], answer: 0, explanation: "A cetoacidose diabética envolve produção de corpos cetônicos e acidose metabólica, além de alterações hidroeletrolíticas que precisam ser avaliadas." },
  { id: 4, discipline: "Patologia e microbiologia", topic: "Diagnóstico", question: "Qual é a principal finalidade de correlacionar histórico, exame físico e exames complementares?", options: ["Substituir o exame físico", "Construir e refinar hipóteses diagnósticas", "Evitar qualquer diagnóstico diferencial", "Escolher tratamento sem avaliação do paciente"], answer: 1, explanation: "A integração dos dados clínicos permite formular, priorizar e refinar hipóteses diagnósticas de maneira sistemática." },
  { id: 5, discipline: "Anatomia veterinária", topic: "Anatomia", question: "Em anatomia, qual termo indica uma estrutura localizada mais próxima do plano mediano?", options: ["Lateral", "Medial", "Distal", "Caudal"], answer: 1, explanation: "Medial descreve uma posição mais próxima do plano mediano; lateral indica posição mais afastada dele." },
  { id: 6, discipline: "Farmacologia", topic: "Farmacodinâmica", question: "Farmacodinâmica está principalmente relacionada a quê?", options: ["O que o organismo faz com o fármaco", "O que o fármaco faz no organismo", "Apenas à excreção renal", "Somente à absorção intestinal"], answer: 1, explanation: "Farmacodinâmica estuda os efeitos dos fármacos e seus mecanismos de ação no organismo. Farmacocinética descreve o que o organismo faz com o fármaco." },
];

function Questoes() {
  const [discipline, setDiscipline] = useState("Todas");
  const [mode, setMode] = useState<"bank" | "quiz">("bank");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);

  const filtered = useMemo(() => discipline === "Todas" ? questions : questions.filter((q) => q.discipline === discipline), [discipline]);
  const question = filtered[current % Math.max(filtered.length, 1)];
  const progress = filtered.length ? ((answered / filtered.length) * 100) : 0;

  function choose(index: number) {
    if (selected !== null || !question) return;
    setSelected(index);
    setAnswered((value) => value + 1);
    if (index === question.answer) setScore((value) => value + 1);
  }

  function next() {
    if (current + 1 >= filtered.length) { setFinished(true); return; }
    setCurrent((value) => value + 1);
    setSelected(null);
  }

  function reset() { setCurrent(0); setSelected(null); setScore(0); setAnswered(0); setFinished(false); }

  if (mode === "quiz") {
    return <QuizView question={question} current={current} total={filtered.length} selected={selected} score={score} finished={finished} onChoose={choose} onNext={next} onReset={reset} />;
  }

  return (
    <div className="min-h-screen bg-background"><div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="label-mono text-primary">INTELLIGENCE / PRACTICE</p><h1 className="mt-2 text-3xl font-semibold">Banco de questões</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">Pratique por disciplina, identifique lacunas e transforme seus erros em revisão.</p></div><button type="button" onClick={() => { reset(); setMode("quiz"); }} className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><Target size={16} /> Iniciar simulado</button></header>
      <section className="mt-7 grid gap-4 sm:grid-cols-3"><Stat icon={Brain} label="Questões disponíveis" value={String(questions.length)} /><Stat icon={CheckCircle2} label="Acertos na sessão" value={`${score}/${answered}`} /><Stat icon={Trophy} label="Aproveitamento" value={answered ? `${Math.round((score / answered) * 100)}%` : "—"} /></section>
      <section className="mt-7 rounded-xl border border-border bg-card p-4"><div className="flex flex-wrap items-center gap-3"><Filter size={15} className="text-muted-foreground" /><span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Disciplina</span><button type="button" onClick={() => setDiscipline("Todas")} className={`rounded-full border px-3 py-1.5 text-xs ${discipline === "Todas" ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`}>Todas</button>{trilhas.map((item) => <button key={item.sigla} type="button" onClick={() => setDiscipline(item.nome)} className={`rounded-full border px-3 py-1.5 text-xs ${discipline === item.nome ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`}>{item.nome}</button>)}</div></section>
      <section className="mt-5 grid gap-4 lg:grid-cols-2">{filtered.map((q, index) => <article key={q.id} className="rounded-xl border border-border bg-card p-5"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] uppercase tracking-wider text-primary">Q{String(index + 1).padStart(2, "0")} · {q.topic}</span><span className="text-[10px] text-muted-foreground">{q.discipline}</span></div><h2 className="mt-3 text-sm font-semibold leading-6">{q.question}</h2><div className="mt-4 space-y-2">{q.options.map((option, optionIndex) => <div key={option} className="rounded-lg border border-border px-3 py-2.5 text-xs text-muted-foreground"><span className="mr-2 font-mono text-primary">{String.fromCharCode(65 + optionIndex)}</span>{option}</div>)}</div><button type="button" onClick={() => { reset(); setMode("quiz"); setCurrent(index); }} className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">Responder agora <ArrowRight size={13} /></button></article>)}</section>
      <p className="mt-8 text-center text-[10px] text-muted-foreground">Banco inicial do VetPro · conteúdo educacional para estudo. Questões e explicações podem ser ampliadas e revisadas na próxima etapa.</p>
    </div></div>
  );
}

function QuizView({ question, current, total, selected, score, finished, onChoose, onNext, onReset }: { question?: Question; current: number; total: number; selected: number | null; score: number; finished: boolean; onChoose: (index: number) => void; onNext: () => void; onReset: () => void }) {
  if (finished || !question) return <div className="flex min-h-screen items-center justify-center bg-background px-5"><div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 text-center"><div className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary"><Trophy size={24} /></div><p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-primary">Simulado concluído</p><h1 className="mt-2 text-3xl font-semibold">{score} de {total}</h1><p className="mt-2 text-sm text-muted-foreground">Aproveitamento de {total ? Math.round((score / total) * 100) : 0}%. Use os erros como guia para a próxima revisão.</p><button type="button" onClick={onReset} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><RotateCcw size={15} /> Refazer simulado</button></div></div>;
  return <div className="min-h-screen bg-background"><div className="mx-auto max-w-3xl px-5 py-8 sm:px-8"><button type="button" onClick={onReset} className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft size={14} /> Voltar ao banco</button><div className="mt-8 flex items-center justify-between gap-4"><div><p className="label-mono text-primary">SIMULADO · {question.discipline}</p><p className="mt-1 text-xs text-muted-foreground">Questão {current + 1} de {total}</p></div><span className="font-mono text-xs">{score} acertos</span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((current + 1) / total) * 100}%` }} /></div><article className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8"><div className="flex items-center gap-2 text-xs text-muted-foreground"><Sparkles size={14} className="text-primary" /> {question.topic}</div><h1 className="mt-5 text-xl font-semibold leading-8">{question.question}</h1><div className="mt-7 space-y-3">{question.options.map((option, index) => { const isSelected = selected === index; const isCorrect = index === question.answer; const state = selected === null ? "border-border hover:border-primary/40 hover:bg-primary/5" : isCorrect ? "border-primary bg-primary/10" : isSelected ? "border-destructive bg-destructive/10" : "border-border opacity-60"; return <button key={option} type="button" disabled={selected !== null} onClick={() => onChoose(index)} className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition ${state}`}><span className="grid size-7 shrink-0 place-items-center rounded-lg bg-secondary font-mono text-[11px] font-semibold">{String.fromCharCode(65 + index)}</span><span className="flex-1">{option}</span>{selected !== null && isCorrect && <CheckCircle2 size={17} className="text-primary" />}{selected !== null && isSelected && !isCorrect && <XCircle size={17} className="text-destructive" />}</button>; })}</div>{selected !== null && <div className="mt-6 rounded-xl bg-secondary/60 p-4"><p className="text-xs font-semibold">Explicação</p><p className="mt-1.5 text-xs leading-6 text-muted-foreground">{question.explanation}</p></div>}<div className="mt-7 flex justify-end">{selected !== null && <button type="button" onClick={onNext} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground">{current + 1 === total ? "Ver resultado" : "Próxima questão"} <ArrowRight size={14} /></button>}</div></article><p className="mt-5 text-center text-[10px] text-muted-foreground">Use o simulado para aprendizagem ativa; confirme conteúdos importantes nas fontes da disciplina.</p></div></div>;
}

function Stat({ icon: Icon, label, value }: { icon: typeof Brain; label: string; value: string }) { return <div className="rounded-xl border border-border bg-card p-5"><div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary"><Icon size={17} /></div><p className="mt-4 text-xs text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p></div>; }
