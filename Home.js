import React, { useState } from "react";
import { RefreshControl, Text, Image, Animated, TouchableOpacity, Modal, TextInput, StatusBar, ScrollView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SelectList } from 'react-native-dropdown-select-list';
import { addDocument, fetchDocuments } from "./Functions";
import { useFocusEffect } from "@react-navigation/native";
import HomeCard from "./components/HomeCard";


// Icons
const AppartmentImg = require("./assets/256LesterSt.jpg");
const icons = {
  WrenchIcon: require("./assets/wrenchIcon.png"),
  CloseIcon: require("./assets/close.png"),
  AddImagesLogo: require("./assets/addImagesLogo.png"),
  CameraLogo: require("./assets/cameraLogo.png"),
  GalleryLogo: require("./assets/galleryLogo.png"),
  ArrowDownIcon: require("./assets/arrowDownIcon.png"),
  HouseImage: require("./assets/houseImage.png"),
  NfcScannerScreen: require("./assets/nfcScannerScreen.png"),
  DoorHandleIcon: require("./assets/doorHandleIcon.png"),
  announcementsBackground: require("./assets/announcementsBackground.jpg"),
  maintainenceBackground: require("./assets/maintainancebackground.jpg"),

};

export function HomeScreen({ navigation }) {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [selected, setSelected] = useState("");
  const [image, setImage] = useState();
  const [isMaintenanceVisible, setIsMaintenanceVisible] = useState(false);
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const [isNfcModalVisible, setIsNfcModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedPriority, setSelectedPriority] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const getRecentAnnouncements = async () => {
        try {
          const fetchedAnnouncements = await fetchDocuments("announcements");
          fetchedAnnouncements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setAnnouncements(fetchedAnnouncements);
        } catch (error) {
          console.error("Error fetching announcements: ", error);
        }
      };

      loadRequests();
      getRecentAnnouncements();
    }, [])
  );

  const loadRequests = async () => {
    try {
      setLoading(true);
      const fetchedRequests = await fetchDocuments("repairRequests");
      setRequestCount(fetchedRequests.length);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRepairRequestSubmit = async () => {
    if (!issueTitle || !issueDescription || !selected) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const repairRequestData = {
      title: issueTitle,
      description: issueDescription,
      type: selected,
      priority: selectedPriority,
      status: 'Pending',
      import: image || null,
      createdAt: new Date(),
    };

    try {
      await addDocument("repairRequests", repairRequestData);
      alert("Repair request submitted successfully.");
      // Reset fields after submission
      setIssueTitle("");
      setIssueDescription("");
      setSelected("");
      setImage(null);
      setIsMaintenanceVisible(false);
      loadRequests();
    } catch (error) {
      console.error("Error submitting repair request:", error);
      alert("Failed to submit repair request. Please try again.");
    }
  };

  const maintainenceData = [
    { key: '1', value: 'Pest control' },
    { key: '2', value: 'Electrical' },
    { key: '3', value: 'Water Leakage' },
    { key: '4', value: 'HVAC' },
    { key: '5', value: 'Appliances' },
    { key: '6', value: 'Flooring' },
    { key: '7', value: 'Doors/Windows' },
  ];

  const priorityData = [
    { key: '1', value: 'High' },
    { key: '2', value: 'Medium' },
    { key: '3', value: 'Low' },
  ];

  const startFading = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  };

  const handleNfcModalOpen = () => {
    setIsNfcModalVisible(true);
    startFading();
    setTimeout(() => setIsNfcModalVisible(false), 6000);
  };

  const uploadImage = async (mode) => {
    try {
      let imageResult = {};
      if (mode === "Gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        imageResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        imageResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });
      }

      if (!imageResult.canceled) {
        setImage(imageResult.assets[0].uri);
      }
      setImagePickerModalVisible(false);
    } catch (error) {
      console.log("Image upload error:", error);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#f5f5f5" }}
      contentContainerStyle={{ paddingBottom: 20 }}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={loadRequests} />}
    >
      <StatusBar barStyle="light-content" />

      {/* APPARTMENT NAME AND IMAGE */}
      <View style={{ alignItems: "center", padding: 2 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>256 Lester St N</Text>
        <Image source={AppartmentImg} style={{ width: '100%', height: 200, borderRadius: 12, marginTop: 10 }} />
      </View>

      {/* MAINTENANCE AND DOOR ICONS */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => setIsMaintenanceVisible(true)}>
          <Image source={icons.WrenchIcon} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNfcModalOpen}>
          <Image source={icons.DoorHandleIcon} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      </View>


      {/* Maintaincence Card */}
      <HomeCard
        title="Maintenance"
        description="Review Open Requests"
        imageUrl={icons.maintainenceBackground}
      />

      {/* Announcements Card */}
      <HomeCard
        title="Announcements"
        description="Read recent Announcements"
        imageUrl={icons.announcementsBackground}
      />


      {/* MAINTENANCE LIST */}
      <View style={{ padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Requests")} style={{ backgroundColor: "white", borderRadius: 12, padding: 16, elevation: 3 }}>
          <Text style={{ marginLeft: 10, fontSize: 16 }}>Maintenance Requests</Text>
          <Text style={{ marginLeft: 10, fontSize: 16 }}>Open Requests: {requestCount}</Text>
        </TouchableOpacity>

        {/* Announcements LIST */}
        <TouchableOpacity onPress={() => navigation.navigate("Announcements")}>
          <View style={{ backgroundColor: "#9B59B6", borderRadius: 12, padding: 16, elevation: 3, marginTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Recent Announcements</Text>
            {announcements.length > 0 ? (
              announcements.slice(0, 3).map((announcement) => (
                <View key={announcement.id} style={{ marginBottom: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{announcement.title}</Text>
                  <Text style={{ fontSize: 12, color: 'white' }}>{new Date(announcement.createdAt).toLocaleString()}</Text>
                </View>
              ))
            ) : (
              <Text style={{ color: 'white' }}>No announcements available</Text>
            )}
          </View>
        </TouchableOpacity>

      </View>

      {/* Maintenance Modal */}
      <Modal
        visible={isMaintenanceVisible}
        onRequestClose={() => setIsMaintenanceVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={{ padding: 16 }}>
          {/* Close Icon */}
          <TouchableOpacity onPress={() => setIsMaintenanceVisible(false)}>
            <Image source={icons.CloseIcon} style={{ width: 30, height: 30 }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Request Maintenance</Text>
          </TouchableOpacity>

          {/* Issue Title */}
          <TextInput
            placeholder="Issue Title"
            style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginTop: 10, padding: 8 }}
            value={issueTitle}
            onChangeText={setIssueTitle}
          />

          {/* Issue Description */}
          <TextInput
            placeholder="Issue Description"
            style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginTop: 10, padding: 8, height: 100 }}
            multiline
            value={issueDescription}
            onChangeText={setIssueDescription}
          />

          {/* Issue Type Dropdown */}
          <SelectList
            setSelected={setSelected}
            data={maintainenceData}
            placeholder="Select Issue Type"
            searchPlaceholder="Search"
            dropdownStyles={{ borderRadius: 5, marginTop: 10 }}
          />

          {/* Priority Dropdown */}
          <SelectList
            setSelected={setSelectedPriority}
            data={priorityData}
            placeholder="Select Priority"
            searchPlaceholder="Search"
            dropdownStyles={{ borderRadius: 5, marginTop: 10 }}
          />

          {/* Add Image Button */}
          <TouchableOpacity onPress={() => setImagePickerModalVisible(true)} style={{ backgroundColor: "#3498DB", borderRadius: 5, padding: 10, marginTop: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Add Image</Text>
          </TouchableOpacity>

          {/* IMAGE UPLOAD MODAL */}
          <Modal
            visible={imagePickerModalVisible}
            animationType="slide"
            transparent={true}
            onDismiss={() => setImagePickerModalVisible(false)}
            onRequestClose={() => setImagePickerModalVisible(false)}>

            {/* Centering the modal content */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center' }}>

                {/* Gallery Logo */}
                <TouchableOpacity onPress={() => uploadImage("Gallery")} style={{ marginVertical: 15 }}>
                  <Image source={icons.GalleryLogo} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>

                {/* Camera Logo */}
                <TouchableOpacity onPress={() => uploadImage("Camera")} style={{ marginVertical: 15 }}>
                  <Image source={icons.CameraLogo} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>

                {/* Close button or action can be added here if needed */}
                <TouchableOpacity onPress={() => setImagePickerModalVisible(false)} style={{ marginTop: 20 }}>
                  <Text style={{ color: 'blue' }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>


          {/* Submit Button */}
          <TouchableOpacity onPress={handleRepairRequestSubmit} style={{ backgroundColor: "#2ECC71", borderRadius: 5, padding: 10, marginTop: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Submit Request</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Image Picker Modal */}
      <Modal visible={imagePickerModalVisible} onRequestClose={() => setImagePickerModalVisible(false)} animationType="slide">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>Choose an option</Text>
          <TouchableOpacity onPress={() => uploadImage("Camera")}>
            <Image source={icons.CameraLogo} style={{ width: 100, height: 100 }} />
            <Text style={{ marginTop: 10 }}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => uploadImage("Gallery")} style={{ marginTop: 20 }}>
            <Image source={icons.GalleryLogo} style={{ width: 100, height: 100 }} />
            <Text style={{ marginTop: 10 }}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setImagePickerModalVisible(false)} style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, color: 'blue' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* NFC Scanner Modal */}
      <Modal
        visible={isNfcModalVisible}
        animationType="fade"
        onRequestClose={() => setIsNfcModalVisible(false)}
        presentationStyle="pageSheet">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#2c2c2c" }}>

          {/*Animated Image*/}
          <Animated.Image
            style={{
              width: 400,
              height: 300,
              opacity: fadeAnim,
              borderRadius: 20
            }}
            source={icons.NfcScannerScreen} />

          {/*Down Arrow Icon*/}
          <TouchableOpacity onPress={() => setIsNfcModalVisible(false)} style={{ marginTop: 20 }}>
            <Image source={icons.ArrowDownIcon} style={{ width: 35, height: 35 }} />
          </TouchableOpacity>
        </View>
      </Modal>

    </ScrollView>
  );
}
