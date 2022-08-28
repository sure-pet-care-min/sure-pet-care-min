type EntityBase = {
  id: number;
  version: string;
  created_at: string;
  updated_at: string;
};

export type User = {
  email_address: string;
  first_name: string;
  last_name: string;
  country_id: number;
  language_id: number;
  photo_id: number;
  marketing_opt_in: boolean;
  terms_accepted: string;
  weight_units: number;
  time_format: number;
  notifiations: {
    device_status: boolean;
    animal_movement: boolean;
    intruder_movements: boolean;
    new_device_pet: boolean;
    household_management: boolean;
    photos: boolean;
    low_battery: boolean;
    curfew: boolean;
    feeding_activity: boolean;
    drinking_activity: boolean;
    feeding_topup: boolean;
    drinking_topup: boolean;
  };
};

type DeviceBase = EntityBase & {
  product_id: number;
  household_id: number;
  name: string;
  serial_number: string;
  mac_address: string;
  parent_device_id?: number;
  index?: number;
};

export type HouseDevice = DeviceBase & {
  product_id: 1;
  control: {
    led_mode: number;
    pairing_mode: number;
  };
  status: {
    led_mode: number;
    pairing_mode: number;
    version: {
      device: {
        hardware: number;
        firmware: number;
      };
    };
    online: boolean;
  };
};

export type CatFlapDevice = DeviceBase & {
  product_id: 6;
  control: {
    curfew: { enabled: boolean; lock_time: string; unlock_time: string }[];
    locking: number;
    fast_polling: boolean;
  };
  parent: DeviceBase;
  status: {
    locking: {
      mode: number;
    };
    version: {
      device: {
        hardware: number;
        firmware: number;
      };
    };
    battery: number;
    learn_mode: unknown;
    online: boolean;
    signal: {
      device_rssi: number;
      hub_rssi: number;
    };
  };
  tags: (EntityBase & {
    index: number;
  })[];
};

export type Photo = EntityBase & {
  location: string;
  uploading_user_id: string;
};

export type BasicUserInfo = EntityBase & {
  name: string;
  photo_id: number;
  photo: Photo;
};

type HouseholdUser = EntityBase & {
  owner: boolean;
  write: boolean;
  user: BasicUserInfo;
};

export type HouseholdBase = EntityBase & {
  name: string;
  created_user_id: number;
  share_code: string;
  timezone_id: number;
};

export type Household = HouseholdBase & {
  invites: (EntityBase & {
    code: string;
    email_address: string;
    creator_user_id: string;
    acceptor_user_id: string;
    owner: boolean;
    write: boolean;
    status: number;
    user: {
      acceptor: BasicUserInfo;
      creator: BasicUserInfo;
    };
  })[];
  users: HouseholdUser[];
};

export enum Gender {
  Female = 0,
  Male = 1,
}

export enum Location {
  Unknown = 0,
  Inside = 1,
  Outside = 1,
}

export type PetPosition = {
  tag_id: number;
  device_ide: number;
  where: Location;
  since: string;
};

export type PetBase = EntityBase & {
  name: string;
  gender: Gender;
  date_of_birth: string;
  weight: string;
  comments: string;
  household_id: number;
  spayed: number;
  breed_id: number;
  food_type_id: number;
  photo_id: number;
  species_id: number;
  tag_id: number;
};

export type Pet = PetBase & {
  conditions: EntityBase[];
  photo: Photo;
  position: PetPosition;
  status: {
    activity: PetPosition;
  };
};

export type Tag = EntityBase & {
  tag: string;
  supported_product_ids: number[];
};

export enum Direction {
  Looked = 0,
  In = 1,
  Out = 2,
}

export type Movement = EntityBase & {
  tag_id: number;
  user_id: number;
  time: string;
  direction: Direction;
  type: number;
};

export type TimelineEntry = EntityBase & {
  type: number;
  data: string;
  households: HouseholdBase[];
  movements: Movement[];
  users?: BasicUserInfo[];
  devices?: DeviceBase[];
  pets: PetBase[];
  tags: Tag[];
};
