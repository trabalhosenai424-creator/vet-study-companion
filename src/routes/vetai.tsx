import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BookOpen,
  Brain,
  ChevronDown,
  Copy,
  FileText,
  GraduationCap,
  History,
  Lightbulb,
  MessageSquareText,
  Plus,
  Send,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { trilhas } from "@/data/conteudo";

export const Route = createFileRoute("/vetai")({
  head: () => ({
    meta: [
      { title: "VetPro — VetAI" },
      { name: "description", content: "Tutor acadêmico de Medicina Veterinária do VetPro." },
    ],
  }),
  component: VetAI,
});

type Mode = {
  id: string;
  title: string;
  description: string;
  icon: typeof GraduationCap;
};

const modes: Mode[] = [
  { id: "professor", title: "Professor", description: "Explique conceitos de forma didática e progressiva.", icon: GraduationCap },
  { id: "clinico", title: "Raciocínio clínico", description: "Estruture hipóteses, diferenciais e próximos passos.", icon: Stethoscope },
  { id: "pesquisa", title: "Pesquisador", description: "Organize perguntas, evidências e referências.", icon: BookOpen },
  { id: "prova", title: "Preparação para prova", description: "Revise, gere questões e identifique lacunas.", icon: Brain },
];

const suggestions = [
  "Explique a insuficiência cardíaca em cães como se eu estivesse no 4º semestre.",
  "Monte 10 questões de farmacologia sobre anti-inflamatórios.",
  "Quero estudar diabetes mellitus felina por raciocínio clínico.",
  "Transforme este tema em um plano de revisão de 7 dias.",
];

const initialMessages = [
  {
    role: "assistant" as const,
    text: "Olá! Eu sou o VetAI, seu tutor acadêmico. Posso explicar conteúdos, montar revisões, criar questões, analisar casos clínicos para fins educacionais e ajudar em trabalhos acadêmicos.\n\nPara começar, escolha um modo ou escreva o que você quer estudar.",
  },
];

