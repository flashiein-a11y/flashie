import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Types "../types/order";
import RestaurantTypes "../types/restaurant";
import Common "../types/common";

module {
  func nextId(orders : List.List<Types.Order>) : Nat {
    orders.foldLeft(0, func(maxId : Nat, o : Types.Order) : Nat {
      if (o.id > maxId) o.id else maxId
    }) + 1
  };

  public func placeOrder(
    orders : List.List<Types.Order>,
    restaurants : List.List<RestaurantTypes.Restaurant>,
    _menuItems : List.List<RestaurantTypes.MenuItem>,
    caller : Common.UserId,
    req : Types.PlaceOrderRequest,
    now : Common.Timestamp
  ) : Types.Order {
    let restaurant = switch (restaurants.find(func(r) { r.id == req.restaurantId })) {
      case (?r) r;
      case null Runtime.trap("Restaurant not found");
    };
    let subtotal = req.items.foldLeft(0 : Nat, func(acc : Nat, item : Types.CartItem) : Nat { acc + item.price * item.quantity });
    let order : Types.Order = {
      id = nextId(orders);
      userId = caller;
      restaurantId = req.restaurantId;
      restaurantName = restaurant.name;
      items = req.items;
      status = #confirmed;
      deliveryAddress = req.deliveryAddress;
      specialInstructions = req.specialInstructions;
      totalAmount = subtotal + restaurant.deliveryFee;
      deliveryFee = restaurant.deliveryFee;
      estimatedDeliveryMinutes = restaurant.estimatedDeliveryMinutes;
      createdAt = now;
      updatedAt = now;
    };
    orders.add(order);
    order
  };

  public func getOrder(
    orders : List.List<Types.Order>,
    caller : Common.UserId,
    orderId : Common.OrderId
  ) : ?Types.Order {
    orders.find(func(o) { o.id == orderId and o.userId == caller })
  };

  public func getUserOrders(
    orders : List.List<Types.Order>,
    caller : Common.UserId
  ) : [Types.Order] {
    orders.filter(func(o) { o.userId == caller }).toArray()
  };

  public func updateOrderStatus(
    orders : List.List<Types.Order>,
    orderId : Common.OrderId,
    newStatus : Types.OrderStatus,
    now : Common.Timestamp
  ) : Bool {
    var found = false;
    orders.mapInPlace(func(o) {
      if (o.id == orderId) {
        found := true;
        { o with status = newStatus; updatedAt = now }
      } else o
    });
    found
  };

  public func reorder(
    orders : List.List<Types.Order>,
    restaurants : List.List<RestaurantTypes.Restaurant>,
    menuItems : List.List<RestaurantTypes.MenuItem>,
    caller : Common.UserId,
    originalOrderId : Common.OrderId,
    deliveryAddress : Text,
    now : Common.Timestamp
  ) : ?Types.Order {
    switch (orders.find(func(o) { o.id == originalOrderId and o.userId == caller })) {
      case null null;
      case (?original) {
        let req : Types.PlaceOrderRequest = {
          restaurantId = original.restaurantId;
          items = original.items;
          deliveryAddress = deliveryAddress;
          specialInstructions = original.specialInstructions;
        };
        ?(placeOrder(orders, restaurants, menuItems, caller, req, now))
      };
    }
  };
};
