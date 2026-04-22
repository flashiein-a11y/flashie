import Common "common";

module {
  public type OrderStatus = {
    #confirmed;
    #preparing;
    #onTheWay;
    #delivered;
    #cancelled;
  };

  public type CartItem = {
    menuItemId : Common.MenuItemId;
    restaurantId : Common.RestaurantId;
    name : Text;
    price : Nat; // in cents
    quantity : Nat;
  };

  public type PlaceOrderRequest = {
    restaurantId : Common.RestaurantId;
    items : [CartItem];
    deliveryAddress : Text;
    specialInstructions : Text;
  };

  public type Order = {
    id : Common.OrderId;
    userId : Common.UserId;
    restaurantId : Common.RestaurantId;
    restaurantName : Text;
    items : [CartItem];
    status : OrderStatus;
    deliveryAddress : Text;
    specialInstructions : Text;
    totalAmount : Nat; // in cents
    deliveryFee : Nat; // in cents
    estimatedDeliveryMinutes : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
