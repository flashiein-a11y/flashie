import List "mo:core/List";
import Types "../types/restaurant";
import Common "../types/common";

module {
  public func listRestaurants(
    restaurants : List.List<Types.Restaurant>
  ) : [Types.Restaurant] {
    restaurants.toArray()
  };

  public func searchRestaurants(
    restaurants : List.List<Types.Restaurant>,
    nameQuery : Text,
    cuisineFilter : ?Types.CuisineType,
    minRating : ?Nat
  ) : [Types.Restaurant] {
    let lowerQuery = nameQuery.toLower();
    restaurants.filter(func(r) {
      let nameMatch = nameQuery == "" or r.name.toLower().contains(#text lowerQuery);
      let cuisineMatch = switch cuisineFilter {
        case null true;
        case (?c) r.cuisineType == c;
      };
      let ratingMatch = switch minRating {
        case null true;
        case (?min) r.rating >= min;
      };
      nameMatch and cuisineMatch and ratingMatch
    }).toArray()
  };

  public func getRestaurant(
    restaurants : List.List<Types.Restaurant>,
    id : Common.RestaurantId
  ) : ?Types.Restaurant {
    restaurants.find(func(r) { r.id == id })
  };

  public func getMenuItems(
    menuItems : List.List<Types.MenuItem>,
    restaurantId : Common.RestaurantId
  ) : [Types.MenuItem] {
    menuItems.filter(func(m) { m.restaurantId == restaurantId }).toArray()
  };

  public func getMenuItem(
    menuItems : List.List<Types.MenuItem>,
    id : Common.MenuItemId
  ) : ?Types.MenuItem {
    menuItems.find(func(m) { m.id == id })
  };

  public func seedSampleData(
    restaurants : List.List<Types.Restaurant>,
    menuItems : List.List<Types.MenuItem>,
    _nextRestaurantId : Nat,
    _nextMenuItemId : Nat
  ) : (Nat, Nat) {
    // Only seed if empty
    if (restaurants.size() > 0) {
      return (_nextRestaurantId, _nextMenuItemId)
    };

    // Restaurant 1: Pizza Palace
    restaurants.add({
      id = 1;
      name = "Pizza Palace";
      imageUrl = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400";
      cuisineType = #italian;
      rating = 47;
      deliveryFee = 199;
      estimatedDeliveryMinutes = 25;
      description = "Authentic Italian pizzas baked in a wood-fired oven. Fresh ingredients, classic recipes.";
      isOpen = true;
    });

    // Restaurant 2: Dragon Garden
    restaurants.add({
      id = 2;
      name = "Dragon Garden";
      imageUrl = "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400";
      cuisineType = #chinese;
      rating = 43;
      deliveryFee = 149;
      estimatedDeliveryMinutes = 30;
      description = "Traditional Chinese cuisine with a modern twist. Dim sum, noodles, and more.";
      isOpen = true;
    });

    // Restaurant 3: Burger Barn
    restaurants.add({
      id = 3;
      name = "Burger Barn";
      imageUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400";
      cuisineType = #american;
      rating = 41;
      deliveryFee = 99;
      estimatedDeliveryMinutes = 20;
      description = "Juicy gourmet burgers made with 100% beef patties and fresh toppings.";
      isOpen = true;
    });

    // Restaurant 4: Sakura Sushi
    restaurants.add({
      id = 4;
      name = "Sakura Sushi";
      imageUrl = "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400";
      cuisineType = #japanese;
      rating = 49;
      deliveryFee = 249;
      estimatedDeliveryMinutes = 35;
      description = "Premium sushi and Japanese cuisine crafted by experienced chefs.";
      isOpen = true;
    });

    // Restaurant 5: Spice Route
    restaurants.add({
      id = 5;
      name = "Spice Route";
      imageUrl = "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400";
      cuisineType = #indian;
      rating = 45;
      deliveryFee = 179;
      estimatedDeliveryMinutes = 40;
      description = "Rich curries, tandoor specialties, and aromatic biryanis from Northern India.";
      isOpen = true;
    });

    // Menu items for Pizza Palace (restaurantId = 1)
    menuItems.add({
      id = 1; restaurantId = 1;
      name = "Margherita Pizza";
      description = "Classic tomato sauce, fresh mozzarella, basil leaves";
      imageUrl = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300";
      price = 1299; category = "Pizzas"; isAvailable = true;
    });
    menuItems.add({
      id = 2; restaurantId = 1;
      name = "Pepperoni Pizza";
      description = "Tomato sauce, mozzarella, loaded with pepperoni";
      imageUrl = "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300";
      price = 1499; category = "Pizzas"; isAvailable = true;
    });
    menuItems.add({
      id = 3; restaurantId = 1;
      name = "Caesar Salad";
      description = "Romaine lettuce, croutons, parmesan, Caesar dressing";
      imageUrl = "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300";
      price = 899; category = "Salads"; isAvailable = true;
    });
    menuItems.add({
      id = 4; restaurantId = 1;
      name = "Tiramisu";
      description = "Classic Italian dessert with espresso and mascarpone";
      imageUrl = "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300";
      price = 699; category = "Desserts"; isAvailable = true;
    });

    // Menu items for Dragon Garden (restaurantId = 2)
    menuItems.add({
      id = 5; restaurantId = 2;
      name = "Kung Pao Chicken";
      description = "Spicy stir-fried chicken with peanuts and vegetables";
      imageUrl = "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=300";
      price = 1349; category = "Main Course"; isAvailable = true;
    });
    menuItems.add({
      id = 6; restaurantId = 2;
      name = "Dim Sum Basket";
      description = "Assorted steamed dumplings with pork, shrimp, and vegetable";
      imageUrl = "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300";
      price = 999; category = "Appetizers"; isAvailable = true;
    });
    menuItems.add({
      id = 7; restaurantId = 2;
      name = "Beef Noodle Soup";
      description = "Slow-braised beef with hand-pulled noodles in rich broth";
      imageUrl = "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=300";
      price = 1199; category = "Noodles"; isAvailable = true;
    });

    // Menu items for Burger Barn (restaurantId = 3)
    menuItems.add({
      id = 8; restaurantId = 3;
      name = "Classic Cheeseburger";
      description = "Beef patty, cheddar, lettuce, tomato, pickles, special sauce";
      imageUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300";
      price = 1099; category = "Burgers"; isAvailable = true;
    });
    menuItems.add({
      id = 9; restaurantId = 3;
      name = "BBQ Bacon Burger";
      description = "Double patty, crispy bacon, BBQ sauce, onion rings";
      imageUrl = "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300";
      price = 1399; category = "Burgers"; isAvailable = true;
    });
    menuItems.add({
      id = 10; restaurantId = 3;
      name = "Loaded Fries";
      description = "Crispy fries topped with cheese sauce, bacon bits, jalapenos";
      imageUrl = "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300";
      price = 699; category = "Sides"; isAvailable = true;
    });

    // Menu items for Sakura Sushi (restaurantId = 4)
    menuItems.add({
      id = 11; restaurantId = 4;
      name = "Salmon Nigiri 6pc";
      description = "Fresh Atlantic salmon on seasoned sushi rice";
      imageUrl = "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300";
      price = 1499; category = "Nigiri"; isAvailable = true;
    });
    menuItems.add({
      id = 12; restaurantId = 4;
      name = "Dragon Roll";
      description = "Shrimp tempura, cucumber, topped with avocado and eel sauce";
      imageUrl = "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300";
      price = 1699; category = "Rolls"; isAvailable = true;
    });
    menuItems.add({
      id = 13; restaurantId = 4;
      name = "Miso Soup";
      description = "Traditional dashi-based soup with tofu, wakame, and scallions";
      imageUrl = "https://images.unsplash.com/photo-1547592180-85f173990554?w=300";
      price = 399; category = "Soups"; isAvailable = true;
    });

    // Menu items for Spice Route (restaurantId = 5)
    menuItems.add({
      id = 14; restaurantId = 5;
      name = "Butter Chicken";
      description = "Tender chicken in rich tomato-cream sauce with aromatic spices";
      imageUrl = "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300";
      price = 1449; category = "Curries"; isAvailable = true;
    });
    menuItems.add({
      id = 15; restaurantId = 5;
      name = "Garlic Naan";
      description = "Freshly baked leavened bread brushed with garlic butter";
      imageUrl = "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300";
      price = 399; category = "Bread"; isAvailable = true;
    });
    menuItems.add({
      id = 16; restaurantId = 5;
      name = "Chicken Biryani";
      description = "Fragrant basmati rice cooked with spiced chicken and saffron";
      imageUrl = "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300";
      price = 1599; category = "Rice"; isAvailable = true;
    });

    (17, 17)
  };
};
