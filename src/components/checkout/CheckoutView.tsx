"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { productImages } from "@/data/catalog";
import { FREE_SHIPPING_FROM, MAX_INSTALLMENTS, PIX_DISCOUNT, WELCOME_COUPON } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { CheckIcon } from "../Icons";
import { useStore } from "../StoreProvider";

const SHIPPING = [
  { id: "pac", label: "Econômico", eta: "5 a 9 dias úteis", price: 2490 },
  { id: "sedex", label: "Expresso", eta: "2 a 4 dias úteis", price: 3990 },
] as const;

const UF = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" ");

/**
 * Checkout de demonstração. Nada sai do navegador: os campos de cartão
 * nem têm `name`, e o pedido só é guardado no localStorage.
 */
export function CheckoutView() {
  const { ready, lines, subtotal, clear, saveOrder } = useStore();
  const [shipping, setShipping] = useState<(typeof SHIPPING)[number]["id"]>("pac");
  const [payment, setPayment] = useState<"pix" | "cartao">("pix");
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [installments, setInstallments] = useState(MAX_INSTALLMENTS);
  const [done, setDone] = useState<{ id: string; total: number; payment: "pix" | "cartao" } | null>(null);

  const ship = SHIPPING.find((s) => s.id === shipping)!;
  const couponOff = applied ? Math.round(subtotal * (WELCOME_COUPON.percent / 100)) : 0;
  const shipPrice = shipping === "pac" && subtotal >= FREE_SHIPPING_FROM ? 0 : ship.price;
  const base = subtotal - couponOff;
  const pixOff = payment === "pix" ? Math.round(base * PIX_DISCOUNT) : 0;
  const total = base - pixOff + shipPrice;

  if (done) {
    return (
      <div className="mx-auto flex max-w-[640px] flex-col items-center px-5 py-24 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-ink text-paper">
          <CheckIcon className="size-7" />
        </span>
        <h1 className="t-wide mt-8 text-3xl font-semibold uppercase md:text-4xl">Pedido confirmado</h1>
        <p className="tabular mt-3 text-sm text-mute">
          Pedido <strong className="text-ink">{done.id}</strong> · {formatPrice(done.total)} no {done.payment === "pix" ? "Pix" : "cartão"}
        </p>
        <p className="mt-6 max-w-[44ch] text-sm leading-relaxed text-ink-2">
          Esta é uma loja de demonstração: nenhum pagamento foi cobrado e nenhum dado foi enviado. O pedido ficou salvo só neste navegador.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/conta" className="btn btn-outline">
            Ver meus pedidos
          </Link>
          <Link href="/colecao/novidades" className="btn btn-dark">
            Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  if (ready && lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-[640px] flex-col items-center px-5 py-28 text-center">
        <h1 className="t-wide text-3xl font-semibold uppercase">Sua sacola está vazia</h1>
        <p className="mt-3 text-sm text-mute">Adicione peças para finalizar a compra.</p>
        <Link href="/colecao/todos" className="btn btn-dark mt-8">
          Ver produtos
        </Link>
      </div>
    );
  }

  const applyCoupon = () => {
    const ok = coupon.trim().toUpperCase() === WELCOME_COUPON.code;
    setApplied(ok);
    setCouponError(!ok);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    const id = `NPZ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    saveOrder({
      id,
      createdAt: new Date().toISOString(),
      lines: lines.map((l) => ({ slug: l.slug, size: l.size, qty: l.qty, name: l.product.name, price: l.product.price })),
      total,
      payment,
      shipping: `${ship.label} (${ship.eta})`,
    });
    clear();
    setDone({ id, total, payment });
    window.scrollTo({ top: 0 });
  };

  return (
    <form onSubmit={submit} className="mx-auto grid max-w-[1400px] gap-10 px-5 py-10 md:px-10 md:py-14 lg:grid-cols-[1fr_440px] lg:gap-16">
      <div>
        <h1 className="t-wide text-[2.2rem] font-semibold uppercase leading-none tracking-tight md:text-[3rem]">Finalizar compra</h1>
        <p className="mt-3 text-xs text-mute">Pagamento simulado: não digite dados reais de cartão.</p>

        <Step n={1} title="Contato">
          <Field label="E-mail" type="email" autoComplete="email" required className="sm:col-span-2" />
          <Field label="Celular" type="tel" autoComplete="tel" inputMode="tel" placeholder="(11) 90000-0000" required className="sm:col-span-2" />
        </Step>

        <Step n={2} title="Entrega">
          <Field label="CEP" inputMode="numeric" autoComplete="postal-code" pattern="\d{5}-?\d{3}" placeholder="00000-000" required />
          <Field label="Nome completo" autoComplete="name" required />
          <Field label="Endereço" autoComplete="address-line1" required className="sm:col-span-2" />
          <Field label="Número" inputMode="numeric" required />
          <Field label="Complemento" autoComplete="address-line2" />
          <Field label="Bairro" required />
          <Field label="Cidade" autoComplete="address-level2" required />
          <label className="block">
            <span className="t-label text-[0.68rem] text-mute">Estado</span>
            <select required defaultValue="" className="mt-1.5 h-12 w-full border border-ink/25 bg-transparent px-3 text-sm outline-none focus:border-ink">
              <option value="" disabled>
                Selecione
              </option>
              {UF.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </label>
        </Step>

        <Step n={3} title="Frete">
          <div className="space-y-2 sm:col-span-2" role="radiogroup" aria-label="Opções de frete">
            {SHIPPING.map((s) => {
              const free = s.id === "pac" && subtotal >= FREE_SHIPPING_FROM;
              return (
                <label key={s.id} className={clsx("flex cursor-pointer items-center justify-between border px-4 py-4 transition-colors", shipping === s.id ? "border-ink" : "border-line")}>
                  <span className="flex items-center gap-3">
                    <input type="radio" name="frete" checked={shipping === s.id} onChange={() => setShipping(s.id)} className="accent-ink" />
                    <span>
                      <span className="block text-sm font-medium">{s.label}</span>
                      <span className="block text-xs text-mute">{s.eta}</span>
                    </span>
                  </span>
                  <span className="tabular text-sm">{free ? "Grátis" : formatPrice(s.price)}</span>
                </label>
              );
            })}
          </div>
        </Step>

        <Step n={4} title="Pagamento">
          <div className="grid grid-cols-2 gap-2 sm:col-span-2">
            {(["pix", "cartao"] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={payment === m}
                onClick={() => setPayment(m)}
                className={clsx("border px-4 py-4 text-left transition-colors", payment === m ? "border-ink bg-ink text-paper" : "border-line hover:border-ink")}
              >
                <span className="block text-sm font-medium">{m === "pix" ? "Pix" : "Cartão de crédito"}</span>
                <span className={clsx("block text-xs", payment === m ? "text-paper/70" : "text-mute")}>
                  {m === "pix" ? `${Math.round(PIX_DISCOUNT * 100)}% de desconto` : `Até ${MAX_INSTALLMENTS}x sem juros`}
                </span>
              </button>
            ))}
          </div>
          {payment === "pix" ? (
            <p className="text-sm text-ink-2 sm:col-span-2">O QR Code do Pix aparece depois da confirmação. Nesta demo, nenhum pagamento é gerado.</p>
          ) : (
            <>
              {/* campos sem `name` e sem autocomplete: o cartão nunca é lido nem enviado */}
              <Field label="Número do cartão" inputMode="numeric" autoComplete="off" placeholder="0000 0000 0000 0000" required className="sm:col-span-2" />
              <Field label="Nome impresso" autoComplete="off" required />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Validade" autoComplete="off" placeholder="MM/AA" required />
                <Field label="CVV" inputMode="numeric" autoComplete="off" placeholder="000" required />
              </div>
              <label className="block sm:col-span-2">
                <span className="t-label text-[0.68rem] text-mute">Parcelas</span>
                <select value={installments} onChange={(e) => setInstallments(Number(e.target.value))} className="tabular mt-1.5 h-12 w-full border border-ink/25 bg-transparent px-3 text-sm outline-none focus:border-ink">
                  {Array.from({ length: MAX_INSTALLMENTS }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}x de {formatPrice(Math.ceil(total / n))} sem juros
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
        </Step>
      </div>

      <aside className="lg:sticky lg:top-[calc(var(--announce-h)+var(--header-h)+1.5rem)] lg:self-start">
        <div className="bg-mist/60 p-6 md:p-8">
          <h2 className="t-label text-sm font-semibold">Resumo</h2>
          <ul className="mt-5 space-y-4">
            {lines.map((l) => {
              const img = productImages(l.product);
              return (
                <li key={`${l.slug}-${l.size}`} className="flex gap-4">
                  <div className="relative aspect-[4/5] w-16 shrink-0 overflow-hidden bg-mist">
                    <Image src={img.front.src} alt={img.front.alt} fill sizes="64px" className="object-cover" />
                    <span className="tabular absolute -right-0 -top-0 grid size-5 place-items-center bg-ink text-[0.6rem] text-paper">{l.qty}</span>
                  </div>
                  <div className="flex flex-1 justify-between gap-3 text-sm">
                    <div>
                      <p>{l.product.name}</p>
                      <p className="text-xs text-mute">Tam. {l.size}</p>
                    </div>
                    <p className="tabular">{formatPrice(l.product.price * l.qty)}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex gap-2">
            <label className="sr-only" htmlFor="coupon">
              Cupom
            </label>
            <input
              id="coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Cupom de desconto"
              className="h-11 flex-1 border border-ink/25 bg-paper px-3 text-sm uppercase outline-none placeholder:normal-case focus:border-ink"
            />
            <button type="button" onClick={applyCoupon} className="btn btn-outline h-11 min-h-0 px-4 text-[0.7rem]">
              Aplicar
            </button>
          </div>
          {applied ? <p className="mt-2 text-xs">Cupom {WELCOME_COUPON.code} aplicado.</p> : null}
          {couponError ? <p className="mt-2 text-xs text-signal">Cupom inválido. Dica: {WELCOME_COUPON.code}.</p> : null}

          <dl className="tabular mt-6 space-y-2 border-t border-ink/15 pt-5 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            {couponOff ? <Row label={`Cupom ${WELCOME_COUPON.code}`} value={`− ${formatPrice(couponOff)}`} /> : null}
            {pixOff ? <Row label="Desconto Pix" value={`− ${formatPrice(pixOff)}`} /> : null}
            <Row label="Frete" value={shipPrice ? formatPrice(shipPrice) : "Grátis"} />
          </dl>
          <div className="tabular mt-4 flex items-baseline justify-between border-t border-ink/15 pt-4">
            <span className="t-label text-sm font-semibold">Total</span>
            <span className="text-2xl font-medium">{formatPrice(total)}</span>
          </div>
          <button type="submit" disabled={!ready} className="btn btn-dark mt-6 w-full">
            {payment === "pix" ? "Pagar com Pix" : "Confirmar pagamento"}
          </button>
        </div>
      </aside>
    </form>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-10 border-t border-ink pt-6">
      <legend className="t-label float-left mb-5 flex w-full items-center gap-3 text-sm font-semibold">
        <span className="tabular grid size-6 place-items-center rounded-full bg-ink text-[0.7rem] text-paper">{n}</span>
        {title}
      </legend>
      <div className="clear-both grid gap-3 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({ label, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={clsx("block", className)}>
      <span className="t-label text-[0.68rem] text-mute">
        {label}
        {props.required ? "" : " (opcional)"}
      </span>
      <input {...props} className="mt-1.5 h-12 w-full border border-ink/25 bg-transparent px-3 text-sm outline-none transition-colors placeholder:text-mute/50 focus:border-ink" />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-ink-2">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
