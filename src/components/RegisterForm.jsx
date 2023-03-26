import { useEffect, useState } from "react";
import Button from "./button/button.component";

const RegisterForm = (props) => {
  const [noAction, setNoAction] = useState(true);

  return (
    <div className="homepage-start">
      <div className="container">
        <h2>REGISTER</h2>
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
          <Button noAction={noAction} type="button" className="styled-button">
            REGISTER
          </Button>
          <button className="click-for-register" onClick={props.backToSignIn}>
            Already have an account? CLICK HERE!
          </button>
        </form>
        <p className="error-message">{props.errorMessage}</p>
        <p className="success-message">{props.successMessage}</p>
      </div>
    </div>
  );
};
export default RegisterForm;
