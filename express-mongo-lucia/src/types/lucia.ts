import { lucia } from "../configs/lucia.config";

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
  }

  interface DatabaseSessionAttributes {
    ip: string | undefined;
    ip_info: IPInfo | undefined;
    device_info: IDeviceInfo;
    created_at: Date;
    updated_at: Date;
  }
}

export interface IDeviceInfo {
  ua: string | undefined;
  browser: {
    name: string | undefined;
    version: string | undefined;
    major: string | undefined;
  };
  os: {
    name: string | undefined;
    version: string | undefined;
  };
  device: {
    model: string | undefined;
    type: string | undefined;
    vendor: string | undefined;
  };
}

export interface IPInfo {
  ip: string;
  network?: string;
  version?: string;
  city?: string;
  region?: string;
  region_code?: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3?: string;
  country_capital?: string;
  country_tld?: string;
  continent_code?: string;
  in_eu?: boolean;
  postal?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  utc_offset?: string;
  country_calling_code?: string;
  currency?: string;
  currency_name?: string;
  languages?: string;
  country_area?: number;
  country_population?: number;
  asn?: string;
  org?: string;
}
