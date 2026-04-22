import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/useOrders";
import type { Order } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { ChevronRight, ClipboardList, RefreshCw, Zap } from "lucide-react";

function formatPrice(cents: bigint) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ACTIVE_STATUSES = new Set(["confirmed", "preparing", "onTheWay"]);

function LivePulse() {
  return (
    <span className="relative flex h-2 w-2 mr-1">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
    </span>
  );
}

function OrderCard({ order, index }: { order: Order; index: number }) {
  const isActive = ACTIVE_STATUSES.has(order.status.__kind__);

  return (
    <Link
      to="/orders/$id"
      params={{ id: order.id }}
      data-ocid={`orders.item.${index + 1}`}
      className="block group"
    >
      <div
        className={`bg-card rounded-xl border shadow-card hover:shadow-elevated transition-smooth p-5 group-hover:-translate-y-0.5 ${
          isActive ? "border-primary/30" : "border-border"
        }`}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {isActive && <LivePulse />}
              <h3 className="font-display font-semibold text-foreground truncate">
                {order.restaurantName}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {order.id} · {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <OrderStatusBadge status={order.status} size="sm" />
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Progress bar for active orders */}
        {isActive && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-primary" />
                Order in progress
              </span>
              <span>~{Number(order.estimatedDeliveryMinutes)} min</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{
                  width:
                    order.status.__kind__ === "confirmed"
                      ? "20%"
                      : order.status.__kind__ === "preparing"
                        ? "55%"
                        : "85%",
                }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground truncate max-w-[60%]">
            {order.items
              .slice(0, 2)
              .map((i) => i.name)
              .join(", ")}
            {order.items.length > 2 && ` +${order.items.length - 2} more`}
          </p>
          <p className="font-bold text-foreground text-sm">
            {formatPrice(order.totalAmount)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function OrdersPage() {
  const { data: orders = [], isLoading, refetch, isFetching } = useOrders();
  const { identity, login } = useInternetIdentity();

  if (!identity) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <EmptyState
          icon={<ClipboardList className="h-12 w-12" />}
          title="Sign in to view orders"
          description="Track your current and past orders by signing in with Internet Identity."
          actionLabel="Sign In"
          onAction={() => login()}
        />
      </div>
    );
  }

  const activeOrders = orders.filter((o) =>
    ACTIVE_STATUSES.has(o.status.__kind__),
  );
  const pastOrders = orders.filter(
    (o) => !ACTIVE_STATUSES.has(o.status.__kind__),
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            My Orders
          </h1>
          {orders.length > 0 && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {orders.length} {orders.length === 1 ? "order" : "orders"} total
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {activeOrders.length > 0 && (
            <Badge className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1.5">
              <LivePulse />
              {activeOrders.length} active
            </Badge>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => refetch()}
            data-ocid="orders.refresh_button"
            className="rounded-full"
            aria-label="Refresh orders"
          >
            <RefreshCw
              className={`h-4 w-4 text-muted-foreground ${isFetching ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" label="Loading your orders..." />
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={<ClipboardList className="h-12 w-12" />}
          title="No orders yet"
          description="Your order history will appear here once you place your first order."
          actionLabel="Browse Restaurants"
          actionTo="/"
        />
      ) : (
        <div className="space-y-8" data-ocid="orders.list">
          {/* Active orders */}
          {activeOrders.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                <LivePulse />
                Active Orders
              </h2>
              <div className="space-y-3">
                {activeOrders.map((order, i) => (
                  <OrderCard key={order.id} order={order} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Past orders */}
          {pastOrders.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Past Orders
              </h2>
              <div className="space-y-3">
                {pastOrders.map((order, i) => (
                  <OrderCard key={order.id} order={order} index={i + 50} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
