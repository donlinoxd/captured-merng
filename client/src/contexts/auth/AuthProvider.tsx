import React, { createContext, useReducer } from "react";
import { AuthAction } from "./auth.action";
import authReducer, { TAuthState } from "./auth.reducer";
import { cookies } from "../../utils/cookie.util";
import jwtDecode from "jwt-decode";
import { LoginUserMutation } from "../../hooks/queryHooks";

export interface TAuthContextState {
  auth: TAuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<TAuthContextState>(null!);

interface AuthProviderProps {
  children: React.ReactNode;
}
const token = cookies.get("authorization")?.split(" ")[1] as string;

const initialState = {
  user: token ? jwtDecode<LoginUserMutation["loginUser"]>(token) : null,
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
