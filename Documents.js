import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const documentsList = [
  { key: '1', value: 'Lease Document', uri: 'https://css4.pub/2015/icelandic/dictionary.pdf' },
  { key: '2', value: 'Contract Document', uri: 'https://css4.pub/2015/icelandic/dictionary.pdf' },
  { key: '3', value: 'Agreement Document', uri: 'https://css4.pub/2015/icelandic/dictionary.pdf' },
];

const billsList = [
  { key: '1', value: 'Hydro Bill', uri: 'https://css4.pub/2015/icelandic/dictionary.pdf' },
  { key: '2', value: 'Water Bill', uri: 'https://css4.pub/2015/icelandic/dictionary.pdf' },
  { key: '3', value: 'AC Bill', uri: 'https://css4.pub/2015/icelandic/dictionary.pdf' },
];

export function Documents({ navigation }) {
  const [selectedUri, setSelectedUri] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDocumentsVisible, setIsDocumentsVisible] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.header}>Documents & Bills</Text>
      <Text style={styles.description}>Select a document or bill to view or download. </Text>

      {/* Conditional Rendering */}
      {isDocumentsVisible ? (
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Documents</Text>
            {documentsList.map(doc => (
              <Card key={doc.key} title={doc.value} onPress={() => setSelectedUri(doc.uri)} />
            ))}
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Bills</Text>
            {billsList.map(bill => (
              <Card key={bill.key} title={bill.value} onPress={() => setSelectedUri(bill.uri)} />
            ))}
          </View>
        </View>
      )}


      {/* Conditional view for PDF */}
      {selectedUri && (
        <View style={styles.webViewContainer}>
          {loading && <ActivityIndicator size="large" color="#3e1952" />}
          <WebView
            originWhitelist={['*']}
            source={{ uri: selectedUri }}
            style={styles.webView}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        </View>
      )}

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <CustomButton text="Documents" onPress={() => setIsDocumentsVisible(true)} style={{ backgroundColor: isDocumentsVisible ? '#3e1952' : 'gray' }} />
        <CustomButton text="Bills" onPress={() => setIsDocumentsVisible(false)} style={{ backgroundColor: !isDocumentsVisible ? '#3e1952' : 'gray' }} />
      </View>

    </View>
  );
}

const Card = ({ title, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{title}</Text>
  </TouchableOpacity>
);

const CustomButton = ({ text, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3e1952',
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
    color: '#3e1952',
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
    backgroundColor: '#3e1952',
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
});
