import { Outlet, Navigate } from "react-router-dom";
import { isExpired } from "react-jwt";

/* This file is redundant,
   For Curiosity: This is how to use it to protect a Route.
    
    <Route element={<PrivRoutes />}>
      <Route path="/dashboard" element={<Dashboard />} exact />
    </Route>
*/
const PrivRoutes = () => {
  const token = localStorage.getItem("AuthToken");
  return (token && !isExpired(token) && <Outlet />) || <Navigate to="/login" />;
};

export default PrivRoutes;
