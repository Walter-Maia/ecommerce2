import clsx from "clsx";

/** Símbolo da NEPZERA: sonar com três ondas e a isca acesa no topo. */
export function Mark({ className, glow }: { className?: string; glow?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="5.4" r="1.25" fill={glow ? "var(--glow)" : "currentColor"} className={glow ? "glow-pulse" : undefined} />
      <path
        d="M5 9.4q.875-1.1 1.75 0t1.75 0t1.75 0t1.75 0t1.75 0t1.75 0t1.75 0t1.75 0M6.75 12.9q.875-1.1 1.75 0t1.75 0t1.75 0t1.75 0t1.75 0t1.75 0M8.5 16.4q.875-1.1 1.75 0t1.75 0t1.75 0t1.75 0"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className, size = "sm" }: { className?: string; size?: "sm" | "xl" }) {
  if (size === "xl") {
    return (
      <span className={clsx("flex flex-col items-center gap-4", className)}>
        <Mark glow className="size-14 md:size-16" />
        <span className="t-wide text-[2.1rem] font-semibold leading-none tracking-[0.24em] md:text-[2.8rem]">
          NEPZERA<span className="text-glow">.</span>
        </span>
      </span>
    );
  }
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <Mark className="size-[26px]" />
      <span className="t-wide text-[1.05rem] font-semibold leading-none tracking-[0.2em]">NEPZERA</span>
    </span>
  );
}
