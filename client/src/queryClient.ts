import { QueryClient } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { cookies } from "./utils/cookie.util";

const accessToken = cookies.get("authorization") as string;

export const queryClient = new QueryClient();
export const reqClient = new GraphQLClient("/graphql", {
  headers: {
    authorization: accessToken ?? "",
  },
  credentials: "include",
});
