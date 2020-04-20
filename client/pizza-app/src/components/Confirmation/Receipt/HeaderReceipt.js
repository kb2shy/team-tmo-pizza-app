import React from 'react';
import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
        justifyContent: "space-between"
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
    }
});

const pickupOrDelivery = (pickup, address) => {
    if (pickup) return `In store pick up`;
    return `Delivery: ${address.street}, ${address.city}`
};

export default ({ user, date, order }) => (
    <View style={styles.container}>
    <Image src="./assets/logo.png" style={styles.image} />
    <View>
        <Text style={styles.title}>CONFIRMATION #{order.order_id}</Text>
        <Text style={styles.subtitle}>Order received: {date}</Text>
        <Text style={styles.title}>Customer Details:</Text>
        <Text style={styles.subtitle}>{user.first_name} {user.last_name}</Text>
        {/* <Text style={styles.subtitle}>{pickupOrDelivery(order.pickup, user.address)}</Text> */}
        <Text style={styles.subtitle}>Email: {user.email}</Text>
    </View>
</View>
)