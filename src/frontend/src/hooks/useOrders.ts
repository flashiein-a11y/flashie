import type { CartItem, Order, OrderStatus, PlaceOrderRequest } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// In-memory order store for demo
const orderStore: Order[] = [];
let orderCounter = 1;

function makeStatus(kind: OrderStatus["__kind__"]): OrderStatus {
  return { __kind__: kind };
}

function getNextStatus(
  current: OrderStatus["__kind__"],
): OrderStatus["__kind__"] {
  const progression: OrderStatus["__kind__"][] = [
    "confirmed",
    "preparing",
    "onTheWay",
    "delivered",
  ];
  const idx = progression.indexOf(current);
  return progression[Math.min(idx + 1, progression.length - 1)];
}

export function useOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return [...orderStore].reverse();
    },
    refetchInterval: 10000, // poll every 10 seconds for status updates
  });
}

export function useOrder(orderId: string) {
  return useQuery<Order | undefined>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return orderStore.find((o) => o.id === orderId);
    },
    enabled: !!orderId,
    refetchInterval: 8000, // poll for real-time tracking
  });
}

export function usePlaceOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      request: PlaceOrderRequest & { restaurantName: string },
    ) => {
      await new Promise((r) => setTimeout(r, 800));
      const now = BigInt(Date.now());
      const items: CartItem[] = request.items.map((item) => ({
        ...item,
        price: BigInt(item.price),
        quantity: BigInt(item.quantity),
      }));
      const subtotal = items.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0,
      );
      const deliveryFee = 399;
      const order: Order = {
        id: `ORD-${String(orderCounter++).padStart(4, "0")}`,
        userId: "demo-user",
        restaurantId: request.restaurantId,
        restaurantName: request.restaurantName,
        items,
        status: makeStatus("confirmed"),
        deliveryAddress: request.deliveryAddress,
        specialInstructions: request.specialInstructions,
        totalAmount: BigInt(subtotal + deliveryFee),
        deliveryFee: BigInt(deliveryFee),
        estimatedDeliveryMinutes: BigInt(30),
        createdAt: now,
        updatedAt: now,
      };
      orderStore.push(order);

      // Simulate order progression
      const progressOrder = (
        id: string,
        delay: number,
        nextStatus: OrderStatus["__kind__"],
      ) => {
        setTimeout(() => {
          const idx = orderStore.findIndex((o) => o.id === id);
          if (idx >= 0) {
            orderStore[idx] = {
              ...orderStore[idx],
              status: makeStatus(nextStatus),
              updatedAt: BigInt(Date.now()),
            };
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["order", id] });
          }
        }, delay);
      };

      progressOrder(order.id, 15000, "preparing");
      progressOrder(order.id, 45000, "onTheWay");
      progressOrder(order.id, 90000, "delivered");

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

// Advance order status (for demo/testing)
export function useAdvanceOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: string) => {
      const idx = orderStore.findIndex((o) => o.id === orderId);
      if (idx >= 0) {
        const current = orderStore[idx].status.__kind__;
        if (current !== "delivered" && current !== "cancelled") {
          orderStore[idx] = {
            ...orderStore[idx],
            status: makeStatus(getNextStatus(current)),
            updatedAt: BigInt(Date.now()),
          };
        }
      }
    },
    onSuccess: (_data, orderId) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", orderId] });
    },
  });
}
