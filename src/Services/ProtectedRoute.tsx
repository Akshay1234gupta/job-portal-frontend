import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const token = useSelector((state: any) => state.jwt);
    const navigate = useNavigate();

    if (!token) {
        return <Navigate to="/login" />;
    }
    // const decoded: any = jwtDecode(token);
    // console.log("decoded", decoded);  // Log the entire decoded token


    // if (allowedRoles && !allowedRoles.includes(decoded.accountType)) {
    //     return <Navigate to="/unauthorized" />;
    // }

    try {
        const decoded: any = jwtDecode(token);
        console.log("Decoded token:", decoded);

        if (allowedRoles && !allowedRoles.includes(decoded.accountType)) {
            return <Navigate to="/unauthorized" replace />;
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/login", { replace: true }); // Redirect to login
    }
    return children;
};

export default ProtectedRoute;
