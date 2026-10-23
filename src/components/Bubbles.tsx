/** Bolhas subindo (decorativas). Valores fixos para o HTML do servidor bater com o do cliente. */
const SEEDS = [
  [6, 6, 15, 0],
  [14, 10, 19, 4],
  [22, 4, 13, 8],
  [31, 8, 21, 2],
  [43, 5, 16, 10],
  [52, 12, 24, 6],
  [61, 4, 14, 1],
  [68, 9, 18, 9],
  [74, 6, 22, 3],
  [81, 14, 26, 7],
  [87, 5, 15, 11],
  [93, 8, 20, 5],
  [37, 3, 12, 12],
  [57, 7, 17, 13],
  [11, 5, 23, 14],
  [77, 3, 11, 15],
] as const;

export function Bubbles({ count = 12 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {SEEDS.slice(0, count).map(([left, size, dur, delay], i) => (
        <span
          key={i}
          className="bubble"
          style={{ left: `${left}%`, width: size, height: size, animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}
