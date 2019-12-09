import { gql } from 'apollo-boost';

const getUserQuery = gql`
  query user($email_id: String, $password: String) {
    user(email_id: $email_id, password: $password) {
        email_id,
        first_name
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

export { getUserQuery, getBooksQuery };