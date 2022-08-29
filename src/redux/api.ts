import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GeneralInfoResponse,
  LoginResponse,
  TimelineResponse,
} from "../client/query-types";
import { RootState } from "./store";

export const surePetCareApi = createApi({
  reducerPath: "surePetCareApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.api.surehub.io/api",
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponse,
      { email_address: string; password: string; device_id: string }
    >({
      query: (args) => ({
        url: "/auth/login",
        method: "POST",
        body: JSON.stringify(args),
      }),
    }),
    info: builder.query<GeneralInfoResponse, void>({
      query: () => "/me/start",
    }),
    timeline: builder.query<TimelineResponse, void>({
      query: () => "/timeline",
    }),
  }),
});

export const { useLoginMutation, useInfoQuery, useTimelineQuery } =
  surePetCareApi;
