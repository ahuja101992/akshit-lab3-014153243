
import { gql } from 'apollo-boost';

const addUserMutation = gql`
    mutation AddUser($first_name: String, $last_name: String, $email_id: String, $password: String){
        addUser(first_name: $first_name, last_name: $last_name, email_id: $email_id, 
        password: $password){
            first_name
            email_id
            last_name
            password
        }
    }
`;

export { addUserMutation };