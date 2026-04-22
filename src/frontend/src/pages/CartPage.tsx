import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { usePlaceOrder } from "@/hooks/useOrders";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  FileText,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function CartPage() {
  const {
    items,
    restaurantName,
    updateQuantity,
    removeItem,
    clearCart,
    total,
  } = useCartStore();
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [addressError, setAddressError] = useState("");
  const { identity, login } = useInternetIdentity();
  const placeOrder = usePlaceOrder();
  const router = useRouter();

  const deliveryFee = 399;
  const subtotal = total();
  const orderTotal = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!identity) {
      toast.error("Please sign in to place an order");
      return;
    }
    if (!address.trim()) {
      setAddressError("Please enter a delivery address");
      return;
    }
    setAddressError("");

    const cartItems = items.map((i) => ({
      menuItemId: i.menuItemId,
      restaurantId: i.restaurantId,
      name: i.name,
      price: BigInt(i.price),
      quantity: BigInt(i.quantity),
    }));

    try {
      const order = await placeOrder.mutateAsync({
        restaurantId: items[0]?.restaurantId ?? "",
        restaurantName: restaurantName,
        items: cartItems,
        deliveryAddress: address.trim(),
        specialInstructions: instructions.trim(),
      });
      clearCart();
      toast.success("Order placed! Tracking your delivery.", {
        duration: 5000,
      });
      router.navigate({ to: "/orders/$id", params: { id: order.id } });
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <EmptyState
          icon={<ShoppingBag className="h-12 w-12" />}
          title="Your cart is empty"
          description="Add some delicious items from a restaurant to get started."
          actionLabel="Browse restaurants"
          actionTo="/"
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            data-ocid="cart.back_button"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Your Cart
          </h1>
          <p className="text-sm text-muted-foreground">{restaurantName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-foreground">Order Items</h2>
            </div>
            <div className="divide-y divide-border">
              {items.map((item, idx) => (
                <div
                  key={item.menuItemId}
                  className="flex items-center gap-3 p-4"
                  data-ocid={`cart.item.${idx + 1}`}
                >
                  {item.imageUrl && (
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-primary font-bold text-sm">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  {/* Qty controls */}
                  <div className="flex items-center gap-1.5 bg-secondary rounded-lg p-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 rounded-md"
                      onClick={() =>
                        updateQuantity(item.menuItemId, item.quantity - 1)
                      }
                      data-ocid={`cart.decrement_button.${idx + 1}`}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-5 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 rounded-md"
                      onClick={() =>
                        updateQuantity(item.menuItemId, item.quantity + 1)
                      }
                      data-ocid={`cart.increment_button.${idx + 1}`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <p className="text-sm font-semibold text-foreground w-16 text-right">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.menuItemId)}
                    aria-label={`Remove ${item.name}`}
                    data-ocid={`cart.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Details */}
          <div className="bg-card rounded-xl border border-border shadow-card p-5 space-y-4">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Delivery Address
            </h2>
            <div>
              <Label
                htmlFor="address"
                className="text-sm text-muted-foreground mb-1.5 block"
              >
                Enter your full delivery address
              </Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (addressError) setAddressError("");
                }}
                placeholder="123 Main Street, Apt 4B, New York, NY 10001"
                className={cn(
                  "h-11",
                  addressError &&
                    "border-destructive focus:ring-destructive/30",
                )}
                data-ocid="cart.address_input"
              />
              {addressError && (
                <p
                  className="text-xs text-destructive mt-1"
                  data-ocid="cart.address_field_error"
                >
                  {addressError}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="instructions"
                className="text-sm text-muted-foreground mb-1.5 block flex items-center gap-1.5"
              >
                <FileText className="h-3.5 w-3.5" />
                Special instructions (optional)
              </Label>
              <Textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Ring doorbell, leave at door, no onions..."
                rows={3}
                className="resize-none"
                data-ocid="cart.instructions_textarea"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl border border-border shadow-card p-5 sticky top-24">
            <h2 className="font-display font-semibold text-foreground text-lg mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery fee</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-bold text-foreground text-base mb-5">
              <span>Total</span>
              <span className="text-primary">{formatPrice(orderTotal)}</span>
            </div>

            {!identity ? (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground text-center">
                  Sign in to place your order
                </p>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-semibold"
                  onClick={() => login()}
                  data-ocid="cart.signin_button"
                >
                  Sign In to Order
                </Button>
              </div>
            ) : (
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-semibold"
                onClick={handlePlaceOrder}
                disabled={placeOrder.isPending}
                data-ocid="cart.place_order_button"
              >
                {placeOrder.isPending ? (
                  <span
                    className="flex items-center gap-2"
                    data-ocid="cart.loading_state"
                  >
                    <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                    Placing order...
                  </span>
                ) : (
                  `Place Order · ${formatPrice(orderTotal)}`
                )}
              </Button>
            )}

            <p className="text-xs text-muted-foreground text-center mt-3">
              Estimated delivery: 30–40 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
