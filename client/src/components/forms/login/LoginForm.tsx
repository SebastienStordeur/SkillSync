import { FC, FormEvent, useRef, useState, ChangeEvent } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/Auth/auth";
import LOGIN_MUTATION from "../../../graphql/MUTATION/Login.mutation";
import { Button, TextField } from "@mui/material";

const LoginForm: FC = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

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
      <TextField
        type="email"
        name="email"
        value={loginInput.email}
        onChange={handleInputChange}
        label="Email"
        size="small"
      />
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
    </form>
  );
};

export default LoginForm;
