import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { SelectList } from 'react-native-dropdown-select-list';
import { LoginButton } from './components/Buttons';
import { KeyboardAvoidingView } from "react-native";


const primaryColor = "#3e1952";
const AppartmentImg = require("./assets/appartmentInside.jpg");
const ArrowDownIcon = require("./assets/arrowDownIcon.png");
const NfcScannerScreen = require("./assets/nfcScannerScreen.png");
const DoorHandleIcon = require("./assets/doorHandleIcon.png");

const apartments = [
  { key: 1, name: 'Apartment 1', occupied: true },
  { key: 2, name: 'Apartment 2', occupied: false },
  { key: 3, name: 'Apartment 3', occupied: true },
  { key: 4, name: 'Apartment 4', occupied: false },
  { key: 5, name: 'Apartment 5', occupied: true },
  { key: 6, name: 'Apartment 6', occupied: true },
];

export function Dashboard({ navigation }) {
  const occupiedCount = apartments.filter(apartment => apartment.occupied).length;
  const totalCount = apartments.length;
  const unoccupiedCount = totalCount - occupiedCount;
  const [viewApartment, setViewApartment] = useState(false);
  const [viewNfcModal, setViewNfcModal] = useState(false);

  const data = [
    {
      name: 'Occupied',
      population: occupiedCount,
      color: primaryColor,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Unoccupied',
      population: unoccupiedCount,
      color: 'white',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const dropdownData = apartments.map(apartment => ({
    key: apartment.key,
    value: apartment.name,
  }));

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Building Dashboard</Text>
      </View>

      {/* APPARTMENTS DROPDOWN LIST */}
      <SelectList
        data={dropdownData}
        placeholder="Select Apartment"
        searchPlaceholder="Search"
        dropdownStyles={{ borderRadius: 5 }}
        boxStyles={{ marginVertical: 10, borderRadius: 8 }}
        setSelected={(val) => console.log(val)} />

      {/* DATE VISUALIZATION */}
      <View style={styles.pieContainer}>
        <PieChart
          data={data}
          width={Dimensions.get('window').width - 50}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={{ borderRadius: 16 }}
          innerRadius="60%"
        />
      </View>

      {/* STATISTICS TEXT */}
      <View style={styles.statsContainer}>
        <Text style={styles.statTitle}>Apartment Statistics</Text>
        <Text style={styles.statText}>Total Apartments: <Text style={styles.statValue}>{totalCount}</Text></Text>
        <Text style={styles.statText}>Occupied: <Text style={styles.statValue}>{occupiedCount}</Text></Text>
        <Text style={styles.statText}>Unoccupied: <Text style={styles.statValue}>{unoccupiedCount}</Text></Text>
      </View>


      <View style={{ marginTop: "10%" }}></View>

      {/* VIEW BUTTON */}
      <LoginButton text={"View"} onPress={() => { setViewApartment(true); }} />



      {/* APPARTMENT MODAL */}
      <Modal
        visible={viewApartment}
        animationType="fade"
        presentationStyle="pageSheet"
        onRequestClose={() => setViewApartment(false)}>
        <View style={styles.modalContainer}>

          <View style={{ marginTop: "10%" }}></View>
          <Text style={styles.statTitle}> APPARTMENT: 1C09 </Text>
          <Image source={AppartmentImg} style={styles.image} />

          {/* DOOR OPEN ICON*/}
          <TouchableOpacity onPress={() => { setViewApartment(false), setViewNfcModal(true) }}>
            <Image source={DoorHandleIcon} style={{ height: 50, width: 50 }}>
            </Image>
          </TouchableOpacity>



          {/* Apartment Details Card */}
          <View style={styles.statsContainer}>
            <Text style={styles.statText}>Floor Level: 2</Text>
            <Text style={styles.statText}>Rooms: 3</Text>
            <Text style={styles.statText}>Bathrooms: 2</Text>
            <Text style={styles.statText}>Cost per Month: $1200</Text>
            <Text style={styles.statText}>Size: 1200 sq ft</Text>
            <Text style={styles.statText}>Location: Downtown</Text>
          </View>

          <View style={{ marginTop: "10%" }}></View>
          <LoginButton text={"Close"} onPress={() => { setViewApartment(false) }} />

        </View>
      </Modal>




      {/* NFC Scanner Modal */}
      <Modal
        visible={viewNfcModal}
        animationType="fade"
        onRequestClose={() => setViewNfcModal(false)}>

        <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#2c2c2c", padding: 10 }}>

          {/*Down Arrow Icon*/}
          <TouchableOpacity onPress={() => setViewNfcModal(false)} style={{ marginTop: 20 }}>
            <Image source={ArrowDownIcon} style={{ width: 35, height: 35, marginTop: '20%' }} />
          </TouchableOpacity>

          {/*Animated SCAN IMAGE*/}
          <Image source={NfcScannerScreen} style={{ height: '50%', width: '100%', borderRadius: 10 }} />

        </View>
      </Modal>
    </ScrollView>
  );
};



// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center', MIGHTNEED
    padding: 10,
  },
  header: {
    backgroundColor: primaryColor,
    padding: 20,
    borderRadius: 7,
    marginBottom: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#FFF",
  },
  pieContainer: {
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    padding: 10,
  },
  statsContainer: {
    marginTop: 20,
    //alignItems: 'center', MIGHTNEED
    padding: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  statTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 10,
  },
  statText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 5,
  },
  statValue:
  {
    fontWeight: 'bold',
    color: primaryColor,
  },

  // MODAL STYLING
  modalContainer:
  {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  image:
  {
    marginVertical: 10,
    height: '35%',
    width: '100%',
    borderRadius: 10,
  },

});

