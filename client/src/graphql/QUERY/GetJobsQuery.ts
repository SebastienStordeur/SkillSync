import { gql } from "@apollo/client";

const GETJOBS_QUERY = gql`
  query getJobs {
    getJobs {
      id
      title
      salary
      company
      location
      extra {
        remote
        type
        vacations
      }
      userId
      applicant_number
    }
  }
`;

export default GETJOBS_QUERY;
