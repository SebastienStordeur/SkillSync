import { gql } from "@apollo/client";

const GET_PROFILE_QUERY = gql`
  query GetCurrentUser {
    GetCurrentUser {
      id
      email
      lastname
      firstname
      company
      applications
      is_company
    }
  }
`;

export default GET_PROFILE_QUERY;
