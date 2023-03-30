import { useMutation } from "@apollo/client";
import { FC, useRef, FormEvent, useState } from "react";
import CREATE_JOB_MUTATION from "../../../graphql/MUTATION/CreateJob.mutation";

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

    const jobInput = {
      title: titleInputRef.current?.value,
      description: descriptionInputRef.current?.value,
      company: companyInputRef.current?.value,
      salary: +salaryInputRef.current!.value,
      location: locationInputRef.current?.value,
      remote: isRemote,
    };

    const response = await createJob({ variables: { job: jobInput } });
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
