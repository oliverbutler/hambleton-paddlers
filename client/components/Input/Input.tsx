import React, { FC } from "react";

export enum Types {
  text = "text",
  tel = "tel",
  phone = "phone",
  email = "email",
  date = "date",
  checkbox = "checkbox",
  select = "select",
  textarea = "textarea",
}

interface InputProps {
  label: any;
  name: string;
  type?: Types;
  placeholder?: string;
  register: any;
  disabled?: boolean;
  narrow?: boolean;
  expanded?: boolean;
  select?: string[];
  help?: any;
}

const Input: FC<InputProps> = ({
  label,
  name,
  type = Types.text,
  placeholder,
  register,
  disabled = false,
  narrow = false,
  expanded = false,
  select,
  help,
}) => {
  return (
    <div
      className={`field ${narrow ? "is-narrow " : ""} ${
        expanded ? "is-expanded " : ""
      } `}
    >
      <label className="label">{label}</label>
      <div
        className={`control ${narrow ? "is-narrow " : ""} ${
          expanded ? "is-expanded " : ""
        } `}
      >
        {type == Types.textarea ? (
          <textarea
            className="textarea"
            ref={register}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : select ? (
          <div className="select">
            <select ref={register} name={name} disabled={disabled}>
              {select.map((val, index) => (
                <option
                  key={`${name}-option-${index}`}
                  value={val.toLowerCase()}
                >
                  {val}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <input
            className={type == Types.checkbox ? "checkbox" : "input"}
            ref={register}
            name={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
        <p className="help">{help}</p>
      </div>
    </div>
  );
};

export default Input;
