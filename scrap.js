gql`
  mutation {
    createGuestOrder(
      guest: {
        first_name: "Ant"
        last_name: "S"
        email: "ams7@g.com"
        phone: "3489538"
      }
      pizzas: [
        {
          size: "Medium - 12in"
          crust: "Crunchy Thin"
          sauce: "BBQ"
          toppings: { meats: ["Salami"], veggies: ["Red pepper", "Onions"] }
        }
        {
          size: "Medium - 12in"
          crust: "Brooklyn Style"
          sauce: "BBQ"
          toppings: {
            meats: ["Ham", "Bacon", "Chicken"]
            veggies: ["Jalapeno"]
            cheeses: ["Mozzarella", "Gouda"]
          }
        }
      ]
    ) {
      order_id
    }
  }
`;
