import List "mo:core/List";
import RestaurantLib "../lib/restaurant";
import RestaurantTypes "../types/restaurant";
import Common "../types/common";

mixin (
  restaurants : List.List<RestaurantTypes.Restaurant>,
  menuItems : List.List<RestaurantTypes.MenuItem>
) {
  public query func listRestaurants() : async [RestaurantTypes.Restaurant] {
    RestaurantLib.listRestaurants(restaurants)
  };

  public query func searchRestaurants(
    nameQuery : Text,
    cuisineFilter : ?RestaurantTypes.CuisineType,
    minRating : ?Nat
  ) : async [RestaurantTypes.Restaurant] {
    RestaurantLib.searchRestaurants(restaurants, nameQuery, cuisineFilter, minRating)
  };

  public query func getRestaurant(id : Common.RestaurantId) : async ?RestaurantTypes.Restaurant {
    RestaurantLib.getRestaurant(restaurants, id)
  };

  public query func getMenuItems(restaurantId : Common.RestaurantId) : async [RestaurantTypes.MenuItem] {
    RestaurantLib.getMenuItems(menuItems, restaurantId)
  };

  public query func getMenuItem(id : Common.MenuItemId) : async ?RestaurantTypes.MenuItem {
    RestaurantLib.getMenuItem(menuItems, id)
  };
};
