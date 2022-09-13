import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  return {
    auth: context!.auth,
    dispatch: context!.dispatch,
  };
};
