import { c as createLucideIcon, m as useInternetIdentity, r as reactExports, j as jsxRuntimeExports, b as Button, p as LogOut, B as Badge, L as Link } from "./index-cB7zv8lW.js";
import { E as EmptyState } from "./EmptyState-C0CGAISR.js";
import { O as OrderStatusBadge } from "./OrderStatusBadge-BMdnDUFk.js";
import { I as Input } from "./input-ZgVzrkLH.js";
import { L as Label, T as Trash2 } from "./label-DObE2M-y.js";
import { S as Separator, M as MapPin } from "./separator-DsAj0GIN.js";
import { a as useOrders } from "./useOrders-SQWib793.js";
import { S as ShoppingBag, P as Plus } from "./shopping-bag-yzbuLDNV.js";
import { S as Star } from "./star-k_mrC9zF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function formatPrice(cents) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}
const TAG_PRESETS = ["Home", "Work", "Other"];
const TAG_ICONS = {
  Home: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-3.5 w-3.5" }),
  Work: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3.5 w-3.5" }),
  Other: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" })
};
function getTagIcon(tag) {
  return TAG_ICONS[tag] ?? /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" });
}
function ProfilePage() {
  const { identity, login, clear } = useInternetIdentity();
  const { data: orders = [] } = useOrders();
  const [addresses, setAddresses] = reactExports.useState([
    { tag: "Home", address: "42, MG Road, Bengaluru, Karnataka 560001" },
    {
      tag: "Work",
      address: "Prestige Tech Park, Outer Ring Rd, Bengaluru 560103"
    }
  ]);
  const [showAddForm, setShowAddForm] = reactExports.useState(false);
  const [newTag, setNewTag] = reactExports.useState("Home");
  const [customTag, setCustomTag] = reactExports.useState("");
  const [newAddress, setNewAddress] = reactExports.useState("");
  const [tagError, setTagError] = reactExports.useState("");
  const [addressError, setAddressError] = reactExports.useState("");
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-12 w-12" }),
        title: "Sign in to view your profile",
        description: "Access your saved addresses, order history, and account settings.",
        actionLabel: "Sign In with Internet Identity",
        onAction: () => login()
      }
    ) });
  }
  const principalStr = identity.getPrincipal().toString();
  const shortPrincipal = `${principalStr.slice(0, 8)}…${principalStr.slice(-6)}`;
  const deliveredOrders = orders.filter(
    (o) => o.status.__kind__ === "delivered"
  );
  const activeOrders = orders.filter(
    (o) => o.status.__kind__ !== "delivered" && o.status.__kind__ !== "cancelled"
  );
  const restaurantCounts = {};
  for (const order of orders) {
    if (!restaurantCounts[order.restaurantId]) {
      restaurantCounts[order.restaurantId] = {
        name: order.restaurantName,
        count: 0
      };
    }
    restaurantCounts[order.restaurantId].count++;
  }
  const favoriteRestaurant = Object.values(restaurantCounts).sort(
    (a, b) => b.count - a.count
  )[0];
  function handleAddAddress() {
    const tag = newTag === "Other" && customTag.trim() ? customTag.trim() : newTag;
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
  function handleRemoveAddress(index) {
    setAddresses((prev) => prev.filter((_, i) => i !== index));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "My Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "gap-2 text-destructive border-destructive/30 hover:bg-destructive/5",
          onClick: () => clear(),
          "data-ocid": "profile.logout_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            "Sign Out"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-card p-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 ring-4 ring-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-10 w-10 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "Internet Identity User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-muted-foreground font-mono break-all mb-3 select-all",
              title: principalStr,
              children: shortPrincipal
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20", children: "Verified User" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground mb-4", children: "Order Stats" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/8 rounded-xl p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-primary leading-none", children: orders.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Total Orders" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/8 rounded-xl p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-primary leading-none", children: deliveredOrders.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Delivered" })
            ] })
          ] }),
          favoriteRestaurant && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-accent fill-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Favourite Restaurant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: favoriteRestaurant.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary", children: [
                  favoriteRestaurant.count,
                  " ",
                  favoriteRestaurant.count === 1 ? "order" : "orders"
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
              "Saved Addresses"
            ] }),
            !showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                className: "gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90",
                onClick: () => setShowAddForm(true),
                "data-ocid": "profile.add_address_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                  "Add Address"
                ]
              }
            )
          ] }),
          showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-2xl border border-primary/30 shadow-card p-5 mb-4",
              "data-ocid": "profile.add_address_form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-4 text-sm", children: "New Delivery Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block", children: "Tag" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: TAG_PRESETS.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setNewTag(preset),
                        "data-ocid": `profile.tag_preset.${preset.toLowerCase()}`,
                        className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-smooth border ${newTag === preset ? "bg-primary text-primary-foreground border-primary" : "bg-muted/60 text-muted-foreground border-border hover:border-primary/40"}`,
                        children: [
                          getTagIcon(preset),
                          preset
                        ]
                      },
                      preset
                    )) }),
                    newTag === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        placeholder: "Custom tag (e.g. Gym, Parents)",
                        value: customTag,
                        onChange: (e) => setCustomTag(e.target.value),
                        className: "h-9 text-sm",
                        "data-ocid": "profile.custom_tag_input"
                      }
                    ) }),
                    tagError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive mt-1",
                        "data-ocid": "profile.tag_field_error",
                        children: tagError
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "new-address",
                        className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block",
                        children: "Delivery Address"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "new-address",
                        placeholder: "Street, City, State, PIN",
                        value: newAddress,
                        onChange: (e) => setNewAddress(e.target.value),
                        onKeyDown: (e) => {
                          if (e.key === "Enter") handleAddAddress();
                        },
                        className: "h-9 text-sm",
                        "data-ocid": "profile.address_input"
                      }
                    ),
                    addressError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive mt-1",
                        "data-ocid": "profile.address_field_error",
                        children: addressError
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        className: "bg-primary text-primary-foreground hover:bg-primary/90",
                        onClick: handleAddAddress,
                        "data-ocid": "profile.save_address_button",
                        children: "Save Address"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        onClick: () => {
                          setShowAddForm(false);
                          setTagError("");
                          setAddressError("");
                          setNewAddress("");
                          setCustomTag("");
                          setNewTag("Home");
                        },
                        "data-ocid": "profile.cancel_add_address_button",
                        children: "Cancel"
                      }
                    )
                  ] })
                ] })
              ]
            }
          ),
          addresses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-2xl border border-dashed border-border p-8 text-center",
              "data-ocid": "profile.addresses_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-8 w-8 text-muted-foreground mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No saved addresses yet." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: addresses.map((addr, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-2xl border border-border shadow-card p-4 flex items-start gap-3 group",
              "data-ocid": `profile.address.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary", children: getTagIcon(addr.tag) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wide mb-0.5", children: addr.tag }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-snug break-words", children: addr.address })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleRemoveAddress(idx),
                    "aria-label": `Remove ${addr.tag} address`,
                    className: "opacity-0 group-hover:opacity-100 focus:opacity-100 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-smooth shrink-0",
                    "data-ocid": `profile.remove_address_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ]
            },
            `${addr.tag}-${idx}`
          )) })
        ] }),
        activeOrders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4 text-primary" }),
            "Active Orders"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: activeOrders.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/orders/$id",
              params: { id: order.id },
              "data-ocid": `profile.active_order.${idx + 1}`,
              className: "block",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-card hover:shadow-elevated transition-smooth p-4 flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: order.restaurantName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: order.id })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status, size: "sm" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-primary", children: formatPrice(order.totalAmount) })
                ] })
              ] })
            },
            order.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-primary" }),
            "Order History"
          ] }),
          orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-2xl border border-border shadow-card p-8 text-center",
              "data-ocid": "profile.order_history_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10 text-muted-foreground mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No orders yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Your completed orders will appear here." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    className: "bg-primary text-primary-foreground hover:bg-primary/90",
                    "data-ocid": "profile.browse_restaurants_button",
                    children: "Browse Restaurants"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            deliveredOrders.slice(0, 5).map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/orders/$id",
                params: { id: order.id },
                "data-ocid": `profile.order_history.${idx + 1}`,
                className: "block",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-card hover:shadow-elevated transition-smooth p-4 flex items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: order.restaurantName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      order.items.slice(0, 2).map((i) => i.name).join(", "),
                      order.items.length > 2 && ` +${order.items.length - 2} more`
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: formatPrice(order.totalAmount) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status, size: "sm" })
                  ] })
                ] })
              },
              order.id
            )),
            orders.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                className: "w-full text-primary hover:text-primary/80",
                "data-ocid": "profile.view_all_orders_link",
                children: [
                  "View all ",
                  orders.length,
                  " orders"
                ]
              }
            ) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ProfilePage as default
};
