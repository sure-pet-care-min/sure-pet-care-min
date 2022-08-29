import { configureStore } from "@reduxjs/toolkit";
import { surePetCareApi } from "./api";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [surePetCareApi.reducerPath]: surePetCareApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(surePetCareApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
