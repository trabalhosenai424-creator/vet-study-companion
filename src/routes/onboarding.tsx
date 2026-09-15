import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BookOpen, Target } from "lucide-react";
import { completeOnboarding, getCurrentUser } from "@/lib/auth";

export const Route = createFileRoute("/onboarding")({ component: OnboardingPage });

function OnboardingPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [course, setCourse] = useState("Medicina Veterinária");
  const [semester, setSemester] = useState("");
  const [goal, setGoal] = useState("Organizar minha rotina de estudos");

  if (!user) return null;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!semester) return;
    completeOnboarding({ course, semester, goal });
    navigate({ to: "/", replace: true });
  }

  return (
    <main className="min-h-screen px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">V</div><span className="font-display text-xl font-semibold">VetPro</span></div>
        <div className="mt-14"><span className="label-mono text-accent">CONFIGURAÇÃO INICIAL</span><h1 className="mt-3 font-display text-4xl font-semibold">Olá, {user.name.split(" ")[0]}. Vamos personalizar seu estudo.</h1><p className="mt-3 max-w-xl text-muted-foreground">Essas informações ajudam o VetPro a organizar sua experiência acadêmica.</p></div>
        <form onSubmit={submit} className="mt-10 space-y-7">
          <div className="surface p-6"><div className="flex items-start gap-3"><BookOpen className="mt-0.5 size-5 text-primary" /><div className="w-full"><h2 className="font-semibold">Formação</h2><p className="mt-1 text-sm text-muted-foreground">Qual curso você está fazendo?</p><input value={course} onChange={(e) => setCourse(e.target.value)} className="mt-4 w-full rounded-lg border bg-background px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" /><label className="label-mono mt-5 block" htmlFor="semester">Semestre atual</label><select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} className="mt-2 w-full rounded-lg border bg-background px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"><option value="">Selecione</option>{Array.from({ length: 10 }, (_, i) => <option key={i} value={`${i + 1}º semestre`}>{i + 1}º semestre</option>)}</select></div></div></div>
          <div className="surface p-6"><div className="flex items-start gap-3"><Target className="mt-0.5 size-5 text-primary" /><div className="w-full"><h2 className="font-semibold">Objetivo principal</h2><p className="mt-1 text-sm text-muted-foreground">O que você quer melhorar primeiro?</p><select value={goal} onChange={(e) => setGoal(e.target.value)} className="mt-4 w-full rounded-lg border bg-background px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"><option>Organizar minha rotina de estudos</option><option>Me preparar para provas</option><option>Aprofundar conhecimentos clínicos</option><option>Melhorar meu desempenho acadêmico</option><option>Organizar trabalhos e TCC</option></select></div></div></div>
          <button type="submit" disabled={!semester} className="ml-auto flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">Entrar no VetPro <ArrowRight className="size-4" /></button>
        </form>
      </div>
    </main>
  );
}
