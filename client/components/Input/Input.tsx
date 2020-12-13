import React, { FC } from "react";
import _, { has } from "lodash";

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
  errors?: {};
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
  errors,
}) => {
  const hasErrors = () => {
    // return Boolean(_.get(errors, `[${name}]`));
    return Boolean(_.get(errors, name));
  };

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
            className={
              type == Types.checkbox
                ? "checkbox"
                : "input" + (hasErrors() ? " is-danger" : " ")
            }
            ref={register}
            name={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
        {hasErrors() && (
          <p className="help is-danger">{_.get(errors, name).message}</p>
        )}
        <p className="help">{help}</p>
      </div>
    </div>
  );
};

export default Input;
