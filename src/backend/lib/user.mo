import Map "mo:core/Map";
import Types "../types/user";
import Common "../types/common";

module {
  public func getOrCreateProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Common.UserId,
    now : Common.Timestamp
  ) : Types.UserProfile {
    switch (profiles.get(caller)) {
      case (?p) p;
      case null {
        let newProfile : Types.UserProfile = {
          id = caller;
          savedAddresses = [];
          createdAt = now;
        };
        profiles.add(caller, newProfile);
        newProfile
      };
    }
  };

  public func saveAddress(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Common.UserId,
    address : Types.SavedAddress,
    now : Common.Timestamp
  ) : () {
    let profile = getOrCreateProfile(profiles, caller, now);
    // Replace existing address with same tag, or append new one
    let existing = profile.savedAddresses.filter(func(a) { a.tag != address.tag });
    let updated : Types.UserProfile = {
      profile with
      savedAddresses = existing.concat([address]);
    };
    profiles.add(caller, updated);
  };

  public func removeAddress(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Common.UserId,
    addressTag : Text
  ) : () {
    switch (profiles.get(caller)) {
      case null ();
      case (?profile) {
        let updated : Types.UserProfile = {
          profile with
          savedAddresses = profile.savedAddresses.filter(func(a) { a.tag != addressTag });
        };
        profiles.add(caller, updated);
      };
    }
  };
};
