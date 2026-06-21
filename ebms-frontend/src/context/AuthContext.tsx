import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children
}: {
  children: ReactNode;
}) => {

  const [token, setToken] =
    useState<string | null>(
      localStorage.getItem("token")
    );

  const login = (jwt: string) => {

    localStorage.setItem(
      "token",
      jwt
    );

    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};