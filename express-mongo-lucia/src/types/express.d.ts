import { Locals, Request, Response } from "express";

declare global {
  namespace Express {
    interface Locals {
      user: User | null;
      session: Session | null;
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
