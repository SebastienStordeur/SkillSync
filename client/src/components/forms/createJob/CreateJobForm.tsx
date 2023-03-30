import { useMutation } from "@apollo/client";
import { FC, useRef, FormEvent, useState } from "react";
import CREATE_JOB_MUTATION from "../../../graphql/MUTATION/CreateJob";

const CreateJobForm: FC = () => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const salaryInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

  const [isRemote, setIsRemote] = useState<boolean>(false);

  const [createJob, { data, error, loading }] = useMutation(CREATE_JOB_MUTATION);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const title = titleInputRef.current?.value;
    const description = descriptionInputRef.current?.value;
    const company = companyInputRef.current?.value;
    const salary = +salaryInputRef.current!.value;
    const location = locationInputRef.current?.value;
    const remote = isRemote;

    const response = await createJob({ variables: { title, description, company, salary, location, remote } });
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
      <input
        type="checkbox"
        checked={isRemote ? true : false}
        onChange={() => setIsRemote((prev) => !prev)}
        placeholder="remote"
      />
      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default CreateJobForm;
