import { createContext } from "react";

export interface IAuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<IAuthContextType | null>(null);


