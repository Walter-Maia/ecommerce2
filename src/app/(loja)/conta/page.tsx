import type { Metadata } from "next";
import { OrdersView } from "@/components/OrdersView";

export const metadata: Metadata = {
  title: "Meus pedidos",
  robots: { index: false },
};

export default function AccountPage() {
  return <OrdersView />;
}
