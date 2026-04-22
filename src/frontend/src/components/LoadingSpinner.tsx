import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function LoadingSpinner({
  className,
  size = "md",
  label = "Loading...",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  };

  return (
    <output
      className={cn("flex items-center justify-center gap-3", className)}
      aria-label={label}
      data-ocid="loading_state"
    >
      <div
        className={cn(
          "rounded-full border-border border-t-primary animate-spin",
          sizeClasses[size],
        )}
      />
      {label && size !== "sm" && (
        <span className="text-sm text-muted-foreground">{label}</span>
      )}
    </output>
  );
}

export function RestaurantCardSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border shadow-card animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-3 bg-muted rounded w-2/3" />
        <div className="h-9 bg-muted rounded-lg mt-3" />
      </div>
    </div>
  );
}

export function MenuItemSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden flex animate-pulse">
      <div className="w-32 h-32 bg-muted shrink-0" />
      <div className="flex-1 p-4 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
        <div className="h-5 bg-muted rounded w-16" />
      </div>
    </div>
  );
}
