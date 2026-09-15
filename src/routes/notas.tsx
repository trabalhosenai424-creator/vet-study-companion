import { createFileRoute } from "@tanstack/react-router";
import { FileText, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/notas")({ head: () => ({ meta: [{ title: "VetPro — Notas" }] }), component: Notas });

const initialNotes = [
  { id: 1, title: "Farmacocinética — revisão", discipline: "Farmacologia", updated: "Hoje", text: "Absorção, distribuição, metabolismo e excreção." },
  { id: 2, title: "Sistema cardiovascular", discipline: "Fisiologia", updated: "Ontem", text: "Débito cardíaco, pressão arterial e mecanismos de compensação." },
  { id: 3, title: "Diagnóstico diferencial", discipline: "Clínica", updated: "12 set", text: "Organizar hipóteses por síndrome e achados clínicos." },
];

function Notas() {
  const [notes, setNotes] = useState(initialNotes);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(1);
  const current = notes.find((n) => n.id === selected) ?? notes[0];
  const visible = useMemo(() => notes.filter((n) => `${n.title} ${n.discipline} ${n.text}`.toLowerCase().includes(query.toLowerCase())), [notes, query]);
  function addNote() { const id = Date.now(); setNotes((n) => [{ id, title: "Nova nota", discipline: "Geral", updated: "Agora", text: "Comece a escrever suas ideias de estudo..." }, ...n]); setSelected(id); }
  return <main className="min-h-screen bg-background"><div className="mx-auto max-w-6xl px-5 py-8 sm:px-8"><div className="flex items-end justify-between gap-4"><div><p className="label-mono text-primary">Conhecimento</p><h1 className="mt-2 text-3xl font-semibold">Notas</h1><p className="mt-2 text-sm text-muted-foreground">Centralize resumos, ideias e conteúdos importantes.</p></div><button type="button" onClick={addNote} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground"><Plus size={15} /> Nova nota</button></div><div className="mt-7 grid gap-5 lg:grid-cols-[280px_1fr]"><aside className="surface overflow-hidden"><div className="border-b border-border p-3"><div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar notas..." className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-ring" /></div></div><div className="divide-y divide-border">{visible.map((note) => <button type="button" key={note.id} onClick={() => setSelected(note.id)} className={`w-full px-4 py-3 text-left ${selected === note.id ? "bg-primary/10" : "hover:bg-secondary/70"}`}><p className="truncate text-sm font-medium">{note.title}</p><p className="mt-1 text-[10px] text-muted-foreground">{note.discipline} · {note.updated}</p></button>)}</div></aside><article className="surface min-h-[430px] p-6 sm:p-8">{current ? <><span className="label-mono text-primary">{current.discipline}</span><input value={current.title} onChange={(e) => setNotes((all) => all.map((n) => n.id === current.id ? { ...n, title: e.target.value, updated: "Agora" } : n))} className="mt-3 block w-full border-0 bg-transparent font-display text-2xl font-semibold outline-none" /><textarea value={current.text} onChange={(e) => setNotes((all) => all.map((n) => n.id === current.id ? { ...n, text: e.target.value, updated: "Agora" } : n))} className="mt-5 min-h-64 w-full resize-none border-0 bg-transparent text-sm leading-7 text-muted-foreground outline-none" placeholder="Escreva sua nota..." /></> : <p className="text-sm text-muted-foreground">Selecione uma nota.</p>}</article></div></div></main>;
}
