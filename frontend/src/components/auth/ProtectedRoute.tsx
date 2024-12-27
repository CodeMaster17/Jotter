import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

interface IProtectedRoute {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};