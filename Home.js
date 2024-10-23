import { React, useState } from "react";
import { View, Text, Image, Animated, TouchableOpacity, Modal, TextInput, StatusBar } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SelectList } from 'react-native-dropdown-select-list';
import { LoginButton } from "./components/Buttons";

// Icons
const AppartmentImg = require("./assets/256LesterSt.jpg");
const icons = {
    WrenchIcon: require("./assets/wrenchIcon.png"),
    CloseIcon: require("./assets/close.png"),
    AddImagesLogo: require("./assets/addImagesLogo.png"),
    CameraLogo: require("./assets/cameraLogo.png"),
    GalleryLogo: require("./assets/galleryLogo.png"),
    NfcLogo: require("./assets/nfcLogo.png"),
    ArrowDownIcon: require("./assets/arrowDownIcon.png"),
    HouseImage: require("./assets/houseImage.png"),
    NfcScannerScreen: require("./assets/nfcScannerScreen.png"),
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

    // Sample data for recent announcements
    const recentAnnouncements = [
        {
            title: "Planned Maintenance",
            details: "There will be a planned maintenance on the heating system this Friday."
        },
        {
            title: "New Gym Hours",
            details: "The gym will now be open from 6 AM to 10 PM."
        }
    ];

    const maintainenceData = [
        { key: '1', value: 'Pest control' },
        { key: '2', value: 'Electrical' },
        { key: '3', value: 'Water Leakage' },
        { key: '4', value: 'HVAC' },
        { key: '5', value: 'Appliances' },
        { key: '6', value: 'Flooring' },
        { key: '7', value: 'Doors/Windows' },
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
                    aspect: [1, 1],
                    quality: 1,
                    allowsMultipleSelection: true,
                });
            } else {
                await ImagePicker.requestCameraPermissionsAsync();
                imageResult = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.back,
                    allowsEditing: true,
                    aspect: [1, 1],
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
        <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 16 }}>
            <StatusBar barStyle="light-content" />
            <View style={{ marginBottom: 20, alignItems: "center" }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>256 Lester St N</Text>
                <Image source={AppartmentImg} style={{ width: '100%', height: 200, borderRadius: 12, marginTop: 10 }} />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
                <TouchableOpacity onPress={() => setIsMaintenanceVisible(true)}>
                    <Image source={icons.WrenchIcon} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNfcModalOpen}>
                    <Image source={icons.NfcLogo} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 20, color: '#666', marginVertical: 10 }}>Maintenance Requests</Text>

            <View style={{ backgroundColor: "white", borderRadius: 12, padding: 16, elevation: 3 }}>
                <TouchableOpacity onPress={() => setIsMaintenanceVisible(true)} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                    <Image source={icons.WrenchIcon} style={{ width: 30, height: 30 }} />
                    <Text style={{ marginLeft: 10, fontSize: 16 }}>New Maintenance Request</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 16 }}>Home Visits: 25</Text>
                    <Text style={{ fontSize: 16 }}>Current Requests: 25</Text>
                </View>
            </View>

            {/* Recent Announcements Section */}
            <View style={{ backgroundColor: "#9B59B6", borderRadius: 12, padding: 16, elevation: 3, marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10,color:'white' }}>Recent Announcements</Text>
                  <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold',color:'white' }}>Planned Maintenance</Text>
                    <Text style={{ fontSize: 14, color: 'white' }}>There will be a schedueled  maintainence between the times of the first adn second...</Text>
                  </View>
            </View>

            {/* Maintenance Modal */}
            <Modal
                visible={isMaintenanceVisible}
                onRequestClose={() => setIsMaintenanceVisible(false)}
                animationType="slide"
                presentationStyle="pageSheet">
                <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
                    <TouchableOpacity onPress={() => setIsMaintenanceVisible(false)}>
                        <Image source={icons.CloseIcon} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, marginVertical: 20 }}>Request Maintenance</Text>

                    <TextInput
                        placeholder="Issue Title"
                        placeholderTextColor="black"
                        style={{
                            borderColor: '#ccc',
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 10,
                            backgroundColor: "#f9f9f9"
                        }}
                        onChangeText={setIssueTitle}
                        value={issueTitle}
                    />
                    <TextInput
                        placeholder="Issue Description"
                        placeholderTextColor="black"
                        style={{
                            borderColor: '#ccc',
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 12,
                            height: 100,
                            marginBottom: 10,
                            backgroundColor: "#f9f9f9"
                        }}
                        onChangeText={setIssueDescription}
                        value={issueDescription}
                    />
                    <SelectList
                        setSelected={setSelected}
                        selected={selected}
                        data={maintainenceData}
                        boxStyles={{ marginVertical: 20, borderColor: '#3e1952', borderRadius: 8 }}
                        save="value" />

                    <TouchableOpacity onPress={() => setImagePickerModalVisible(true)} style={{ alignItems: 'center' }}>
                        <Image source={icons.AddImagesLogo} style={{ width: 200, height: 200 }} />
                    </TouchableOpacity>

                    {/* Image Picker Modal */}
                    <Modal
                    visible={imagePickerModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setImagePickerModalVisible(false)}>
                      <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
                        activeOpacity={1}
                        onPress={() => setImagePickerModalVisible(false)}>
                        <TouchableOpacity style={{ width: 300, backgroundColor: 'white', borderRadius: 12, padding: 20, flexDirection: 'row', justifyContent: 'space-around' }} activeOpacity={1}>
                          {/* GALLERY */}
                          <TouchableOpacity onPress={() => uploadImage("Gallery")} style={{ marginBottom: 10 }}>
                            <Image source={icons.GalleryLogo} style={{ width: 50, height: 50 }} />
                          </TouchableOpacity>

                          {/* CAMERA */}
                          <TouchableOpacity onPress={() => uploadImage("Camera")}>
                            <Image source={icons.CameraLogo} style={{ width: 50, height: 50 }} />
                          </TouchableOpacity>
                        </TouchableOpacity>
                    </TouchableOpacity>
                  </Modal>

                  <LoginButton text="Submit" onPress={() => setIsMaintenanceVisible(false)} />
                </View>
            </Modal>

            {/* NFC Scanner Modal */}
            <Modal
              visible={isNfcModalVisible}
              animationType="fade"
              onRequestClose={() => setIsNfcModalVisible(false)}
              presentationStyle="pageSheet">
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Animated.Image
                  style={{
                  width: 300,
                  height: 300,
                  opacity: fadeAnim,
                  }}
                  source={icons.NfcScannerScreen}/>
                <TouchableOpacity onPress={() => setIsNfcModalVisible(false)} style={{ marginTop: 20 }}>
                    <Image source={icons.ArrowDownIcon} style={{ width: 35, height: 35 }} />
                </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
