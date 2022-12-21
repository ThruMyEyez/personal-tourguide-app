import { Outlet, Navigate } from "react-router-dom";
import { isExpired } from "react-jwt";

const PrivRoutes = () => {
  const token = localStorage.getItem("AuthToken");
  return (token && !isExpired(token) && <Outlet />) || <Navigate to="/login" />;
};

export default PrivRoutes;
