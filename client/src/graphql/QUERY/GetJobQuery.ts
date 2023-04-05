import { gql } from "@apollo/client";

const GETJOB_QUERY = gql`
  query getJob($id: ID!) {
    getJob(id: $id) {
      id
      title
      description
      salary
      company
      remote
    }
  }
`;

export default GETJOB_QUERY;
