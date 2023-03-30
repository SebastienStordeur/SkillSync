import { gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation signup($user: UserInput) {
    signup(user: $user) {
      id
      lastname
      firstname
      company
      email
    }
  }
`;

export default SIGNUP_MUTATION;
