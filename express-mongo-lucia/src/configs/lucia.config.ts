import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Lucia } from "lucia";
import mongoose from "mongoose";
import { env } from "../utils/env.util";

export const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);

export const lucia = new Lucia(adapter, {
  // sessionExpiresIn: new TimeSpan(30, "d"),
  getSessionAttributes: (attributes) => {
    return {
      ip: attributes.ip,
      ipInfo: attributes.ip_info,
      deviceInfo: attributes.device_info,
      createdAt: attributes.created_at,
      updatedAt: attributes.updated_at,
    };
  },
  sessionCookie: {
    attributes: {
      secure: env.NODE_ENV === "production",
      domain: "localhost",
    },
  },
});
