import React, { useState, useEffect, createContext } from "react";
import { useJwt } from "react-jwt";
import { verify } from "../services/authentication";
const AuthContext = createContext();

const AuthProviderWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // We need to add the logic to retrieve the user info from the server
  useEffect(() => {
    const authToken = localStorage.getItem("AuthToken");
    verify(authToken).then(result => {
      //* dont work here... const { decodedToken, isExpired } = useJwt(result)
      if ((result && new Date().getTime() < result.exp) || !result) {
        localStorage.setItem("AuthToken", "");
        //axios.defaults.headers.common["Authorization"] = "";
        setUser(null);
        setIsLoading(false);
      }
      if (result) {
        console.log(result && new Date().getTime() < result.exp);
        setUser(result);
        setIsLoggedIn(true);
        setIsLoading(false);
      }
    });
  }, []);

  return <AuthContext.Provider value={{ isLoggedIn, isLoading, user }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProviderWrapper };
