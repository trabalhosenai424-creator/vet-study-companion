import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Circle, Filter, ListChecks, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/tarefas")({
  head: () => ({ meta: [{ title: "VetPro — Tarefas" }] }),
  component: Tarefas,
});

type Task = { id: number; title: string; discipline: string; due: string; priority: "Alta" | "Média" | "Baixa"; done: boolean };

const initialTasks: Task[] = [
  { id: 1, title: "Revisar sistema cardiovascular", discipline: "Fisiologia", due: "Hoje", priority: "Alta", done: false },
  { id: 2, title: "Responder banco de questões", discipline: "Farmacologia", due: "Hoje", priority: "Média", done: false },
  { id: 3, title: "Ler resumo de parasitologia", discipline: "Parasitologia", due: "Amanhã", priority: "Baixa", done: true },
  { id: 4, title: "Preparar caso clínico", discipline: "Clínica médica", due: "18 set", priority: "Alta", done: false },
  { id: 5, title: "Revisar anatomia do membro torácico", discipline: "Anatomia", due: "20 set", priority: "Média", done: false },
];

function Tarefas() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<"Todas" | "Pendentes" | "Concluídas">("Todas");
  const [draft, setDraft] = useState("");
  const visible = useMemo(() => tasks.filter((task) => filter === "Todas" || (filter === "Pendentes" ? !task.done : task.done)), [tasks, filter]);
  const pending = tasks.filter((task) => !task.done).length;

  function toggle(id: number) { setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task)); }
  function addTask() { const title = draft.trim(); if (!title) return; setTasks((current) => [{ id: Date.now(), title, discipline: "Geral", due: "Hoje", priority: "Média", done: false }, ...current]); setDraft(""); }
  function removeTask(id: number) { setTasks((current) => current.filter((task) => task.id !== id)); }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur"><div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground"><ListChecks size={18} /></div><div><p className="font-display font-semibold">Tarefas</p><p className="text-xs text-muted-foreground">Transforme seus objetivos em próximas ações</p></div></div><span className="rounded-full bg-primary/10 px-3 py-1.5 font-mono text-[10px] text-primary">{pending} pendentes</span></div></header>
      <main className="mx-auto max-w-5xl px-5 py-7 sm:px-8">
        <section className="surface p-4 sm:p-5"><div className="flex flex-col gap-3 sm:flex-row"><input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addTask(); }} placeholder="Adicionar uma nova tarefa..." className="h-10 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"/><button type="button" onClick={addTask} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground"><Plus size={15} /> Adicionar</button></div></section>

        <section className="mt-5 surface overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4"><div><h1 className="font-semibold">Minha lista</h1><p className="mt-0.5 text-xs text-muted-foreground">Priorize o que realmente precisa acontecer.</p></div><div className="flex items-center gap-1 rounded-lg bg-secondary p-1"><Filter size={13} className="ml-2 text-muted-foreground"/>{(["Todas", "Pendentes", "Concluídas"] as const).map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-md px-2.5 py-1.5 text-[11px] font-medium ${filter === item ? "bg-card shadow-sm" : "text-muted-foreground"}`}>{item}</button>)}</div></div>
          <div className="divide-y divide-border">
            {visible.length === 0 ? <div className="px-5 py-12 text-center text-sm text-muted-foreground">Nenhuma tarefa nesta visualização.</div> : visible.map((task) => <article key={task.id} className="group flex items-center gap-3 px-5 py-4"><button type="button" onClick={() => toggle(task.id)} aria-label={task.done ? "Reabrir tarefa" : "Concluir tarefa"} className={`grid size-5 shrink-0 place-items-center rounded-full border transition ${task.done ? "border-primary bg-primary text-primary-foreground" : "border-input hover:border-primary"}`}>{task.done && <Check size={12} />}</button><div className="min-w-0 flex-1"><p className={`truncate text-sm ${task.done ? "text-muted-foreground line-through" : "font-medium"}`}>{task.title}</p><div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground"><span>{task.discipline}</span><span>·</span><span>{task.due}</span><span className={`rounded-full px-1.5 py-0.5 ${task.priority === "Alta" ? "bg-destructive/10 text-destructive" : "bg-secondary text-secondary-foreground"}`}>{task.priority}</span></div></div><button type="button" onClick={() => removeTask(task.id)} aria-label={`Excluir ${task.title}`} className="grid size-8 place-items-center rounded-md text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"><Trash2 size={14}/></button></article>)}
          </div>
        </section>
        <div className="mt-5 grid gap-4 sm:grid-cols-3"><Summary label="Pendentes" value={String(tasks.filter((t) => !t.done).length)} /><Summary label="Concluídas" value={String(tasks.filter((t) => t.done).length)} /><Summary label="Total" value={String(tasks.length)} /></div>
      </main>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) { return <div className="surface p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-display text-2xl font-semibold">{value}</p></div>; }
