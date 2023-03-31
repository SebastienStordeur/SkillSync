import { FC, FormEvent, useState, ChangeEvent } from "react";
import { useMutation } from "@apollo/client";

import SIGNUP_MUTATION from "../../../graphql/MUTATION/Signup.mutation";
import { Button, TextField } from "@mui/material";

const SignupForm: FC = () => {
  const [signupInput, setSignupInput] = useState({
    lastname: "",
    firstname: "",
    company: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSignupInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await signup({ variables: { user: signupInput } });

    //Show messages for error and success

    console.log(response.data.signup);
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Signup</h2>
      <TextField
        type="text"
        name="lastname"
        value={signupInput.lastname}
        onChange={handleInputChange}
        label="Last Name"
        size="small"
      />
      <TextField
        type="text"
        name="firstname"
        value={signupInput.firstname}
        onChange={handleInputChange}
        label="First Name"
        size="small"
      />
      <TextField
        type="text"
        name="company"
        value={signupInput.company}
        onChange={handleInputChange}
        label="Company"
        size="small"
      />
      <TextField
        type="email"
        name="email"
        value={signupInput.email}
        onChange={handleInputChange}
        label="Email"
        size="small"
      />
      <TextField
        type="password"
        name="password"
        value={signupInput.password}
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

export default SignupForm;
