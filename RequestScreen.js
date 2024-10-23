import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import RequestCard from './components/RequestCard'; // Ensure this component displays individual requests
import { fetchDocuments } from './Functions'; // Import your fetch function
import { useFocusEffect } from '@react-navigation/native'; // Import to listen to navigation events

const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
};

// Sort according to priority
const sortRequestsByPriority = (requests) => {
    return requests.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

export function RequestsScreen() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getRequests = async () => {
        try {
            setLoading(true); // Set loading state
            const fetchedRequests = await fetchDocuments("repairRequests"); // Replace with your requests collection name
            const sortedRequests = sortRequestsByPriority(fetchedRequests); // Sort by priority
            setRequests(sortedRequests);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching requests: ", err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch requests when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            getRequests();
        }, [])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error fetching requests: {error}</Text>;
    }
    return (
        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#f9f9f9" }}>
            {requests.map((request, index) => (
                <RequestCard
                    key={index}
                    title={request.title} // Adjust according to your request structure
                    details={request.details}
                    status={request.status} // Add any other relevant properties
                    createdAt={request.createdAt}
                    priority={request.priority}
                />
            ))}
        </ScrollView>
    );
}
