import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type AuthState = {
  token?: string;
};

const createInitialState = (): AuthState => ({
  token: undefined,
});

const authSlice = createSlice({
  name: "auth",
  initialState: createInitialState(),
  reducers: {
    setAuth: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    clearAuth: () => {
      return createInitialState();
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectedIsLoggedIn = (state: RootState) => !!selectToken(state);
