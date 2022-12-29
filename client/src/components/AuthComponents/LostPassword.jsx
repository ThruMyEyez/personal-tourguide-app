import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordReset } from "../../services/authentication";
import { OnErrorAlert, OnSuccessAlert } from "../UI/Alerts";
import { FormHelper } from "../UI/UIHelper";

const LostPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    passwordReset(email)
      .then((response) => {
        setMsg(response.data.message);
      })
      .catch((error) => setErrorMsg(error.response.data.message));
  };

  return (
    <div className="fullscreen-modal-container">
      <form className="" onSubmit={handleSubmit}>
        <label className="block" htmlFor="email">
          <span className="form-label">Email address</span>
        </label>
        <input
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormHelper str="Enter your email address" />
        <button className="btn-primary">get reset link</button>
      </form>
      <button onClick={() => navigate(-2)}>Close</button>
      {errorMsg && <OnErrorAlert msg={errorMsg} />}
      {msg && <OnSuccessAlert msg={msg} />}
    </div>
  );
};

export default LostPassword;
