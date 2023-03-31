import { useMutation } from "@apollo/client";
import { FC, FormEvent, useState, ChangeEvent } from "react";
import CREATE_JOB_MUTATION from "../../../graphql/MUTATION/CreateJob.mutation";

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
    <form onSubmit={handleSubmit}>
      CREATE JOB FORM <br />
      <input type="text" placeholder="title" name="title" value={jobInput.title} onChange={handleInputChange} />
      <input
        type="text"
        placeholder="description"
        name="description"
        value={jobInput.description}
        onChange={handleInputChange}
      />
      <input type="text" placeholder="company" name="company" value={jobInput.company} onChange={handleInputChange} />
      <input type="number" placeholder="salary" name="salary" value={jobInput.salary} onChange={handleInputChange} />
      <input
        type="text"
        placeholder="location"
        name="location"
        value={jobInput.location}
        onChange={handleInputChange}
      />
      <input
        type="checkbox"
        checked={jobInput.remote}
        name="remote"
        onChange={handleInputChange}
        placeholder="remote"
      />
      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default CreateJobForm;
