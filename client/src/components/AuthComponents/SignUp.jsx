import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authentication";
import { signup, signupGoogle } from "../../services/authentication";
import { HorizontalTextRuler, FormHelper } from "../UI/UIHelper";
import GoogleAuth from "./GoogleAuth";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleInput = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    signup(formData)
      .then((response) => {
        //If success >> provide user a token on the registration and navigate to Mainpage
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const onGoogleSignupSuccess = (response) => {
    signupGoogle(response.credential).then((response) => {
      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/");
    });
  };

  return (
    <div className="fullscreen-modal-container">
      <div className="absolute mx-auto space-y-4 transform -translate-x-1/2 -translate-y-1/2 sm:max-w-sm top-1/2 left-1/2">
        <h6 className="text-sm font-bold text-blueGray-500">Sign up with</h6>

        <button onClick={() => navigate(-1)}>X</button>
        <GoogleAuth authSuccessCallback={onGoogleSignupSuccess} />

        <HorizontalTextRuler str="OR" />

        <form onSubmit={handleFormSubmit}>
          <label className="block" htmlFor="input-name">
            <span className="form-label">Username</span>
          </label>
          <input
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="input-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInput}
          />
          <FormHelper str={"Username should not be registered"} />
          <label className="block" htmlFor="input-email">
            <span className="form-label">Email address</span>
          </label>
          <input
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="input-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            We’ll never share your details. Read our{" "}
            <Link
              to="/"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <label htmlFor="input-password">
            <span className="form-label">Password</span>
          </label>
          <input
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="input-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
          />
          <FormHelper
            str={
              "With 6 characters and at least one number, one lowercase and one uppercase letter."
            }
          />

          <button>Sign Up</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
