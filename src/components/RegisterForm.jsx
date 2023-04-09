import { useContext, useEffect, useState } from "react";
import Button from "./button/button.component";
import RegisterContext from "../context/RegisterContext";

const RegisterForm = () => {
  const [noAction, setNoAction] = useState(true);
  const {
    email,
    setEmail,
    password,
    setPassword,
    successMessage,
    errorMessage,
    handleSubmitRegister,
    backToSignIn,
  } = useContext(RegisterContext);
  return (
    <div className="homepage-start">
      <div className="container">
        <h2>REGISTER</h2>
        <form onSubmit={handleSubmitRegister} className="form-account">
          <label htmlFor="email-sign-in">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email-sign-in"
          />
          <label htmlFor="pass-sign-in">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="pass-sign-in"
          />
          <Button noAction={noAction} type="button" className="styled-button">
            REGISTER
          </Button>
          <button className="click-for-register" onClick={backToSignIn}>
            Already have an account? CLICK HERE!
          </button>
        </form>
        <p className="error-message">{errorMessage}</p>
        <p className="success-message">{successMessage}</p>
      </div>
    </div>
  );
};
export default RegisterForm;
