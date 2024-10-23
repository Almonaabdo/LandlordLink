import { React, useState } from "react";
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet } from "react-native";
import { Linking } from "react-native";

// icons
const emailIcon = require("./assets/emailIcon.png");
const callIcon = require("./assets/callIcon.png");
const mapsIcon = require("./assets/mapsIcon.png");
const personImage = require("./assets/person.jpg");

// Divider component
const Divider = () => (
  <View style={styles.divider} />
);

export function Contact({ navigation }) {
  const leasingOfficeAddress = "150 University Ave W. - Unit 4, Waterloo";
  const propertyManagementOffice = "The HUB - 130 Columbia St W, Waterloo";

  return (
    
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />


      {/*Contact Person Section */}
      <View style={styles.header}>
        <Image source={personImage} style={styles.profileImage} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerName}>Paul S</Text>
          <Text style={styles.headerRole}>Building Manager</Text>
        </View>
      </View>
      <Divider />


      {/*MANAGMENT OFFICE */}
      <Section title="Management Office" hours="Monday - Friday: 10am - 5pm">
        <ContactLink
          icon={emailIcon}
          text="maintenance@accommod8u.com"
          onPress={() => Linking.openURL('mailto:support@example.com?subject=Property Inspection Request&body=Hello Accommod8u, hope this email finds you well')}/>

        <ContactLink
          icon={mapsIcon}
          text="The HUB - 130 Columbia St W, Waterloo"
          onPress={() => openGoogleMaps(propertyManagementOffice)}/>
      </Section>


      {/*LEASING OFFICE */}
      <Section title="Leasing Office" hours="Monday - Friday: 10am - 6pm">
        <ContactLink
          icon={callIcon}
          text="+1 (226) 898-0000"
          onPress={() => Linking.openURL(`tel:2268980000`)}/>

        <ContactLink
          icon={emailIcon}
          text="leasing@accommod8u.com"
          onPress={() => Linking.openURL('mailto:support@example.com?subject=Property Inspection Request&body=Hello Accommod8u, hope this email finds you well')}/>

        <ContactLink
          icon={mapsIcon}
          text="150 University Ave W. - Unit 4, Waterloo"
          onPress={() => openGoogleMaps(leasingOfficeAddress)}/>

      </Section>
    </View>
  );
}

// Contact link component
const ContactLink = ({ icon, text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.contactLink}>
    <Image source={icon} style={styles.linkIcon} />
    <Text style={styles.linkText}>{text}</Text>
  </TouchableOpacity>
);


// Section component
const Section = ({ title, hours, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionHours}>{hours}</Text>
    {children}
  </View>
);


// Function to open Google Maps
const openGoogleMaps = (address) => 
{
  const formattedAddress = encodeURIComponent(address);
  const url = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
  Linking.openURL(url);
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: '2%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4%',
  },
  profileImage: {
    width: 99,
    height: 99,
    borderRadius: 99,
    marginRight: '5%',
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  headerName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRole: {
    fontSize: 18,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f0eff5',
    padding: 10,
    borderRadius: 5,
  },
  sectionHours: {
    fontSize: 16,
    color: '#888',
    marginVertical: 4,
  },
  contactLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  linkIcon: {
    width: '7%',
    height: '150%',
    marginRight: '2%',
  },
  linkText: {
    fontSize: 14,
    color: '#0D47A1',
  },
});