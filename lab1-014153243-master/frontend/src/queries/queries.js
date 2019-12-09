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
const sections = gql`
  query getSection($email_id: String,$section_name:String ) {
    getSection(email_id: $email_id,section_name: $section_name  ) {
        email_id,
        section_name
    }
  }
`;
const items = gql`
  query getItem($dish_name: String, $email_id:String) {
    getItem(email_id: $email_id,dish_name: $dish_name  ) {
        email_id,
        dish_name
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