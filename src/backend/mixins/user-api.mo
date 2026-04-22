import Map "mo:core/Map";
import Time "mo:core/Time";
import UserLib "../lib/user";
import UserTypes "../types/user";
import Common "../types/common";

mixin (
  profiles : Map.Map<Common.UserId, UserTypes.UserProfile>
) {
  public shared query ({ caller }) func getMyProfile() : async UserTypes.UserProfile {
    switch (profiles.get(caller)) {
      case (?p) p;
      case null {
        { id = caller; savedAddresses = []; createdAt = 0 }
      };
    }
  };

  public shared ({ caller }) func saveAddress(address : UserTypes.SavedAddress) : async () {
    let now = Time.now();
    UserLib.saveAddress(profiles, caller, address, now)
  };

  public shared ({ caller }) func removeAddress(addressTag : Text) : async () {
    UserLib.removeAddress(profiles, caller, addressTag)
  };
};
