import { AuthenticationError } from "apollo-server-core";
import { Request } from "express";
import { UserJWTPayload } from "./verifyUserAuthorization";

const hasUser = (req: Request) => {
  // @ts-ignore
  const user = req.user;

  if (!user) throw new AuthenticationError("Authentication required");

  return user as UserJWTPayload;
};

export default hasUser;
