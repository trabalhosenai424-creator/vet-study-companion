import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Flame,
  GraduationCap,
  ListChecks,
  MessageSquareText,
  MoreHorizontal,
  PlayCircle,
  Plus,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { casos, farmacos, flashcards, trilhas } from "@/data/conteudo";
import { getCurrentUser } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VetPro — Dashboard" },
      { name: "description", content: "Dashboard acadêmico do VetPro para estudantes de Medicina Veterinária." },
    ],
  }),
  component: Dashboard,
});

const tarefas = [
  { titulo: "Revisar sistema cardiovascular", disciplina: "Fisiologia", prazo: "Hoje", done: false },
  { titulo: "Responder banco de questões", disciplina: "Farmacologia", prazo: "Hoje", done: false },
  { titulo: "Ler resumo de parasitologia", disciplina: "Parasitologia", prazo: "Amanhã", done: true },
  { titulo: "Preparar caso clínico", disciplina: "Clínica médica", prazo: "18 set", done: false },
];

const compromissos = [
  { hora: "14:00", titulo: "Aula de Patologia", detalhe: "Sala 08 · 2h" },
  { hora: "17:30", titulo: "Sessão de estudos", detalhe: "Farmacologia · 45 min" },
  { hora: "20:00", titulo: "Revisão rápida", detalhe: "Flashcards · 20 min" },
];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, detail }: { icon: typeof Target; label: string; value: string; detail: string }) {
  return (
    <div className="surface p-5">
      <div className="flex items-center justify-between">
        <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary"><Icon size={18} /></div>
        <MoreHorizontal size={17} className="text-muted-foreground" />
      </div>
      <p className="mt-5 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 font-mono text-[11px] text-muted-foreground">{detail}</p>
    </div>
  );
}

