import { gql, useQuery } from "@apollo/client";
import React, { FC } from "react";
import CreateJobForm from "../components/forms/createJob/CreateJobForm";
import LoginForm from "../components/forms/login/LoginForm";
import SignupForm from "../components/forms/signup/SignupForm";

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
      <LoginForm />
      <SignupForm />
      <CreateJobForm />
    </div>
  );
};

export default Test;
