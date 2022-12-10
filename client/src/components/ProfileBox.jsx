import { useState, useEffect } from "react";
//import api from "../services/api";
import { authRoute, headerAuthToken } from "../services/auth";
import { checkToken } from "../services/auth";

const ProfileBox = ({ authToken }) => {
  // const { id, name, email, iat, exp } = authToken.decodeToken;

  const [user, setUser] = useState({ ...authToken.decodeToken });

  useEffect(() => {
    checkToken().then(res => console.log("checkToken: ", res));
    authRoute().then(res => console.log(res));
    console.log("header: ", headerAuthToken);
  }, []);

  return (
    <div>
      <h2>ProfileBox</h2>
      <ul>
        <li>User _id: {user.id}</li>
        <li>User name: {user.name}</li>
        <li>User email: {user.email}</li>
        <li>expiration date of jwt AuthToken: {Date(1670632726)}</li>
      </ul>
    </div>
  );
};

export default ProfileBox;
