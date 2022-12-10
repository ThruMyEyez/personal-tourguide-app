import { useState, useEffect } from "react";
import { createNewUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

const SignUp = props => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInput = e => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    console.log(formData);
    //If Registration success => Redirect to Login page.
    createNewUser(formData)
      .then(res => navigate("/login"))
      .catch(error => console.log(error.msg));
  };

  return (
    <div className="modalContainer">
      <div className="Modal">
        <h1>Registration</h1>
        <button onClick={() => navigate(-1)}>Close / Schließen</button>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="input-name">Username</label>
          <input id="input-name" type="text" name="name" value={formData.name} onChange={handleInput} />
          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" name="email" value={formData.email} onChange={handleInput} />
          <label htmlFor="input-password">password</label>
          <input id="input-password" type="password" name="password" value={formData.password} onChange={handleInput} />

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
