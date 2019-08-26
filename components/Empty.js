import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { white, blue, gray } from '../utils/colors';

export default function NoCard () {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Empty.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 5
    },
})