import { useNavigate } from "react-router-dom";
import Background from "../components/background/background.component";
import RegisterForm from "../components/RegisterForm";
import useRegisterApi from "../hooks/RegisterHook";

const Register = () => {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    successMessage,
    errorMessage,
    handleSubmitRegister,
  } = useRegisterApi();

  const backToSignIn = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  return (
    <Background>
      <div className="sign-in-div">
        <RegisterForm
          handleSubmit={handleSubmitRegister}
          errorMessage={errorMessage}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          successMessage={successMessage}
          backToSignIn={backToSignIn}
        />
      </div>
    </Background>
  );
};

export default Register;
