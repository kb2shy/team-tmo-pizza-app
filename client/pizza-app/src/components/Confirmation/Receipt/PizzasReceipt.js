import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 15,
        textAlign: "center"
    },
    box1: {
        padding: 10,
        width: "178pt",
        height: "auto",
        backgroundColor: "#CCC",
        marginRight: 8,
        marginBottom: 5,
    },
    box2: {
        padding: 10,
        width: "178pt",
        height: "auto",
        backgroundColor: "#CCC",
        marginBottom: 5
    },
    textLabel: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: "12pt"
    },
    textDetails: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: "10pt",
    }
})

const pizzaToppings = (cheeses, veggies, meats) => {
    // add toppings into array to build into toppingString
    const toppingsArray = [];
    for (let c of cheeses) {
        toppingsArray.push(c.cheese_type);
    }
    for (let v of veggies) {
        toppingsArray.push(v.veggie_type)
    }
    for (let m of meats) {
        toppingsArray.push(m.meat_type);
    }

    let toppingString = "";
    for (let i = 0; i < toppingsArray.length; i++) {
        if (i === toppingsArray.length - 1) {
            toppingString += `and ${toppingsArray[i]}`;
        } else {
            toppingString += `${toppingsArray[i]}, `;
        } 
    }
    return toppingString;
}

const pizzaCard = (pizzas) => {
     console.log(pizzas.pizzas)
     let allPizzas = pizzas.pizzas
    return allPizzas.map((pizza, index) => {
        console.log(pizza)
        if ((index + 1) % 3 === 0) {
            return (
                <View style={styles.box2}>
                    {pizzaDetails(pizza, index)}
                </View>
            )
        } else {
            return (
                <View style={styles.box1} key={pizza.pizza_id}>
                    {pizzaDetails(pizza, index)}
                </View>
            )
        }
    })
}

const pizzaDetails = (pizza, index) => (
    <View>
        <Text style={styles.title}>Pizza #{index + 1}</Text>
        {/* <Text style={styles.textDetails}>Quantity: {pizza.quantity}</Text> */}
        <Text style={styles.textDetails}>{pizza.size.size_type} {pizza.crust.crust_type} with {pizza.sauce.sauce_type} sauce</Text>
        <Text style={styles.title}>WITH</Text>
        <Text style={styles.textDetails}>{pizzaToppings(pizza.cheeses, pizza.veggies, pizza.meats)}</Text>
        {/* <Text style={styles.textDetails}>Price: ${pizza.cost}</Text> */}
    </View>
)

export default ({ pizzas }) => (
    <View style={styles.container}>
        {pizzaCard(pizzas)}
    </View>
)