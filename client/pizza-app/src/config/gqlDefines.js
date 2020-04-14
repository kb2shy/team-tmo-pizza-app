import { gql } from 'apollo-boost';

// Used for login
export const GET_TOKEN_BY_CUSTOMER = gql`
  query GetTokenByCustomer($email: String!, $password: String!) {
    getTokenByCustomer(email: $email, password: $password)
  }
`;

// Used for retrieving customer details by token.
export const GET_CUSTOMER_BY_TOKEN = gql`
  query GetCustomerByToken($token: String) {
    getCustomerByToken(token: $token) {
      customer_id
      email
      first_name
      last_name
      phone
    }
  }
`;

// Used for creating a new customer
export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $first_name: String!
    $last_name: String!
    $phone: String!
    $email: String!
    $password: String
    $isRegistered: Boolean
  ) {
    createCustomer(
      first_name: $first_name
      last_name: $last_name
      phone: $phone
      email: $email
      password: $password
      isRegistered: $isRegistered
    ) {
      customer_id
      first_name
      last_name
      email
      phone
    }
  }
`;

//Used for getting toppings array
export const GET_MEAT_OPTIONS = gql`
  query{
    getMeatOptions{
      meat_id
      meat_type
      meat_price
    }
  }
  `;

export const GET_VEGGIE_OPTIONS = gql`
  query{
    getVeggieOptions{
      veggie_id
      veggie_type
      veggie_price
    }
  }
  `;

export const GET_CHEESE_OPTIONS = gql`
query{
  getCheeseOptions{
    cheese_id
    cheese_type
    cheese_price
  }
}
`;

export const GET_CRUST_OPTIONS = gql`
query{
  getCrustOptions{
    crust_type
  }
}
`;

export const GET_SAUCE_OPTIONS = gql`
query{
  getSauceOptions{
    sauce_type
  }
}
`;

export const GET_SIZE_OPTIONS = gql`
query{
  getSizeOptions{
    size_type
  }
}
`;

export const GET_CUST_ORDERS = gql`
  query GetAllOrdersByCustomer($customer_id: Int!){
    getAllOrdersByCustomer(customer_id: $customer_id){
      order_id
    }
}
`;
export const GET_PIZZAS_BY_ORDER = gql`
  query GetAllPizzasByOrder($order_id: Int!){
    getAllPizzasByOrder(order_id: $order_id){
      pizza_id
    }
  }
`;

export const GET_VEGGIES_BY_PIZZA = gql`
  query GetSelectedVeggies($pizza_id: Int!){
    getSelectedVeggies(pizza_id: $pizza_id){
      veggie{
        veggie_type
      }
    }
  }
`;

export const GET_MEATS_BY_PIZZA = gql`
  query GetSelectedMeats($pizza_id: Int!){
    getSelectedMeats(pizza_id: $pizza_id){
      meat{
        meat_type
      }
    }
  }
`;

export const GET_ALL_PIZZAS_BY_ORDER = gql`
query
    getAllPizzasByOrder($order_id: Int){
        getAllPizzasByOrder(order_id: $order_id){
            pizza_id
            size{
                size_type
            }
            crust{
                crust_type
            }
            sauce{
                sauce_type
            }
            cheese{
                cheese_type
            }
        }
    }
`