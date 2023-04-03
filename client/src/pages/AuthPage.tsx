import { useState } from "react";
import LoginForm from "../components/forms/login/LoginForm";
import SignupForm from "../components/forms/signup/SignupForm";

const AuthPage = () => {
  const [loginIsVisible, setLoginIsVisible] = useState<boolean>(true);

  const handleFormToggle = () => setLoginIsVisible((prev) => !prev);
  return (
    <div className="h-screen">
      {loginIsVisible && <LoginForm onToggle={handleFormToggle} />}
      {!loginIsVisible && <SignupForm onToggle={handleFormToggle} />}
    </div>
  );
};

export default AuthPage;
