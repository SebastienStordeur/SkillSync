import { gql } from "@apollo/client";

const DELETEJOB_MUTATION = gql`
  mutation deleteJob($id: ID!) {
    deleteJob(id: $id) {
      success
      message
    }
  }
`;

export default DELETEJOB_MUTATION;
