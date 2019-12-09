
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
    mutation AddSection($email_id: String,$section_name: String){
        addSection(email_id: $email_id, section_name: $section_name){
            email_id,
            section_name

        }
    }
`;
const addItemMutation = gql`
    mutation AddItem($email_id: String, $dish_name: String, $section_name: String,$dish_desc: String, $dish_price : String){
        addItem(email_id: $email_id, dish_name: $dish_name, section_name: $section_name, dish_price :$dish_price, dish_desc :$dish_desc ){
            email_id,
            dish_name,
            section_name
        }
    }
`;

export { addUserMutation, addBuyerMutation, addSectionMutation, addItemMutation };