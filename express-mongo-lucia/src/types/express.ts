import { Session, User } from "lucia";
import { IUser } from "../models/user.model";

declare global {
  namespace Express {
    interface Locals {
      user: User | null;
      session: Session | null;
      dbUser: IUser | null;
    }

    interface Response {
      respond: <T>({
        statusCode,
        data,
        message,
      }: {
        statusCode: number;
        data: T;
        message?: string;
      }) => void;
    }
  }
}
