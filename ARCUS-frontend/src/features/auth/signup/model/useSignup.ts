import { useNavigate } from "react-router";

export const useSignup = () => {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  return { goToSignup };
};
