"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { useStore } from "./StoreProvider";

const date = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeStyle: "short" });

/** Pedidos feitos neste navegador (demo sem login). */
export function OrdersView() {
  const { ready, orders } = useStore();
  return (
    <div className="mx-auto max-w-[900px] px-5 py-12 md:px-10 md:py-16">
      <h1 className="t-wide text-[2.4rem] font-semibold uppercase leading-none tracking-tight md:text-[3.2rem]">Meus pedidos</h1>
      <p className="mt-3 text-sm text-mute">Na demo não há login: os pedidos ficam salvos só neste navegador.</p>

      {!ready ? null : orders.length === 0 ? (
        <div className="mt-12 border border-line p-10 text-center">
          <p className="text-sm">Você ainda não fez nenhum pedido.</p>
          <Link href="/colecao/novidades" className="btn btn-dark mt-6">
            Ver lançamentos
          </Link>
        </div>
      ) : (
        <ul className="mt-10 space-y-4">
          {orders.map((o) => (
            <li key={o.id} className="border border-line p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="tabular font-semibold">{o.id}</p>
                <p className="text-xs text-mute">{date.format(new Date(o.createdAt))}</p>
              </div>
              <ul className="mt-4 space-y-1 text-sm text-ink-2">
                {o.lines.map((l) => (
                  <li key={`${l.slug}-${l.size}`} className="tabular flex justify-between gap-4">
                    <Link href={`/produto/${l.slug}`} className="u-hover">
                      {l.qty}× {l.name} — {l.size}
                    </Link>
                    <span>{formatPrice(l.price * l.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="tabular mt-4 flex flex-wrap justify-between gap-2 border-t border-line pt-4 text-sm">
                <span className="text-mute">
                  {o.payment === "pix" ? "Pix" : "Cartão"} · {o.shipping}
                </span>
                <span className="font-medium">Total {formatPrice(o.total)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
