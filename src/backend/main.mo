import List "mo:core/List";
import Map "mo:core/Map";
import RestaurantLib "lib/restaurant";
import RestaurantTypes "types/restaurant";
import OrderTypes "types/order";
import UserTypes "types/user";
import Common "types/common";
import RestaurantApi "mixins/restaurant-api";
import OrderApi "mixins/order-api";
import UserApi "mixins/user-api";

actor {
  let restaurants = List.empty<RestaurantTypes.Restaurant>();
  let menuItems = List.empty<RestaurantTypes.MenuItem>();
  let orders = List.empty<OrderTypes.Order>();
  let profiles = Map.empty<Common.UserId, UserTypes.UserProfile>();

  // Seed sample data on initialization
  ignore RestaurantLib.seedSampleData(restaurants, menuItems, 1, 1);

  include RestaurantApi(restaurants, menuItems);
  include OrderApi(orders, restaurants, menuItems);
  include UserApi(profiles);
};
