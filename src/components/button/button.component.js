import React from "react";
import "./button.style.scss";
import classNames from "classnames";

const Button = ({ children, className, ...props }) => {
  const buttonClassNames = classNames("styled-button", className);
  return (
    <button className={buttonClassNames} onClick={props.onClick}>
      {children}
    </button>
  );
};

export default Button;
