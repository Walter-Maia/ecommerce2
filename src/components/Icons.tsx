/** Ícones de traço fino (1.5px), herdam a cor do texto. */

type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export const SearchIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const UserIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </svg>
);

export const BagIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="M5 8h14l-1 13H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const MenuIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
);

export const CloseIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);

export const ChevronDown = ({ className = "size-3.5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ArrowRight = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </svg>
);

export const PlusIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="M5 12h14" />
  </svg>
);

export const TruckIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);

export const PixIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="m12 2.8 4.2 4.2-4.2 4.2L7.8 7 12 2.8ZM12 12.8l4.2 4.2-4.2 4.2-4.2-4.2 4.2-4.2ZM2.8 12 7 7.8l4.2 4.2L7 16.2 2.8 12ZM12.8 12 17 7.8l4.2 4.2-4.2 4.2-4.2-4.2Z" />
  </svg>
);

export const CouponIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 0 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 1 0-4V6H3v2Z" />
    <path d="M14 6v12" strokeDasharray="2 2" />
  </svg>
);

export const SwapIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="M4 8h14l-3-3M20 16H6l3 3" />
  </svg>
);

export const InstagramIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
  </svg>
);

export const TiktokIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 3c.5 2.8 2.3 4.5 5 4.8" />
  </svg>
);

export const CheckIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const RulerIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className}>
    <path d="M3 16 16 3l5 5L8 21l-5-5Z" />
    <path d="m7 12 2 2M10 9l2 2M13 6l2 2" />
  </svg>
);
