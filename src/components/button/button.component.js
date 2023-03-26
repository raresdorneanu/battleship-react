import React, { useState } from "react";
import "./button.style.scss";

const Button = ({ children, ...props }) => {
  return (
    <button className="styled-button" onClick={props.onClick}>
      {children}
    </button>
  );
};

export default Button;
