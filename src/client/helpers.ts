import { Location, Pet } from "./types";

export const getLocationDisplay = (pet: Pet) => {
  switch (pet.position.where) {
    case Location.Unknown:
      return "Unknown?";
    case Location.Inside:
      return "Inside";
    case Location.Outside:
      return "Outside";
  }
};
