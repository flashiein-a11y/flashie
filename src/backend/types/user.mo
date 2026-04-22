import Common "common";

module {
  public type SavedAddress = {
    tag : Text; // e.g. "Home", "Work"
    address : Text;
  };

  public type UserProfile = {
    id : Common.UserId;
    savedAddresses : [SavedAddress];
    createdAt : Common.Timestamp;
  };
};
