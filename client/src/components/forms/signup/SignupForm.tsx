import { FC, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import SIGNUP_MUTATION from "../../../graphql/MUTATION/Signup.mutation";

import { Button, Checkbox, FormControlLabel } from "@mui/material";
import CustomTextfield from "../CustomTextfield";
import { ToggleForm } from "../login/LoginForm";

const SignupForm: FC<ToggleForm> = ({ onToggle }) => {
  const [isCompany, setIsCompany] = useState(false);
  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION);

  const initialValues = isCompany
    ? { company: "", email: "", password: "" }
    : { lastname: "", firstname: "", email: "", password: "" };

  const validationSchema = isCompany
    ? Yup.object().shape({
        company: Yup.string().required("Company is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
      })
    : Yup.object().shape({
        lastname: Yup.string().required("Last name is required"),
        firstname: Yup.string().required("First name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
      });

  const handleSubmit = async (values: any) => {
    const response = await signup({ variables: { user: values } });
  };

  const handleIsCompanyChange = (resetForm: () => void) => {
    setIsCompany((prev) => !prev);
    resetForm();
  };

  return (
    <div className="form">
      <h2 className="font-semibold text-3xl">Signup</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ resetForm }) => (
          <Form style={{ gap: "12px" }}>
            <FormControlLabel
              control={<Checkbox checked={isCompany} onChange={() => handleIsCompanyChange(resetForm)} />}
              label="Register as a company"
            />
            {!isCompany && (
              <>
                <CustomTextfield name="lastname" label="Last Name" />
                <CustomTextfield name="firstname" label="First Name" />
              </>
            )}
            {isCompany && <CustomTextfield name="company" label="Company" />}
            <CustomTextfield name="email" label="Email" />
            <CustomTextfield name="password" label="Password" type="password" />
            <Button variant="contained" type="submit">
              Signup
            </Button>
          </Form>
        )}
      </Formik>
      <p className="text-center mt-1">
        Already have an account?
        <span className="text-blue font-bold cursor-pointer" onClick={onToggle}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
