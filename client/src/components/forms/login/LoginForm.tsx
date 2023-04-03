import { FC, FormEvent, useState, ChangeEvent } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/Auth/auth";
import LOGIN_MUTATION from "../../../graphql/MUTATION/Login.mutation";
import { Button, TextField, Typography } from "@mui/material";

export interface ToggleForm {
  onToggle: () => void;
}

const LoginForm: FC<ToggleForm> = ({ onToggle }) => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [emailHasError, setEmailHasError] = useState({ hasError: false, errorMessage: "" });
  const dispatch = useDispatch();
  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    setEmailHasError({ hasError: false, errorMessage: "" });
    setErrorMessage("");
    try {
      if (loginInput.email.trim() === "") {
        setEmailHasError({ hasError: true, errorMessage: "Email cannot be empty" });
        return;
      }

      const response = await login({ variables: { user: loginInput } });

      if (response.data) {
        const { success, message, token } = response.data.login;

        if (success) {
          const payload = { token };
          dispatch(authActions.login(payload));
        }

        setErrorMessage(message);
      }
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2 className="font-semibold text-3xl">Login</h2>
      <TextField
        type="email"
        name="email"
        value={loginInput.email}
        onChange={handleInputChange}
        label="Email"
        size="small"
      />
      {emailHasError.hasError && <p className="text-red-500 -mt-1">{emailHasError.errorMessage}</p>}
      <TextField
        type="password"
        name="password"
        value={loginInput.password}
        onChange={handleInputChange}
        label="Password"
        size="small"
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
      <p className="text-center mt-1">
        Need an account? &nbsp;
        <span className="text-blue font-bold cursor-pointer" onClick={onToggle}>
          Sign up
        </span>
      </p>
      <Typography variant="h3" mt={1} sx={{ textAlign: "center", color: "#ef233c" }} fontSize={16} fontWeight={700}>
        {errorMessage}
      </Typography>
    </form>
  );
};

export default LoginForm;
