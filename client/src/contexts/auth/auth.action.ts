import { LoginUserMutation } from "./../../hooks/queryHooks";

interface SetUserAction {
  type: typeof SET_USER;
  payload: LoginUserMutation["loginUser"];
}

interface RemoveUserAction {
  type: typeof REMOVE_USER;
}

export type AuthAction = SetUserAction | RemoveUserAction;

export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

export const setUser = (
  payload: LoginUserMutation["loginUser"]
): AuthAction => {
  return {
    type: "SET_USER",
    payload,
  };
};

export const removeUser = (): AuthAction => {
  return {
    type: "REMOVE_USER",
  };
};
