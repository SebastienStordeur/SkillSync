import { gql } from "@apollo/client";

const GETJOBS_QUERY = gql`
  query getJobs {
    getJobs {
      id
      title
      salary
      company
      remote
      location
      userId
    }
  }
`;

export default GETJOBS_QUERY;
