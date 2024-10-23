// components/RequestCard.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RequestCard = ({ title, details, status, createdAt, priority }) => {
    // Set color based on priority
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'red';
            case 'Medium':
                return '#FF9800'; 
            case 'Low':
                return 'green'; 
            default:
                return 'gray';
        }
    };

    const priorityColor = getPriorityColor(priority);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text>{details}</Text>
            <Text>Status: {status}</Text>
            <Text>Created At: {new Date(createdAt).toLocaleDateString()}</Text>
            <Text style={[styles.priority, { color: priorityColor }]}>Priority: {priority}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    priority: {
        fontWeight: 'bold',
    },
});

export default RequestCard;
