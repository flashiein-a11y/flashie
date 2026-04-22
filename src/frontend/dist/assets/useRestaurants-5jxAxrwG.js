import { c as createLucideIcon } from "./index-cB7zv8lW.js";
import { u as useQuery } from "./EmptyState-C0CGAISR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const SAMPLE_RESTAURANTS = [
  {
    id: "r1",
    name: "The Pasta House",
    imageUrl: "/assets/generated/restaurant-pasta.jpg",
    cuisineType: "Italian",
    rating: 47,
    deliveryFee: 399,
    estimatedDeliveryMinutes: 35,
    description: "Handcrafted pasta and wood-fired pizzas made with imported Italian ingredients.",
    isOpen: true
  },
  {
    id: "r2",
    name: "Sushi Samba",
    imageUrl: "/assets/generated/restaurant-sushi.jpg",
    cuisineType: "Japanese",
    rating: 48,
    deliveryFee: 499,
    estimatedDeliveryMinutes: 40,
    description: "Fresh sushi rolls and sake-marinated grilled dishes crafted daily.",
    isOpen: true
  },
  {
    id: "r3",
    name: "Spice Route",
    imageUrl: "/assets/generated/restaurant-indian.jpg",
    cuisineType: "Indian",
    rating: 46,
    deliveryFee: 299,
    estimatedDeliveryMinutes: 30,
    description: "Authentic curries and tandoori classics from Northern and Southern India.",
    isOpen: true
  },
  {
    id: "r4",
    name: "Dragon Palace",
    imageUrl: "/assets/generated/restaurant-chinese.jpg",
    cuisineType: "Chinese",
    rating: 45,
    deliveryFee: 349,
    estimatedDeliveryMinutes: 25,
    description: "Wok-fired traditional Chinese dishes, dim sum, and Peking duck.",
    isOpen: true
  },
  {
    id: "r5",
    name: "Taco Fiesta",
    imageUrl: "/assets/generated/restaurant-mexican.jpg",
    cuisineType: "Mexican",
    rating: 46,
    deliveryFee: 249,
    estimatedDeliveryMinutes: 20,
    description: "Street-style tacos, burritos, and fresh guacamole made to order.",
    isOpen: true
  },
  {
    id: "r6",
    name: "Thai Garden",
    imageUrl: "/assets/generated/restaurant-thai.jpg",
    cuisineType: "Thai",
    rating: 47,
    deliveryFee: 399,
    estimatedDeliveryMinutes: 35,
    description: "Fragrant curries, pad thai, and fresh spring rolls from Bangkok.",
    isOpen: true
  },
  {
    id: "r7",
    name: "Seoul Kitchen",
    imageUrl: "/assets/generated/restaurant-korean.jpg",
    cuisineType: "Korean",
    rating: 48,
    deliveryFee: 449,
    estimatedDeliveryMinutes: 40,
    description: "Korean BBQ, bibimbap, and spicy kimchi stews for the adventurous palate.",
    isOpen: false
  },
  {
    id: "r8",
    name: "The Burger Lab",
    imageUrl: "/assets/generated/restaurant-american.jpg",
    cuisineType: "American",
    rating: 44,
    deliveryFee: 199,
    estimatedDeliveryMinutes: 20,
    description: "Craft smash burgers, loaded fries, and artisan milkshakes.",
    isOpen: true
  }
];
const SAMPLE_MENU_ITEMS = {
  r1: [
    {
      id: "m1",
      restaurantId: "r1",
      name: "Spaghetti Carbonara",
      description: "Creamy egg sauce, guanciale, pecorino, black pepper",
      imageUrl: "/assets/generated/dish-carbonara.jpg",
      price: 1690,
      category: "Pasta",
      isAvailable: true
    },
    {
      id: "m2",
      restaurantId: "r1",
      name: "Penne Arrabbiata",
      description: "Spicy tomato sauce, garlic, fresh basil",
      imageUrl: "/assets/generated/dish-arrabbiata.jpg",
      price: 1490,
      category: "Pasta",
      isAvailable: true
    },
    {
      id: "m3",
      restaurantId: "r1",
      name: "Margherita Pizza",
      description: "San Marzano tomatoes, buffalo mozzarella, fresh basil",
      imageUrl: "/assets/generated/dish-margherita.jpg",
      price: 1890,
      category: "Pizza",
      isAvailable: true
    },
    {
      id: "m4",
      restaurantId: "r1",
      name: "Tiramisu",
      description: "Classic Italian dessert with mascarpone and espresso",
      imageUrl: "/assets/generated/dish-tiramisu.jpg",
      price: 890,
      category: "Desserts",
      isAvailable: true
    }
  ],
  r2: [
    {
      id: "m5",
      restaurantId: "r2",
      name: "Salmon Nigiri (8pc)",
      description: "Fresh Atlantic salmon over sushi rice",
      imageUrl: "/assets/generated/dish-salmon-nigiri.jpg",
      price: 1890,
      category: "Nigiri",
      isAvailable: true
    },
    {
      id: "m6",
      restaurantId: "r2",
      name: "Dragon Roll",
      description: "Shrimp tempura, avocado, cucumber, eel sauce",
      imageUrl: "/assets/generated/dish-dragon-roll.jpg",
      price: 1690,
      category: "Rolls",
      isAvailable: true
    },
    {
      id: "m7",
      restaurantId: "r2",
      name: "Miso Ramen",
      description: "Rich miso broth, chashu pork, soft egg, nori",
      imageUrl: "/assets/generated/dish-ramen.jpg",
      price: 1590,
      category: "Hot Dishes",
      isAvailable: true
    },
    {
      id: "m8",
      restaurantId: "r2",
      name: "Edamame",
      description: "Steamed salted soybeans",
      imageUrl: "/assets/generated/dish-edamame.jpg",
      price: 490,
      category: "Starters",
      isAvailable: true
    }
  ],
  r3: [
    {
      id: "m9",
      restaurantId: "r3",
      name: "Butter Chicken",
      description: "Tender chicken in rich tomato-cream sauce",
      imageUrl: "/assets/generated/dish-butter-chicken.jpg",
      price: 1590,
      category: "Curries",
      isAvailable: true
    },
    {
      id: "m10",
      restaurantId: "r3",
      name: "Lamb Biryani",
      description: "Fragrant basmati rice with slow-cooked lamb",
      imageUrl: "/assets/generated/dish-biryani.jpg",
      price: 1790,
      category: "Rice",
      isAvailable: true
    },
    {
      id: "m11",
      restaurantId: "r3",
      name: "Garlic Naan (3pc)",
      description: "Freshly baked flatbread with garlic and butter",
      imageUrl: "/assets/generated/dish-naan.jpg",
      price: 490,
      category: "Bread",
      isAvailable: true
    },
    {
      id: "m12",
      restaurantId: "r3",
      name: "Mango Lassi",
      description: "Chilled yogurt drink with Alphonso mango",
      imageUrl: "/assets/generated/dish-lassi.jpg",
      price: 390,
      category: "Drinks",
      isAvailable: true
    }
  ],
  r4: [
    {
      id: "m13",
      restaurantId: "r4",
      name: "Kung Pao Chicken",
      description: "Stir-fried chicken, peanuts, dried chillies",
      imageUrl: "/assets/generated/dish-kungpao.jpg",
      price: 1490,
      category: "Wok",
      isAvailable: true
    },
    {
      id: "m14",
      restaurantId: "r4",
      name: "Dim Sum Basket (6pc)",
      description: "Steamed shrimp har gow and pork siu mai",
      imageUrl: "/assets/generated/dish-dimsum.jpg",
      price: 1190,
      category: "Dim Sum",
      isAvailable: true
    },
    {
      id: "m15",
      restaurantId: "r4",
      name: "Fried Rice",
      description: "Wok-tossed jasmine rice with egg and vegetables",
      imageUrl: "/assets/generated/dish-friedrice.jpg",
      price: 1290,
      category: "Rice",
      isAvailable: true
    }
  ],
  r5: [
    {
      id: "m16",
      restaurantId: "r5",
      name: "Carne Asada Taco (3pc)",
      description: "Grilled steak, cilantro, onion, salsa verde",
      imageUrl: "/assets/generated/dish-taco.jpg",
      price: 1390,
      category: "Tacos",
      isAvailable: true
    },
    {
      id: "m17",
      restaurantId: "r5",
      name: "Loaded Burrito",
      description: "Chicken, black beans, rice, cheese, guacamole",
      imageUrl: "/assets/generated/dish-burrito.jpg",
      price: 1590,
      category: "Burritos",
      isAvailable: true
    },
    {
      id: "m18",
      restaurantId: "r5",
      name: "Nachos Grande",
      description: "Tortilla chips, queso, jalapeños, pico de gallo",
      imageUrl: "/assets/generated/dish-nachos.jpg",
      price: 1190,
      category: "Starters",
      isAvailable: true
    }
  ],
  r6: [
    {
      id: "m19",
      restaurantId: "r6",
      name: "Pad Thai",
      description: "Rice noodles, shrimp, tamarind, peanuts, egg",
      imageUrl: "/assets/generated/dish-padthai.jpg",
      price: 1490,
      category: "Noodles",
      isAvailable: true
    },
    {
      id: "m20",
      restaurantId: "r6",
      name: "Green Curry",
      description: "Coconut milk, Thai basil, bamboo shoots, chicken",
      imageUrl: "/assets/generated/dish-greencurry.jpg",
      price: 1590,
      category: "Curries",
      isAvailable: true
    },
    {
      id: "m21",
      restaurantId: "r6",
      name: "Spring Rolls (4pc)",
      description: "Crispy vegetable rolls with sweet chili sauce",
      imageUrl: "/assets/generated/dish-springrolls.jpg",
      price: 890,
      category: "Starters",
      isAvailable: true
    }
  ],
  r7: [
    {
      id: "m22",
      restaurantId: "r7",
      name: "Bibimbap",
      description: "Steamed rice, vegetables, gochujang, fried egg",
      imageUrl: "/assets/generated/dish-bibimbap.jpg",
      price: 1590,
      category: "Rice Bowls",
      isAvailable: true
    },
    {
      id: "m23",
      restaurantId: "r7",
      name: "Korean BBQ Set",
      description: "Marinated beef bulgogi, kimchi, banchan sides",
      imageUrl: "/assets/generated/dish-bulgogi.jpg",
      price: 2290,
      category: "BBQ",
      isAvailable: true
    }
  ],
  r8: [
    {
      id: "m24",
      restaurantId: "r8",
      name: "Smash Double Burger",
      description: "Double smash patties, American cheese, special sauce",
      imageUrl: "/assets/generated/dish-burger.jpg",
      price: 1490,
      category: "Burgers",
      isAvailable: true
    },
    {
      id: "m25",
      restaurantId: "r8",
      name: "Loaded Fries",
      description: "Crispy fries, cheddar sauce, bacon bits, chives",
      imageUrl: "/assets/generated/dish-fries.jpg",
      price: 890,
      category: "Sides",
      isAvailable: true
    },
    {
      id: "m26",
      restaurantId: "r8",
      name: "Chocolate Milkshake",
      description: "Thick creamy shake with premium chocolate ice cream",
      imageUrl: "/assets/generated/dish-milkshake.jpg",
      price: 690,
      category: "Drinks",
      isAvailable: true
    }
  ]
};
function useRestaurants(searchQuery, cuisineFilter) {
  return useQuery({
    queryKey: ["restaurants", searchQuery, cuisineFilter],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      let results = SAMPLE_RESTAURANTS;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        results = results.filter(
          (r) => r.name.toLowerCase().includes(q) || r.cuisineType.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
        );
      }
      if (cuisineFilter && cuisineFilter !== "All") {
        results = results.filter((r) => r.cuisineType === cuisineFilter);
      }
      return results;
    },
    staleTime: 1e3 * 60 * 5
  });
}
function useRestaurant(id) {
  return useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return SAMPLE_RESTAURANTS.find((r) => r.id === id);
    },
    enabled: !!id
  });
}
function useMenuItems(restaurantId) {
  return useQuery({
    queryKey: ["menuItems", restaurantId],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return SAMPLE_MENU_ITEMS[restaurantId] ?? [];
    },
    enabled: !!restaurantId
  });
}
export {
  SAMPLE_RESTAURANTS as S,
  Truck as T,
  useRestaurant as a,
  useMenuItems as b,
  useRestaurants as u
};
