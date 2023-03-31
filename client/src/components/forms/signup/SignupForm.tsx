import { FC, FormEvent, useRef } from "react";
import { useMutation } from "@apollo/client";

import SIGNUP_MUTATION from "../../../graphql/MUTATION/Signup.mutation";
import { Button, TextField } from "@mui/material";

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
    <form onSubmit={handleSubmit} className="form">
      SIGNUP
      <TextField type="text" placeholder="lastname" ref={lastnameInputRef} size="small" />
      <TextField type="text" placeholder="firstname" ref={firstnameInputRef} size="small" />
      <TextField type="text" placeholder="company" ref={companyInputRef} size="small" />
      <TextField type="email" placeholder="email" ref={emailInputRef} size="small" />
      <TextField type="password" placeholder="psw" ref={passwordInputRef} size="small" />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </form>
  );
};

export default SignupForm;
