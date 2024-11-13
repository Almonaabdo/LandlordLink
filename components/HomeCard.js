import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const HomeCard = ({ title, description, imageUrl }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Button title="Get Started" color="green" onPress={() => { /* Handle button press */ }} />
      </View>
      <Image 
        source={ imageUrl }
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginVertical: 5,
    margin:'1.5%',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: 'grey',
    marginVertical: 5,
  },
  image: {
    width: '30%',
    height: '120%',
    borderRadius: 10,
  },
});

export default HomeCard;
