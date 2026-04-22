import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner, MenuItemSkeleton } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMenuItems, useRestaurant } from "@/hooks/useRestaurants";
import { useCartStore } from "@/store/cartStore";
import type { SampleMenuItem, SampleRestaurant } from "@/types";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

// ── Category Nav ──────────────────────────────────────────────────────────────
function CategoryNav({
  categories,
  activeCategory,
  onSelect,
}: {
  categories: string[];
  activeCategory: string;
  onSelect: (cat: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll active tab into view — imperative call, not a reactive effect
  const scrollActiveIntoView = (cat: string) => {
    const el = scrollRef.current?.querySelector<HTMLButtonElement>(
      `[data-category-tab="${cat}"]`,
    );
    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-6 py-3"
    >
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          data-category-tab={cat}
          data-active={activeCategory === cat}
          onClick={() => {
            onSelect(cat);
            scrollActiveIntoView(cat);
          }}
          data-ocid={`menu.category_tab.${cat.toLowerCase().replace(/\s+/g, "_")}`}
          className={[
            "shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-smooth whitespace-nowrap",
            activeCategory === cat
              ? "bg-primary text-primary-foreground shadow-card"
              : "bg-secondary text-foreground hover:bg-secondary/80",
          ].join(" ")}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ── Menu Item Card (inline, with qty controls) ────────────────────────────────
function MenuCard({
  item,
  restaurant,
  index,
  onConflict,
}: {
  item: SampleMenuItem;
  restaurant: SampleRestaurant;
  index: number;
  onConflict: (item: SampleMenuItem) => void;
}) {
  const { items, addItem, updateQuantity, restaurantId } = useCartStore();
  const cartItem = items.find((i) => i.menuItemId === item.id);
  const qty = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    // Different restaurant in cart → show conflict dialog
    if (restaurantId && restaurantId !== item.restaurantId) {
      onConflict(item);
      return;
    }
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

  return (
    <div
      className={[
        "bg-card rounded-2xl border border-border shadow-card overflow-hidden",
        "flex flex-col sm:flex-row transition-smooth hover:shadow-elevated",
        !item.isAvailable ? "opacity-60" : "",
      ].join(" ")}
      data-ocid={`menu.item.${index + 1}`}
    >
      {/* Image */}
      <div className="sm:w-36 sm:h-36 aspect-video sm:aspect-auto shrink-0 overflow-hidden bg-muted relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground bg-card px-2 py-1 rounded-full">
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 items-start justify-between gap-3 p-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-semibold text-foreground text-sm leading-snug mb-1 truncate">
            {item.name}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {item.description}
          </p>
          <p className="font-display font-bold text-primary text-base">
            {formatPrice(item.price)}
          </p>
        </div>

        {/* Add / Qty control */}
        {item.isAvailable && (
          <div className="shrink-0 flex items-center mt-1">
            {qty > 0 ? (
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-xl p-1">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 rounded-lg hover:bg-primary/20 text-primary"
                  onClick={() => updateQuantity(item.id, qty - 1)}
                  aria-label="Decrease quantity"
                  data-ocid={`menu.decrement_button.${index + 1}`}
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="text-sm font-bold text-primary w-5 text-center">
                  {qty}
                </span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 rounded-lg hover:bg-primary/20 text-primary"
                  onClick={handleAdd}
                  aria-label="Increase quantity"
                  data-ocid={`menu.increment_button.${index + 1}`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <Button
                type="button"
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

// ── Restaurant Conflict Dialog ────────────────────────────────────────────────
function ConflictDialog({
  open,
  existingName,
  newItemName,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  existingName: string;
  newItemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogContent
        className="max-w-sm rounded-2xl"
        data-ocid="cart_conflict.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            Start a new cart?
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Your cart already has items from{" "}
            <span className="font-semibold text-foreground">
              {existingName}
            </span>
            . Adding{" "}
            <span className="font-semibold text-foreground">{newItemName}</span>{" "}
            will clear your current cart.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 mt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
            data-ocid="cart_conflict.cancel_button"
          >
            Keep current cart
          </Button>
          <Button
            type="button"
            className="flex-1 bg-primary text-primary-foreground"
            onClick={onConfirm}
            data-ocid="cart_conflict.confirm_button"
          >
            Start new cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Sticky Cart Bar ───────────────────────────────────────────────────────────
function StickyCartBar({
  count,
  total,
  restaurantName,
}: {
  count: number;
  total: number;
  restaurantName: string;
}) {
  const navigate = useNavigate();

  if (count === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:pb-5"
      data-ocid="cart.sticky_bar"
    >
      <div className="max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => navigate({ to: "/cart" })}
          data-ocid="cart.view_cart_button"
          className="w-full flex items-center justify-between gap-3 bg-primary text-primary-foreground px-5 py-3.5 rounded-2xl shadow-elevated hover:bg-primary/95 transition-smooth"
        >
          <div className="flex items-center gap-3">
            <span className="bg-primary-foreground/20 rounded-lg px-2.5 py-0.5 text-sm font-bold">
              {count}
            </span>
            <span className="font-semibold text-sm truncate max-w-[140px] sm:max-w-xs">
              {restaurantName}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-sm">{formatPrice(total)}</span>
            <ShoppingBag className="h-4 w-4" />
            <span className="font-semibold text-sm">View Cart</span>
          </div>
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function RestaurantPage() {
  const { id } = useParams({ from: "/restaurants/$id" });
  const { data: restaurant, isLoading: loadingRestaurant } = useRestaurant(id);
  const { data: menuItems = [], isLoading: loadingMenu } = useMenuItems(id);

  const cartCount = useCartStore((s) => s.itemCount());
  const cartTotal = useCartStore((s) => s.total());
  const cartRestaurantId = useCartStore((s) => s.restaurantId);
  const cartRestaurantName = useCartStore((s) => s.restaurantName);
  const { addItem, clearCart } = useCartStore();

  const [activeCategory, setActiveCategory] = useState<string>("");
  const [conflictItem, setConflictItem] = useState<SampleMenuItem | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Group menu items by category
  const categories = [...new Set(menuItems.map((i) => i.category))];

  // Set initial active category when menu loads (only if not already set)
  // biome-ignore lint/correctness/useExhaustiveDependencies: functional setState reads prev without needing dep; categories[0] is stable once list arrives
  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory((prev) => (prev ? prev : categories[0]));
    }
  }, [categories.length]);

  // Intersection observer to update active category on scroll
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — categories array ref changes identity each render, use length as stable proxy
  useEffect(() => {
    if (categories.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.getAttribute("data-category") ?? "");
          }
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );
    for (const cat of categories) {
      const el = sectionRefs.current[cat];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [categories.length]);

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat);
    sectionRefs.current[cat]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleConflict = (item: SampleMenuItem) => {
    setConflictItem(item);
  };

  const handleConflictConfirm = () => {
    if (!conflictItem || !restaurant) return;
    clearCart();
    addItem(
      {
        menuItemId: conflictItem.id,
        restaurantId: conflictItem.restaurantId,
        name: conflictItem.name,
        price: conflictItem.price,
        quantity: 1,
        imageUrl: conflictItem.imageUrl,
      },
      restaurant.name,
    );
    setConflictItem(null);
  };

  const cartBelongsHere = cartRestaurantId === id;
  const showCartBar = cartBelongsHere && cartCount > 0;

  if (loadingRestaurant) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" label="Loading restaurant..." />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <EmptyState
          title="Restaurant not found"
          description="This restaurant doesn't exist or has been removed."
          actionLabel="Back to restaurants"
          actionTo="/"
        />
      </div>
    );
  }

  return (
    <div className={showCartBar ? "pb-24" : ""}>
      {/* ── Hero ── */}
      <div className="relative h-56 sm:h-80 overflow-hidden bg-muted">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

        {/* Back button */}
        <Link
          to="/"
          className="absolute top-4 left-4"
          data-ocid="restaurant.back_link"
        >
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="rounded-full shadow-elevated bg-card/90 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        {/* Restaurant name + description overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="font-display font-bold text-2xl sm:text-4xl text-white leading-tight mb-1">
                  {restaurant.name}
                </h1>
                <p className="text-white/75 text-sm sm:text-base max-w-md line-clamp-2">
                  {restaurant.description}
                </p>
              </div>
              {!restaurant.isOpen && (
                <Badge
                  variant="destructive"
                  className="shrink-0 text-sm px-3 py-1 mb-1"
                >
                  Closed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Info bar ── */}
      <div className="bg-card border-b border-border sticky top-16 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-5 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1.5 shrink-0">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="font-semibold text-foreground text-sm">
              {(restaurant.rating / 10).toFixed(1)}
            </span>
          </div>
          <div className="w-px h-4 bg-border shrink-0" />
          <span className="text-sm text-muted-foreground flex items-center gap-1.5 shrink-0">
            <Truck className="h-4 w-4 text-primary" />
            {formatPrice(restaurant.deliveryFee)} delivery
          </span>
          <div className="w-px h-4 bg-border shrink-0" />
          <span className="text-sm text-muted-foreground flex items-center gap-1.5 shrink-0">
            <Clock className="h-4 w-4 text-primary" />
            {restaurant.estimatedDeliveryMinutes}–
            {restaurant.estimatedDeliveryMinutes + 10} min
          </span>
          <div className="w-px h-4 bg-border shrink-0" />
          <span className="text-sm text-muted-foreground shrink-0">
            {restaurant.cuisineType}
          </span>
        </div>
      </div>

      {/* ── Category nav tabs ── */}
      {!loadingMenu && categories.length > 0 && (
        <div className="bg-card border-b border-border sticky top-[calc(4rem+52px)] z-20 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <CategoryNav
              categories={categories}
              activeCategory={activeCategory}
              onSelect={scrollToCategory}
            />
          </div>
        </div>
      )}

      {/* ── Menu ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {loadingMenu ? (
          <div className="space-y-4">
            {["s1", "s2", "s3", "s4", "s5"].map((k) => (
              <MenuItemSkeleton key={k} />
            ))}
          </div>
        ) : menuItems.length === 0 ? (
          <EmptyState
            title="No menu items yet"
            description="This restaurant hasn't added any items to their menu."
            actionLabel="Browse other restaurants"
            actionTo="/"
          />
        ) : (
          <div className="space-y-12">
            {categories.map((category) => {
              const items = menuItems.filter((i) => i.category === category);
              return (
                <div
                  key={category}
                  ref={(el) => {
                    sectionRefs.current[category] = el;
                  }}
                  data-category={category}
                >
                  {/* Category heading */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-1 h-6 bg-primary rounded-full" />
                    <h2 className="font-display font-bold text-xl text-foreground">
                      {category}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      ({items.length} {items.length === 1 ? "item" : "items"})
                    </span>
                  </div>

                  {/* Item grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {items.map((item, idx) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        restaurant={restaurant}
                        index={idx}
                        onConflict={handleConflict}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Cart conflict dialog ── */}
      <ConflictDialog
        open={conflictItem !== null}
        existingName={cartRestaurantName}
        newItemName={conflictItem?.name ?? ""}
        onConfirm={handleConflictConfirm}
        onCancel={() => setConflictItem(null)}
      />

      {/* ── Sticky cart bar ── */}
      {showCartBar && (
        <StickyCartBar
          count={cartCount}
          total={cartTotal}
          restaurantName={restaurant.name}
        />
      )}
    </div>
  );
}
