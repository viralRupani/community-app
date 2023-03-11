import React from "react";

function FormInput(props) {
  return (
    <input
      className="form-input"
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
    />
  );
}

export default FormInput;
