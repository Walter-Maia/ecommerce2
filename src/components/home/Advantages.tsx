import { ADVANTAGES } from "@/data/site";
import { CouponIcon, PixIcon, SwapIcon, TruckIcon } from "../Icons";

const ICONS = { pix: PixIcon, truck: TruckIcon, coupon: CouponIcon, swap: SwapIcon } as const;

export function Advantages() {
  return (
    <section aria-label="Vantagens" className="border-y border-ink">
      <ul className="mx-auto grid max-w-[1600px] grid-cols-2 md:grid-cols-4">
        {ADVANTAGES.map((a, i) => {
          const Icon = ICONS[a.icon];
          return (
            <li
              key={a.title}
              data-reveal
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              className="flex items-start gap-4 border-line px-5 py-6 even:border-l md:border-l md:px-8 md:first:border-l-0 [&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-t-0"
            >
              <Icon className="size-7 shrink-0" />
              <div>
                <p className="t-label text-[0.78rem] font-semibold">{a.title}</p>
                <p className="mt-1 text-[0.8rem] leading-snug text-mute">{a.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
