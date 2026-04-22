import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PlaceOrderRequest {
    deliveryAddress: string;
    restaurantId: RestaurantId;
    specialInstructions: string;
    items: Array<CartItem>;
}
export type Timestamp = bigint;
export type CuisineType = {
    __kind__: "other";
    other: string;
} | {
    __kind__: "mediterranean";
    mediterranean: null;
} | {
    __kind__: "thai";
    thai: null;
} | {
    __kind__: "japanese";
    japanese: null;
} | {
    __kind__: "chinese";
    chinese: null;
} | {
    __kind__: "mexican";
    mexican: null;
} | {
    __kind__: "fastFood";
    fastFood: null;
} | {
    __kind__: "italian";
    italian: null;
} | {
    __kind__: "indian";
    indian: null;
} | {
    __kind__: "american";
    american: null;
};
export type RestaurantId = bigint;
export interface Order {
    id: OrderId;
    status: OrderStatus;
    deliveryAddress: string;
    deliveryFee: bigint;
    userId: UserId;
    createdAt: Timestamp;
    estimatedDeliveryMinutes: bigint;
    restaurantId: RestaurantId;
    updatedAt: Timestamp;
    specialInstructions: string;
    totalAmount: bigint;
    restaurantName: string;
    items: Array<CartItem>;
}
export interface Restaurant {
    id: RestaurantId;
    deliveryFee: bigint;
    name: string;
    estimatedDeliveryMinutes: bigint;
    cuisineType: CuisineType;
    description: string;
    isOpen: boolean;
    imageUrl: string;
    rating: bigint;
}
export interface SavedAddress {
    tag: string;
    address: string;
}
export type UserId = Principal;
export type MenuItemId = bigint;
export interface MenuItem {
    id: MenuItemId;
    name: string;
    isAvailable: boolean;
    description: string;
    restaurantId: RestaurantId;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface CartItem {
    name: string;
    restaurantId: RestaurantId;
    quantity: bigint;
    price: bigint;
    menuItemId: MenuItemId;
}
export interface UserProfile {
    id: UserId;
    createdAt: Timestamp;
    savedAddresses: Array<SavedAddress>;
}
export type OrderId = bigint;
export enum OrderStatus {
    preparing = "preparing",
    cancelled = "cancelled",
    onTheWay = "onTheWay",
    delivered = "delivered",
    confirmed = "confirmed"
}
export interface backendInterface {
    getMenuItem(id: MenuItemId): Promise<MenuItem | null>;
    getMenuItems(restaurantId: RestaurantId): Promise<Array<MenuItem>>;
    getMyProfile(): Promise<UserProfile>;
    getOrder(orderId: OrderId): Promise<Order | null>;
    getRestaurant(id: RestaurantId): Promise<Restaurant | null>;
    getUserOrders(): Promise<Array<Order>>;
    listRestaurants(): Promise<Array<Restaurant>>;
    placeOrder(req: PlaceOrderRequest): Promise<Order>;
    removeAddress(addressTag: string): Promise<void>;
    reorder(originalOrderId: OrderId, deliveryAddress: string): Promise<Order | null>;
    saveAddress(address: SavedAddress): Promise<void>;
    searchRestaurants(nameQuery: string, cuisineFilter: CuisineType | null, minRating: bigint | null): Promise<Array<Restaurant>>;
}
