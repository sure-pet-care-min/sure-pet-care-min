import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { surePetCareApi } from "../client/api";
import authReducer from "./authSlice";
import {
  localStorageMiddleware,
  rehydrateStoreFromLocalStorage,
} from "./localStorageMiddleware";

export const store = configureStore({
  reducer: {
    [surePetCareApi.reducerPath]: surePetCareApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(surePetCareApi.middleware)
      .concat(localStorageMiddleware),
  preloadedState: rehydrateStoreFromLocalStorage(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
