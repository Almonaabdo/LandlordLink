import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Swipeable } from 'react-native-gesture-handler';
const primaryColor = "#3e1952"

export function Events({navigation}) {
  const [upcomingEvents, setEvents] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchedEvents = [
      { id: '1', date: '2024-10-10', title: 'Community Meeting', details: 'Discuss community initiatives.' },
      { id: '2', date: '2024-10-15', title: 'Maintenance Day', details: 'Regular maintenance of community areas.' },
      { id: '3', date: '2024-10-31', title: 'Halloween Party', details: 'Fun activities and treats for all ages!' },
    ];

    setEvents(fetchedEvents);

    const newMarkedDates = {};
    fetchedEvents.forEach(event => {
      newMarkedDates[event.date] = { 
        marked: true, 
        selected: true, 
        selectedColor: '#dbceeb',
      };
    });
    setMarkedDates(newMarkedDates);
  }, []);

  const openModal = (event) => 
  {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const eventCard = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upcoming Events</Text>
      </View>

      <Calendar
        markedDates={markedDates}
        theme={{
          calendarBackground: '#fff',
          todayTextColor: primaryColor,
          dayTextColor: primaryColor,
          monthTextColor: primaryColor,
          arrowColor: primaryColor,
          textSectionTitleColor: primaryColor,
          selectedDayBackgroundColor: primaryColor,
          selectedDayTextColor: primaryColor,
          'stylesheet.day.basic': {
            base: {
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
            },
            text: {
              color: primaryColor,
            },
          },
          'stylesheet.day.selected': {
            base: {
              backgroundColor: primaryColor,
              borderRadius: 16,
            },
            text: {
              color: '#fff',
            },
          },
          'stylesheet.day.marked': {
            base: {
              borderColor: primaryColor,
              borderWidth: 1,
              borderRadius: 16,
            },
            text: {
              color: '#fff',
            },
          },
        }}
      />
      <View style={{marginVertical:20}}/>

      <FlatList
        data={upcomingEvents}
        renderItem={eventCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{margin:5}}/>


      {/*EVEND DETAILS MODAL */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedEvent?.title}</Text>
            <Text style={styles.modalDate}>{selectedEvent?.date}</Text>
            <Text style={styles.modalDetails}>{selectedEvent?.details}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    backgroundColor: primaryColor,
    padding: 15,
    borderRadius: 7,
    marginBottom: '5%',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily:'Avenir', 
  },
  card: {
    backgroundColor: '#dbceeb', 
    borderRadius: 4,
    padding: 15,
    marginBottom: 10,
    shadowColor: primaryColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: primaryColor,
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
  },

  // MODAL STYLING
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalDate: {
    fontSize: 16,
    color: '#666',
  },
  modalDetails: {
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
  closeButton: {
    color: primaryColor,
    fontWeight: 'bold',
    marginTop: 10,
  },
});