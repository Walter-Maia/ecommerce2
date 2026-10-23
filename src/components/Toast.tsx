"use client";

import { useStore } from "./StoreProvider";
import { CheckIcon } from "./Icons";

export function Toast() {
  const { toast, cartOpen } = useStore();
  if (!toast || cartOpen) return null;
  return (
    <div role="status" className="drop-in fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 bg-ink px-5 py-3 text-sm text-paper shadow-2xl">
      <CheckIcon />
      {toast}
    </div>
  );
}
