import List "mo:core/List";
import Time "mo:core/Time";
import OrderLib "../lib/order";
import OrderTypes "../types/order";
import RestaurantTypes "../types/restaurant";
import Common "../types/common";

mixin (
  orders : List.List<OrderTypes.Order>,
  restaurants : List.List<RestaurantTypes.Restaurant>,
  menuItems : List.List<RestaurantTypes.MenuItem>
) {
  public shared ({ caller }) func placeOrder(req : OrderTypes.PlaceOrderRequest) : async OrderTypes.Order {
    let now = Time.now();
    OrderLib.placeOrder(orders, restaurants, menuItems, caller, req, now)
  };

  public shared query ({ caller }) func getOrder(orderId : Common.OrderId) : async ?OrderTypes.Order {
    OrderLib.getOrder(orders, caller, orderId)
  };

  public shared query ({ caller }) func getUserOrders() : async [OrderTypes.Order] {
    OrderLib.getUserOrders(orders, caller)
  };

  public shared ({ caller }) func reorder(
    originalOrderId : Common.OrderId,
    deliveryAddress : Text
  ) : async ?OrderTypes.Order {
    let now = Time.now();
    OrderLib.reorder(orders, restaurants, menuItems, caller, originalOrderId, deliveryAddress, now)
  };
};
