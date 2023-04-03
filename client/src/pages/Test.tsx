import { gql, useQuery } from "@apollo/client";
import { FC } from "react";
import CreateJobForm from "../components/forms/createJob/CreateJobForm";

const GETJOBS_QUERY = gql`
  query getJobs {
    getJobs {
      id
      title
      salary
    }
  }
`;

const Test: FC = () => {
  const { loading, error, data } = useQuery(GETJOBS_QUERY);

  console.log(data ? data.getJobs : null);
  return (
    <div>
      {/*       <LoginForm />
      <SignupForm /> */}
      <CreateJobForm />
    </div>
  );
};

export default Test;
