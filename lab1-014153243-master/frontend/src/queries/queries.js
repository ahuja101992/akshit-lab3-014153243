import { gql } from 'apollo-boost';

const getUserQuery = gql`
  query user($email_id: String, $password: String) {
    user(email_id: $email_id, password: $password) {
        email_id,
        first_name
    }
  }
`;
const getBuyerQuery = gql`
  query buyer($email_id: String, $password: String) {
    buyer(email_id: $email_id, password: $password) {
        email_id,
        rest_name,
        emeil_id
    }
  }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

export { getUserQuery, getBooksQuery, getBuyerQuery };