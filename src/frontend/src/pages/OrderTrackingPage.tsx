import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  OrderStatusBadge,
  OrderStatusStepper,
} from "@/components/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAdvanceOrderStatus, useOrder } from "@/hooks/useOrders";
import { useCartStore } from "@/store/cartStore";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Receipt,
  RotateCcw,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function formatPrice(cents: bigint) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ACTIVE_STATUSES = new Set(["confirmed", "preparing", "onTheWay"]);

function getProgressPercent(kind: string): number {
  const map: Record<string, number> = {
    confirmed: 15,
    preparing: 45,
    onTheWay: 80,
    delivered: 100,
    cancelled: 0,
  };
  return map[kind] ?? 0;
}

function CountdownTimer({
  orderCreatedAt,
  estimatedMinutes,
}: { orderCreatedAt: bigint; estimatedMinutes: bigint }) {
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const endTime =
      Number(orderCreatedAt) + Number(estimatedMinutes) * 60 * 1000;
    const update = () => {
      const diff = Math.max(0, endTime - Date.now());
      setRemaining(diff);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [orderCreatedAt, estimatedMinutes]);

  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);

  if (remaining === 0) {
    return (
      <span className="font-semibold text-accent">Arriving any moment!</span>
    );
  }

  return (
    <span className="font-semibold text-foreground tabular-nums">
      {mins}:{String(secs).padStart(2, "0")}
    </span>
  );
}

export default function OrderTrackingPage() {
  const { id } = useParams({ from: "/orders/$id" });
  const { data: order, isLoading } = useOrder(id);
  const { identity, login } = useInternetIdentity();
  const { mutate: advanceStatus, isPending: isAdvancing } =
    useAdvanceOrderStatus();
  const navigate = useNavigate();
  const { addItem, clearCart } = useCartStore();

  if (!identity) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <EmptyState
          title="Sign in required"
          description="Please sign in to view your order tracking."
          actionLabel="Sign In"
          onAction={() => login()}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" label="Loading order..." />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <EmptyState
          title="Order not found"
          description="This order doesn't exist or hasn't been placed yet."
          actionLabel="View all orders"
          actionTo="/orders"
        />
      </div>
    );
  }

  const isActive = ACTIVE_STATUSES.has(order.status.__kind__);
  const isDelivered = order.status.__kind__ === "delivered";
  const progressPercent = getProgressPercent(order.status.__kind__);

  function handleReorder() {
    if (!order) return;
    clearCart();
    for (const item of order.items) {
      addItem(
        {
          menuItemId: item.menuItemId,
          restaurantId: order.restaurantId,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
        },
        order.restaurantName,
      );
    }
    toast.success("Added to cart!", {
      description: `Items from ${order.restaurantName} added back to your cart.`,
    });
    navigate({ to: "/cart" });
  }

  function handleAdvance() {
    advanceStatus(order!.id, {
      onSuccess: () => {
        toast.success("Status updated (demo mode)");
      },
    });
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/orders">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
            data-ocid="order_tracking.back_button"
            aria-label="Back to orders"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-bold text-xl text-foreground truncate">
            {order.restaurantName}
          </h1>
          <p className="text-sm text-muted-foreground">
            {order.id} · {formatDate(order.createdAt)}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Live Progress Bar */}
      {isActive && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              Live Tracking
            </span>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <CountdownTimer
                orderCreatedAt={order.createdAt}
                estimatedMinutes={order.estimatedDeliveryMinutes}
              />
            </div>
          </div>
          <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {order.status.__kind__ === "confirmed" &&
              "Your order has been confirmed and will start cooking soon."}
            {order.status.__kind__ === "preparing" &&
              "Our chefs are preparing your delicious meal!"}
            {order.status.__kind__ === "onTheWay" &&
              "Your order is on its way — hang tight!"}
          </p>
        </div>
      )}

      {/* Status Stepper */}
      <div
        className="bg-card rounded-xl border border-border shadow-card p-6 mb-5"
        data-ocid="order_tracking.status_panel"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-foreground">Order Status</h2>
          {isDelivered && (
            <span className="text-xs text-accent font-semibold bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
              Delivered ✓
            </span>
          )}
        </div>
        <OrderStatusStepper status={order.status} />
        {isActive && (
          <p className="text-sm text-muted-foreground text-center mt-4 flex items-center justify-center gap-1.5">
            <Clock className="h-4 w-4" />
            Estimated ~{Number(order.estimatedDeliveryMinutes)} min from order
            time
          </p>
        )}
      </div>

      {/* Delivery Address */}
      <div className="bg-card rounded-xl border border-border shadow-card p-5 mb-5">
        <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Delivery Address
        </h2>
        <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
        {order.specialInstructions && (
          <p className="text-sm text-muted-foreground mt-2 italic">
            "{order.specialInstructions}"
          </p>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Receipt className="h-4 w-4 text-primary" />
            Order Details
          </h2>
        </div>
        <div className="divide-y divide-border">
          {order.items.map((item, idx) => (
            <div
              key={item.menuItemId}
              className="flex items-center gap-4 px-5 py-3"
              data-ocid={`order_tracking.item.${idx + 1}`}
            >
              {/* Item image placeholder — colored avatar */}
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-sm">
                {item.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium truncate">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {Number(item.quantity)} × {formatPrice(item.price)}
                </p>
              </div>
              <span className="text-sm font-semibold text-foreground shrink-0">
                {formatPrice(
                  BigInt(Number(item.price) * Number(item.quantity)),
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 bg-muted/30 space-y-2.5">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span>{formatPrice(order.totalAmount - order.deliveryFee)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Delivery fee</span>
            <span>{formatPrice(order.deliveryFee)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-foreground text-base">
            <span>Total</span>
            <span className="text-primary">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Demo advance button */}
      {isActive && (
        <div className="bg-muted/40 border border-dashed border-border rounded-xl p-3 mb-5 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Demo mode — advance order status
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAdvance}
            disabled={isAdvancing}
            data-ocid="order_tracking.advance_status_button"
            className="text-xs"
          >
            {isAdvancing ? "Updating..." : "→ Next Status"}
          </Button>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Link to="/orders" className="flex-1">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            data-ocid="order_tracking.orders_link"
          >
            All Orders
          </Button>
        </Link>
        <Button
          type="button"
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
          onClick={handleReorder}
          data-ocid="order_tracking.reorder_button"
        >
          <RotateCcw className="h-4 w-4" />
          Reorder
        </Button>
      </div>
    </div>
  );
}
