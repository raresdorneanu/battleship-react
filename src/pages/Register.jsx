import { useNavigate } from "react-router-dom";
import Background from "../components/background/background.component";
import RegisterForm from "../components/RegisterForm";
import useRegisterApi from "../hooks/RegisterHook";
import RegisterContext from "../context/RegisterContext";

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
    <RegisterContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        successMessage,
        errorMessage,
        handleSubmitRegister,
        backToSignIn,
      }}
    >
      <Background>
        <div className="sign-in-div">
          <RegisterForm />
        </div>
      </Background>
    </RegisterContext.Provider>
  );
};

export default Register;
