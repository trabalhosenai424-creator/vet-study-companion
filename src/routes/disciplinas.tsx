import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ChevronRight } from "lucide-react";
import { trilhas } from "@/data/conteudo";

export const Route = createFileRoute("/disciplinas")({
  head: () => ({ meta: [{ title: "VetPro — Disciplinas" }] }),
  component: Disciplinas,
});

function Disciplinas() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground"><BookOpen size={18} /></div><div><p className="font-display text-xl font-semibold">Disciplinas</p><p className="text-sm text-muted-foreground">Acompanhe seu progresso por área.</p></div></div>
        <section className="mt-7 grid gap-4 sm:grid-cols-2">
          {trilhas.map((item) => { const pct = Math.round((item.concluidos / item.modulos) * 100); return <article key={item.sigla} className="surface p-5"><div className="flex items-center justify-between"><span className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] font-semibold">{item.sigla}</span><span className="font-mono text-xs text-primary">{pct}%</span></div><h2 className="mt-4 text-lg font-semibold">{item.nome}</h2><p className="mt-1 text-sm text-muted-foreground">{item.descricao}</p><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div><div className="mt-3 flex items-center justify-between text-xs text-muted-foreground"><span>{item.concluidos} de {item.modulos} módulos</span><button type="button" className="inline-flex items-center gap-1 font-medium text-primary">Abrir <ChevronRight size={14} /></button></div></article>; })}
        </section>
      </div>
    </main>
  );
}
