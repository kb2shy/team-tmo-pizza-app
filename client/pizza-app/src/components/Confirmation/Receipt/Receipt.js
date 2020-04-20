import React from 'react';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';

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

const Receipt = ({ order, user, guest }) => {

    // Collect date from the order and parse it into date string
    const dateParser = () => {
        const date = new Date(order.createdAt);
        const month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();
        let hour = date.getHours();
        const ampm = (hour > 12 ? "pm" : "am");
        hour = (hour > 12 ? (hour - 12) : hour);
        let minutes = date.getMinutes();
        minutes = (minutes < 10 ? `0${minutes}` : minutes);
        return `${MONTHS[month]} ${day}, ${year} at ${hour}:${minutes} ${ampm}`;
    }

    /**
     * TODO
     * Calculate total cost of pizzas when cost field updated with pizza data
     */
    // UnComment below when cost field added to pizza object
    // const calculateTotal = () => {
    //     return order.pizzas.reduce((total, pizza) => total + pizza.cost, 0);
    // }

     /**
      * TODO
      * Calculate total quantities of pizzas when quantity field updated with pizzas data
      */
     // Uncomment below when quantity field added to pizza object
    //  const calculatePizzas = (pizzas) => {
    //     return order.pizzas.reduce((total, pizza) => total + pizza.quantity, 0);
    // }
}