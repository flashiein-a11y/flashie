import type { backendInterface, Restaurant, MenuItem, Order, UserProfile, SavedAddress, CartItem, CuisineType } from "../backend";
import { OrderStatus } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const sampleRestaurants: Restaurant[] = [
  {
    id: BigInt(1),
    name: "Spice Route",
    description: "Authentic curries and tandoori classics.",
    cuisineType: { __kind__: "indian", indian: null },
    rating: BigInt(47),
    deliveryFee: BigInt(399),
    estimatedDeliveryMinutes: BigInt(35),
    isOpen: true,
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
  },
  {
    id: BigInt(2),
    name: "Sushi Samba",
    description: "Fresh sushi and Japanese fusion dishes.",
    cuisineType: { __kind__: "japanese", japanese: null },
    rating: BigInt(46),
    deliveryFee: BigInt(299),
    estimatedDeliveryMinutes: BigInt(30),
    isOpen: true,
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop",
  },
  {
    id: BigInt(3),
    name: "The Pasta House",
    description: "Hand-crafted pasta and Italian classics.",
    cuisineType: { __kind__: "italian", italian: null },
    rating: BigInt(48),
    deliveryFee: BigInt(349),
    estimatedDeliveryMinutes: BigInt(40),
    isOpen: true,
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
  },
  {
    id: BigInt(4),
    name: "Dragon Palace",
    description: "Traditional Chinese cuisine and dim sum.",
    cuisineType: { __kind__: "chinese", chinese: null },
    rating: BigInt(45),
    deliveryFee: BigInt(249),
    estimatedDeliveryMinutes: BigInt(25),
    isOpen: true,
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop",
  },
  {
    id: BigInt(5),
    name: "Taco Fiesta",
    description: "Vibrant Mexican street food and margaritas.",
    cuisineType: { __kind__: "mexican", mexican: null },
    rating: BigInt(44),
    deliveryFee: BigInt(199),
    estimatedDeliveryMinutes: BigInt(20),
    isOpen: true,
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
  },
  {
    id: BigInt(6),
    name: "American Grill",
    description: "Juicy burgers and classic American comfort food.",
    cuisineType: { __kind__: "american", american: null },
    rating: BigInt(43),
    deliveryFee: BigInt(299),
    estimatedDeliveryMinutes: BigInt(30),
    isOpen: true,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  },
];

const sampleMenuItems: MenuItem[] = [
  {
    id: BigInt(1),
    restaurantId: BigInt(1),
    name: "Butter Chicken",
    description: "Creamy tomato-based chicken curry with aromatic spices.",
    category: "Mains",
    price: BigInt(1299),
    isAvailable: true,
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
  },
  {
    id: BigInt(2),
    restaurantId: BigInt(1),
    name: "Garlic Naan",
    description: "Soft leavened bread baked in tandoor with garlic butter.",
    category: "Breads",
    price: BigInt(349),
    isAvailable: true,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
  },
  {
    id: BigInt(3),
    restaurantId: BigInt(1),
    name: "Mango Lassi",
    description: "Refreshing yogurt drink blended with fresh mango.",
    category: "Drinks",
    price: BigInt(299),
    isAvailable: true,
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
  },
];

const sampleOrder: Order = {
  id: BigInt(1),
  restaurantId: BigInt(1),
  restaurantName: "Spice Route",
  userId: Principal.anonymous(),
  status: OrderStatus.confirmed,
  items: [
    {
      menuItemId: BigInt(1),
      restaurantId: BigInt(1),
      name: "Butter Chicken",
      quantity: BigInt(2),
      price: BigInt(1299),
    },
  ],
  deliveryAddress: "123 Main Street, Mumbai",
  specialInstructions: "Extra spicy please",
  totalAmount: BigInt(2997),
  deliveryFee: BigInt(399),
  estimatedDeliveryMinutes: BigInt(35),
  createdAt: BigInt(Date.now() * 1_000_000 - 10 * 60 * 1_000_000_000),
  updatedAt: BigInt(Date.now() * 1_000_000),
};

const sampleProfile: UserProfile = {
  id: Principal.anonymous(),
  createdAt: BigInt(Date.now() * 1_000_000),
  savedAddresses: [
    { tag: "Home", address: "123 Main Street, Mumbai 400001" },
    { tag: "Office", address: "456 Business Park, Mumbai 400051" },
  ],
};

export const mockBackend: backendInterface = {
  listRestaurants: async () => sampleRestaurants,
  getRestaurant: async (id) => sampleRestaurants.find((r) => r.id === id) ?? null,
  getMenuItems: async (restaurantId) => sampleMenuItems.filter((m) => m.restaurantId === restaurantId),
  getMenuItem: async (id) => sampleMenuItems.find((m) => m.id === id) ?? null,
  searchRestaurants: async (nameQuery, cuisineFilter, minRating) => {
    let results = sampleRestaurants;
    if (nameQuery) {
      results = results.filter((r) => r.name.toLowerCase().includes(nameQuery.toLowerCase()));
    }
    return results;
  },
  getUserOrders: async () => [sampleOrder],
  getOrder: async (orderId) => (orderId === BigInt(1) ? sampleOrder : null),
  placeOrder: async (req) => ({
    ...sampleOrder,
    id: BigInt(2),
    restaurantId: req.restaurantId,
    deliveryAddress: req.deliveryAddress,
    specialInstructions: req.specialInstructions,
    items: req.items,
    status: OrderStatus.confirmed,
    createdAt: BigInt(Date.now() * 1_000_000),
    updatedAt: BigInt(Date.now() * 1_000_000),
  }),
  getMyProfile: async () => sampleProfile,
  saveAddress: async (_address: SavedAddress) => undefined,
  removeAddress: async (_tag: string) => undefined,
  reorder: async (_originalOrderId, _deliveryAddress) => sampleOrder,
};
