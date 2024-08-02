import { NextFunction, Request, Response } from "express";
import { lucia } from "../configs/lucia.config";
import { Session } from "../models/session.model";
import { User } from "../models/user.model";
import { getIp, getIpData } from "../utils/ip-util";

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

  const ip = getIp(req);

  let { session, user } = await lucia.validateSession(sessionId);

  if (session && ip !== session.ip) {
    const ipInfo = await getIpData({ ip: ip });

    await Session.findByIdAndUpdate(
      { _id: sessionId },
      {
        ip: ip ? ip : null,
        ip_info: ipInfo ? ipInfo : null,
      }
    );

    session.ip = ip;
    session.ipInfo = ipInfo;
  }

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
    res.locals.dbUser = fetchUser;
  }

  await Session.findByIdAndUpdate(
    { _id: sessionId },
    {
      updated_at: new Date(),
    }
  );

  return next();
};
