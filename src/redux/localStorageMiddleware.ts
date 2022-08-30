import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "./store";

const authItemId = "sure-pet-care-min/auth";

export const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    const authState = (getState() as RootState)?.auth;

    if (authState) {
      localStorage.setItem(authItemId, JSON.stringify(authState));
    } else {
      localStorage.removeItem(authItemId);
    }

    return result;
  };
};

export const rehydrateStoreFromLocalStorage = () => {
  const authState = localStorage.getItem(authItemId);
  if (authState !== null) {
    return { auth: JSON.parse(authState) };
  }
};
