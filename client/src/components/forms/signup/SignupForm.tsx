import { FC, FormEvent, useRef } from "react";
import { gql, useMutation } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation signup($lastname: String, $firstname: String, $company: String, $email: String!, $password: String!) {
    signup(
      user: { lastname: $lastname, firstname: $firstname, company: $company, email: $email, password: $password }
    ) {
      id
      lastname
      firstname
      company
      email
    }
  }
`;

const SignupForm: FC = () => {
  const firstnameInputRef = useRef<HTMLInputElement>(null);
  const lastnameInputRef = useRef<HTMLInputElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const lastname = lastnameInputRef.current?.value;
    const firstname = firstnameInputRef.current?.value;
    const company = companyInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    console.log(company);

    const result = await signup({ variables: { lastname, firstname, company, email, password } });

    console.log(result.data.signup);
  };
  return (
    <form onSubmit={handleSubmit}>
      SIGNUP
      <input type="text" placeholder="lastname" ref={lastnameInputRef} />
      <input type="text" placeholder="firstname" ref={firstnameInputRef} />
      <input type="text" placeholder="company" ref={companyInputRef} />
      <input type="email" placeholder="email" ref={emailInputRef} />
      <input type="password" placeholder="psw" ref={passwordInputRef} />
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
