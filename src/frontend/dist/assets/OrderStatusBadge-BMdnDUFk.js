import { c as createLucideIcon, j as jsxRuntimeExports, B as Badge, a as cn } from "./index-cB7zv8lW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "18.5", cy: "17.5", r: "3.5", key: "15x4ox" }],
  ["circle", { cx: "5.5", cy: "17.5", r: "3.5", key: "1noe27" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["path", { d: "M12 17.5V14l-3-3 4-3 2 3h2", key: "1npguv" }]
];
const Bike = createLucideIcon("bike", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z",
      key: "1qvrer"
    }
  ],
  ["path", { d: "M6 17h12", key: "1jwigz" }]
];
const ChefHat = createLucideIcon("chef-hat", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 16 2 2 4-4", key: "gfu2re" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
];
const PackageCheck = createLucideIcon("package-check", __iconNode);
const STATUS_CONFIG = {
  confirmed: {
    label: "Confirmed",
    icon: CircleCheckBig,
    className: "bg-primary/10 text-primary border-primary/30"
  },
  preparing: {
    label: "Preparing",
    icon: ChefHat,
    className: "bg-accent/15 text-accent border-accent/30"
  },
  onTheWay: {
    label: "On the Way",
    icon: Bike,
    className: "bg-secondary/20 text-secondary-foreground border-secondary/40"
  },
  delivered: {
    label: "Delivered",
    icon: PackageCheck,
    className: "bg-accent/10 text-accent border-accent/30"
  },
  cancelled: {
    label: "Cancelled",
    icon: CircleX,
    className: "bg-destructive/10 text-destructive border-destructive/30"
  }
};
function OrderStatusBadge({
  status,
  size = "md"
}) {
  const config = STATUS_CONFIG[status.__kind__];
  const Icon = config.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      className: cn(
        "flex items-center gap-1.5 font-semibold border",
        config.className,
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"
      ),
      "data-ocid": "order.status_badge",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn(size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5") }),
        config.label
      ]
    }
  );
}
function OrderStatusStepper({ status }) {
  const steps = [
    { key: "confirmed", label: "Confirmed", icon: CircleCheckBig },
    { key: "preparing", label: "Preparing", icon: ChefHat },
    { key: "onTheWay", label: "On the Way", icon: Bike },
    { key: "delivered", label: "Delivered", icon: PackageCheck }
  ];
  const currentIdx = steps.findIndex((s) => s.key === status.__kind__);
  const isCancelled = status.__kind__ === "cancelled";
  if (isCancelled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 text-destructive",
        "data-ocid": "order.status_stepper",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Order Cancelled" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-0 w-full",
      "data-ocid": "order.status_stepper",
      children: steps.map((step, idx) => {
        const Icon = step.icon;
        const isCompleted = idx <= currentIdx;
        const isCurrent = idx === currentIdx;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center flex-1 last:flex-none",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "flex items-center justify-center w-9 h-9 rounded-full border-2 transition-smooth",
                      isCompleted ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground",
                      isCurrent && "ring-4 ring-primary/20"
                    ),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "text-xs font-medium text-center leading-tight max-w-[60px]",
                      isCompleted ? "text-primary" : "text-muted-foreground"
                    ),
                    children: step.label
                  }
                )
              ] }),
              idx < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "flex-1 h-0.5 mx-1 mb-5 transition-smooth",
                    idx < currentIdx ? "bg-primary" : "bg-border"
                  )
                }
              )
            ]
          },
          step.key
        );
      })
    }
  );
}
export {
  OrderStatusBadge as O,
  OrderStatusStepper as a
};
