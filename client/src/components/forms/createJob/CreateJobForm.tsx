import { gql, useMutation } from "@apollo/client";
import { FC, useRef, FormEvent } from "react";

const CREATE_JOB_MUTATION = gql`
  mutation createJob($title: String!, $description: String, $company: String!, $location: String) {
    createJob(job: { title: $title, description: $description, company: $company, location: $location }) {
      title
      description
      company
      userId
    }
  }
`;

const CreateJobForm: FC = () => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const salaryInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

  const [createJob, { data, error, loading }] = useMutation(CREATE_JOB_MUTATION);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const title = titleInputRef.current?.value;
    const description = descriptionInputRef.current?.value;
    const company = companyInputRef.current?.value;
    const salary = salaryInputRef.current?.value;
    const location = locationInputRef.current?.value;

    const response = await createJob({ variables: { title, description, company, location } });
    console.log(response.data.createJob);
  };

  return (
    <form onSubmit={handleSubmit}>
      CREATE JOB FORM <br />
      <input type="text" placeholder="title" ref={titleInputRef} />
      <input type="text" placeholder="description" ref={descriptionInputRef} />
      <input type="text" placeholder="company" ref={companyInputRef} />
      <input type="number" placeholder="salary" ref={salaryInputRef} />
      <input type="text" placeholder="location" ref={locationInputRef} />
      <input type="checkbox" placeholder="remote" />
      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default CreateJobForm;
