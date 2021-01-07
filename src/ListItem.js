import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListItem = ( props ) => (
    <View style={styles.container}>
        <Text>userId: {props.userId}</Text>
        <Text>id: {props.id}</Text>
        <Text>title: {props.title}</Text>
        <Text>body: {props.body}</Text>
    </View>
);

export default ListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
    }
});