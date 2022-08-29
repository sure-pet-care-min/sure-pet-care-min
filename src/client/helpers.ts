import { Direction, Location, Movement, Pet } from "./types";

export const getLocationDisplay = (pet: Pet) => {
  switch (pet.position.where) {
    case Location.Inside:
      return "Inside";
    case Location.Outside:
      return "Outside";
    case Location.Unknown:
    default:
      return "Unknown";
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
