import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { casos, farmacos, flashcards, trilhas } from "@/data/conteudo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VetLab — Estudo para medicina veterinária" },
      {
        name: "description",
        content:
          "Flashcards, calculadora de dose por peso, casos clínicos e progresso por disciplina para estudantes de medicina veterinária.",
      },
      { property: "og:title", content: "VetLab — Estudo para medicina veterinária" },
      {
        property: "og:description",
        content:
          "Revise anatomia, farmacologia e clínica com flashcards, casos clínicos e calculadora de dose.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Progresso({ valor }: { valor: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div className="h-full rounded-full bg-primary" style={{ width: `${valor}%` }} />
    </div>
  );
}

function Flashcards() {
  const [indice, setIndice] = useState(0);
  const [revelado, setRevelado] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const card = flashcards[indice]!;

  function responder(acertou: boolean) {
    if (acertou) setAcertos((n) => n + 1);
    else setErros((n) => n + 1);
    setRevelado(false);
    setIndice((i) => (i + 1) % flashcards.length);
  }

  return (
    <div className="surface p-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">Flashcards</h2>
        <span className="label-mono">
          {indice + 1} / {flashcards.length}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setRevelado((v) => !v)}
        className="mt-4 grid min-h-56 w-full place-items-center rounded-lg bg-foreground px-6 py-8 text-center transition-opacity hover:opacity-95"
      >
        <div>
          <span className="label-mono text-accent">
            {revelado ? "Resposta" : "Pergunta"} · {card.disciplina}
          </span>
          <p className="mt-3 max-w-prose font-display text-xl leading-snug text-background">
            {revelado ? card.resposta : card.pergunta}
          </p>
          {!revelado && (
            <span className="mt-4 block font-mono text-xs text-background/60">
              Clique para revelar
            </span>
          )}
        </div>
      </button>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => responder(false)}
          className="rounded-md border border-border py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          Errei
        </button>
        <button
          type="button"
          onClick={() => responder(true)}
          className="rounded-md bg-primary py-2.5 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
        >
          Acertei
        </button>
      </div>

      <p className="mt-3 font-mono text-xs text-muted-foreground">
        Acertos: {acertos} · Erros: {erros}
      </p>
    </div>
  );
}

function Calculadora() {
  const [nome, setNome] = useState(farmacos[0]!.nome);
  const [peso, setPeso] = useState("7,5");
  const farmaco = farmacos.find((f) => f.nome === nome) ?? farmacos[0]!;

  const resultado = useMemo(() => {
    const kg = Number(peso.replace(",", "."));
    if (!Number.isFinite(kg) || kg <= 0) return null;
    const mg = kg * farmaco.dose;
    return { mg, ml: mg / farmaco.concentracao };
  }, [peso, farmaco]);

  const fmt = (n: number) =>
    n.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 0 });

  return (
    <div className="surface p-6">
      <h2 className="text-xl font-semibold">Calculadora de dose</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Dose por peso corporal, com volume estimado da apresentação.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label className="label-mono" htmlFor="farmaco">
            Fármaco
          </label>
          <select
            id="farmaco"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {farmacos.map((f) => (
              <option key={f.nome} value={f.nome}>
                {f.nome} — {fmt(f.dose)} {f.unidade}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-mono" htmlFor="peso">
            Peso do paciente (kg)
          </label>
          <input
            id="peso"
            inputMode="decimal"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-accent/30 bg-accent/10 p-4">
        <span className="label-mono text-accent">Dose calculada</span>
        {resultado ? (
          <>
            <p className="mt-1 font-display text-3xl font-semibold text-foreground">
              {fmt(resultado.mg)} mg
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              ≈ {fmt(resultado.ml)} mL da apresentação {fmt(farmaco.concentracao)} mg/mL ·{" "}
              {farmaco.via} a cada {farmaco.intervalo}
            </p>
          </>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">Informe um peso válido.</p>
        )}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Valores de referência para estudo. Sempre confirme com a bula e a orientação do professor.
      </p>
    </div>
  );
}

function Home() {
  const totalModulos = trilhas.reduce((s, t) => s + t.modulos, 0);
  const totalConcluidos = trilhas.reduce((s, t) => s + t.concluidos, 0);
  const geral = Math.round((totalConcluidos / totalModulos) * 100);

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-lg bg-primary font-display text-lg font-bold text-primary-foreground">
              V
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold">VetLab</p>
              <span className="label-mono">Estudo · Medicina veterinária</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs text-muted-foreground sm:block">
              Progresso geral {geral}%
            </span>
            <div className="hidden h-1.5 w-28 overflow-hidden rounded-full bg-secondary sm:block">
              <div className="h-full rounded-full bg-primary" style={{ width: `${geral}%` }} />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-16">
        <section className="py-10">
          <span className="label-mono text-accent">Sua rotina de revisão</span>
          <h1 className="mt-2 max-w-[18ch] text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            Estude veterinária em blocos curtos e objetivos.
          </h1>
          <p className="mt-4 max-w-prose text-pretty text-muted-foreground">
            Flashcards por disciplina, cálculo de dose por peso e casos clínicos para treinar
            raciocínio diagnóstico — tudo em uma página só.
          </p>
        </section>

        <section aria-labelledby="trilhas">
          <h2 id="trilhas" className="text-xl font-semibold">
            Trilhas por disciplina
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trilhas.map((t) => {
              const pct = Math.round((t.concluidos / t.modulos) * 100);
              return (
                <article key={t.sigla} className="surface p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] tracking-widest text-secondary-foreground">
                      {t.sigla}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{pct}%</span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold leading-snug">{t.nome}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.descricao}</p>
                  <div className="mt-4">
                    <Progresso valor={pct} />
                    <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
                      {t.concluidos} de {t.modulos} módulos
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-2">
          <Flashcards />
          <Calculadora />
        </section>

        <section className="mt-10" aria-labelledby="casos">
          <h2 id="casos" className="text-xl font-semibold">
            Casos clínicos
          </h2>
          <div className="surface mt-4 divide-y divide-border p-0">
            {casos.map((c) => (
              <article key={c.titulo} className="flex flex-wrap items-center gap-4 p-5">
                <span className="rounded-md bg-primary/10 px-2 py-1 font-mono text-[10px] tracking-widest text-primary">
                  {c.area}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold">{c.titulo}</h3>
                  <p className="font-mono text-[11px] text-muted-foreground">{c.paciente}</p>
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">{c.nivel}</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {c.questoes} questões
                </span>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-6 font-mono text-[11px] text-muted-foreground">
          <span>VetLab · material de estudo</span>
          <span>Conteúdo educativo — não substitui conduta clínica</span>
        </div>
      </footer>
    </div>
  );
}
