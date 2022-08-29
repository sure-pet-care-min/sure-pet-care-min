import { Location, Pet } from "./types";

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
