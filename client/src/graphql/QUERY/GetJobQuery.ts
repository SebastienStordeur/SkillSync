import { gql } from "@apollo/client";

const GETJOB_QUERY = gql`
  query getJob {
    getJob {
      id
      title
      description
      salary
    }
  }
`;

export default GETJOB_QUERY;
