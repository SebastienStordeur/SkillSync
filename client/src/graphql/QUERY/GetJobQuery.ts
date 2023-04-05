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
        remote
      }
      recommendations {
        id
        title
        description
        salary
        company
        location
        remote
      }
    }
  }
`;

export default GETJOB_QUERY;
