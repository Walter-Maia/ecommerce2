import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

export default function LojaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}
