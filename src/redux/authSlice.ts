import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type AuthState = {
  token?: string;
  error?: boolean;
};

const createInitialState = (): AuthState => ({
  token: undefined,
});

const authSlice = createSlice({
  name: "auth",
  initialState: createInitialState(),
  reducers: {
    setAuth: (_, { payload }: PayloadAction<string>) => ({
      token: payload,
    }),
    setError: () => ({
      error: true,
    }),
    clearAuth: () => {
      return createInitialState();
    },
  },
});

export const { setAuth, clearAuth, setError } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoggedIn = (state: RootState) => !!selectToken(state);
export const selectErrorLoggingIn = (state: RootState) => state.auth.error;
