import { FC, FormEvent, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/Auth/auth";
import LOGIN_MUTATION from "../../../graphql/MUTATION/Login.mutation";
import { Button, TextField } from "@mui/material";

const LoginForm: FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const [loginInput, setLoginInput] = useState({});

    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    const loginInput = { email, password };

    try {
      const response = await login({ variables: { user: loginInput } });

      if (response.data) {
        const { success, message, token } = response.data.login;

        if (success) {
          const payload = { token };
          dispatch(authActions.login(payload));
        }

        console.log(success, message, token);
      }
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2>Login</h2>
      <TextField type="email" ref={emailInputRef} label="Email" size="small" />
      <TextField type="password" ref={passwordInputRef} label="Password" size="small" />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
