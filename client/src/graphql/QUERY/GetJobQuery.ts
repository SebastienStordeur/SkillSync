import { gql } from "@apollo/client";

const GETJOB_QUERY = gql`
  query getJob($id: ID!) {
    getJob(id: $id) {
      success
      job {
        id
        title
        description
        salary
        company
        location
        extra {
          remote
          type
          vacations
        }
        applicant_number
      }
      recommendations {
        id
        title
        description
        salary
        company
        location
        extra {
          remote
          type
          vacations
        }
      }
    }
  }
`;

export default GETJOB_QUERY;
