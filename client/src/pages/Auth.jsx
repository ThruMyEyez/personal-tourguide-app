import SignUp from "../components/SignUp";
import Login from "../components/Login";

const Auth = () => {
  return (
    <div>
      <h2>Auth Page</h2>
      <SignUp />
      <hr />
      <h2>make the auth page to a conditional signup / login Modal </h2>
      <hr />
      <Login />
    </div>
  );
};

export default Auth;
