import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import _ from "lodash";

const PasswordField = ({ label }) => {
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [strength, setStrength] = useState({});

  const onChange = (e) => {
    setPassword(e.target.value);
    setStrength(zxcvbn(password));
  };

  const onChangeVerify = (e) => {
    setVerifyPassword(e.target.value);
  };

  const passwordMatch = () => {
    if (password == "" && verifyPassword == "") return true;
    return password == verifyPassword;
  };

  const getColour = () => {
    switch (strength.score) {
      case 0:
        return "is-danger";
      case 1:
        return "is-danger";
      case 2:
        return "is-warning";
      case 3:
        return "is-success";
      case 4:
        return "is-success";
    }
  };

  return (
    <div>
      <div className="field">
        <div className="label">{label}</div>
        <div className="control has-icons-left">
          <input
            className="input"
            type="password"
            value={password}
            onChange={onChange}
          />
          <span class="icon is-small is-left">
            <ion-icon name="key-outline"></ion-icon>
          </span>
        </div>
        {password && (
          <progress
            class={`progress is-small ${getColour()} mt-2 mb-0`}
            value={(100 / 5) * (strength.score + 1)}
            max="100"
          ></progress>
        )}

        {password && (
          <p className={`help ${getColour()}`}>
            {_.get(strength, "feedback.warning")}
          </p>
        )}
      </div>
      <div className="field">
        <div className="label">Verify Password</div>
        <div className="control has-icons-left">
          <input
            className={`input ${passwordMatch() ? "" : "is-danger"}`}
            type="password"
            value={verifyPassword}
            onChange={onChangeVerify}
          />
          <span class="icon is-small is-left">
            <ion-icon name="key-outline"></ion-icon>
          </span>
        </div>
        {!passwordMatch() && (
          <p className={`help is-danger`}>Passwords don't match</p>
        )}
      </div>
    </div>
  );
};

export default PasswordField;
