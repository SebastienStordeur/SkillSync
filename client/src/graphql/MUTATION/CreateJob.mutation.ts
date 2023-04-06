import { gql } from "@apollo/client";

const CREATE_JOB_MUTATION = gql`
  mutation createJob($job: JobInput!) {
    createJob(job: $job) {
      id
      title
      description
      company
      salary
      remote
      type
      vacations
    }
  }
`;

export default CREATE_JOB_MUTATION;
