import { createFileRoute } from "@tanstack/react-router";
import { Clock3, Play, RotateCcw } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/estudos")({ head: () => ({ meta: [{ title: "VetPro — Estudos" }] }), component: Estudos });

const sessions = [
  { subject: "Farmacologia", topic: "Farmacocinética", duration: "45 min", date: "Hoje" },
  { subject: "Anatomia veterinária", topic: "Membro torácico", duration: "30 min", date: "Ontem" },
  { subject: "Clínica de pequenos animais", topic: "Semiologia", duration: "50 min", date: "12 set" },
];

function Estudos() {
  const [running, setRunning] = useState(false);
  return <main className="min-h-screen bg-background"><div className="mx-auto max-w-6xl px-5 py-8 sm:px-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="label-mono text-primary">Foco</p><h1 className="mt-2 text-3xl font-semibold">Sessões de estudo</h1><p className="mt-2 text-sm text-muted-foreground">Registre seu tempo e transforme constância em progresso.</p></div><button type="button" onClick={() => setRunning((v) => !v)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground">{running ? <RotateCcw size={15} /> : <Play size={15} />}{running ? "Pausar sessão" : "Iniciar sessão"}</button></div><section className="mt-7 grid gap-4 sm:grid-cols-3"><Metric label="Esta semana" value="6h 40m" /><Metric label="Sessões" value="9" /><Metric label="Média" value="44 min" /></section><section className="surface mt-6 overflow-hidden"><div className="border-b border-border px-5 py-4"><h2 className="font-semibold">Histórico recente</h2></div><div className="divide-y divide-border">{sessions.map((s) => <article key={`${s.date}-${s.topic}`} className="flex items-center gap-4 px-5 py-4"><div className="grid size-9 place-items-center rounded-lg bg-secondary"><Clock3 size={16} className="text-primary" /></div><div className="min-w-0 flex-1"><p className="text-sm font-medium">{s.subject}</p><p className="text-xs text-muted-foreground">{s.topic}</p></div><span className="font-mono text-xs text-muted-foreground">{s.duration}</span><span className="font-mono text-[10px] text-muted-foreground">{s.date}</span></article>)}</div></section></div></main>;
}
function Metric({ label, value }: { label: string; value: string }) { return <div className="surface p-5"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-display text-2xl font-semibold">{value}</p></div>; }
