import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import type { SampleMenuItem, SampleRestaurant } from "@/types";
import { Minus, Plus } from "lucide-react";

interface MenuItemCardProps {
  item: SampleMenuItem;
  restaurant: SampleRestaurant;
  index?: number;
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function MenuItemCard({
  item,
  restaurant,
  index = 0,
}: MenuItemCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((i) => i.menuItemId === item.id);
  const qty = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    addItem(
      {
        menuItemId: item.id,
        restaurantId: item.restaurantId,
        name: item.name,
        price: item.price,
        quantity: 1,
        imageUrl: item.imageUrl,
      },
      restaurant.name,
    );
  };

  const handleDecrement = () => {
    updateQuantity(item.id, qty - 1);
  };

  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-border shadow-card overflow-hidden",
        "flex flex-col sm:flex-row",
        !item.isAvailable && "opacity-60",
      )}
      data-ocid={`menu.item.${index + 1}`}
    >
      {/* Image */}
      <div className="sm:w-32 sm:h-32 aspect-video sm:aspect-auto shrink-0 overflow-hidden bg-muted">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 items-start justify-between gap-3 p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1">
            <h4 className="font-semibold text-foreground text-sm leading-tight">
              {item.name}
            </h4>
            {!item.isAvailable && (
              <Badge variant="secondary" className="text-xs shrink-0">
                Unavailable
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {item.description}
          </p>
          <p className="font-display font-bold text-primary text-base">
            {formatPrice(item.price)}
          </p>
        </div>

        {/* Add/Qty control */}
        {item.isAvailable && (
          <div className="shrink-0 flex items-center gap-1.5">
            {qty > 0 ? (
              <div className="flex items-center gap-1.5 bg-secondary rounded-lg p-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 rounded-md hover:bg-primary/10"
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                  data-ocid={`menu.decrement_button.${index + 1}`}
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="text-sm font-bold text-foreground w-5 text-center">
                  {qty}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 rounded-md hover:bg-primary/10"
                  onClick={handleAdd}
                  aria-label="Increase quantity"
                  data-ocid={`menu.increment_button.${index + 1}`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <Button
                size="icon"
                className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-card"
                onClick={handleAdd}
                aria-label={`Add ${item.name} to cart`}
                data-ocid={`menu.add_button.${index + 1}`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
