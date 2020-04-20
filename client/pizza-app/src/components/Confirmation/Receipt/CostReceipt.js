import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse",
        borderTop: "5 solid black",
    }
})

export default ({ total }) => (
    <View style={styles.container}>
        <Text>Total: ${total} </Text>
    </View>
)