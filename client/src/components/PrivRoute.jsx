//import { useEffect, useState } from "react";
//import { Navigate } from "react-router-dom";
//import { checkToken } from "../services/auth";
//import { isExpired, decodeToken } from "react-jwt";
//
//const PrivRoute = ({ component, ...rest }) => {
//  const [redirect, setRedirect] = useState(true);
//
//  const token = localStorage.getItem("AuthToken");
//  const auth = {
//    decodeToken: decodeToken(token),
//    isTokenExpired: isExpired(token),
//  };
//
//  useEffect(() => {
//    checkToken().then(res => {
//      console.log("res: ", res);
//      if (res.type === "success") {
//        console.log("RES 200");
//        console.log({ ...rest });
//        setRedirect(false);
//      }
//    });
//    console.log("redirect state: ", redirect);
//  }, []);
//
//  return (
//    (redirect && (
//      <div>
//        <Navigate to="/signup" />
//      </div>
//    )) || <div>PrivPage</div>
//  );
//};
//
//export default PrivRoute;
///*<Route path="/secret" component={withAuth(Secret)} />  {redirect && <Redirect to="/signup" />} */
//
import { Outlet, Navigate } from "react-router-dom";
//import { checkToken } from "../services/auth";
import { isExpired } from "react-jwt";

const PrivRoutes = () => {
  const token = localStorage.getItem("AuthToken");
  console.log("expired", isExpired(token));
  return token && !isExpired(token) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivRoutes;
