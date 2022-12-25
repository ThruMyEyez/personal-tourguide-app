import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authentication";
import { signup } from "../../services/authentication";

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

  return (
    <div className="fullscreen-modal-container">
      <div className="container mx-auto">
        <h6 className="text-blueGray-500 text-sm font-bold">Sign up with</h6>

        <button onClick={() => navigate(-1)}>X</button>
        <div className="text-center">
          <button
            className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
            type="button"
          >
            <img
              alt="Google Icon"
              className="w-5 mr-1"
              src={require("../../assets/google.svg").default}
            />
            Google
          </button>
        </div>
        <hr className="mt-6 border-b-1 border-blueGray-300" />

        <form onSubmit={handleFormSubmit}>
          <label htmlFor="input-name">Username:</label>
          <input
            id="input-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInput}
          />
          <label htmlFor="input-email">Email:</label>
          <input
            id="input-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
          />
          <label htmlFor="input-password">Password:</label>
          <input
            id="input-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
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
