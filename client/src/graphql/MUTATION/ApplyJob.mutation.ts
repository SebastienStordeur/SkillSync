import { gql } from "@apollo/client";

const APPLYJOB_MUTATION = gql`
  mutation applyToJob($id: ID!) {
    applyToJob(id: $id) {
      success
    }
  }
`;

export default APPLYJOB_MUTATION;
