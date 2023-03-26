import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useSignInApi = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("name", email);
  }, [email]);

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://react-labs.softbinator.com/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        console.log(localStorage.getItem("token"));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    handleSubmitSignIn,
    navigate,
  };
};

export default useSignInApi;
