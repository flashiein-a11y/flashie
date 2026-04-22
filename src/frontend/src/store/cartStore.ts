import type { CartItemUI } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: CartItemUI[];
  restaurantId: string | null;
  restaurantName: string;
  addItem: (item: CartItemUI, restaurantName?: string) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      restaurantName: "",

      addItem: (item, restaurantName) => {
        const { items, restaurantId } = get();

        // If adding from a different restaurant, clear cart first
        if (restaurantId && restaurantId !== item.restaurantId) {
          set({
            items: [{ ...item, quantity: 1 }],
            restaurantId: item.restaurantId,
            restaurantName: restaurantName ?? "",
          });
          return;
        }

        const existing = items.find((i) => i.menuItemId === item.menuItemId);
        if (existing) {
          set({
            items: items.map((i) =>
              i.menuItemId === item.menuItemId
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          });
        } else {
          set({
            items: [...items, { ...item, quantity: 1 }],
            restaurantId: item.restaurantId,
            restaurantName: restaurantName ?? get().restaurantName,
          });
        }
      },

      removeItem: (menuItemId) => {
        const items = get().items.filter((i) => i.menuItemId !== menuItemId);
        set({
          items,
          restaurantId: items.length === 0 ? null : get().restaurantId,
          restaurantName: items.length === 0 ? "" : get().restaurantName,
        });
      },

      updateQuantity: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.menuItemId === menuItemId ? { ...i, quantity } : i,
          ),
        });
      },

      clearCart: () =>
        set({ items: [], restaurantId: null, restaurantName: "" }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "quickbite-cart",
    },
  ),
);
