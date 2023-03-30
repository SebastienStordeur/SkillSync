import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user) {
      success
      message
      token
    }
  }
`;

export default LOGIN_MUTATION;
