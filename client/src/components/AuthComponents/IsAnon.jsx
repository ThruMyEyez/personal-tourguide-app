import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authentication";

const IsAnon = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    // If the user is not logged in, allow to see the page ✅
    return children;
  }
};

export default IsAnon;
