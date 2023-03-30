import { FC, FormEvent, useRef } from "react";
import { useMutation } from "@apollo/client";

import SIGNUP_MUTATION from "../../../graphql/MUTATION/Signup.mutation";

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

    const signupInput = {
      lastname,
      firstname,
      company,
      email,
      password,
    };

    const response = await signup({ variables: { user: signupInput } });

    //Show messages for error and success

    console.log(response.data.signup);
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
