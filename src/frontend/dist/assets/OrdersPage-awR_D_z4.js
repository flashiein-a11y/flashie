import { c as createLucideIcon, m as useInternetIdentity, j as jsxRuntimeExports, B as Badge, b as Button, k as LoadingSpinner, L as Link } from "./index-cB7zv8lW.js";
import { E as EmptyState } from "./EmptyState-C0CGAISR.js";
import { O as OrderStatusBadge } from "./OrderStatusBadge-BMdnDUFk.js";
import { a as useOrders } from "./useOrders-SQWib793.js";
import { C as ChevronRight } from "./chevron-right-BpOBo9YF.js";
import { Z as Zap } from "./zap-094uurCZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function formatPrice(cents) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
const ACTIVE_STATUSES = /* @__PURE__ */ new Set(["confirmed", "preparing", "onTheWay"]);
function LivePulse() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2 mr-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-primary" })
  ] });
}
function OrderCard({ order, index }) {
  const isActive = ACTIVE_STATUSES.has(order.status.__kind__);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/orders/$id",
      params: { id: order.id },
      "data-ocid": `orders.item.${index + 1}`,
      className: "block group",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `bg-card rounded-xl border shadow-card hover:shadow-elevated transition-smooth p-5 group-hover:-translate-y-0.5 ${isActive ? "border-primary/30" : "border-border"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(LivePulse, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate", children: order.restaurantName })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  order.id,
                  " · ",
                  formatDate(order.createdAt)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status, size: "sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" })
              ] })
            ] }),
            isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3 text-primary" }),
                  "Order in progress"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "~",
                  Number(order.estimatedDeliveryMinutes),
                  " min"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-primary rounded-full transition-all duration-700",
                  style: {
                    width: order.status.__kind__ === "confirmed" ? "20%" : order.status.__kind__ === "preparing" ? "55%" : "85%"
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground truncate max-w-[60%]", children: [
                order.items.slice(0, 2).map((i) => i.name).join(", "),
                order.items.length > 2 && ` +${order.items.length - 2} more`
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: formatPrice(order.totalAmount) })
            ] })
          ]
        }
      )
    }
  );
}
function OrdersPage() {
  const { data: orders = [], isLoading, refetch, isFetching } = useOrders();
  const { identity, login } = useInternetIdentity();
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-12 w-12" }),
        title: "Sign in to view orders",
        description: "Track your current and past orders by signing in with Internet Identity.",
        actionLabel: "Sign In",
        onAction: () => login()
      }
    ) });
  }
  const activeOrders = orders.filter(
    (o) => ACTIVE_STATUSES.has(o.status.__kind__)
  );
  const pastOrders = orders.filter(
    (o) => !ACTIVE_STATUSES.has(o.status.__kind__)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "My Orders" }),
        orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          orders.length,
          " ",
          orders.length === 1 ? "order" : "orders",
          " total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        activeOrders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/10 text-primary border-primary/20 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LivePulse, {}),
          activeOrders.length,
          " active"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            onClick: () => refetch(),
            "data-ocid": "orders.refresh_button",
            className: "rounded-full",
            "aria-label": "Refresh orders",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                className: `h-4 w-4 text-muted-foreground ${isFetching ? "animate-spin" : ""}`
              }
            )
          }
        )
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading your orders..." }) }) : orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-12 w-12" }),
        title: "No orders yet",
        description: "Your order history will appear here once you place your first order.",
        actionLabel: "Browse Restaurants",
        actionTo: "/"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", "data-ocid": "orders.list", children: [
      activeOrders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LivePulse, {}),
          "Active Orders"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: activeOrders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order, index: i }, order.id)) })
      ] }),
      pastOrders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Past Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: pastOrders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order, index: i + 50 }, order.id)) })
      ] })
    ] })
  ] });
}
export {
  OrdersPage as default
};
