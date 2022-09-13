import { LoginUserMutation } from "./../../hooks/queryHooks";
import { SET_USER, REMOVE_USER, AuthAction } from "./auth.action";

export interface TAuthState {
  user: LoginUserMutation["loginUser"] | null;
}

const authReducer = (state: TAuthState, action: AuthAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case REMOVE_USER:
      return {
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
