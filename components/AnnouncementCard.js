import {View, Text, StyleSheet} from 'react-native'


const AnnouncementCard = ({ title, details, timeAgo }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>{details}</Text>
        <Text style={styles.timeAgo}>{timeAgo}</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 7,
      padding: 15,
      marginVertical: 10,
      elevation: 3,         // for Android shadow
      shadowColor: '#000',  // for iOS shadow
      shadowOffset: { width: -2, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    details: {
      fontSize: 14,
      color: '#555',
      marginTop: 5,
    },
    timeAgo: {
      fontSize: 12,
      color: '#aaa',
      marginTop: 5,
    },
  });
  

  export default AnnouncementCard;