/*
* FILE        : Documents.js
* 
* Description : The Documents Screen is for displaying different PDF's related to the user property
* 
* Author      : Abdurrahman Almouna, Yafet Tekleab
* Date        : October 31, 2024
* Version     : 1.0
* 
*/


import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { StylesHome } from './styles/stylesHome';

const primaryColor = "#3e1952"

const budgetIcon = require("./assets/budgetIcon.png");
const historyIcon = require("./assets/historyIcon.png");

const documentsList = [
  { key: '1', value: 'Lease Document', uri: 'https://css4.pub/2015/icelandic/dictionary.pdf', expiryDate: '2025-12-31' },
  { key: '2', value: 'Contract Document', uri: 'https://css4.pub/2015/icelandic/dictionary.pdf', expiryDate: '2024-12-31' },
  { key: '3', value: 'Agreement Document', uri: 'https://besjournals.onlinelibrary.wiley.com/doi/pdf/10.1111/2041-210X.13500', expiryDate: '2024-11-30' },
];

const billsList = [
  { key: '1', value: 'Hydro Bill', uri: 'https://css4.pub/2015/icelandic/dictionary.pdf', startDate: '2024-01-01', endDate: '2024-01-31' },
  { key: '2', value: 'Water Bill', uri: 'https://css4.pub/2015/icelandic/dictionary.pdf', startDate: '2024-02-01', endDate: '2024-02-28' },
  { key: '3', value: 'AC Bill', uri: 'https://css4.pub/2015/icelandic/dictionary.pdf', startDate: '2024-03-01', endDate: '2024-03-31' },
];

export function Documents({ navigation }) {
  const [selectedUri, setSelectedUri] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDocumentsVisible, setIsDocumentsVisible] = useState(true);

  // Function to toggle the documents open and close based on current state
  const documentToggle = (uri) => {
    if (selectedUri === uri) {
      setSelectedUri("");
    }
    else {
      setSelectedUri(uri);
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header Title */}
      <Text style={styles.header}>Documents & Bills</Text>
      <Text style={styles.description}>Select a document or bill to view or download. </Text>

      {/* Conditional Rendering DOCUMENTS/BILLS */}
      {isDocumentsVisible ?
        (
          // Documents button pressed
          <View>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Documents</Text>
              {documentsList.map(doc => (
                <Card key={doc.key} title={doc.value} onPress={() => documentToggle(doc.uri)} expiryDate={doc.expiryDate} />
              ))}
            </View>
          </View>
        )
        :
        (
          // Bills button pressed
          <View>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Bills</Text>
              {billsList.map(bill => (
                <Card key={bill.key} title={bill.value} onPress={() => documentToggle(bill.uri)} />
              ))}
            </View>
          </View>
        )}


      {/* WEB VIEW PDF */}
      {selectedUri && (
        <View style={styles.webViewContainer}>
          {loading && <ActivityIndicator size="large" color={primaryColor} />}
          <WebView
            originWhitelist={['*']}
            source={{ uri: selectedUri }}
            style={styles.webView}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        </View>
      )}


      {/* View Toggle Buttons */}
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <ToggleButton text="Documents" onPress={() => setIsDocumentsVisible(true)} style={{ backgroundColor: isDocumentsVisible ? primaryColor : 'gray' }} />
        <ToggleButton text="Bills" onPress={() => setIsDocumentsVisible(false)} style={{ backgroundColor: !isDocumentsVisible ? primaryColor : 'gray' }} />
      </View>


      {/*History and budget buttons */}
      <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: "space-evenly" }}>
        <TouchableOpacity>
          <Image style={StylesHome.Icons} source={budgetIcon} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image style={StylesHome.Icons} source={historyIcon} />
        </TouchableOpacity>

      </View>

    </View>
  );
}


// Documents Card (might be moved to components)
const Card = ({ title, onPress, expiryDate, startDate, endDate }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{title}</Text>
    {expiryDate && <Text style={styles.expiryText}>Expiry: {expiryDate}</Text>}
    {startDate && endDate && (
      <Text style={styles.periodText}>Period: {startDate} - {endDate}</Text>
    )}
  </TouchableOpacity>
);

// Toggle Button (might be moved to components)
const ToggleButton = ({ text, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);



// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: primaryColor,
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  webViewContainer: {
    marginTop: 20,
    flex: 0,
    height: '45%',
  },
  expiryText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
