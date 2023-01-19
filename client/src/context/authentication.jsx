import React, { useState, useEffect, createContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { verify } from "../services/authentication";
import { getFullOwnUserDetails, getOwnUserPurchases } from "../services/user";

const AuthContext = createContext();

const AuthProviderWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userFullDetails, setUserFullDetails] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("AuthToken"));

  const storeToken = (token) => {
    console.log("Set AuthToken");
    localStorage.setItem("AuthToken", token);
    setToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem("AuthToken");
    setToken(null);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("AuthToken");
    if (storedToken) {
      verify(storedToken)
        .then((response) => {
          //server verifies that JWT token is valid  ✅
          console.log("Verify", response.data);
          const user = response.data;
          setUser(user);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token) ❌
          setIsLoggedIn(false);
          setUser(null);
          setIsLoading(false);
          setUserFullDetails(null);
        });
    } else {
      // If token isn't available
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
      setUserFullDetails(null);
    }
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
    getUserDetails();
  };

  const getUserDetails = () => {
    const storedToken = localStorage.getItem("AuthToken");
    console.log("Store Token", storedToken);
    if (!storedToken) {
    }
    console.log("Tryto get user details");

    getFullOwnUserDetails()
      .then((userDetails) => {
        setUserFullDetails(userDetails.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  useEffect(() => {
    getUserDetails();
  }, [user, token]);

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
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
    >
      <AuthContext.Provider
        value={{
          isLoggedIn,
          isLoading,
          user,
          authenticateUser,
          storeToken,
          logOutUser,
          userFullDetails,
          getUserDetails,
        }}
      >
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export { AuthContext, AuthProviderWrapper };
