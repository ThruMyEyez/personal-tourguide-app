import React, { useState, useEffect, createContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { verify } from "../services/authentication";

const AuthContext = createContext();

const AuthProviderWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("AuthToken", token);
  };

  const removeToken = () => {
    localStorage.removeItem("AuthToken");
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("AuthToken");
    if (storedToken) {
      verify(storedToken)
        .then((response) => {
          //server verifies that JWT token is valid  ✅
          const user = response.data;
          console.log( user);
          setUser(user);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token) ❌
          setIsLoggedIn(false);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      // If token isn't available
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  // crap
  //useEffect(() => {
  //  const authToken = localStorage.getItem("AuthToken");
  //  verify(authToken).then((result) => {
  //    //* dont work here... const { decodedToken, isExpired } = useJwt(result)
  //    if ((result && new Date().getTime() < result.exp) || !result) {
  //      localStorage.setItem("AuthToken", "");
  //      //axios.defaults.headers.common["Authorization"] = "";
  //      setUser(null);
  //      setIsLoading(false);
  //    }
  //    if (result) {
  //      console.log(result && new Date().getTime() < result.exp);
  //      setUser(result);
  //      setIsLoggedIn(true);
  //      setIsLoading(false);
  //    }
  //  });
  //}, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
      <AuthContext.Provider
        value={{ isLoggedIn, isLoading, user, authenticateUser, storeToken, logOutUser }}
      >
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export { AuthContext, AuthProviderWrapper };
