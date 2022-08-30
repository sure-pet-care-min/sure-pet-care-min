import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { clearAuth } from "./authSlice";

export const authErrorMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      // If an API call is ever rejected, then the
      //  simplest solution is just to log out to
      //  force the user to refresh the token
      dispatch(clearAuth());
    }

    return next(action);
  };
