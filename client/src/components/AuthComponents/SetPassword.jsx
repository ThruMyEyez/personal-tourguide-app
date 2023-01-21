import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  verifyPasswordReset,
  newPassword,
} from "../../services/authentication";
import { OnSuccessAlert, OnErrorAlert } from "../UI/Alerts";

const SetPassword = () => {
  const [validToken, setValidToken] = useState(false);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { id, token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    verifyPasswordReset(id, token)
      .then((response) => {
        setMsg(response.data.message);
        setValidToken(true);
      })
      .catch((error) => setErrorMsg(error.response.data.message));
  }, [id, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    newPassword(id, token, password)
      .then((response) => {
        console.log(response.data);
        setMsg("");
        setMsg(response.data.message);
      })
      .catch((error) => setErrorMsg(error.response.data.message));
  };

  return (
    <div className="fullscreen-modal-container">
      <button className="btn-primary" onClick={() => navigate("/")}>
        Close Window
      </button>
      {errorMsg && <OnErrorAlert msg={errorMsg} />}
      {msg && <OnSuccessAlert msg={msg} />}
      {validToken && (
        <div className="">
          <h2>Choose a new Password</h2>
          <form onSubmit={handleSubmit}>
            <h3>Choose a new Password</h3>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type="submit">Set Password</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SetPassword;
