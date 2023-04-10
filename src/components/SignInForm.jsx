import { useContext } from "react";
import Button from "./button/button.component";
import SignInContext from "../context/SignInContext";

const SignInForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    handleSubmitSignIn,
    handleShowRegister,
  } = useContext(SignInContext);
  return (
    <div className="homepage-start">
      <div className="container">
        <h2>SIGN IN</h2>
        <form onSubmit={handleSubmitSignIn} className="form-account">
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
          <Button type="submit" className="styled-button">
            SIGN IN
          </Button>
          <button className="click-for-register" onClick={handleShowRegister}>
            Don't have an account? CLICK HERE!
          </button>
        </form>
        <p className="error-message">{errorMessage}</p>
      </div>
    </div>
  );
};
export default SignInForm;
