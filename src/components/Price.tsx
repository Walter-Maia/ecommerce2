import clsx from "clsx";
import { discountPercent, formatInstallments, formatPrice, pixPrice } from "@/lib/format";

/** Preço no padrão da loja: valor no Pix em destaque, parcelamento embaixo. */
export function Price({
  price,
  compareAt,
  size = "sm",
  className,
}: {
  price: number;
  compareAt?: number;
  size?: "sm" | "lg";
  className?: string;
}) {
  const off = discountPercent(price, compareAt);
  const lg = size === "lg";
  return (
    <div className={clsx("tabular", lg ? "space-y-1.5" : "md:text-right", className)}>
      {compareAt ? (
        <p className={clsx("text-mute", lg ? "text-sm" : "text-[0.7rem]")}>
          <span className="sr-only">De </span>
          <s>{formatPrice(compareAt)}</s>
          {off && lg ? <span className="ml-2 bg-signal px-1.5 py-0.5 text-[0.7rem] font-semibold text-paper">-{off}%</span> : null}
        </p>
      ) : null}
      <p className={clsx("whitespace-nowrap", lg ? "text-[1.6rem] font-medium tracking-tight" : "text-[0.9rem] font-medium")}>
        {formatPrice(pixPrice(price))}
        <span className={clsx("ml-1.5 font-normal text-mute", lg ? "text-base" : "text-[0.7rem]")}>no Pix</span>
      </p>
      <p className={clsx("text-mute", lg ? "text-sm" : "text-[0.68rem] leading-tight")}>
        {lg ? `ou ${formatPrice(price)} em ` : ""}
        {formatInstallments(price)}
      </p>
    </div>
  );
}
