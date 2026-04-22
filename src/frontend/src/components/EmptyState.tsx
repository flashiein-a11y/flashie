import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className,
      )}
      data-ocid="empty_state"
    >
      {icon && (
        <div className="mb-4 p-4 rounded-2xl bg-muted/60 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="font-display font-semibold text-foreground text-lg mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
          {description}
        </p>
      )}
      {actionLabel && actionTo && (
        <Link to={actionTo}>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            data-ocid="empty_state.primary_button"
          >
            {actionLabel}
          </Button>
        </Link>
      )}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          data-ocid="empty_state.primary_button"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
