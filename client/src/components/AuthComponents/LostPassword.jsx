import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordReset } from "../../services/authentication";
import { OnErrorAlert, OnSuccessAlert } from "../UI/Alerts";

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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn-primary">get reset link</button>
      </form>
      <button onClick={() => navigate(-2)}>Close</button>
      {errorMsg && <OnErrorAlert msg={errorMsg} />}
      {msg && <OnSuccessAlert msg={msg} />}
    </div>
  );
};

export default LostPassword;
