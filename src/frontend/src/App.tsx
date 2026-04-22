import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";

const HomePage = lazy(() => import("@/pages/HomePage"));
const RestaurantPage = lazy(() => import("@/pages/RestaurantPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const OrdersPage = lazy(() => import("@/pages/OrdersPage"));
const OrderTrackingPage = lazy(() => import("@/pages/OrderTrackingPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <LoadingSpinner size="lg" label="Loading..." />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Layout>
      <Toaster richColors position="top-right" />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const restaurantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/restaurants/$id",
  component: RestaurantPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: OrdersPage,
});

const orderTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/$id",
  component: OrderTrackingPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  restaurantRoute,
  cartRoute,
  ordersRoute,
  orderTrackingRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
