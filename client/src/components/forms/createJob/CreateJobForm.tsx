import { useMutation } from "@apollo/client";
import { FC, FormEvent, useState, ChangeEvent } from "react";
import CREATE_JOB_MUTATION from "../../../graphql/MUTATION/CreateJob.mutation";
import { Button, Checkbox, TextField } from "@mui/material";

const CreateJobForm: FC = () => {
  const [jobInput, setJobInput] = useState({
    title: "",
    description: "",
    company: "",
    salary: 0,
    location: "",
    remote: false,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setJobInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "salary" ? parseInt(value, 10) : value,
    }));
  };

  const [createJob, { data, error, loading }] = useMutation(CREATE_JOB_MUTATION);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Validation passing jobInput and checking each field one by one

    const response = await createJob({ variables: { job: jobInput } });
    console.log(response.data.createJob);
  };

  return (
    <form onSubmit={handleSubmit} className="form ">
      <h2>CREATE JOB</h2>
      <TextField
        name="title"
        value={jobInput.title}
        onChange={handleInputChange}
        label="Title"
        variant="outlined"
        size="small"
      />
      <TextField
        name="description"
        value={jobInput.description}
        onChange={handleInputChange}
        label="Description"
        variant="outlined"
        size="small"
      />
      <TextField
        name="company"
        value={jobInput.company}
        onChange={handleInputChange}
        label="Company"
        variant="outlined"
        size="small"
      />
      <TextField
        type="number"
        name="salary"
        value={jobInput.salary}
        onChange={handleInputChange}
        label="Salary"
        variant="outlined"
        size="small"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 0 }}
      />
      <TextField
        type="text"
        placeholder="location"
        name="location"
        value={jobInput.location}
        onChange={handleInputChange}
        size="small"
      />
      <Checkbox checked={jobInput.remote} name="remote" onChange={handleInputChange} /* label="Remote"  */ />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default CreateJobForm;
