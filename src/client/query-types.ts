import {
  CatFlapDevice,
  HouseDevice,
  Household,
  Pet,
  Photo,
  Tag,
  TimelineEntry,
  User,
} from "./types";

export type LoginResponse = {
  data?: {
    user: User;
    token: string;
  };
  error?: {
    email_address?: string[];
    login?: string[];
  };
};

export type InfoResponse<TInfo> = {
  data?: TInfo;
  error?: {
    message: string[];
  };
};

export type GeneralInfoResponse = InfoResponse<{
  devices: (HouseDevice | CatFlapDevice)[];
  households: Household[];
  pets: Pet[];
  photos: Photo[];
  tags: Tag[];
  user: User;
}>;

export type TimelineResponse = InfoResponse<TimelineEntry[]>;
