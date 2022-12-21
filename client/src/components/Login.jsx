import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, storeAuthToken, verify } from "../services/authentication";

const Login = props => {
  const [formData, setFormData] = useState({
    /*  name: "", */
    email: "",
    password: "",
    stayLoggedInFlag: false,
  });
  const navigate = useNavigate();

  const handleInput = e => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    login(formData)
      .then(res => {
        storeAuthToken(res.authToken);
        navigate("/dashboard");
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="modalContainer">
      <div className="container mx-auto">
        <h1>Login</h1>
        <button onClick={() => navigate("/")}>X close X</button>
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
