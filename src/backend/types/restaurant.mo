import Common "common";

module {
  public type CuisineType = {
    #italian;
    #chinese;
    #japanese;
    #mexican;
    #indian;
    #american;
    #thai;
    #mediterranean;
    #fastFood;
    #other : Text;
  };

  public type Restaurant = {
    id : Common.RestaurantId;
    name : Text;
    imageUrl : Text;
    cuisineType : CuisineType;
    rating : Nat; // 0-50 representing 0.0-5.0 stars (multiply by 0.1 for display)
    deliveryFee : Nat; // in cents
    estimatedDeliveryMinutes : Nat;
    description : Text;
    isOpen : Bool;
  };

  public type MenuItem = {
    id : Common.MenuItemId;
    restaurantId : Common.RestaurantId;
    name : Text;
    description : Text;
    imageUrl : Text;
    price : Nat; // in cents
    category : Text;
    isAvailable : Bool;
  };
};
