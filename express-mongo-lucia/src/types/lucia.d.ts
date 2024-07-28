import { Lucia } from "lucia";

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
