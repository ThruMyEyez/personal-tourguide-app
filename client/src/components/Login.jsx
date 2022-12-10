import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/auth";
import { LoginContext } from "../context/Context";

const Login = props => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const [formData, setFormData] = useState({
    /*  name: "", */
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInput = e => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(isLoggedIn);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    // If login success => redirect to Main page.
    signIn(formData)
      .then(res => {
        console.log(res.authToken);
        localStorage.setItem("AuthToken", res.authToken);
        setIsLoggedIn(true);
        navigate("/dashboard");
        /*if (res.authToken) {
        setIsLoggedIn(false);
        //show error
      } else {
      }*/
      })
      .catch(error => console.log(error.msg));
  };

  return (
    <div className="modalContainer">
      <div className="Modal">
        <h1>Login</h1>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>test login useContext</button>
        {(isLoggedIn && <h3>you are logged in </h3>) || <h3>not logged in</h3>}
        <button onClick={() => navigate(-1)}>Close / Schließen</button>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="login-name">Email</label>
          <input id="login-name" type="email" name="email" value={formData.email} onChange={handleInput} />
          <label htmlFor="login-password">password</label>
          <input id="login-password" type="password" name="password" value={formData.password} onChange={handleInput} />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
