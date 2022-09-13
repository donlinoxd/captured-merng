import { createToken } from "./../utils/jwt";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import Session from "../models/session.model";

export interface UserJWTPayload {
  username: string;
  email: string;
  name: string;
  sessionId: string;
}

const verifyUserAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies?.authorization?.split(" ")[1] as string;
    const refreshToken = req.cookies?.refresh?.split(" ")[1] as string;

    if (!accessToken) return next();

    const { payload, expired, valid } = await verifyToken<UserJWTPayload>(
      accessToken
    );

    if (!payload && !expired && !valid) {
      return next();
    }

    if (payload && !expired) {
      // @ts-ignore
      req.user = payload;
      return next();
    }

    if (expired && refreshToken) {
      const { payload, valid } = await verifyToken<{ sessionId: string }>(
        refreshToken
      );

      if (!valid || !payload) {
        res.cookie("authorization", "", {
          maxAge: 1,
        });
        res.cookie("refresh", "", {
          maxAge: 1,
        });
        return next();
      }

      const session = await Session.findById(payload.sessionId);
      if (session) {
        if (!session.valid) return next();

        const newAccessToken = createToken(
          {
            username: session.username,
            email: session.email,
            name: session.name,
            sessionId: session._id,
          },
          {
            expiresIn: "10m",
          }
        );

        const newRefreshToken = createToken(
          {
            sessionId: session._id,
          },
          {
            expiresIn: "1y",
          }
        );

        res.cookie("authorization", `Bearer ${newAccessToken}`, {
          maxAge: 60000 * 60 * 24 * 365,
        });
        res.cookie("refresh", `Bearer ${newRefreshToken}`, {
          maxAge: 60000 * 60 * 24 * 365,
        });

        // @ts-ignore
        req.user = {
          username: session.username,
          email: session.email,
          name: session.name,
          sessionId: session._id,
        };

        return next();
      }

      return next();
    }

    return next();
  } catch (error) {
    res.cookie("authorization", "", {
      maxAge: 1,
    });
    res.cookie("refresh", "", {
      maxAge: 1,
    });

    return next();
  }
};

export default verifyUserAuthorization;
