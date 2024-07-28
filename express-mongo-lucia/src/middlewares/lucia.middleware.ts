import { NextFunction, Request, Response } from "express";
import { lucia } from "../configs/lucia.config";
import { User } from "../models/user.model";

export const luciaSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
  if (!sessionId) {
    res.locals.user = null;
    res.locals.session = null;
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (session && session.fresh) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
  }

  if (!session) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize()
    );
  }

  res.locals.user = user;
  res.locals.session = session;

  if (user?.id) {
    const fetchUser = await User.findById(user.id);
    res.locals.user = fetchUser;
  }

  return next();
};
