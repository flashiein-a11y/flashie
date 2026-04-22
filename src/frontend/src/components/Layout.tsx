import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  LogIn,
  LogOut,
  MapPin,
  Menu,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const isLoggedIn = !!identity;
  const cartCount = useCartStore((s) => s.itemCount());

  const navLinks = [
    { label: "Restaurants", to: "/" },
    { label: "My Orders", to: "/orders" },
    { label: "Profile", to: "/profile" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Brand */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0"
              data-ocid="nav.home_link"
            >
              <img
                src="/assets/img_20260328_233134_595-019db1f3-e270-7239-b71d-dd1809b49ab4.webp"
                alt="Flashie"
                className="h-10 w-10 rounded-xl object-cover"
              />
              <span className="font-display font-bold text-xl text-foreground tracking-tight">
                Flashie
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
                  activeProps={{ className: "text-primary bg-primary/10" }}
                  data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}_link`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <Link to="/cart" data-ocid="nav.cart_link">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground rounded-full"
                      data-ocid="nav.cart_badge"
                    >
                      {cartCount > 9 ? "9+" : cartCount}
                    </Badge>
                  )}
                  <span className="sr-only">Cart</span>
                </Button>
              </Link>

              {/* Auth */}
              {isLoggedIn ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clear()}
                  className="hidden md:flex items-center gap-1.5 text-muted-foreground"
                  data-ocid="nav.logout_button"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => login()}
                  disabled={loginStatus === "logging-in"}
                  className="hidden md:flex items-center gap-1.5"
                  data-ocid="nav.login_button"
                >
                  <LogIn className="h-4 w-4" />
                  {loginStatus === "logging-in" ? "Signing in..." : "Sign In"}
                </Button>
              )}

              {/* Mobile hamburger */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                data-ocid="nav.mobile_menu_toggle"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
                onClick={() => setMobileMenuOpen(false)}
                data-ocid={`nav.mobile_${link.label.toLowerCase().replace(" ", "_")}_link`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-2">
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    clear();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 w-full text-sm font-medium text-muted-foreground hover:text-foreground"
                  data-ocid="nav.mobile_logout_button"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    login();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 w-full text-sm font-medium text-primary"
                  data-ocid="nav.mobile_login_button"
                >
                  <LogIn className="h-4 w-4" /> Sign In with Internet Identity
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/img_20260328_233134_595-019db1f3-e270-7239-b71d-dd1809b49ab4.webp"
                alt="Flashie"
                className="h-8 w-8 rounded-lg object-cover"
              />
              <div>
                <p className="font-display font-bold text-foreground">
                  Flashie
                </p>
                <p className="text-xs text-muted-foreground">
                  Fast delivery, fresh food
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Restaurants
              </Link>
              <Link
                to="/orders"
                className="hover:text-foreground transition-colors"
              >
                Orders
              </Link>
              <Link
                to="/profile"
                className="hover:text-foreground transition-colors"
              >
                Profile
              </Link>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
