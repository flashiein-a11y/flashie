import { c as createLucideIcon, h as useParams, m as useInternetIdentity, l as useNavigate, i as useCartStore, j as jsxRuntimeExports, k as LoadingSpinner, L as Link, b as Button, o as ue, r as reactExports } from "./index-cB7zv8lW.js";
import { E as EmptyState } from "./EmptyState-C0CGAISR.js";
import { O as OrderStatusBadge, a as OrderStatusStepper } from "./OrderStatusBadge-BMdnDUFk.js";
import { M as MapPin, S as Separator } from "./separator-DsAj0GIN.js";
import { b as useOrder, c as useAdvanceOrderStatus } from "./useOrders-SQWib793.js";
import { A as ArrowLeft } from "./arrow-left-VdS-HUNP.js";
import { Z as Zap } from "./zap-094uurCZ.js";
import { C as Clock } from "./clock-BRIfm3h4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
function formatPrice(cents) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
const ACTIVE_STATUSES = /* @__PURE__ */ new Set(["confirmed", "preparing", "onTheWay"]);
function getProgressPercent(kind) {
  const map = {
    confirmed: 15,
    preparing: 45,
    onTheWay: 80,
    delivered: 100,
    cancelled: 0
  };
  return map[kind] ?? 0;
}
function CountdownTimer({
  orderCreatedAt,
  estimatedMinutes
}) {
  const [remaining, setRemaining] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const endTime = Number(orderCreatedAt) + Number(estimatedMinutes) * 60 * 1e3;
    const update = () => {
      const diff = Math.max(0, endTime - Date.now());
      setRemaining(diff);
    };
    update();
    const interval = setInterval(update, 1e3);
    return () => clearInterval(interval);
  }, [orderCreatedAt, estimatedMinutes]);
  const mins = Math.floor(remaining / 6e4);
  const secs = Math.floor(remaining % 6e4 / 1e3);
  if (remaining === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-accent", children: "Arriving any moment!" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground tabular-nums", children: [
    mins,
    ":",
    String(secs).padStart(2, "0")
  ] });
}
function OrderTrackingPage() {
  const { id } = useParams({ from: "/orders/$id" });
  const { data: order, isLoading } = useOrder(id);
  const { identity, login } = useInternetIdentity();
  const { mutate: advanceStatus, isPending: isAdvancing } = useAdvanceOrderStatus();
  const navigate = useNavigate();
  const { addItem, clearCart } = useCartStore();
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "Sign in required",
        description: "Please sign in to view your order tracking.",
        actionLabel: "Sign In",
        onAction: () => login()
      }
    ) });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading order..." }) });
  }
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "Order not found",
        description: "This order doesn't exist or hasn't been placed yet.",
        actionLabel: "View all orders",
        actionTo: "/orders"
      }
    ) });
  }
  const isActive = ACTIVE_STATUSES.has(order.status.__kind__);
  const isDelivered = order.status.__kind__ === "delivered";
  const progressPercent = getProgressPercent(order.status.__kind__);
  function handleReorder() {
    if (!order) return;
    clearCart();
    for (const item of order.items) {
      addItem(
        {
          menuItemId: item.menuItemId,
          restaurantId: order.restaurantId,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity)
        },
        order.restaurantName
      );
    }
    ue.success("Added to cart!", {
      description: `Items from ${order.restaurantName} added back to your cart.`
    });
    navigate({ to: "/cart" });
  }
  function handleAdvance() {
    advanceStatus(order.id, {
      onSuccess: () => {
        ue.success("Status updated (demo mode)");
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          className: "rounded-full",
          "data-ocid": "order_tracking.back_button",
          "aria-label": "Back to orders",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground truncate", children: order.restaurantName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          order.id,
          " · ",
          formatDate(order.createdAt)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status })
    ] }),
    isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-4 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-sm font-medium text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
          "Live Tracking"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CountdownTimer,
            {
              orderCreatedAt: order.createdAt,
              estimatedMinutes: order.estimatedDeliveryMinutes
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-primary/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full bg-primary rounded-full transition-all duration-1000 ease-out",
          style: { width: `${progressPercent}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 text-center", children: [
        order.status.__kind__ === "confirmed" && "Your order has been confirmed and will start cooking soon.",
        order.status.__kind__ === "preparing" && "Our chefs are preparing your delicious meal!",
        order.status.__kind__ === "onTheWay" && "Your order is on its way — hang tight!"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-xl border border-border shadow-card p-6 mb-5",
        "data-ocid": "order_tracking.status_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Order Status" }),
            isDelivered && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-accent font-semibold bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20", children: "Delivered ✓" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusStepper, { status: order.status }),
          isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground text-center mt-4 flex items-center justify-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
            "Estimated ~",
            Number(order.estimatedDeliveryMinutes),
            " min from order time"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-card p-5 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
        "Delivery Address"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: order.deliveryAddress }),
      order.specialInstructions && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2 italic", children: [
        '"',
        order.specialInstructions,
        '"'
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-card overflow-hidden mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-4 w-4 text-primary" }),
        "Order Details"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: order.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-4 px-5 py-3",
          "data-ocid": `order_tracking.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-sm", children: item.name.charAt(0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium truncate", children: item.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                Number(item.quantity),
                " × ",
                formatPrice(item.price)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground shrink-0", children: formatPrice(
              BigInt(Number(item.price) * Number(item.quantity))
            ) })
          ]
        },
        item.menuItemId
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 bg-muted/30 space-y-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(order.totalAmount - order.deliveryFee) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery fee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(order.deliveryFee) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatPrice(order.totalAmount) })
        ] })
      ] })
    ] }),
    isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-dashed border-border rounded-xl p-3 mb-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Demo mode — advance order status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: handleAdvance,
          disabled: isAdvancing,
          "data-ocid": "order_tracking.advance_status_button",
          className: "text-xs",
          children: isAdvancing ? "Updating..." : "→ Next Status"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "w-full",
          "data-ocid": "order_tracking.orders_link",
          children: "All Orders"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          className: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2",
          onClick: handleReorder,
          "data-ocid": "order_tracking.reorder_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
            "Reorder"
          ]
        }
      )
    ] })
  ] });
}
export {
  OrderTrackingPage as default
};
