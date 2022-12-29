import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OnErrorAlert } from "../UI/Alerts";
import { login, loginGoogle } from "../../services/authentication";
import { HorizontalTextRuler, FormHelper } from "../UI/UIHelper";
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
      <div className="absolute mx-auto space-y-4 transform -translate-x-1/2 -translate-y-1/2 sm:max-w-sm top-1/2 left-1/2">
        <h1>Login</h1>

        <button onClick={() => navigate(-1)}>X</button>
        <GoogleAuth authSuccessCallback={onGoogleLoginSuccess} />

        <HorizontalTextRuler str="OR" />

        <form onSubmit={handleFormSubmit}>
          <label className="block" htmlFor="login-email">
            <span className="form-label">Email address</span>
          </label>
          <input
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="login-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
          />
          <FormHelper str={"Enter your registered email to proceed"} />
          <label className="block" htmlFor="login-password">
            <span className="form-label">Password</span>
          </label>
          <input
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="login-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
          />
          <FormHelper str={"Enter your password to proceed"} />
          <div className="flex justify-between">
            <button>Login</button>
            <Link
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              to={"/lost-password"}
              state={{ background: "/" }}
            >
              forgot password
            </Link>
          </div>
        </form>
        {errorMsg && <OnErrorAlert msg={errorMsg} />}

        <p>Don't have an account yet?</p>
        <Link to={"/signup"}>Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
