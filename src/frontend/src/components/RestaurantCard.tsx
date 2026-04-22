import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SampleRestaurant } from "@/types";
import { Link } from "@tanstack/react-router";
import { Clock, Star, Truck } from "lucide-react";

interface RestaurantCardProps {
  restaurant: SampleRestaurant;
  index?: number;
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatRating(rating: number): string {
  return (rating / 10).toFixed(1);
}

export function RestaurantCard({ restaurant, index = 0 }: RestaurantCardProps) {
  return (
    <Link
      to="/restaurants/$id"
      params={{ id: restaurant.id }}
      data-ocid={`restaurant.item.${index + 1}`}
      className="group block"
    >
      <div
        className={cn(
          "bg-card rounded-xl overflow-hidden border border-border",
          "shadow-card hover:shadow-elevated transition-smooth",
          "hover:-translate-y-1",
          !restaurant.isOpen && "opacity-70",
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          {/* Closed overlay */}
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
              <Badge className="bg-card text-foreground border border-border text-sm font-semibold px-3 py-1">
                Closed
              </Badge>
            </div>
          )}
          {/* Rating badge */}
          <div className="absolute top-3 right-3">
            <Badge
              className="flex items-center gap-1 bg-accent text-accent-foreground border-0 text-sm font-semibold px-2.5 py-1 shadow-card"
              data-ocid={`restaurant.rating_badge.${index + 1}`}
            >
              <Star className="h-3 w-3 fill-current" />
              {formatRating(restaurant.rating)}
            </Badge>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-display font-semibold text-foreground text-base leading-tight mb-1 truncate">
            {restaurant.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {restaurant.cuisineType}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Truck className="h-3.5 w-3.5" />
              {formatPrice(restaurant.deliveryFee)} delivery
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {restaurant.estimatedDeliveryMinutes}–
              {restaurant.estimatedDeliveryMinutes + 10} min
            </span>
          </div>

          <span
            className={cn(
              "mt-3 w-full py-2 px-4 rounded-lg text-sm font-semibold transition-smooth block text-center",
              restaurant.isOpen
                ? "bg-primary text-primary-foreground group-hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed",
            )}
            aria-hidden="true"
          >
            {restaurant.isOpen ? "Order Now" : "Unavailable"}
          </span>
        </div>
      </div>
    </Link>
  );
}
