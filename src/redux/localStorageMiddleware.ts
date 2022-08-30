import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "./store";

const authItemId = "sure-pet-care-min/auth";

export const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    const token = (getState() as RootState)?.auth.token;

    if (token) {
      localStorage.setItem(authItemId, token);
    } else {
      localStorage.removeItem(authItemId);
    }

    return result;
  };
};

export const rehydrateStoreFromLocalStorage = () => {
  const token = localStorage.getItem(authItemId);
  if (token !== null) {
    return { auth: { token } };
  }
};
