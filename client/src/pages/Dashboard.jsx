import { useEffect, useContext } from "react";

import ProfileBox from "../components/ProfileBox";
import { LoginContext } from "../context/Context";

const Dashboard = props => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  /* const decodedToken = decodeToken(token);
  const isTokenExpired = isExpired(token); */

  return (
    <div>
      <h2>Dashboard</h2>
      __________
      {/* <ProfileBox /> */}
    </div>
  );
};

export default Dashboard;
