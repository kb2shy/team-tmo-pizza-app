import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

import HeaderReceipt from './HeaderReceipt';
import PizzasReceipt from './PizzasReceipt';
import CostReceipt from './CostReceipt';

// Months variable to convert numerical month to string representation
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    image: {
        marginBottom: 10,
    },
    text: {
        marginTop: 10,
    },
});

const Receipt = ({ orderId, user, pizzas, orderDate, delivery }) => {

    // Collect date from the order and parse it into date string
    const dateParser = () => {
        const date = new Date(Number(orderDate));
        const month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        const ampm = ((hour >= 12 && minutes > 0) ? "pm" : "am");
        hour = (hour > 12 ? (hour - 12) : hour);
        minutes = (minutes < 10 ? `0${minutes}` : minutes);
        return `${MONTHS[month]} ${day}, ${year} at ${hour}:${minutes} ${ampm}`;
    }

    /**
     * TODO
     * Calculate total cost of pizzas when cost field updated with pizza data
     */
    // Un-comment below statement when cost field added to pizza object
    const calculateTotal = () => {
        return pizzas.reduce((total, pizza) => total + pizza.price, 0);
    }

    /**
      * TODO
      * Calculate total quantities of pizzas when quantity field updated with pizzas data
      */
    // Delete 1st return statement and un-comment 2nd return statement when quantity field added to pizza object
    const countAllPizzas = () => {
        // return pizzas.length;
        return pizzas.reduce((total, pizza) => {
            if (!pizza.quantity) return total + 1;
            return total + pizza.quantity;
        }, 0);
    }

    return (
        <Document>
            <Page size="LETTER" style={styles.page}>
                <HeaderReceipt orderId={orderId} user={user} date={dateParser()} delivery={delivery}/>
                <Text style={styles.text}>Pizza(s): {countAllPizzas()}</Text>
                <PizzasReceipt pizzas={pizzas}/>
                <CostReceipt total={`15.00`}/>
            </Page>
        </Document>
    )
}

export default Receipt;