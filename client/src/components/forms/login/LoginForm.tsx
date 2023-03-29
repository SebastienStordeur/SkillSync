import React, { FormEvent, useRef } from "react";
import { useMutation, gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(user: { email: $email, password: $password }) {
      success
      message
      token
    }
  }
`;

/* const LOGIN_QUERY = gql`
  query login($email: String!, $password: String!) {
    login(user: { email: $email, password: $password }) {
      success
      message
      token
    }
  }
`; */

const LoginForm: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    const result = await login({
      variables: { email, password },
    });

    const { success, message, token } = result.data.login;

    console.log(success, message, token);
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="email" ref={emailInputRef}></input>
      <input type="password" placeholder="password" ref={passwordInputRef}></input>
      <button type="submit">LOgin</button>
    </form>
  );
};

export default LoginForm;
