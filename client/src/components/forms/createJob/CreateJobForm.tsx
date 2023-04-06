import { FC } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import CREATE_JOB_MUTATION from "../../../graphql/MUTATION/CreateJob.mutation";
import { Button, FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel } from "@mui/material";
import CustomTextfield from "../CustomTextfield";

const CreateJobForm: FC = () => {
  const [createJob, { data, error, loading }] = useMutation(CREATE_JOB_MUTATION);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Title must be at least 5 characters long")
      .max(500, "Title must not exceed 500 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(100, "Description must be at least 100 characters long")
      .required("Description is required"),
    company: Yup.string()
      .min(2, "Company name must be at least 2 characters long")
      .required("Company name is required"),
    salary: Yup.number().min(0, "Salary must be a positive number").required("Salary is required"),
    location: Yup.string().required("Location is required"),
    jobType: Yup.string().required("Job type is required"),
    vacations: Yup.number().min(0, "Vacations must be a positive number").required("Vacations is required"),
  });

  const handleSubmit = async (values: any) => {
    const response = await createJob({ variables: { job: values } });
    console.log(response.data.createJob);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        company: "",
        salary: 0,
        location: "",
        remote: false,
        jobType: "Full time",
        vacations: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange }: { values: any; handleChange: any }) => (
        <Form className="form">
          <h2>CREATE JOB</h2>
          <CustomTextfield name="title" label="Title" />
          <CustomTextfield name="description" label="Description" />
          <CustomTextfield name="company" label="Company" />
          <CustomTextfield
            type="number"
            name="salary"
            label="Salary"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 0, step: 1000 }}
          />
          <CustomTextfield name="location" label="Location" />
          <FormControlLabel
            control={<Checkbox checked={values.remote} name="remote" onChange={handleChange} />}
            label="Remote"
          />
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel id="type-label">Job Type</InputLabel>
            <Field as={Select} name="jobType" labelId="type-label" label="Job Type">
              <MenuItem value="Full time">Full time</MenuItem>
              <MenuItem value="Part time">Part time</MenuItem>
            </Field>
          </FormControl>
          <CustomTextfield
            type="number"
            name="vacations"
            label="Vacations (weeks)"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 0, step: 1 }}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateJobForm;
