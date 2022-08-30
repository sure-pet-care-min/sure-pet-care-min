import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type AuthState = {
  token?: string;
  error?: boolean;
  deviceId: string;
};

const createInitialState = (): AuthState => ({
  token: undefined,
  deviceId: Math.random().toString().slice(2, 11).toString(), // Random 9 digit number
});

const authSlice = createSlice({
  name: "auth",
  initialState: createInitialState(),
  reducers: {
    setAuth: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      token: payload,
      error: undefined,
    }),
    setError: (state) => ({
      ...state,
      token: undefined,
      error: true,
    }),
    clearAuth: (state) => ({
      ...state,
      token: undefined,
      error: undefined,
    }),
  },
});

export const { setAuth, clearAuth, setError } = authSlice.actions;

export default authSlice.reducer;

export const selectDeviceId = (state: RootState) => state.auth.deviceId;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoggedIn = (state: RootState) => !!selectToken(state);
export const selectErrorLoggingIn = (state: RootState) => state.auth.error;
