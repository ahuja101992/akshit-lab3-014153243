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
    buyer(email_id: $email_id, password: $password, ) {
        email_id,
        rest_name,
        first_name
    }
  }
`;
const getUser = gql`
  query getUser($email_id: String) {
    getUser(email_id: $email_id ) {
        email_id,
        last_name,
        first_name
    }
  }
`;
const getBuyer = gql`
  query getBuyer($email_id: String) {
    getBuyer(email_id: $email_id ) {
        email_id,
        rest_name,
        first_name,
        last_name,
        phone_num,
        rest_zip
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

export { getUserQuery, getBooksQuery, getBuyerQuery, getBuyer, getUser };