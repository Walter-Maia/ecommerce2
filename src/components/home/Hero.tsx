import { getImageProps } from "next/image";
import Link from "next/link";
import { CAMPAIGN } from "@/data/site";
import { Logo } from "../Logo";
import { Bubbles } from "../Bubbles";

/**
 * Hero em tela cheia, antes do cabeçalho (como nas lojas de drop):
 * foto da campanha, logo central com "Shop all" e o título da coleção à direita.
 * Direção de arte: foto vertical no celular, horizontal no desktop.
 */
export function Hero() {
  const common = { alt: "", sizes: "100vw", fetchPriority: "high", loading: "eager" } as const;
  const desktop = getImageProps({ ...common, src: "/images/editorial/hero.webp", width: 2560, height: 1440, quality: 85 });
  const mobile = getImageProps({ ...common, src: "/images/editorial/hero-mobile.webp", width: 1080, height: 1920, quality: 85 });
  const title = getImageProps({ src: "/images/editorial/abissal-title.webp", alt: CAMPAIGN.name, width: 1400, height: 683, sizes: "(min-width: 768px) 30vw, 80vw" });

  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-abyss text-paper" aria-label={`Campanha ${CAMPAIGN.name}`}>
      <picture>
        <source media="(min-width: 768px)" srcSet={desktop.props.srcSet} sizes="100vw" />
        <source srcSet={mobile.props.srcSet} sizes="100vw" />
        <img
          {...mobile.props}
          srcSet={undefined}
          alt="Quatro modelos posam como num retrato antigo diante do tanque escuro de um aquário abandonado, vestindo a coleção ABISSAL"
          className="hero-img absolute inset-0 size-full object-cover object-[center_70%] md:object-[left_12%]"
        />
      </picture>

      {/* véus para leitura do texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-transparent to-abyss/80 md:from-abyss/40 md:to-abyss/70" />
      <div className="absolute inset-0 hidden bg-[radial-gradient(60%_70%_at_72%_45%,rgb(7_11_14/0.55),transparent_70%)] md:block" />
      <Bubbles count={14} />

      <div className="relative z-10 mx-auto grid h-full max-w-[1600px] grid-rows-[auto_1fr_auto] px-5 pb-10 pt-[12vh] md:grid-cols-[1fr_1fr_1.1fr] md:grid-rows-1 md:items-center md:px-10 md:pt-0">
        <div className="hidden md:block" />

        <div className="rise flex flex-col items-center gap-6 text-center" style={{ animationDelay: "250ms" }}>
          <Logo size="xl" />
          <Link href="/colecao/todos" className="t-label u-link text-[0.85rem] font-semibold">
            Shop all
          </Link>
        </div>

        <div className="rise flex flex-col items-center gap-3 self-end md:self-auto" style={{ animationDelay: "650ms" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- getImageProps já gera o srcset otimizado */}
          <img {...title.props} alt={CAMPAIGN.name} className="w-[min(78vw,340px)] drop-shadow-[0_0_30px_rgb(142_243_234/0.25)] md:w-[min(30vw,460px)]" />
          <p className="t-label text-[0.8rem] font-medium tracking-[0.2em]">
            {CAMPAIGN.chapter} <span className="mx-2 text-glow">●</span> {CAMPAIGN.status}
          </p>
          <Link href="/lookbook" className="btn btn-light mt-4 md:hidden">
            Ver campanha
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-hidden="true">
        <span className="t-label text-[0.62rem] tracking-[0.3em] text-paper/70">Mergulhe</span>
        <span className="scroll-cue block h-10 w-px bg-paper/70" />
      </div>
    </section>
  );
}
