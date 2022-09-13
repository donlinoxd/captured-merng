import { AuthenticationError } from "apollo-server-core";
import Session from "../models/session.model";
import User from "../models/user.model";

export const authenticateUser = async (username: string, password: string) => {
  try {
    const user = await User.findOne({ username });

    if (!user) throw new AuthenticationError("Invalid username or password");

    const isValid = await user.validatePassword(password);
    if (!isValid) throw new AuthenticationError("Invalid username or password");

    return user;
  } catch (error) {
    throw error;
  }
};

export const createSession = async ({
  username,
  email,
  name,
}: {
  username: string;
  email: string;
  name: string;
}) => {
  try {
    const session = new Session({
      username,
      email,
      name,
      valid: true,
    });

    return await session.save();
  } catch (error) {
    throw error;
  }
};
