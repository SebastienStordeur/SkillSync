import { FC, FormEvent, useRef } from "react";
import { gql, useMutation } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!) {
    signup(user: { email: $email, password: $password }) {
      id
      email
    }
  }
`;

const SignupForm: FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    const result = await signup({ variables: { email, password } });

    console.log(result.data.signup);
  };
  return (
    <form onSubmit={handleSubmit}>
      SIGNUP
      <input type="email" placeholder="email" ref={emailInputRef} />
      <input type="password" placeholder="psw" ref={passwordInputRef} />
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
