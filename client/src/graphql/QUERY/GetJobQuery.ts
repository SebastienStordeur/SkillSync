import { gql } from "@apollo/client";

const GETJOBS_QUERY = gql`
  query getJobs {
    getJobs {
      id
      title
      salary
      company
      remote
    }
  }
`;

export default GETJOBS_QUERY;
