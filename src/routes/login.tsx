import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, GraduationCap, ShieldCheck } from "lucide-react";
import { signIn } from "@/lib/auth";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.includes("@")) {
      setError("Informe seu nome e um e-mail válido.");
      return;
    }
    signIn(email.trim(), name.trim());
    navigate({ to: "/onboarding", replace: true });
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hidden bg-sidebar p-10 text-sidebar-foreground lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-sidebar-primary font-display text-lg font-bold text-sidebar-primary-foreground">V</div>
            <span className="font-display text-xl font-semibold">VetPro</span>
          </div>
          <div className="mt-24 max-w-xl">
            <p className="label-mono text-sidebar-primary">ESTUDO · MEDICINA VETERINÁRIA</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-tight">Seu ambiente de estudo veterinário, em um só lugar.</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-sidebar-foreground/70">Organize disciplinas, tarefas, revisões, casos clínicos e sua evolução acadêmica.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-sidebar-foreground/60"><ShieldCheck className="size-4" /> Ambiente acadêmico e educativo</div>
      </section>

      <section className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">V</div><span className="font-display text-xl font-semibold">VetPro</span></div>
          <div className="mb-8"><span className="label-mono text-accent">BEM-VINDO</span><h2 className="mt-2 font-display text-3xl font-semibold">Comece seu perfil acadêmico</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Vamos configurar sua experiência de estudo em poucos passos.</p></div>
          <form onSubmit={submit} className="space-y-5">
            <div><label htmlFor="name" className="label-mono">Seu nome</label><input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Maria Silva" className="mt-2 w-full rounded-lg border bg-background px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></div>
            <div><label htmlFor="email" className="label-mono">E-mail</label><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" className="mt-2 w-full rounded-lg border bg-background px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90">Continuar <ArrowRight className="size-4" /></button>
          </form>
          <div className="mt-8 rounded-lg border bg-muted/40 p-4 text-xs text-muted-foreground"><div className="flex gap-2"><GraduationCap className="mt-0.5 size-4 shrink-0" /><p>Esta etapa cria um perfil local de demonstração. A autenticação persistente com Supabase entra na integração de backend.</p></div></div>
        </div>
      </section>
    </main>
  );
}
