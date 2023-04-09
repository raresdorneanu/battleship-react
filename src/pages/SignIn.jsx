import Background from "../components/background/background.component";
import SignInForm from "../components/SignInForm";
import SignInContext from "../context/SignInContext";
import useSignInApi from "../hooks/SignInHook";

const SignIn = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    handleSubmitSignIn,
    navigate,
  } = useSignInApi();

  const handleShowRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <SignInContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        errorMessage,
        handleSubmitSignIn,
        handleShowRegister,
      }}
    >
      <Background>
        <div className="sign-in-div">
          <SignInForm />
        </div>
      </Background>
    </SignInContext.Provider>
  );
};

export default SignIn;
