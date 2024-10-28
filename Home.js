import React, { useState } from "react"; // Ensure React is imported properly
import { RefreshControl, Text, Image, Animated, TouchableOpacity, Modal, TextInput, StatusBar, ScrollView, View } from "react-native"; // Removed View and imported ScrollView from react-native
import * as ImagePicker from "expo-image-picker";
import { SelectList } from 'react-native-dropdown-select-list';
import { addDocument, fetchDocuments } from "./Functions";
import { useFocusEffect } from "@react-navigation/native";
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

	// Function to fetch repair requests from Firebase and update request count
	const loadRequests = async () => {
		try {
			setLoading(true);
			const fetchedRequests = await fetchDocuments("repairRequests");
			setRequestCount(fetchedRequests.length); // Update the request count
		} catch (error) {
			console.error("Error fetching requests:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleRepairRequestSubmit = async () => {
		// Make sure not empty
		if (!issueTitle || !issueDescription || !selected) {
			alert("Please fill in all fields before submitting.");
			return;
		}

		// Populate the data to be sent
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

			// Reset the fields after submission
			setIssueTitle("");
			setIssueDescription("");
			setSelected("");
			setImage(null);
			setIsMaintenanceVisible(false); // Close the modal

			loadRequests();
		}
		catch (error) {
			console.error("Error submitting repair request:", error);
			alert("Failed to submit repair request. Please try again.");
		}
	};

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
		<ScrollView style={{ backgroundColor: "#f5f5f5" }} contentContainerStyle={{ paddingBottom: 20 }} refreshControl={<RefreshControl refreshing={loading} onRefresh={loadRequests} />}>
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

			{/* MAINTENANCE Card */}
			<View style={{ padding: 16 }}>
				<TouchableOpacity onPress={() => navigation.navigate("Requests")} style={{ backgroundColor: "white", borderRadius: 12, padding: 16, elevation: 3 }}>
					<Text style={{ marginLeft: 10, fontSize: 16 }}>Maintenance Requests</Text>
					<Text style={{ marginLeft: 10, fontSize: 16 }}>Open Requests: {requestCount}</Text>
				</TouchableOpacity>

				{/* Announcements Card */}
				<TouchableOpacity onPress={() => navigation.navigate("Announcements")}>
					<View style={{ backgroundColor: "#9B59B6", borderRadius: 12, padding: 16, elevation: 3, marginTop: 20 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Recent Announcements</Text>
						{announcements.length > 0 ? (
							announcements.slice(0, 3).map((announcement) => ( // Display the latest 3 announcements
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
			<Modal visible={isMaintenanceVisible} animationType="slide" onRequestClose={() => setIsMaintenanceVisible(false)}>
				<ScrollView style={{ padding: 20 }}>
					<Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Request Maintenance</Text>
					<TextInput
						style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
						placeholder="Title"
						value={issueTitle}
						onChangeText={setIssueTitle}
					/>
					<TextInput
						style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
						placeholder="Description"
						value={issueDescription}
						onChangeText={setIssueDescription}
					/>
					<SelectList
						setSelected={setSelected}
						data={maintainenceData}
						placeholder="Select Maintenance Type"
						searchPlaceholder="Search..."
					/>
					<SelectList
						setSelected={setSelectedPriority}
						data={priorityData}
						placeholder="Select Priority"
						searchPlaceholder="Search..."
					/>
					<TouchableOpacity onPress={() => setImagePickerModalVisible(true)}>
						<Image source={icons.AddImagesLogo} style={{ width: 50, height: 50 }} />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleRepairRequestSubmit} style={{ backgroundColor: "#4CAF50", borderRadius: 5, padding: 10, marginTop: 10 }}>
						<Text style={{ color: "white", textAlign: "center" }}>Submit Request</Text>
					</TouchableOpacity>
				</ScrollView>
			</Modal>

			{/* NFC Modal */}
			<Modal visible={isNfcModalVisible} animationType="slide" transparent={true}>
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Animated.View style={{ opacity: fadeAnim, backgroundColor: "black", padding: 20, borderRadius: 10 }}>
						<Text style={{ color: "white" }}>NFC Scanning is in progress...</Text>
					</Animated.View>
				</View>
			</Modal>

			{/* Image Picker Modal */}
			<Modal visible={imagePickerModalVisible} animationType="slide" onRequestClose={() => setImagePickerModalVisible(false)}>
				<ScrollView contentContainerStyle={{ padding: 20 }}>
					<Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Upload Image</Text>
					<TouchableOpacity onPress={() => uploadImage("Camera")} style={{ marginVertical: 10 }}>
						<Text style={{ textAlign: 'center', color: "blue" }}>Take Photo</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => uploadImage("Gallery")} style={{ marginVertical: 10 }}>
						<Text style={{ textAlign: 'center', color: "blue" }}>Choose from Gallery</Text>
					</TouchableOpacity>
				</ScrollView>
			</Modal>
		</ScrollView>
	);
}
