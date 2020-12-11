import React, { useState } from "react";

const Setting = ({ title, value, save, type = "Text" }) => {
  const [text, setText] = useState(value);
  const [status, setStatus] = useState("default");

  /**
   * When we loose focus on the field, if we changed it, update the variable
   */
  const onBlur = () => {
    if (value != text) {
      save(text);
      value = text;
    }
  };

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <b>{title}: </b> <br />
      <input type={type} value={text} onBlur={onBlur} onChange={onChange} />
    </div>
  );
};

export default Setting;
