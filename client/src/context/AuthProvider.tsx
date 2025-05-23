import { createContext, useState } from "react";

type AuthType = {
  id: string;
  email: string;
  fullName: string;
  accessToken: string;
};

export type AuthProviderType = {
  auth: AuthType;
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
  persist: boolean;
  setPersist: React.Dispatch<boolean>;
};

const AuthContext = createContext<AuthProviderType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({
    id: "",
    email: "",
    fullName: "",
    accessToken: "",
  });
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem("persist") || "false")
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
