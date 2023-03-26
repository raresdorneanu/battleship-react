import Background from "../components/background/background.component";
import SignInForm from "../components/SignInForm";
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
    <Background>
      <div className="sign-in-div">
        <SignInForm
          handleSubmit={handleSubmitSignIn}
          errorMessage={errorMessage}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          enterRegister={handleShowRegister}
        />
      </div>
    </Background>
  );
};

export default SignIn;
