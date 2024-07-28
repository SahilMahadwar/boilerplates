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
  sessionCookie: {
    attributes: {
      secure: env.NODE_ENV === "production",
      domain: "localhost",
    },
  },
});
