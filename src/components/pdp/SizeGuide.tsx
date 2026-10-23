"use client";

import { useEffect } from "react";
import type { Product } from "@/data/catalog";
import { CloseIcon } from "../Icons";

/** Medidas da PEÇA em cm, por família de modelagem. */
const CHARTS: Record<string, { cols: [string, string]; rows: Record<string, [number, number]> }> = {
  heavy: { cols: ["Largura", "Comprimento"], rows: { P: [56, 70], M: [59, 72], G: [62, 74], GG: [65, 76], XGG: [68, 78] } },
  classic: { cols: ["Largura", "Comprimento"], rows: { P: [50, 70], M: [53, 72], G: [56, 74], GG: [59, 76], XGG: [62, 78] } },
  outer: { cols: ["Largura", "Comprimento"], rows: { P: [58, 66], M: [61, 68], G: [64, 70], GG: [67, 72], XGG: [70, 74] } },
  denim: { cols: ["Cintura", "Gancho"], rows: { "38": [78, 31], "40": [82, 32], "42": [86, 33], "44": [90, 34], "46": [94, 35] } },
};

function chartFor(p: Product) {
  if (p.sizes.includes("38")) return CHARTS.denim;
  if (p.category === "moletons" || p.category === "jaquetas") return CHARTS.outer;
  if (p.name.includes("Heavy") || p.name.includes("Long")) return CHARTS.heavy;
  return CHARTS.classic;
}

export function SizeGuide({ product, onClose }: { product: Product; onClose: () => void }) {
  const chart = chartFor(product);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="guide-title">
      <button type="button" className="fade-in absolute inset-0 bg-ink/45" onClick={onClose} aria-label="Fechar guia" />
      <div className="drop-in relative w-full max-w-[520px] bg-paper p-7">
        <div className="flex items-start justify-between">
          <div>
            <h2 id="guide-title" className="t-wide text-xl font-semibold uppercase">
              Guia de medidas
            </h2>
            <p className="mt-1 text-xs text-mute">{product.name} — medidas da peça em centímetros</p>
          </div>
          <button type="button" onClick={onClose} className="-mr-2 -mt-2 p-2" aria-label="Fechar">
            <CloseIcon />
          </button>
        </div>
        <table className="tabular mt-6 w-full text-sm">
          <thead>
            <tr className="border-b border-ink text-left">
              <th className="t-label py-2 text-[0.7rem] font-semibold">Tam.</th>
              <th className="t-label py-2 text-[0.7rem] font-semibold">{chart.cols[0]}</th>
              <th className="t-label py-2 text-[0.7rem] font-semibold">{chart.cols[1]}</th>
            </tr>
          </thead>
          <tbody>
            {product.sizes.map((s) => (
              <tr key={s} className="border-b border-line">
                <td className="py-2.5 font-medium">{s}</td>
                <td className="py-2.5">{chart.rows[s]?.[0] ?? "—"}</td>
                <td className="py-2.5">{chart.rows[s]?.[1] ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-5 text-xs leading-relaxed text-mute">
          Meça uma peça sua que veste bem, deitada numa superfície plana: largura de axila a axila e comprimento do ombro à barra. Entre dois tamanhos, nas Heavy, escolha o menor.
        </p>
      </div>
    </div>
  );
}
