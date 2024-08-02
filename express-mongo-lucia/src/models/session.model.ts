import mongoose, { Schema } from "mongoose";

export interface ISession extends Document {
  _id: string;
  user_id: string;
  ip: string;
  expires_at: Date;
  updated_at: Date;
  created_at: Date;
}

const IPInfoSchema: Schema = new Schema(
  {
    ip: String,
    network: String,
    version: String,
    city: String,
    region: String,
    region_code: String,
    country: String,
    country_name: String,
    country_code: String,
    country_code_iso3: String,
    country_capital: String,
    country_tld: String,
    continent_code: String,
    in_eu: Boolean,
    postal: String,
    latitude: Number,
    longitude: Number,
    timezone: String,
    utc_offset: String,
    country_calling_code: String,
    currency: String,
    currency_name: String,
    languages: String,
    country_area: Number,
    country_population: Number,
    asn: String,
    org: String,
  },
  {
    _id: false,
  }
);

const DeviceInfoSchema: Schema = new Schema(
  {
    ua: String,
    browser: {
      name: String,
      version: String,
      major: String,
    },
    os: {
      name: String,
      version: String,
    },
    device: {
      model: String,
      type: String,
      vendor: String,
    },
  },
  {
    _id: false,
  }
);

const SessionSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    user_id: {
      type: String,
      required: true,
    },

    ip: {
      type: String,
      required: true,
    },

    ip_info: {
      type: IPInfoSchema,
      required: false,
    },

    device_info: {
      type: DeviceInfoSchema,
      required: false,
    },

    expires_at: {
      type: Date,
      required: true,
    },

    created_at: {
      type: Date,
      required: true,
    },

    updated_at: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

export const Session = mongoose.model<ISession>("Session", SessionSchema);
