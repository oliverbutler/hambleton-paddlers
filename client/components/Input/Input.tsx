import React, { FC } from "react";

export enum Types {
  text = "text",
  tel = "tel",
  phone = "phone",
  email = "email",
}

interface InputProps {
  label: string;
  name: string;
  type?: Types;
  placeholder?: string;
  ref: React.LegacyRef<HTMLInputElement>;
}

const Input: FC<InputProps> = ({
  label,
  name,
  type = Types.text,
  placeholder,
  ref,
}) => {
  return (
    <div className="field is-expanded">
      <label className="label">{label}</label>
      <p className="control is-expanded">
        <input
          className="input"
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
        />
      </p>
    </div>
  );
};

export default Input;
