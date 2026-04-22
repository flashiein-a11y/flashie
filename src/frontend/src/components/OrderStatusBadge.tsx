import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";
import {
  Bike,
  CheckCircle,
  ChefHat,
  PackageCheck,
  XCircle,
} from "lucide-react";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: "sm" | "md";
}

const STATUS_CONFIG: Record<
  OrderStatus["__kind__"],
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    className: string;
  }
> = {
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    className: "bg-primary/10 text-primary border-primary/30",
  },
  preparing: {
    label: "Preparing",
    icon: ChefHat,
    className: "bg-accent/15 text-accent border-accent/30",
  },
  onTheWay: {
    label: "On the Way",
    icon: Bike,
    className: "bg-secondary/20 text-secondary-foreground border-secondary/40",
  },
  delivered: {
    label: "Delivered",
    icon: PackageCheck,
    className: "bg-accent/10 text-accent border-accent/30",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

export function OrderStatusBadge({
  status,
  size = "md",
}: OrderStatusBadgeProps) {
  const config = STATUS_CONFIG[status.__kind__];
  const Icon = config.icon;

  return (
    <Badge
      className={cn(
        "flex items-center gap-1.5 font-semibold border",
        config.className,
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1",
      )}
      data-ocid="order.status_badge"
    >
      <Icon className={cn(size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} />
      {config.label}
    </Badge>
  );
}

export function OrderStatusStepper({ status }: { status: OrderStatus }) {
  const steps: {
    key: OrderStatus["__kind__"];
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { key: "confirmed", label: "Confirmed", icon: CheckCircle },
    { key: "preparing", label: "Preparing", icon: ChefHat },
    { key: "onTheWay", label: "On the Way", icon: Bike },
    { key: "delivered", label: "Delivered", icon: PackageCheck },
  ];

  const currentIdx = steps.findIndex((s) => s.key === status.__kind__);
  const isCancelled = status.__kind__ === "cancelled";

  if (isCancelled) {
    return (
      <div
        className="flex items-center gap-2 text-destructive"
        data-ocid="order.status_stepper"
      >
        <XCircle className="h-5 w-5" />
        <span className="font-semibold">Order Cancelled</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-0 w-full"
      data-ocid="order.status_stepper"
    >
      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isCompleted = idx <= currentIdx;
        const isCurrent = idx === currentIdx;

        return (
          <div
            key={step.key}
            className="flex items-center flex-1 last:flex-none"
          >
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-full border-2 transition-smooth",
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border text-muted-foreground",
                  isCurrent && "ring-4 ring-primary/20",
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={cn(
                  "text-xs font-medium text-center leading-tight max-w-[60px]",
                  isCompleted ? "text-primary" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-1 mb-5 transition-smooth",
                  idx < currentIdx ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
