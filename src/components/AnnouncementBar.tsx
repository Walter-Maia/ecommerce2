import { ANNOUNCEMENTS } from "@/data/site";

/** Faixa preta com letreiro correndo (duplicado para o loop não ter emenda). */
export function AnnouncementBar() {
  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];
  return (
    <div className="h-[var(--announce-h)] overflow-hidden bg-ink text-paper" aria-label="Avisos da loja">
      <ul className="marquee h-full items-center">
        {[0, 1].map((half) => (
          <li key={half} className="flex shrink-0 items-center" aria-hidden={half === 1 || undefined}>
            {items.map((text, i) => (
              <span key={i} className="t-label flex items-center whitespace-nowrap text-[0.72rem] font-medium">
                <span className="px-8">{text}</span>
                <span className="size-1 rounded-full bg-glow" />
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
