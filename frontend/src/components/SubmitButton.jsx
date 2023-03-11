import React from "react";

function Button(props) {
  return <button className="submit-button" type={props.type}>{props.buttonText}</button>;
}

export default Button;
