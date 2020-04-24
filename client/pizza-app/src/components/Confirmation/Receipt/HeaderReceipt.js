import React from 'react';
import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
        justifyContent: "space-between",
        alignItem: "center"
    },
    title: {
        fontSize: 16,
    },
    subtitle: {
        fontSize: 12
    },
    image: {
        width: "25%",
        marginRight: 20,
        marginTop: -20,
        padding: "10px"
    }
});

const pickupOrDelivery = (delivery, address) => {
    if (!delivery) return `In store pick up`;
    return `Delivery: ${address.street}, ${address.city}`
};

export default ({ user, date, orderId, delivery }) => (
    <View style={styles.container}>
        <Image src="./assets/logo.png" style={styles.image} />
        <View>
            <Text style={styles.title}>CONFIRMATION #{orderId}</Text>
            <Text style={styles.subtitle}>Order received: {date}</Text>
            <Text style={styles.title}>Customer Details:</Text>
            <Text style={styles.subtitle}>{user.first_name} {user.last_name}</Text>
            <Text style={styles.subtitle}>{pickupOrDelivery(delivery, user.address)}</Text>
            <Text style={styles.subtitle}>Email: {user.email}</Text>
        </View>
    </View> 
)