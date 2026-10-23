import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/data/site";
import { Mark } from "./Logo";
import { InstagramIcon, TiktokIcon } from "./Icons";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer>
      <Newsletter />
      <div className="mx-auto max-w-[1600px] px-5 pt-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-[34ch]">
            <Mark className="size-9" />
            <p className="mt-5 text-sm leading-relaxed text-ink-2">
              Streetwear autoral desenhado em São Paulo. Estampas ilustradas, algodão pesado e tiragens curtas — quando acaba, acaba.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-10 place-items-center border border-line transition-colors hover:border-ink">
                <InstagramIcon />
              </a>
              <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="grid size-10 place-items-center border border-line transition-colors hover:border-ink">
                <TiktokIcon />
              </a>
            </div>
          </div>
          {FOOTER_LINKS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="t-label mb-4 text-[0.7rem] font-semibold">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="u-hover text-sm text-ink-2">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p aria-hidden="true" className="t-wide pointer-events-none mt-16 select-none text-center text-[17.5vw] font-semibold leading-[0.78] tracking-[-0.02em] text-ink md:text-[16.5vw] 2xl:text-[15.5rem]">
          NEPZERA
        </p>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-xs text-mute md:flex-row md:items-center md:justify-between">
          <p>© 2026 NEPZERA. Marca fictícia — loja de demonstração, nenhuma compra é processada.</p>
          <p>Pix · Cartão em até 6x sem juros · Envio para todo o Brasil</p>
        </div>
      </div>
    </footer>
  );
}
