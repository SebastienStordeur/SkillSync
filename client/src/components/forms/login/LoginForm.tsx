import { FC, useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/Auth/auth";
import LOGIN_MUTATION from "../../../graphql/MUTATION/Login.mutation";
import { Box, Button, Typography } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import CustomTextfield from "../CustomTextfield";

export interface ToggleForm {
  onToggle: () => void;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm: FC<ToggleForm> = ({ onToggle }) => {
  const dispatch = useDispatch();
  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (values: { email: string; password: string }) => {
    setErrorMessage("");
    try {
      const response = await login({ variables: { user: values } });

      if (response.data) {
        const { success, message, token } = response.data.login;

        if (success) {
          const payload = { token };
          dispatch(authActions.login(payload));
          location.reload();
        }

        setErrorMessage(message);
      }
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  return (
    <div>
      <Typography variant="h2" className="font-semibold text-3xl">
        Login
      </Typography>
      <Formik initialValues={{ email: "", password: "" }} validationSchema={loginSchema} onSubmit={handleLogin}>
        {() => (
          <Form>
            <Box mb={2}>
              <CustomTextfield name="email" label="Email" />
            </Box>
            <Box mb={2}>
              <CustomTextfield name="password" label="Password" type="password" />
            </Box>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Box mt={1} textAlign="center">
        <Typography variant="body1">
          Need an account? &nbsp;
          <span className="text-blue font-bold cursor-pointer" onClick={onToggle}>
            Sign up
          </span>
        </Typography>
      </Box>
      <Typography variant="h3" mt={1} sx={{ textAlign: "center", color: "#ef233c" }} fontSize={16} fontWeight={700}>
        {errorMessage}
      </Typography>
    </div>
  );
};

export default LoginForm;

{
  /*       <TextField
        type="email"
        name="email"
        value={loginInput.email}
        onChange={handleInputChange}
        label="Email"
        size="small"
      />
      {emailHasError.hasError && <p className="text-red-500 -mt-1">{emailHasError.errorMessage}</p>}
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
      </Button> */
}
