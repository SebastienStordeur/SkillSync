// CustomTextfield.tsx
import { FC } from "react";
import { useFormikContext } from "formik";
import TextField from "@mui/material/TextField";

interface CustomTextfieldProps {
  name: string;
  label: string;
  type?: string;
}

const CustomTextfield: FC<CustomTextfieldProps> = ({ name, label, type }) => {
  const { getFieldProps, touched, errors } = useFormikContext<any>();

  return (
    <TextField
      {...getFieldProps(name)}
      label={label}
      type={type}
      error={touched[name] && !!errors[name]}
      helperText={(touched[name] && errors[name]) as React.ReactNode}
      fullWidth
    />
  );
};

export default CustomTextfield;
