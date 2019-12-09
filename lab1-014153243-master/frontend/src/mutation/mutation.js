
import { gql } from 'apollo-boost';

const addUserMutation = gql`
    mutation AddUser($first_name: String, $last_name: String, $email_id: String, $password: String){
        addUser(first_name: $first_name, last_name: $last_name, email_id: $email_id, 
        password: $password){
            first_name,
            email_id,
            last_name
        }
    }
`;
const addBuyerMutation = gql`
    mutation AddBuyer($first_name: String, $last_name: String, $email_id: String,$rest_zip: String,$rest_name : String, $phone : String){
        addBuyer(first_name: $first_name, last_name: $last_name, email_id: $email_id, rest_zip :$rest_zip,rest_name:$rest_name, phone:$phone ){
            first_name,
            email_id,
            last_name,

        }
    }
`;
const addSectionMutation = gql`
    mutation AddBuyer($first_name: String, $last_name: String, $email_id: String,$rest_zip: String,$rest_name : String, $phone : String){
        addBuyer(first_name: $first_name, last_name: $last_name, email_id: $email_id, rest_zip :$rest_zip,rest_name:$rest_name, phone:$phone ){
            first_name,
            email_id,
            last_name,

        }
    }
`;
const addItemMutation = gql`
    mutation AddBuyer($first_name: String, $last_name: String, $email_id: String,$rest_zip: String,$rest_name : String, $phone : String){
        addBuyer(first_name: $first_name, last_name: $last_name, email_id: $email_id, rest_zip :$rest_zip,rest_name:$rest_name, phone:$phone ){
            first_name,
            email_id,
            last_name,

        }
    }
`;

export { addUserMutation, addBuyerMutation, addSectionMutation, addItemMutation };