function Dashboard() {
  const user = getCurrentUser();
  const totalModulos = trilhas.reduce((sum, item) => sum + item.modulos, 0);
  const totalConcluidos = trilhas.reduce((sum, item) => sum + item.concluidos, 0);
  const geral = Math.round((totalConcluidos / totalModulos) * 100);
  const firstName = user?.name?.split(" ")[0] || "estudante";

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-5 text-sidebar-foreground lg:flex">
          <div className="flex items-center gap-3 px-2">
            <div className="grid size-9 place-items-center rounded-lg bg-sidebar-primary font-display text-lg font-bold text-sidebar-primary-foreground">V</div>
            <div className="leading-tight"><p className="font-display text-lg font-semibold">VetPro</p><span className="font-mono text-[10px] uppercase tracking-widest text-sidebar-foreground/60">Study workspace</span></div>
          </div>

          <nav className="mt-8 space-y-7">
            <div>
              <p className="px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/40">Workspace</p>
              <div className="mt-2 space-y-1">
                <NavItem icon={Target} label="Dashboard" active />
                <NavItem icon={CalendarDays} label="Agenda" />
                <NavItem icon={ListChecks} label="Tarefas" />
                <NavItem icon={BookOpen} label="Disciplinas" />
                <NavItem icon={Clock3} label="Estudos" />
                <NavItem icon={FileText} label="Notas" />
              </div>
            </div>
            <div>
              <p className="px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/40">Intelligence</p>
              <div className="mt-2 space-y-1">
                <NavItem icon={Sparkles} label="VetAI" />
                <NavItem icon={Brain} label="Banco de questões" />
              </div>
            </div>
          </nav>

          <div className="mt-auto rounded-xl border border-sidebar-border bg-sidebar-accent p-4">
            <div className="flex items-center gap-2 text-sidebar-primary"><Flame size={16} /><span className="font-mono text-[11px] uppercase tracking-wider">Sequência atual</span></div>
            <p className="mt-2 font-display text-2xl font-semibold">7 dias</p>
            <p className="mt-1 text-xs text-sidebar-foreground/60">Continue estudando hoje para manter sua sequência.</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
            <div className="flex h-16 items-center justify-between gap-4 px-5 sm:px-8">
              <div className="relative hidden max-w-md flex-1 md:block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input placeholder="Buscar disciplinas, notas, questões..." className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Link to="/" className="hidden items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground sm:flex"><Sparkles size={14} /> Abrir VetAI</Link>
                <div className="grid size-9 place-items-center rounded-full bg-secondary font-mono text-xs font-semibold text-secondary-foreground">{firstName.slice(0, 1).toUpperCase()}</div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-9">
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="label-mono text-primary">{user?.semester || "Seu espaço acadêmico"}</p>
                <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Bom dia, {firstName}.</h1>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">Aqui está um resumo da sua rotina. Vamos avançar mais um pouco hoje?</p>
              </div>
              <button type="button" className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-secondary"><Plus size={16} /> Nova tarefa</button>
            </section>

            <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard icon={Target} label="Progresso geral" value={`${geral}%`} detail={`${totalConcluidos} de ${totalModulos} módulos concluídos`} />
              <StatCard icon={Clock3} label="Estudado esta semana" value="6h 40m" detail="+18% em relação à semana passada" />
              <StatCard icon={ListChecks} label="Tarefas pendentes" value="3" detail="1 com prazo para hoje" />
              <StatCard icon={Flame} label="Sequência atual" value="7 dias" detail="Seu melhor: 12 dias" />
            </section>

            <section className="mt-7 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
              <div className="surface overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <div><h2 className="font-semibold">Continue estudando</h2><p className="mt-0.5 text-xs text-muted-foreground">Retome de onde você parou.</p></div>
                  <button type="button" className="text-xs font-medium text-primary hover:underline">Ver disciplinas</button>
                </div>
                <div className="divide-y divide-border">
                  {trilhas.slice(0, 4).map((item, index) => {
                    const pct = Math.round((item.concluidos / item.modulos) * 100);
                    return <div key={item.sigla} className="flex items-center gap-4 px-5 py-4">
                      <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary font-mono text-[10px] font-semibold text-secondary-foreground">{item.sigla}</div>
                      <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><h3 className="truncate text-sm font-medium">{item.nome}</h3><span className="font-mono text-[11px] text-muted-foreground">{pct}%</span></div><div className="mt-2"><ProgressBar value={pct} /></div><p className="mt-1.5 text-[11px] text-muted-foreground">{item.concluidos} de {item.modulos} módulos</p></div>
                      <button type="button" aria-label={`Continuar ${item.nome}`} className="grid size-8 shrink-0 place-items-center rounded-full border border-border hover:bg-secondary"><PlayCircle size={15} /></button>
                    </div>;
                  })}
                </div>
              </div>

              <div className="surface">
                <div className="border-b border-border px-5 py-4"><h2 className="font-semibold">Próximos compromissos</h2><p className="mt-0.5 text-xs text-muted-foreground">Hoje · segunda-feira, 15 set.</p></div>
                <div className="divide-y divide-border">
                  {compromissos.map((item) => <div key={item.hora} className="flex gap-4 px-5 py-4"><span className="w-12 shrink-0 font-mono text-xs text-muted-foreground">{item.hora}</span><div><p className="text-sm font-medium">{item.titulo}</p><p className="mt-0.5 text-xs text-muted-foreground">{item.detalhe}</p></div></div>)}
                </div>
                <div className="px-5 py-4"><button type="button" className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-medium hover:bg-secondary">Abrir agenda <ArrowRight size={14} /></button></div>
              </div>
            </section>

            <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.1fr]">
              <div className="surface">
                <div className="flex items-center justify-between px-5 py-4"><div><h2 className="font-semibold">Tarefas de hoje</h2><p className="mt-0.5 text-xs text-muted-foreground">Mantenha o ritmo da sua rotina.</p></div><span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] text-primary">3 pendentes</span></div>
                <div className="divide-y divide-border">
                  {tarefas.map((task) => <div key={task.titulo} className="flex items-center gap-3 px-5 py-3.5"><button type="button" aria-label={`Concluir ${task.titulo}`} className={`grid size-5 shrink-0 place-items-center rounded-full border ${task.done ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>{task.done && <CheckCircle2 size={13} />}</button><div className="min-w-0 flex-1"><p className={`truncate text-sm ${task.done ? "text-muted-foreground line-through" : "font-medium"}`}>{task.titulo}</p><p className="mt-0.5 text-[11px] text-muted-foreground">{task.disciplina}</p></div><span className="font-mono text-[10px] text-muted-foreground">{task.prazo}</span></div>)}
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6">
                <div className="flex items-center gap-2 text-primary"><Sparkles size={17} /><span className="label-mono">VetAI</span></div>
                <h2 className="mt-3 max-w-lg text-2xl font-semibold">Seu tutor acadêmico está pronto.</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">Pergunte sobre uma disciplina, envie um conteúdo para estudar, monte um plano de revisão ou peça para explicar um caso clínico passo a passo.</p>
                <div className="mt-5 flex flex-wrap gap-2"><button type="button" className="rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground">Começar conversa</button><button type="button" className="rounded-lg border border-border bg-card px-4 py-2.5 text-xs font-medium hover:bg-secondary">Ver exemplos</button></div>
              </div>
            </section>

            <section className="mt-5 grid gap-5 sm:grid-cols-3">
              <QuickAction icon={CalendarDays} title="Planejar semana" text="Organize sua agenda de estudos." />
              <QuickAction icon={Brain} title="Praticar questões" text="Teste seu conhecimento por tema." />
              <QuickAction icon={MessageSquareText} title="Falar com VetAI" text="Tire dúvidas e aprofunde conceitos." />
            </section>

            <p className="mt-8 text-center font-mono text-[10px] text-muted-foreground">VetPro · Ambiente educacional · Conteúdo clínico para fins de estudo</p>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false }: { icon: typeof Target; label: string; active?: boolean }) {
  return <button type="button" className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${active ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground"}`}><Icon size={16} />{label}</button>;
}

function QuickAction({ icon: Icon, title, text }: { icon: typeof Target; title: string; text: string }) {
  return <button type="button" className="surface group flex items-center gap-4 p-4 text-left hover:border-primary/30"><div className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground"><Icon size={18} /></div><div className="min-w-0"><p className="text-sm font-semibold">{title}</p><p className="mt-0.5 text-xs text-muted-foreground">{text}</p></div><ArrowRight size={15} className="ml-auto text-muted-foreground" /></button>;
}

void useMemo;
void useState;
void flashcards;
void farmacos;
void casos;
