import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useRegisterApi = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://react-labs.softbinator.com/auth/register",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
      if (response.status === 200) {
        setSuccessMessage("Registered Successfully!");
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Email already in use. Please choose a different email.");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    successMessage,
    errorMessage,
    handleSubmitRegister,
  };
};

export default useRegisterApi;
