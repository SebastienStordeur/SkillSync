import { FC, FormEvent, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/Auth/auth";
import LOGIN_MUTATION from "../../../graphql/MUTATION/Login.mutation";

const LoginForm: FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

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
    <form onSubmit={handleLogin}>
      LOGIN
      <input type="email" placeholder="email" ref={emailInputRef}></input>
      <input type="password" placeholder="password" ref={passwordInputRef}></input>
      <button type="submit">LOgin</button>
    </form>
  );
};

export default LoginForm;
