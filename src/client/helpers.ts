import {
  CatFlapDevice,
  Direction,
  Location,
  LockedStatus,
  Movement,
  Pet,
} from "./types";

export const isInside = (pet: Pet) => pet.position.where === Location.Inside;

export const getLocationDisplay = (pet: Pet) => {
  switch (pet.position.where) {
    case Location.Inside:
      return "inside";
    case Location.Outside:
      return "outside";
    case Location.Unknown:
    default:
      return "unknown";
  }
};

export const getDirectionDisplay = (movement: Movement) => {
  switch (movement.direction) {
    case Direction.In:
      return "came in";
    case Direction.Out:
      return "went out";
    case Direction.Looked:
      return "looked through the cat flap";
    default:
      return "unknown";
  }
};

export const getLockedDisplay = (catFlap: CatFlapDevice) => {
  switch (catFlap.status.locking.mode) {
    case LockedStatus.Locked:
      return "locked";
    case LockedStatus.Unlocked:
      return "unlocked";
    default:
      return "unknown";
  }
};

export const getNextLockOrUnlockTime = (catFlap: CatFlapDevice) => {
  switch (catFlap.status.locking.mode) {
    case LockedStatus.Locked:
      return catFlap.control.curfew[0].unlock_time;
    case LockedStatus.Unlocked:
      return catFlap.control.curfew[0].lock_time;
    default:
      return "unknown";
  }
};
