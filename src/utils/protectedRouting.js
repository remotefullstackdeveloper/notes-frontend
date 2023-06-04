import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Layout } from "../components";

export function RequireAuth({ children }) {
    let token = useSelector(state=>state.auth.token);
    let location = useLocation();
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <><Layout/>{children}</>;
}