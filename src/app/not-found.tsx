import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Bubbles } from "@/components/Bubbles";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="relative grid min-h-[70vh] place-items-center overflow-hidden bg-abyss px-5 text-center text-paper">
        <Bubbles count={12} />
        <div className="relative">
          <p className="t-label text-[0.72rem] text-glow">Erro 404 · −4.000 m</p>
          <h1 className="t-wide mt-5 text-[3rem] font-semibold uppercase leading-none md:text-[5.5rem]">Fundo demais</h1>
          <p className="mx-auto mt-5 max-w-[38ch] text-sm text-paper/65">Essa página afundou ou nunca existiu. Volte para a superfície.</p>
          <Link href="/" className="btn btn-light mt-10">
            Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
