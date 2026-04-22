import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, i as useCartStore, r as reactExports, m as useInternetIdentity, n as useRouter, L as Link, b as Button, o as ue } from "./index-cB7zv8lW.js";
import { E as EmptyState } from "./EmptyState-C0CGAISR.js";
import { I as Input } from "./input-ZgVzrkLH.js";
import { T as Trash2, L as Label } from "./label-DObE2M-y.js";
import { M as MapPin, S as Separator } from "./separator-DsAj0GIN.js";
import { u as usePlaceOrder } from "./useOrders-SQWib793.js";
import { S as ShoppingBag, P as Plus } from "./shopping-bag-yzbuLDNV.js";
import { A as ArrowLeft } from "./arrow-left-VdS-HUNP.js";
import { M as Minus } from "./minus-D-MNfnvC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
function CartPage() {
  const {
    items,
    restaurantName,
    updateQuantity,
    removeItem,
    clearCart,
    total
  } = useCartStore();
  const [address, setAddress] = reactExports.useState("");
  const [instructions, setInstructions] = reactExports.useState("");
  const [addressError, setAddressError] = reactExports.useState("");
  const { identity, login } = useInternetIdentity();
  const placeOrder = usePlaceOrder();
  const router = useRouter();
  const deliveryFee = 399;
  const subtotal = total();
  const orderTotal = subtotal + deliveryFee;
  const handlePlaceOrder = async () => {
    var _a;
    if (!identity) {
      ue.error("Please sign in to place an order");
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
      quantity: BigInt(i.quantity)
    }));
    try {
      const order = await placeOrder.mutateAsync({
        restaurantId: ((_a = items[0]) == null ? void 0 : _a.restaurantId) ?? "",
        restaurantName,
        items: cartItems,
        deliveryAddress: address.trim(),
        specialInstructions: instructions.trim()
      });
      clearCart();
      ue.success("Order placed! Tracking your delivery.", {
        duration: 5e3
      });
      router.navigate({ to: "/orders/$id", params: { id: order.id } });
    } catch {
      ue.error("Failed to place order. Please try again.");
    }
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12" }),
        title: "Your cart is empty",
        description: "Add some delicious items from a restaurant to get started.",
        actionLabel: "Browse restaurants",
        actionTo: "/"
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "rounded-full",
          "data-ocid": "cart.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Your Cart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: restaurantName })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-card overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Order Items" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-4",
              "data-ocid": `cart.item.${idx + 1}`,
              children: [
                item.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: item.imageUrl,
                    alt: item.name,
                    className: "w-full h-full object-cover"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold text-sm", children: formatPrice(item.price) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-secondary rounded-lg p-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "h-7 w-7 rounded-md",
                      onClick: () => updateQuantity(item.menuItemId, item.quantity - 1),
                      "data-ocid": `cart.decrement_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 text-center text-sm font-bold", children: item.quantity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "h-7 w-7 rounded-md",
                      onClick: () => updateQuantity(item.menuItemId, item.quantity + 1),
                      "data-ocid": `cart.increment_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground w-16 text-right", children: formatPrice(item.price * item.quantity) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    className: "h-8 w-8 text-muted-foreground hover:text-destructive",
                    onClick: () => removeItem(item.menuItemId),
                    "aria-label": `Remove ${item.name}`,
                    "data-ocid": `cart.delete_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ]
            },
            item.menuItemId
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-card p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
            "Delivery Address"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "address",
                className: "text-sm text-muted-foreground mb-1.5 block",
                children: "Enter your full delivery address"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "address",
                value: address,
                onChange: (e) => {
                  setAddress(e.target.value);
                  if (addressError) setAddressError("");
                },
                placeholder: "123 Main Street, Apt 4B, New York, NY 10001",
                className: cn(
                  "h-11",
                  addressError && "border-destructive focus:ring-destructive/30"
                ),
                "data-ocid": "cart.address_input"
              }
            ),
            addressError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive mt-1",
                "data-ocid": "cart.address_field_error",
                children: addressError
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "instructions",
                className: "text-sm text-muted-foreground mb-1.5 block flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }),
                  "Special instructions (optional)"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "instructions",
                value: instructions,
                onChange: (e) => setInstructions(e.target.value),
                placeholder: "e.g. Ring doorbell, leave at door, no onions...",
                rows: 3,
                className: "resize-none",
                "data-ocid": "cart.instructions_textarea"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-card p-5 sticky top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg mb-4", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(subtotal) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery fee" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(deliveryFee) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground text-base mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatPrice(orderTotal) })
        ] }),
        !identity ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Sign in to place your order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-semibold",
              onClick: () => login(),
              "data-ocid": "cart.signin_button",
              children: "Sign In to Order"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-semibold",
            onClick: handlePlaceOrder,
            disabled: placeOrder.isPending,
            "data-ocid": "cart.place_order_button",
            children: placeOrder.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "flex items-center gap-2",
                "data-ocid": "cart.loading_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" }),
                  "Placing order..."
                ]
              }
            ) : `Place Order · ${formatPrice(orderTotal)}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-3", children: "Estimated delivery: 30–40 minutes" })
      ] }) })
    ] })
  ] });
}
export {
  CartPage as default
};
