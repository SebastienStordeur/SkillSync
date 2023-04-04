import { FC } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import SIGNUP_MUTATION from "../../../graphql/MUTATION/Signup.mutation";

import { Button } from "@mui/material";
import CustomTextfield from "../CustomTextfield";
import { ToggleForm } from "../login/LoginForm";

const SignupForm: FC<ToggleForm> = ({ onToggle }) => {
  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION);

  const signupSchema = Yup.object().shape({
    lastname: Yup.string().required("Last name is required"),
    firstname: Yup.string().required("First name is required"),
    company: Yup.string().required("Company is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
  });

  const handleSubmit = async (values: {
    lastname: string;
    firstname: string;
    company: string;
    email: string;
    password: string;
  }) => {
    const response = await signup({ variables: { user: values } });

    // Show messages for error and success
    console.log(response.data.signup);
  };

  return (
    <div className="form">
      <h2 className="font-semibold text-3xl">Signup</h2>
      <Formik
        initialValues={{
          lastname: "",
          firstname: "",
          company: "",
          email: "",
          password: "",
        }}
        validationSchema={signupSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <CustomTextfield name="lastname" label="Last Name" />
            <CustomTextfield name="firstname" label="First Name" />
            <CustomTextfield name="company" label="Company" />
            <CustomTextfield name="email" label="Email" />
            <CustomTextfield name="password" label="Password" type="password" />
            <Button variant="contained" type="submit">
              Signup
            </Button>
          </Form>
        )}
      </Formik>
      <p className="text-center mt-1">
        Already have an account? &nbsp;
        <span className="text-blue font-bold cursor-pointer" onClick={onToggle}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
