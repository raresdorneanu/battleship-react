import { useEffect, useState } from "react";
import Button from "./button/button.component";

const SignInForm = (props) => {
  const [noAction, setNoAction] = useState(true);
  return (
    <div className="homepage-start">
      <div className="container">
        <h2>SIGN IN</h2>
        <form onSubmit={props.handleSubmit} className="form-account">
          <label htmlFor="email-sign-in">Email</label>
          <input
            type="email"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
            id="email-sign-in"
          />
          <label htmlFor="pass-sign-in">Password</label>
          <input
            type="password"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
            id="pass-sign-in"
          />
          <Button noAction={noAction} type="submit" className="styled-button">
            SIGN IN
          </Button>
          <button className="click-for-register" onClick={props.enterRegister}>
            Don't have an account? CLICK HERE!
          </button>
        </form>
        <p className="error-message">{props.errorMessage}</p>
      </div>
    </div>
  );
};
export default SignInForm;
