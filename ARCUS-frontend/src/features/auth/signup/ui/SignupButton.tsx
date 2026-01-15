import { useState } from "react";
import { Button } from "@shared/ui/button";

export const SignupButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 2000));
    setLoading(false);
  };

  return (
    <>
      <Button variant="default" isLoading={loading} onClick={handleLogin}>
        Login
      </Button>
    </>
  );
};
