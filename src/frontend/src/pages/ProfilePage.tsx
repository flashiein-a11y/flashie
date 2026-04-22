import { EmptyState } from "@/components/EmptyState";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useOrders } from "@/hooks/useOrders";
import type { SavedAddress } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  Home,
  LogOut,
  MapPin,
  Package,
  Plus,
  ShoppingBag,
  Star,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";

function formatPrice(cents: bigint) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

const TAG_PRESETS = ["Home", "Work", "Other"];

const TAG_ICONS: Record<string, React.ReactNode> = {
  Home: <Home className="h-3.5 w-3.5" />,
  Work: <Briefcase className="h-3.5 w-3.5" />,
  Other: <MapPin className="h-3.5 w-3.5" />,
};

function getTagIcon(tag: string) {
  return TAG_ICONS[tag] ?? <MapPin className="h-3.5 w-3.5" />;
}

export default function ProfilePage() {
  const { identity, login, clear } = useInternetIdentity();
  const { data: orders = [] } = useOrders();

  const [addresses, setAddresses] = useState<SavedAddress[]>([
    { tag: "Home", address: "42, MG Road, Bengaluru, Karnataka 560001" },
    {
      tag: "Work",
      address: "Prestige Tech Park, Outer Ring Rd, Bengaluru 560103",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTag, setNewTag] = useState("Home");
  const [customTag, setCustomTag] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [tagError, setTagError] = useState("");
  const [addressError, setAddressError] = useState("");

  if (!identity) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <EmptyState
          icon={<User className="h-12 w-12" />}
          title="Sign in to view your profile"
          description="Access your saved addresses, order history, and account settings."
          actionLabel="Sign In with Internet Identity"
          onAction={() => login()}
        />
      </div>
    );
  }

  const principalStr = identity.getPrincipal().toString();
  const shortPrincipal = `${principalStr.slice(0, 8)}…${principalStr.slice(-6)}`;

  const deliveredOrders = orders.filter(
    (o) => o.status.__kind__ === "delivered",
  );
  const activeOrders = orders.filter(
    (o) =>
      o.status.__kind__ !== "delivered" && o.status.__kind__ !== "cancelled",
  );

  // Compute favorite restaurant (most ordered from)
  const restaurantCounts: Record<string, { name: string; count: number }> = {};
  for (const order of orders) {
    if (!restaurantCounts[order.restaurantId]) {
      restaurantCounts[order.restaurantId] = {
        name: order.restaurantName,
        count: 0,
      };
    }
    restaurantCounts[order.restaurantId].count++;
  }
  const favoriteRestaurant = Object.values(restaurantCounts).sort(
    (a, b) => b.count - a.count,
  )[0];

  function handleAddAddress() {
    const tag =
      newTag === "Other" && customTag.trim() ? customTag.trim() : newTag;
    let valid = true;

    if (!tag) {
      setTagError("Please select or enter a tag.");
      valid = false;
    } else {
      setTagError("");
    }

    if (!newAddress.trim()) {
      setAddressError("Address cannot be empty.");
      valid = false;
    } else {
      setAddressError("");
    }

    if (!valid) return;

    setAddresses((prev) => [...prev, { tag, address: newAddress.trim() }]);
    setNewTag("Home");
    setCustomTag("");
    setNewAddress("");
    setShowAddForm(false);
  }

  function handleRemoveAddress(index: number) {
    setAddresses((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-2xl text-foreground">
          My Profile
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/5"
          onClick={() => clear()}
          data-ocid="profile.logout_button"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-5">
          {/* Account Card */}
          <div className="bg-card rounded-2xl border border-border shadow-card p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 ring-4 ring-primary/20">
              <User className="h-10 w-10 text-primary" />
            </div>
            <p className="font-display font-semibold text-foreground mb-1">
              Internet Identity User
            </p>
            <p
              className="text-xs text-muted-foreground font-mono break-all mb-3 select-all"
              title={principalStr}
            >
              {shortPrincipal}
            </p>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Verified User
            </Badge>
          </div>

          {/* Stats Card */}
          <div className="bg-card rounded-2xl border border-border shadow-card p-5">
            <h2 className="font-display font-semibold text-foreground mb-4">
              Order Stats
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-primary/8 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <p className="text-2xl font-display font-bold text-primary leading-none">
                  {orders.length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total Orders
                </p>
              </div>
              <div className="bg-primary/8 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                </div>
                <p className="text-2xl font-display font-bold text-primary leading-none">
                  {deliveredOrders.length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Delivered</p>
              </div>
            </div>

            {favoriteRestaurant && (
              <>
                <Separator className="mb-4" />
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Star className="h-4 w-4 text-accent fill-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      Favourite Restaurant
                    </p>
                    <p className="font-semibold text-foreground text-sm truncate">
                      {favoriteRestaurant.name}
                    </p>
                    <p className="text-xs text-primary">
                      {favoriteRestaurant.count}{" "}
                      {favoriteRestaurant.count === 1 ? "order" : "orders"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-7">
          {/* Saved Addresses */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Saved Addresses
              </h2>
              {!showAddForm && (
                <Button
                  type="button"
                  size="sm"
                  className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setShowAddForm(true)}
                  data-ocid="profile.add_address_button"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Address
                </Button>
              )}
            </div>

            {/* Add Address Form */}
            {showAddForm && (
              <div
                className="bg-card rounded-2xl border border-primary/30 shadow-card p-5 mb-4"
                data-ocid="profile.add_address_form"
              >
                <h3 className="font-semibold text-foreground mb-4 text-sm">
                  New Delivery Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
                      Tag
                    </Label>
                    <div className="flex gap-2 flex-wrap">
                      {TAG_PRESETS.map((preset) => (
                        <button
                          type="button"
                          key={preset}
                          onClick={() => setNewTag(preset)}
                          data-ocid={`profile.tag_preset.${preset.toLowerCase()}`}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-smooth border ${
                            newTag === preset
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted/60 text-muted-foreground border-border hover:border-primary/40"
                          }`}
                        >
                          {getTagIcon(preset)}
                          {preset}
                        </button>
                      ))}
                    </div>
                    {newTag === "Other" && (
                      <div className="mt-2">
                        <Input
                          placeholder="Custom tag (e.g. Gym, Parents)"
                          value={customTag}
                          onChange={(e) => setCustomTag(e.target.value)}
                          className="h-9 text-sm"
                          data-ocid="profile.custom_tag_input"
                        />
                      </div>
                    )}
                    {tagError && (
                      <p
                        className="text-xs text-destructive mt-1"
                        data-ocid="profile.tag_field_error"
                      >
                        {tagError}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="new-address"
                      className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block"
                    >
                      Delivery Address
                    </Label>
                    <Input
                      id="new-address"
                      placeholder="Street, City, State, PIN"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddAddress();
                      }}
                      className="h-9 text-sm"
                      data-ocid="profile.address_input"
                    />
                    {addressError && (
                      <p
                        className="text-xs text-destructive mt-1"
                        data-ocid="profile.address_field_error"
                      >
                        {addressError}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button
                      type="button"
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleAddAddress}
                      data-ocid="profile.save_address_button"
                    >
                      Save Address
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowAddForm(false);
                        setTagError("");
                        setAddressError("");
                        setNewAddress("");
                        setCustomTag("");
                        setNewTag("Home");
                      }}
                      data-ocid="profile.cancel_add_address_button"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Address List */}
            {addresses.length === 0 ? (
              <div
                className="bg-card rounded-2xl border border-dashed border-border p-8 text-center"
                data-ocid="profile.addresses_empty_state"
              >
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No saved addresses yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map((addr, idx) => (
                  <div
                    key={`${addr.tag}-${idx}`}
                    className="bg-card rounded-2xl border border-border shadow-card p-4 flex items-start gap-3 group"
                    data-ocid={`profile.address.${idx + 1}`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                      {getTagIcon(addr.tag)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-0.5">
                        {addr.tag}
                      </p>
                      <p className="text-sm text-foreground leading-snug break-words">
                        {addr.address}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAddress(idx)}
                      aria-label={`Remove ${addr.tag} address`}
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-smooth shrink-0"
                      data-ocid={`profile.remove_address_button.${idx + 1}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Active Orders */}
          {activeOrders.length > 0 && (
            <section>
              <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                Active Orders
              </h2>
              <div className="space-y-3">
                {activeOrders.map((order, idx) => (
                  <Link
                    to="/orders/$id"
                    params={{ id: order.id }}
                    key={order.id}
                    data-ocid={`profile.active_order.${idx + 1}`}
                    className="block"
                  >
                    <div className="bg-card rounded-2xl border border-border shadow-card hover:shadow-elevated transition-smooth p-4 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {order.restaurantName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.id}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <OrderStatusBadge status={order.status} size="sm" />
                        <p className="text-sm font-bold text-primary">
                          {formatPrice(order.totalAmount)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Order History */}
          <section>
            <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Order History
            </h2>
            {orders.length === 0 ? (
              <div
                className="bg-card rounded-2xl border border-border shadow-card p-8 text-center"
                data-ocid="profile.order_history_empty_state"
              >
                <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground mb-1">
                  No orders yet
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Your completed orders will appear here.
                </p>
                <Link to="/">
                  <Button
                    type="button"
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-ocid="profile.browse_restaurants_button"
                  >
                    Browse Restaurants
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {deliveredOrders.slice(0, 5).map((order, idx) => (
                  <Link
                    to="/orders/$id"
                    params={{ id: order.id }}
                    key={order.id}
                    data-ocid={`profile.order_history.${idx + 1}`}
                    className="block"
                  >
                    <div className="bg-card rounded-2xl border border-border shadow-card hover:shadow-elevated transition-smooth p-4 flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground truncate">
                          {order.restaurantName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.items
                            .slice(0, 2)
                            .map((i) => i.name)
                            .join(", ")}
                          {order.items.length > 2 &&
                            ` +${order.items.length - 2} more`}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-foreground">
                          {formatPrice(order.totalAmount)}
                        </p>
                        <OrderStatusBadge status={order.status} size="sm" />
                      </div>
                    </div>
                  </Link>
                ))}
                {orders.length > 5 && (
                  <Link to="/orders">
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full text-primary hover:text-primary/80"
                      data-ocid="profile.view_all_orders_link"
                    >
                      View all {orders.length} orders
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
