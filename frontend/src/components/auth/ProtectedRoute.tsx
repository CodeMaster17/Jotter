import { Navigate, Outlet } from "react-router-dom";


export const ProtectedRoute = () => {
    const isLoggedIn = window.localStorage.getItem("token");
    return isLoggedIn ? <>
        <Outlet /></> : <Navigate to="/login" />;
};