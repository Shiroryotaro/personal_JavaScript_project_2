import { Navigate } from "react-router-dom";

function ProtectRoutes({children}){
    const isAuthenticated = !!localStorage.getItem("token"); // Check if the token exists
    return isAuthenticated ? children : <Navigate to="/gamedev/register/login" />;
};

export default ProtectRoutes;