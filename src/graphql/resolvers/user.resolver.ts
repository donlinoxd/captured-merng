import { errorHandler } from "./../../utils/errorHandler";
import { Resolvers } from "../../types/resolvers.type";

const User: Resolvers["User"] = {
  following: async ({ username }, _, { User }) => {
    try {
      const users = await (
        await User.find({ followers: username })
      ).map((user) => user.username);

      return users;
    } catch (error) {
      throw errorHandler(error);
    }
  },
  updatedAt: ({ updatedAt }) => updatedAt.toLocaleString(),
  createdAt: ({ updatedAt }) => updatedAt.toLocaleString(),
};

export default User;
