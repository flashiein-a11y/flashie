import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, B as Badge, a as cn, r as reactExports, R as RestaurantCardSkeleton, b as Button } from "./index-cB7zv8lW.js";
import { E as EmptyState } from "./EmptyState-C0CGAISR.js";
import { S as Star } from "./star-k_mrC9zF.js";
import { T as Truck, u as useRestaurants, S as SAMPLE_RESTAURANTS } from "./useRestaurants-5jxAxrwG.js";
import { C as Clock } from "./clock-BRIfm3h4.js";
import { I as Input } from "./input-ZgVzrkLH.js";
import { Z as Zap } from "./zap-094uurCZ.js";
import { C as ChevronRight } from "./chevron-right-BpOBo9YF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
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
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
function formatRating(rating) {
  return (rating / 10).toFixed(1);
}
function RestaurantCard({ restaurant, index = 0 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/restaurants/$id",
      params: { id: restaurant.id },
      "data-ocid": `restaurant.item.${index + 1}`,
      className: "group block",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "bg-card rounded-xl overflow-hidden border border-border",
            "shadow-card hover:shadow-elevated transition-smooth",
            "hover:-translate-y-1",
            !restaurant.isOpen && "opacity-70"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: restaurant.imageUrl,
                  alt: restaurant.name,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
                  onError: (e) => {
                    e.currentTarget.src = "/assets/images/placeholder.svg";
                  }
                }
              ),
              !restaurant.isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-card text-foreground border border-border text-sm font-semibold px-3 py-1", children: "Closed" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: "flex items-center gap-1 bg-accent text-accent-foreground border-0 text-sm font-semibold px-2.5 py-1 shadow-card",
                  "data-ocid": `restaurant.rating_badge.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-current" }),
                    formatRating(restaurant.rating)
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-tight mb-1 truncate", children: restaurant.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: restaurant.cuisineType }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-3.5 w-3.5" }),
                  formatPrice(restaurant.deliveryFee),
                  " delivery"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
                  restaurant.estimatedDeliveryMinutes,
                  "–",
                  restaurant.estimatedDeliveryMinutes + 10,
                  " min"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "mt-3 w-full py-2 px-4 rounded-lg text-sm font-semibold transition-smooth block text-center",
                    restaurant.isOpen ? "bg-primary text-primary-foreground group-hover:bg-primary/90" : "bg-muted text-muted-foreground cursor-not-allowed"
                  ),
                  "aria-hidden": "true",
                  children: restaurant.isOpen ? "Order Now" : "Unavailable"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
const CUISINE_FILTERS = [
  "All",
  "Italian",
  "Chinese",
  "Japanese",
  "Mexican",
  "Indian",
  "American",
  "Thai",
  "Mediterranean",
  "Fast Food"
];
const CUISINE_EMOJIS = {
  All: "🍽️",
  Italian: "🍝",
  Chinese: "🥡",
  Japanese: "🍱",
  Mexican: "🌮",
  Indian: "🍛",
  American: "🍔",
  Thai: "🍜",
  Mediterranean: "🥗",
  "Fast Food": "⚡"
};
const FEATURED = SAMPLE_RESTAURANTS.slice(0, 4);
function FeaturedBanner() {
  const [active, setActive] = reactExports.useState(0);
  const timerRef = reactExports.useRef(null);
  const startTimer = reactExports.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % FEATURED.length);
    }, 4e3);
  }, []);
  reactExports.useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);
  const go = (dir) => {
    setActive((prev) => (prev + dir + FEATURED.length) % FEATURED.length);
    startTimer();
  };
  const current = FEATURED[active];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full overflow-hidden rounded-2xl shadow-elevated",
      style: { minHeight: 280 },
      children: [
        FEATURED.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "absolute inset-0 transition-opacity duration-700",
              i === active ? "opacity-100" : "opacity-0"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: r.imageUrl,
                  alt: r.name,
                  className: "w-full h-full object-cover",
                  onError: (e) => {
                    e.currentTarget.src = "/assets/images/placeholder.svg";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" })
            ]
          },
          r.id
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col justify-center h-full min-h-[280px] sm:min-h-[320px] px-7 py-8 sm:px-12 sm:py-10 max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mb-3 bg-primary text-primary-foreground border-0 text-xs font-semibold px-2.5 py-1 w-fit", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3 w-3 mr-1" }),
            "Today's Featured"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-extrabold text-2xl sm:text-4xl text-white leading-tight mb-2 drop-shadow-lg", children: current == null ? void 0 : current.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm sm:text-base mb-5 line-clamp-2 drop-shadow", children: current == null ? void 0 : current.description }),
          current && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/restaurants/$id",
              params: { id: current.id },
              "data-ocid": "featured.order_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  className: "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-elevated w-fit",
                  children: "Order Now"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Previous slide",
            onClick: () => go(-1),
            className: "absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-card/70 hover:bg-card border border-border p-1.5 shadow transition-smooth",
            "data-ocid": "featured.prev_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 text-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Next slide",
            onClick: () => go(1),
            className: "absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-card/70 hover:bg-card border border-border p-1.5 shadow transition-smooth",
            "data-ocid": "featured.next_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5", children: FEATURED.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": `Slide ${i + 1}`,
            onClick: () => {
              setActive(i);
              startTimer();
            },
            className: cn(
              "rounded-full transition-all duration-300",
              i === active ? "bg-primary w-5 h-2" : "bg-white/50 hover:bg-white/80 w-2 h-2"
            ),
            "data-ocid": `featured.dot.${i + 1}`
          },
          r.id
        )) })
      ]
    }
  );
}
function HomePage() {
  const [search, setSearch] = reactExports.useState("");
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState("");
  const [cuisine, setCuisine] = reactExports.useState("All");
  const filterRef = reactExports.useRef(null);
  const { data: restaurants = [], isLoading } = useRestaurants(
    debouncedSearch,
    cuisine
  );
  const searchTimeoutRef = reactExports.useRef(null);
  const handleSearch = (val) => {
    setSearch(val);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => setDebouncedSearch(val), 350);
  };
  const isFiltered = debouncedSearch !== "" || cuisine !== "All";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-6 sm:pt-12 sm:pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mb-3 bg-primary/10 text-primary border-primary/20 text-xs px-3 py-1 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3 mr-1.5 fill-current" }),
          "Fast delivery · Fresh food"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-extrabold text-3xl sm:text-5xl text-foreground leading-tight mb-2", children: [
          "Hungry? ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Order Now" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm sm:text-base max-w-sm", children: "Top-rated restaurants · Lightning-fast delivery" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-xl mx-auto mb-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => handleSearch(e.target.value),
            placeholder: "Search restaurants or dishes...",
            className: "pl-11 pr-4 h-12 text-base rounded-xl border-input shadow-card focus-visible:ring-primary/30 bg-background",
            "data-ocid": "home.search_input"
          }
        )
      ] })
    ] }) }),
    !isFiltered && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-primary fill-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base text-foreground", children: "Today's Featured Flavors" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedBanner, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: filterRef,
          className: "flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide",
          "data-ocid": "home.cuisine_filters",
          children: CUISINE_FILTERS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setCuisine(c),
              className: cn(
                "shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-smooth whitespace-nowrap",
                cuisine === c ? "bg-primary text-primary-foreground border-primary shadow-card" : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              ),
              "data-ocid": `home.cuisine_filter.${c.toLowerCase().replace(" ", "_")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: CUISINE_EMOJIS[c] }),
                c
              ]
            },
            c
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: debouncedSearch ? `Results for "${debouncedSearch}"` : cuisine !== "All" ? `${cuisine} Restaurants` : "All Restaurants" }),
        !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "text-sm text-muted-foreground",
            "data-ocid": "home.restaurant_count",
            children: [
              restaurants.length,
              " ",
              restaurants.length === 1 ? "place" : "places"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map(
        (k) => /* @__PURE__ */ jsxRuntimeExports.jsx(RestaurantCardSkeleton, {}, k)
      ) }) : restaurants.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-10 w-10" }),
          title: "No restaurants found",
          description: isFiltered ? "Try a different search or filter to see more options." : "No restaurants available right now.",
          actionLabel: "Clear filters",
          onAction: () => {
            setSearch("");
            setDebouncedSearch("");
            setCuisine("All");
          },
          "data-ocid": "home.empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: restaurants.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RestaurantCard, { restaurant: r, index: i }, r.id)) })
    ] }) })
  ] });
}
export {
  HomePage as default
};
