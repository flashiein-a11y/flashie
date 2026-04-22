import { EmptyState } from "@/components/EmptyState";
import { RestaurantCardSkeleton } from "@/components/LoadingSpinner";
import { RestaurantCard } from "@/components/RestaurantCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SAMPLE_RESTAURANTS, useRestaurants } from "@/hooks/useRestaurants";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Search,
  Star,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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
  "Fast Food",
];

const CUISINE_EMOJIS: Record<string, string> = {
  All: "🍽️",
  Italian: "🍝",
  Chinese: "🥡",
  Japanese: "🍱",
  Mexican: "🌮",
  Indian: "🍛",
  American: "🍔",
  Thai: "🍜",
  Mediterranean: "🥗",
  "Fast Food": "⚡",
};

// Featured banners use the first 4 sample restaurants
const FEATURED = SAMPLE_RESTAURANTS.slice(0, 4);

function FeaturedBanner() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % FEATURED.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const go = (dir: number) => {
    setActive((prev) => (prev + dir + FEATURED.length) % FEATURED.length);
    startTimer();
  };

  const current = FEATURED[active];

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-elevated"
      style={{ minHeight: 280 }}
    >
      {/* Background images */}
      {FEATURED.map((r, i) => (
        <div
          key={r.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === active ? "opacity-100" : "opacity-0",
          )}
        >
          <img
            src={r.imageUrl}
            alt={r.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full min-h-[280px] sm:min-h-[320px] px-7 py-8 sm:px-12 sm:py-10 max-w-lg">
        <Badge className="mb-3 bg-primary text-primary-foreground border-0 text-xs font-semibold px-2.5 py-1 w-fit">
          <Flame className="h-3 w-3 mr-1" />
          Today&apos;s Featured
        </Badge>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white leading-tight mb-2 drop-shadow-lg">
          {current?.name}
        </h2>
        <p className="text-white/80 text-sm sm:text-base mb-5 line-clamp-2 drop-shadow">
          {current?.description}
        </p>
        {current && (
          <Link
            to="/restaurants/$id"
            params={{ id: current.id }}
            data-ocid="featured.order_button"
          >
            <Button
              type="button"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-elevated w-fit"
            >
              Order Now
            </Button>
          </Link>
        )}
      </div>

      {/* Prev / Next */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-card/70 hover:bg-card border border-border p-1.5 shadow transition-smooth"
        data-ocid="featured.prev_button"
      >
        <ChevronLeft className="h-4 w-4 text-foreground" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-card/70 hover:bg-card border border-border p-1.5 shadow transition-smooth"
        data-ocid="featured.next_button"
      >
        <ChevronRight className="h-4 w-4 text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {FEATURED.map((r, i) => (
          <button
            key={r.id}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => {
              setActive(i);
              startTimer();
            }}
            className={cn(
              "rounded-full transition-all duration-300",
              i === active
                ? "bg-primary w-5 h-2"
                : "bg-white/50 hover:bg-white/80 w-2 h-2",
            )}
            data-ocid={`featured.dot.${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const filterRef = useRef<HTMLDivElement>(null);

  const { data: restaurants = [], isLoading } = useRestaurants(
    debouncedSearch,
    cuisine,
  );

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearch = (val: string) => {
    setSearch(val);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => setDebouncedSearch(val), 350);
  };

  const isFiltered = debouncedSearch !== "" || cuisine !== "All";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-6 sm:pt-12 sm:pb-8">
          <div className="flex flex-col items-center text-center mb-6">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-xs px-3 py-1 font-medium">
              <Zap className="h-3 w-3 mr-1.5 fill-current" />
              Fast delivery · Fresh food
            </Badge>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground leading-tight mb-2">
              Hungry? <span className="text-primary">Order Now</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-sm">
              Top-rated restaurants · Lightning-fast delivery
            </p>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto mb-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search restaurants or dishes..."
              className="pl-11 pr-4 h-12 text-base rounded-xl border-input shadow-card focus-visible:ring-primary/30 bg-background"
              data-ocid="home.search_input"
            />
          </div>
        </div>
      </section>

      {/* Featured Banner — only when not filtering */}
      {!isFiltered && (
        <section className="bg-muted/30 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="font-display font-bold text-base text-foreground">
                Today's Featured Flavors
              </span>
            </div>
            <FeaturedBanner />
          </div>
        </section>
      )}

      {/* Restaurants section */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          {/* Cuisine filter pills */}
          <div
            ref={filterRef}
            className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide"
            data-ocid="home.cuisine_filters"
          >
            {CUISINE_FILTERS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCuisine(c)}
                className={cn(
                  "shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-smooth whitespace-nowrap",
                  cuisine === c
                    ? "bg-primary text-primary-foreground border-primary shadow-card"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground",
                )}
                data-ocid={`home.cuisine_filter.${c.toLowerCase().replace(" ", "_")}`}
              >
                <span className="text-base leading-none">
                  {CUISINE_EMOJIS[c]}
                </span>
                {c}
              </button>
            ))}
          </div>

          {/* Section header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-lg text-foreground">
              {debouncedSearch
                ? `Results for "${debouncedSearch}"`
                : cuisine !== "All"
                  ? `${cuisine} Restaurants`
                  : "All Restaurants"}
            </h2>
            {!isLoading && (
              <span
                className="text-sm text-muted-foreground"
                data-ocid="home.restaurant_count"
              >
                {restaurants.length}{" "}
                {restaurants.length === 1 ? "place" : "places"}
              </span>
            )}
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {(["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const).map(
                (k) => (
                  <RestaurantCardSkeleton key={k} />
                ),
              )}
            </div>
          ) : restaurants.length === 0 ? (
            <EmptyState
              icon={<Search className="h-10 w-10" />}
              title="No restaurants found"
              description={
                isFiltered
                  ? "Try a different search or filter to see more options."
                  : "No restaurants available right now."
              }
              actionLabel="Clear filters"
              onAction={() => {
                setSearch("");
                setDebouncedSearch("");
                setCuisine("All");
              }}
              data-ocid="home.empty_state"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {restaurants.map((r, i) => (
                <RestaurantCard key={r.id} restaurant={r} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