function VetAI() {
  const [mode, setMode] = useState("professor");
  const [discipline, setDiscipline] = useState("Todas as disciplinas");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [showModes, setShowModes] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeMode = modes.find((item) => item.id === mode) ?? modes[0];
  const ActiveIcon = activeMode.icon;
  const visibleSuggestions = useMemo(() => suggestions.slice(0, 4), []);

  function sendMessage(text = input) {
    const value = text.trim();
    if (!value) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: value },
      {
        role: "assistant",
        text: `Entendi. Vou responder no modo ${activeMode.title.toLowerCase()}${discipline !== "Todas as disciplinas" ? `, considerando ${discipline}` : ""}.\n\nEsta interface já está preparada para receber o modelo de IA real. Nesta etapa do VetPro, a resposta é uma demonstração da experiência e não deve ser tratada como orientação clínica ou referência científica definitiva.`,
      },
    ]);
    setInput("");
  }

  function copyLastAnswer() {
    const last = [...messages].reverse().find((item) => item.role === "assistant");
    if (!last || !navigator.clipboard) return;
    navigator.clipboard.writeText(last.text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-5 text-sidebar-foreground lg:flex">
          <div className="flex items-center gap-3 px-2">
            <div className="grid size-9 place-items-center rounded-lg bg-sidebar-primary font-display text-lg font-bold text-sidebar-primary-foreground">V</div>
            <div className="leading-tight"><p className="font-display text-lg font-semibold">VetPro</p><span className="font-mono text-[10px] uppercase tracking-widest text-sidebar-foreground/60">Study workspace</span></div>
          </div>
          <nav className="mt-8 space-y-7">
            <NavGroup title="Workspace" items={["Dashboard", "Agenda", "Tarefas", "Disciplinas", "Estudos", "Notas"]} />
            <div>
              <p className="px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/40">Intelligence</p>
              <div className="mt-2 space-y-1">
                <a href="/vetai" className="flex w-full items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2.5 text-left text-sm"><Sparkles size={16} />VetAI</a>
                <a href="/questoes" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground"><Brain size={16} />Banco de questões</a>
              </div>
            </div>
          </nav>
          <div className="mt-auto rounded-xl border border-sidebar-border bg-sidebar-accent p-4">
            <div className="flex items-center gap-2 text-sidebar-primary"><Sparkles size={15} /><span className="font-mono text-[11px] uppercase tracking-wider">VetAI</span></div>
            <p className="mt-2 text-sm font-medium">Tutor acadêmico</p>
            <p className="mt-1 text-xs leading-relaxed text-sidebar-foreground/60">Aprenda com contexto, pratique e revise.</p>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-border bg-background/90 backdrop-blur">
            <div className="flex min-h-16 items-center justify-between gap-3 px-5 sm:px-8">
              <div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary"><Sparkles size={18} /></div><div><p className="font-display font-semibold">VetAI</p><p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Academic intelligence</p></div></div>
              <button type="button" onClick={() => setShowContext((value) => !value)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-secondary"><span className="hidden sm:inline">Contexto de estudo</span><ChevronDown size={14} className={showContext ? "rotate-180 transition" : "transition"} /></button>
            </div>
          </header>

          {showContext && (
            <div className="border-b border-border bg-card px-5 py-3 sm:px-8">
              <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Disciplina</span>
                <select value={discipline} onChange={(event) => setDiscipline(event.target.value)} className="h-9 rounded-lg border border-input bg-background px-3 text-xs outline-none focus:ring-2 focus:ring-ring">
                  <option>Todas as disciplinas</option>
                  {trilhas.map((item) => <option key={item.sigla}>{item.nome}</option>)}
                </select>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] text-primary">Contexto aplicado à conversa</span>
              </div>
            </div>
          )}

          <div className="flex min-h-0 flex-1 flex-col px-5 sm:px-8">
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
              <div className="py-6 sm:py-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div><p className="label-mono text-primary">Inteligência VetPro</p><h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Como posso ajudar você a estudar?</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">Seu tutor para aprendizado, raciocínio e produção acadêmica em Medicina Veterinária.</p></div>
                  <button type="button" onClick={() => setMessages(initialMessages)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-secondary"><Plus size={14} />Nova conversa</button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <div className="relative">
                    <button type="button" onClick={() => setShowModes((value) => !value)} className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-semibold text-primary"><ActiveIcon size={14} />{activeMode.title}<ChevronDown size={13} /></button>
                    {showModes && <div className="absolute left-0 top-11 z-20 w-72 rounded-xl border border-border bg-card p-2 shadow-xl">{modes.map((item) => { const Icon = item.icon; return <button key={item.id} type="button" onClick={() => { setMode(item.id); setShowModes(false); }} className={`flex w-full items-start gap-3 rounded-lg p-3 text-left hover:bg-secondary ${mode === item.id ? "bg-secondary" : ""}`}><Icon size={16} className="mt-0.5 text-primary" /><span><span className="block text-xs font-semibold">{item.title}</span><span className="mt-0.5 block text-[11px] leading-relaxed text-muted-foreground">{item.description}</span></span></button>; })}</div>}
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground"><Lightbulb size={14} />Respostas adaptadas ao seu nível</span>
                </div>
              </div>

              <div className="flex-1 space-y-5 pb-6">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`${message.role === "user" ? "max-w-2xl rounded-2xl rounded-br-md bg-primary px-4 py-3 text-primary-foreground" : "max-w-3xl rounded-2xl rounded-bl-md border border-border bg-card px-5 py-4"}`}>
                      {message.role === "assistant" && <div className="mb-3 flex items-center gap-2 text-primary"><Sparkles size={15} /><span className="font-mono text-[10px] uppercase tracking-widest">VetAI</span></div>}
                      <div className="whitespace-pre-line text-sm leading-7">{message.text}</div>
                      {message.role === "assistant" && index === messages.length - 1 && <div className="mt-4 flex items-center gap-2 border-t border-border pt-3"><button type="button" onClick={copyLastAnswer} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] text-muted-foreground hover:bg-secondary">{copied ? "Copiado" : <><Copy size={12} />Copiar</>}</button><span className="text-[10px] text-muted-foreground">Conteúdo para fins educacionais</span></div>}
                    </div>
                  </div>
                ))}

                {messages.length === 1 && <div className="grid gap-2 sm:grid-cols-2"><p className="sm:col-span-2 mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Sugestões para começar</p>{visibleSuggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5 text-left text-xs leading-relaxed hover:border-primary/30 hover:bg-secondary"><MessageSquareText size={15} className="mt-0.5 shrink-0 text-primary" />{suggestion}</button>)}</div>}
              </div>

              <div className="sticky bottom-0 pb-5 pt-2 sm:pb-7">
                <div className="rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10">
                  <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} rows={2} placeholder="Pergunte ao VetAI... (Enter para enviar, Shift + Enter para nova linha)" className="w-full resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground" />
                  <div className="flex items-center justify-between px-2 pb-1"><div className="flex items-center gap-2 text-[10px] text-muted-foreground"><FileText size={13} />Arquivos e referências poderão ser adicionados nas próximas fases.</div><button type="button" onClick={() => sendMessage()} disabled={!input.trim()} className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"><Send size={16} /></button></div>
                </div>
                <p className="mt-2 text-center text-[10px] text-muted-foreground">O VetAI é um recurso educacional. Não substitui avaliação veterinária, orientação de professor ou validação de fontes científicas.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavGroup({ title, items }: { title: string; items: string[] }) {
  const routes: Record<string, string> = { Dashboard: "/", Agenda: "/agenda", Tarefas: "/tarefas", Disciplinas: "/disciplinas", Estudos: "/estudos", Notas: "/notas" };
  return <div><p className="px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/40">{title}</p><div className="mt-2 space-y-1">{items.map((item) => <a key={item} href={routes[item]} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground"><History size={16} />{item}</a>)}</div></div>;
}
