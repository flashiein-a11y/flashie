export type RestaurantId = string;
export type MenuItemId = string;
export type OrderId = string;
export type UserId = string;
export type Timestamp = bigint;

export type CuisineType =
  | "Italian"
  | "Japanese"
  | "Indian"
  | "Mexican"
  | "Chinese"
  | "Thai"
  | "American"
  | "Mediterranean"
  | "Korean"
  | "Vietnamese"
  | "Other";

export interface Restaurant {
  id: RestaurantId;
  name: string;
  imageUrl: string;
  cuisineType: CuisineType;
  rating: bigint;
  deliveryFee: bigint;
  estimatedDeliveryMinutes: bigint;
  description: string;
  isOpen: boolean;
}

export interface MenuItem {
  id: MenuItemId;
  restaurantId: RestaurantId;
  name: string;
  description: string;
  imageUrl: string;
  price: bigint;
  category: string;
  isAvailable: boolean;
}

export type OrderStatus =
  | { __kind__: "confirmed" }
  | { __kind__: "preparing" }
  | { __kind__: "onTheWay" }
  | { __kind__: "delivered" }
  | { __kind__: "cancelled" };

export interface CartItem {
  menuItemId: MenuItemId;
  restaurantId: RestaurantId;
  name: string;
  price: bigint;
  quantity: bigint;
}

export interface Order {
  id: OrderId;
  userId: UserId;
  restaurantId: RestaurantId;
  restaurantName: string;
  items: CartItem[];
  status: OrderStatus;
  deliveryAddress: string;
  specialInstructions: string;
  totalAmount: bigint;
  deliveryFee: bigint;
  estimatedDeliveryMinutes: bigint;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PlaceOrderRequest {
  restaurantId: RestaurantId;
  items: CartItem[];
  deliveryAddress: string;
  specialInstructions: string;
}

export interface SavedAddress {
  tag: string;
  address: string;
}

export interface UserProfile {
  id: UserId;
  savedAddresses: SavedAddress[];
  createdAt: Timestamp;
}

// UI-friendly cart item (price as number for calculations)
export interface CartItemUI {
  menuItemId: MenuItemId;
  restaurantId: RestaurantId;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

// Sample data types for demo
export interface SampleRestaurant
  extends Omit<
    Restaurant,
    "rating" | "deliveryFee" | "estimatedDeliveryMinutes"
  > {
  rating: number;
  deliveryFee: number;
  estimatedDeliveryMinutes: number;
}

export interface SampleMenuItem extends Omit<MenuItem, "price"> {
  price: number;
}
