import { useContext } from "react";
import { AuthContext } from "../context/authentication";

const Calender = () => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);

  return (
    <>
      <h2>Kalender</h2>
      <p>just a test</p>
      <p>{(isLoggedIn && `login: ${isLoggedIn}`) || `login: ${isLoggedIn}`}</p>
    </>
  );
};

export default Calender;