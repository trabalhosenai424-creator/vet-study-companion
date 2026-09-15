import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, Plus, Video } from "lucide-react";

export const Route = createFileRoute("/agenda")({
  head: () => ({ meta: [{ title: "VetPro — Agenda" }] }),
  component: Agenda,
});

const initialEvents = [
  { id: 1, date: "2026-09-15", time: "14:00", title: "Aula de Patologia", detail: "Sala 08 · 2h", type: "Aula" },
  { id: 2, date: "2026-09-15", time: "17:30", title: "Sessão de estudos", detail: "Farmacologia · 45 min", type: "Estudo" },
  { id: 3, date: "2026-09-15", time: "20:00", title: "Revisão rápida", detail: "Flashcards · 20 min", type: "Revisão" },
  { id: 4, date: "2026-09-16", time: "09:00", title: "Laboratório de Anatomia", detail: "Bloco B · 2h", type: "Prática" },
  { id: 5, date: "2026-09-18", time: "16:00", title: "Entrega de caso clínico", detail: "Clínica médica", type: "Prazo" },
];

function Agenda() {
  const [selected, setSelected] = useState("2026-09-15");
  const [monthOffset, setMonthOffset] = useState(0);
  const [events, setEvents] = useState(initialEvents);
  const selectedEvents = useMemo(() => events.filter((event) => event.date === selected), [events, selected]);
  const base = new Date(2026, 8 + monthOffset, 1);
  const month = base.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  function addStudyBlock() {
    const next = { id: Date.now(), date: selected, time: "19:00", title: "Bloco de estudo", detail: "45 min · sessão planejada", type: "Estudo" };
    setEvents((current) => [...current, next]);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground"><CalendarDays size={18} /></div><div><p className="font-display font-semibold">Agenda</p><p className="text-xs text-muted-foreground">Organize aulas, estudos e prazos</p></div></div>
          <button type="button" onClick={addStudyBlock} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground"><Plus size={15} /> Novo bloco</button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-7 sm:px-8">
        <section className="surface overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <button type="button" onClick={() => setMonthOffset((v) => v - 1)} className="grid size-8 place-items-center rounded-lg border border-border hover:bg-secondary"><ChevronLeft size={16} /></button>
            <h1 className="text-sm font-semibold capitalize">{month}</h1>
            <button type="button" onClick={() => setMonthOffset((v) => v + 1)} className="grid size-8 place-items-center rounded-lg border border-border hover:bg-secondary"><ChevronRight size={16} /></button>
          </div>
          <div className="grid grid-cols-7 border-b border-border text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => <div key={day} className="py-3">{day}</div>)}</div>
          <div className="grid grid-cols-7">
            {days.map((day) => {
              const date = `2026-09-${String(day).padStart(2, "0")}`;
              const count = events.filter((event) => event.date === date).length;
              const active = selected === date;
              return <button type="button" key={date} onClick={() => setSelected(date)} className={`min-h-16 border-b border-r border-border p-2 text-left transition hover:bg-secondary/70 ${active ? "bg-primary/10" : ""}`}><span className={`inline-grid size-7 place-items-center rounded-full text-sm ${active ? "bg-primary font-semibold text-primary-foreground" : ""}`}>{day}</span>{count > 0 && <span className="mt-1 block font-mono text-[9px] text-primary">{count} {count === 1 ? "evento" : "eventos"}</span>}</button>;
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="surface">
            <div className="border-b border-border px-5 py-4"><h2 className="font-semibold">Agenda do dia</h2><p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{new Date(`${selected}T12:00:00`).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}</p></div>
            <div className="divide-y divide-border">
              {selectedEvents.length === 0 ? <div className="px-5 py-10 text-center text-sm text-muted-foreground">Nenhum compromisso. Aproveite para planejar uma sessão.</div> : selectedEvents.map((event) => <article key={event.id} className="flex gap-4 px-5 py-4"><div className="w-12 shrink-0 font-mono text-xs text-muted-foreground">{event.time}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-medium">{event.title}</h3><span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[9px] text-secondary-foreground">{event.type}</span></div><p className="mt-1 text-xs text-muted-foreground">{event.detail}</p></div><Clock3 size={15} className="mt-0.5 text-muted-foreground" /></article>)}
            </div>
          </div>
          <div className="surface p-5"><div className="flex items-center gap-2 text-primary"><Video size={16} /><span className="label-mono">Foco do dia</span></div><h2 className="mt-3 text-xl font-semibold">Proteja seu tempo de estudo.</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Use a agenda para separar aulas, revisões, trabalhos e sessões de estudo. O VetPro poderá usar esses blocos para montar seu plano automaticamente.</p><button type="button" onClick={addStudyBlock} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-xs font-medium hover:bg-secondary"><Plus size={14} /> Planejar estudo</button></div>
        </section>
      </main>
    </div>
  );
}
