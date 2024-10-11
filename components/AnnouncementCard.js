import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AnnouncementCard = ({ title, details, timeAgo }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };

  return (
    <TouchableOpacity onPress={toggleExpand} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.timeAgo}>{timeAgo}</Text>
      </View>
      <Text style={styles.details}>
        {expanded ? details : (details.length > 15 ? `${details.slice(0, 30)} read more...` : details)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: 
  {
    backgroundColor: '#fff',
    borderRadius: 7,
    padding: 15,
    marginVertical: 10,
    elevation: 3,         // for Android shadow
    shadowColor: '#000',  // for iOS shadow
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  header: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: 
  {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: 
  {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  timeAgo: 
  {
    fontSize: 12,
    color: '#aaa',
  }
});

export default AnnouncementCard;