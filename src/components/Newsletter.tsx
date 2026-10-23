"use client";

import { useState } from "react";
import { WELCOME_COUPON } from "@/data/site";
import { ArrowRight } from "./Icons";

/**
 * Faixa preta do clube. Demo: nada é enviado nem guardado — o formulário
 * só valida e mostra o cupom de boas-vindas.
 */
export function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section className="bg-ink text-paper" aria-labelledby="club-title">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-5 py-8 md:px-10 lg:flex-row lg:items-center lg:gap-10 lg:py-6">
        <div className="shrink-0">
          <h2 id="club-title" className="t-label text-[0.95rem] font-semibold">
            Junte-se ao Nepzera Club.
          </h2>
          <p className="mt-1 text-xs text-paper/60">Drops antes de todo mundo e {WELCOME_COUPON.percent}% off na primeira compra.</p>
        </div>
        {done ? (
          <p role="status" className="text-sm">
            Bem-vindo ao fundo. Seu cupom é <strong className="tabular bg-paper px-2 py-0.5 font-semibold text-ink">{WELCOME_COUPON.code}</strong>
          </p>
        ) : (
          <form
            className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center"
            onSubmit={(e) => {
              e.preventDefault();
              if (e.currentTarget.checkValidity()) setDone(true);
            }}
          >
            <label className="sr-only" htmlFor="club-name">
              Nome
            </label>
            <input id="club-name" required autoComplete="given-name" placeholder="NOME" className="h-10 w-full border border-paper/40 bg-transparent px-3 text-xs tracking-wider outline-none transition-colors placeholder:text-paper/50 focus:border-paper sm:max-w-[260px] sm:flex-1" />
            <label className="sr-only" htmlFor="club-email">
              E-mail
            </label>
            <input id="club-email" required type="email" autoComplete="email" placeholder="E-MAIL" className="h-10 w-full border border-paper/40 bg-transparent px-3 text-xs tracking-wider outline-none transition-colors placeholder:text-paper/50 focus:border-paper sm:max-w-[320px] sm:flex-1" />
            <button type="submit" className="btn btn-light h-10 min-h-0 px-6 text-[0.72rem]">
              Inscrever-se <ArrowRight className="size-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
