import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OnErrorAlert } from "../UI/Alerts";
import { login, loginGoogle } from "../../services/authentication";
import { AuthContext } from "../../context/authentication";
import GoogleAuth from "./GoogleAuth";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState({
    /*  name: "", */
    email: "",
    password: "",
    stayLoggedInFlag: false,
  });

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleInput = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login(formData)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/dashboard");
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
      });
  };

  const onGoogleLoginSuccess = (response) => {
    loginGoogle(response.credential).then((response) => {
      console.log(response.data.authToken);
      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/dashboard");
    });
  };

  return (
    <div className="fullscreen-modal-container">
      <div className="container mx-auto">
        <h1>Login</h1>

        <button onClick={() => navigate(-1)}>X close X</button>
        <GoogleAuth authSuccessCallback={onGoogleLoginSuccess} />

        <form onSubmit={handleFormSubmit}>
          <label htmlFor="login-email">Email:</label>
          <input
            id="login-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
          />

          <label htmlFor="login-password">Password:</label>
          <input
            id="login-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
          />
          <button>Login</button>
        </form>
        {errorMsg && <OnErrorAlert msg={errorMsg} />}

        <p>Don't have an account yet?</p>
        <Link to={"/signup"}>Sign Up</Link>
        <p>Do you forgot your Passwort?</p>
        <Link to={"/lost-password"} state={{ background: "/" }}>
          pw resetMail
        </Link>
      </div>
    </div>
  );
};

export default Login;
