import { gql } from "@apollo/client";

const CREATE_JOB_MUTATION = gql`
  input JobInput {
    title: String!
    description: String
    company: String!
    salary: Int!
    location: String
    remote: Boolean
  }

  mutation createJob($job: JobInput!) {
    createJob(job: $job) {
      id
      title
      description
      company
      salary
      remote
    }
  }
`;

export default CREATE_JOB_MUTATION;
