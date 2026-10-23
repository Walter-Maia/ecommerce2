"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/data/catalog";

/**
 * Estado da loja no navegador: sacola e pedidos ficam no localStorage
 * (demo sem servidor). Leitura/escrita sempre em try/catch: modo privado
 * ou storage bloqueado não podem quebrar a página.
 */

export interface CartLine {
  slug: string;
  size: string;
  qty: number;
}

export interface Order {
  id: string;
  createdAt: string;
  lines: (CartLine & { name: string; price: number })[];
  total: number;
  payment: "pix" | "cartao";
  shipping: string;
}

interface StoreValue {
  ready: boolean;
  lines: (CartLine & { product: Product })[];
  count: number;
  subtotal: number;
  add: (slug: string, size: string, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
  orders: Order[];
  saveOrder: (o: Order) => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  toast: string | null;
}

const CART_KEY = "nepzera:cart";
const ORDERS_KEY = "nepzera:orders";
const MAX_QTY = 10;

const StoreContext = createContext<StoreValue | null>(null);

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage indisponível: a sacola segue só em memória */
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = readJSON<CartLine[]>(CART_KEY, []);
    // O localStorage só existe no cliente: ler depois da montagem evita divergência de hidratação.
    // Descarta linhas de produtos que não existem mais no catálogo.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincronização única com armazenamento externo
    setCart(Array.isArray(saved) ? saved.filter((l) => getProduct(l.slug) && l.qty > 0) : []);
    setOrders(readJSON<Order[]>(ORDERS_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writeJSON(CART_KEY, cart);
  }, [cart, ready]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((slug: string, size: string, qty = 1) => {
    const product = getProduct(slug);
    if (!product) return;
    setCart((prev) => {
      const i = prev.findIndex((l) => l.slug === slug && l.size === size);
      if (i === -1) return [...prev, { slug, size, qty: Math.min(qty, MAX_QTY) }];
      const next = [...prev];
      next[i] = { ...next[i], qty: Math.min(next[i].qty + qty, MAX_QTY) };
      return next;
    });
    setToast(`${product.name} (${size}) na sacola`);
    setCartOpen(true);
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.max(0, Math.min(qty, MAX_QTY)) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const remove = useCallback((slug: string, size: string) => {
    setCart((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const clear = useCallback(() => setCart([]), []);

  const saveOrder = useCallback((o: Order) => {
    setOrders((prev) => {
      const next = [o, ...prev].slice(0, 20);
      writeJSON(ORDERS_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo<StoreValue>(() => {
    const lines = cart.flatMap((l) => {
      const product = getProduct(l.slug);
      return product ? [{ ...l, product }] : [];
    });
    return {
      ready,
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      add,
      setQty,
      remove,
      clear,
      orders,
      saveOrder,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      searchOpen,
      setSearchOpen,
      toast,
    };
  }, [cart, ready, add, setQty, remove, clear, orders, saveOrder, cartOpen, searchOpen, toast]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore precisa estar dentro de <StoreProvider>");
  return ctx;
}
