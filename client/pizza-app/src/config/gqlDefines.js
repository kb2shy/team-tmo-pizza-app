import { gql } from 'apollo-boost';

// Used for login
export const GET_TOKEN_BY_CUSTOMER = gql`
  query GetTokenByCustomer($email: String!, $password: String!) {
    getTokenByCustomer(email: $email, password: $password)
  }
`;

// Used for retrieving customer details by token.
// Pass token as `x-auth-token` in context header.
export const GET_CUSTOMER_BY_TOKEN = gql`
  query {
    getCustomerByToken {
      customer_id
      email
      first_name
      last_name
      phone
    }
  }
`;

// Used for creating a new customer or getting and updating an existing
// customer if `registered` flag (for query and existing) is false.
export const UPDATE_OR_CREATE_CUSTOMER = gql`
  mutation UpdateOrCreateCustomer(
    $first_name: String!
    $last_name: String!
    $phone: String!
    $email: String!
    $password: String
    $registered: Boolean
  ) {
    updateOrCreateCustomer(
      first_name: $first_name
      last_name: $last_name
      phone: $phone
      email: $email
      password: $password
      registered: $registered
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
  query {
    getMeatOptions {
      meat_id
      meat_type
      meat_price
    }
  }
`;

//gets all possible veggie options
export const GET_VEGGIE_OPTIONS = gql`
  query {
    getVeggieOptions {
      veggie_id
      veggie_type
      veggie_price
    }
  }
`;

//gets all possible cheese options
export const GET_CHEESE_OPTIONS = gql`
  query {
    getCheeseOptions {
      cheese_id
      cheese_type
      cheese_price
    }
  }
`;

//gets all possible crust options
export const GET_CRUST_OPTIONS = gql`
  query {
    getCrustOptions {
      crust_id
      crust_type
    }
  }
`;

//gets all possible sauce options
export const GET_SAUCE_OPTIONS = gql`
  query {
    getSauceOptions {
      sauce_id
      sauce_type
    }
  }
`;

//gets all possible size options
export const GET_SIZE_OPTIONS = gql`
  query {
    getSizeOptions {
      size_id
      size_type
      size_price
    }
  }
`;

//returns array of all order ids based on a customer Id
export const GET_CUST_ORDERS = gql`
  query GetAllOrdersByCustomer($customer_id: Int!) {
    getAllOrdersByCustomer(customer_id: $customer_id) {
      order_id
    }
  }
`;

//returns array of all pizza
export const GET_PIZZAS_BY_ORDER = gql`
  query GetAllPizzasByOrder($order_id: Int!) {
    getAllPizzasByOrder(order_id: $order_id) {
      pizza_id
    }
  }
`;

//creates a guest order and returns an order_id
export const CREATE_GUEST_ORDER = gql`
  mutation CreateGuestOrder(
    $guest: GuestInput!
    $pizzas: [PizzaInput!]!){
      createGuestOrder(guest: $guest, pizzas: $pizzas) {
        order { order_id, created_at },
        code
      }
    }
`;

//creates a member order and returns an order_id
export const CREATE_MEMBER_ORDER = gql`
  mutation CreateMemberOrder(
    $pizzas: [PizzaInput!]!){
      createMemberOrder(pizzas: $pizzas) {
        order { order_id, created_at },
        code
      }
    }
`;

//returns an array of pizzas with all basic info (size, crust, sauce, cheese)
export const GET_ALL_ORDER_INFO_BY_ORDER_ID = gql`
query
    getAllOrderInfoByOrderId($order_id: Int){
        getAllOrderInfoByOrderId(order_id: $order_id){
          order_id
          customer{
            first_name
            last_name
            phone
            email
            registered
          }
          created_at
          delivery
          address{
            street
            city
            zip
          }
          pizzas{
            size{
              size_type
            }
            crust{
              crust_type
            }
            sauce{
              sauce_type
            }
            meats{
              meat_type
            }
            veggies{
              veggie_type
            }
            cheeses{
              cheese_type
            }
            price
            quantity
         }
        }
    }
`

export const GET_TOPPINGS_BY_PIZZA_ID = gql`
query
    getToppingsByPizzaId($pizza_id: Int){
      getToppingsByPizzaId(pizza_id: $pizza_id){
        cheeses{
          cheese_type
        }
        meats{
          meat_type
        }
        veggies{
          veggie_type
        }
      }
    }
`

