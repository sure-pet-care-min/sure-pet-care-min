import {
  GeneralInfoResponse,
  LoginResponse,
  TimelineResponse,
} from "./query-types";

const apiUrl = "https://app.api.surehub.io/api";

const contentHeaders = () => ({ "Content-Type": "application/json" });
const authHeaders = (token: string) => ({
  ...contentHeaders(),
  Authorization: `Bearer ${token}`,
});
const url = (endpoint: string) => `${apiUrl}/${endpoint}`;
const authEndpoint = "auth/login";
const infoEndpoint = "me/start";
const timelineEndpoint = "timeline";

export const authenticate = async (
  email_address: string,
  password: string,
  device_id: string
) => {
  const result = await fetch(url(authEndpoint), {
    method: "POST",
    body: JSON.stringify({
      email_address,
      password,
      device_id,
    }),
    headers: contentHeaders(),
  });

  const response: LoginResponse = await result.json();
  return response;
};

export const getInfo = async (token: string) => {
  const result = await fetch(url(infoEndpoint), {
    headers: authHeaders(token),
  });

  const response: GeneralInfoResponse = await result.json();
  return response;
};

export const getTimeline = async (token: string) => {
  const result = await fetch(url(timelineEndpoint), {
    headers: authHeaders(token),
  });

  const response: TimelineResponse = await result.json();
  return response;
};
