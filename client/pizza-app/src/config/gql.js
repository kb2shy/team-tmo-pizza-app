import { gql } from "apollo-boost";

const CREATE_CUSTOMER = gql`
  mutation createCustomer(
    $first_name: String!
    $last_name: String!
    $phone: String!
    $email: String!
    $password: String
  ) {
    createCustomer(
      first_name: $first_name
      last_name: $last_name
      phone: $phone
      email: $email
      password: $password
    ) {
      first_name
    }
  }
`;
