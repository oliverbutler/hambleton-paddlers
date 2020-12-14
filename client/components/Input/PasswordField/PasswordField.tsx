import React, { useRef, useState } from "react";
import Input, { Types } from "../Input";
import zxcvbn from "zxcvbn";
import _ from "lodash";

const PasswordField = ({ label, register, errors }) => {
  const [strength, setStrength] = useState(zxcvbn(""));
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    setPassword(e.target.value);
    setStrength(zxcvbn(e.target.value));
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
      <Input
        type={Types.password}
        onChange={onChange}
        register={register({
          validate: (value) => zxcvbn(value).score >= 2,
        })}
        label={label}
        errors={errors}
        iconLeft="key-outline"
        name="password"
      />

      <div style={{ display: password ? "block" : "none" }}>
        <progress
          className={`progress is-small ${getColour()} mt-2 mb-0`}
          value={(100 / 5) * (strength.score + 1)}
          max="100"
        ></progress>

        <p className={`help ${getColour()}`}>
          {_.get(strength, "feedback.warning")}
        </p>

        <Input
          type={Types.password}
          errors={errors}
          register={register({
            validate: (value) =>
              value === password || "The passwords don't match",
          })}
          label="Verify Password"
          iconLeft="key-outline"
          name="password_verify"
        />
      </div>
    </div>
  );
};

export default PasswordField;
