import type { Metadata } from "next";
import { FAQ } from "@/data/site";
import { PlusIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Ajuda",
  description: "Trocas, prazos de entrega, guia de tamanhos, pagamento e contato da NEPZERA.",
};

export default function HelpPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-12 md:px-10 md:py-16 lg:grid-cols-[1fr_1.4fr]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div>
        <h1 className="t-wide text-[2.6rem] font-semibold uppercase leading-[0.9] tracking-tight md:text-[4rem]">Ajuda</h1>
        <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-ink-2">Respostas rápidas sobre trocas, entregas e tamanhos. Não achou o que precisava? Fale com a gente.</p>
        <div id="contato" className="mt-10 scroll-mt-32 border-t border-ink pt-6 text-sm">
          <p className="t-label text-[0.72rem] font-semibold">Contato</p>
          <p className="mt-3 text-ink-2">contato@nepzera.test</p>
          <p className="text-ink-2">Seg. a sex., das 10h às 18h</p>
        </div>
      </div>
      <div className="divide-y divide-line border-y border-line">
        {FAQ.map((f, i) => (
          <details key={f.id} id={f.id} open={i === 0} className="group scroll-mt-32 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.05rem] font-medium [&::-webkit-details-marker]:hidden">
              {f.q}
              <PlusIcon className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="max-w-[60ch] pt-3 text-[0.92rem] leading-relaxed text-ink-2">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
