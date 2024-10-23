import { React, useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, TextInput, StatusBar } from "react-native";
import AnnouncementCard from "./components/AnnouncementCard.js";
import { StylesHome } from "./styles/stylesHome.js";
import { stylesLogin } from "./styles/stylesLogin.js";
import { LoginButton } from "./components/Buttons.js";
import { addDocument, fetchDocuments } from "./Functions.js"; // Ensure fetchDocuments is included

const penIcon = require("./assets/penIcon.png");
const CloseIcon = require("./assets/close.png");


export function AnnouncementsScreen({ navigation }) {
    const [isCreatePost, setIsCreatePost] = useState(false);

    // Announcements Input Fields
    const [announcementTitle, setAnnouncementTitle] = useState("");
    const [announcementDetails, setAnnouncementDetails] = useState("");
    const [viewError, setViewError] = useState(0);
    const [announcements, setAnnouncements] = useState([]); // State to hold announcements

    // Fetch announcements when the component mounts
    useEffect(() => {
        const getAnnouncements = async () => {
            try {
                const fetchedAnnouncements = await fetchDocuments("announcements"); // Ensure this function fetches your data correctly
                setAnnouncements(fetchedAnnouncements);
            } catch (error) {
                console.error("Error fetching announcements: ", error);
            }
        };

        getAnnouncements();
    }, []);


    const handleAccouncementSubmit = async () => {
        // Check for empty fields
        if (!announcementTitle || !announcementDetails) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        const announcementData = {
            title: announcementTitle,
            details: announcementDetails,
            createdAt: new Date(),
        };

        try {
            await addDocument("announcements", announcementData);
            alert("Announcement submitted succesfully.");

            // Reset fields
            setAnnouncementTitle("");
            setAnnouncementDetails("");

            // Fetch updated announcements
            const fetchedAnnouncements = await fetchDocuments("announcements");
            setAnnouncements(fetchedAnnouncements);
        }
        catch (error) {
            console.log("Error submitting announcement.", error);
            alert("Failed to submit announcement. Please try again later.");
        }
    };

    return (
        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#f9f9f9" }}>

            {/* Post Announcement Icon*/}
            <TouchableOpacity onPress={() => { setIsCreatePost(true) }}>
                <Image source={penIcon} style={[StylesHome.smallImage]}></Image>
            </TouchableOpacity>

            <AnnouncementCard
                title="Announcement Title 1"
                details="Details about the first announcement go here.Details about first announcement go here.Details about the first announcement go here.Details about the first announcement go here."
                timeAgo="2 hours ago">
            </AnnouncementCard>

            <AnnouncementCard
                title="Announcement Title 1"
                details="Details about the first announcement go here.qweqweqweqweqwe"
                timeAgo="2 hours ago">
            </AnnouncementCard>

            {/* Display fetched announcements */}
            {announcements.map((announcement, index) => (
                <AnnouncementCard
                    key={index}
                    title={announcement.title}
                    details={announcement.details}
                    timeAgo={announcement.createdAt.toLocaleString()} // Use createdAt directly
                    />
            ))}


            {/* Writing Announcement MODAL */}
            <Modal
                visible={isCreatePost}
                onRequestClose={() => setIsCreatePost(false)} // Closes if Scrolled Down
                animationType="slide"
                presentationStyle="pageSheet">

                {/* CLOSE ICON */}
                <TouchableOpacity onPress={() => { setIsCreatePost(false) }}>
                    <Image source={CloseIcon} style={StylesHome.IconsSmall} />
                    <Text style={StylesHome.TextHeader}>Write Announcement</Text>
                </TouchableOpacity>

                <View style={stylesLogin.container}>
                    {/* Issue Title*/}
                    <TextInput
                        placeholder="Announcement Title"
                        style={stylesLogin.textInput}
                        placeholderTextColor="black"
                        onChangeText={(text) => {
                            setAnnouncementTitle(text);
                            setViewError(0); // Reset error state only when typing
                        }}
                        value={announcementTitle}
                    />

                    {/* Issue Description*/}
                    <TextInput
                        placeholder="Announcement Details"
                        style={[stylesLogin.textInput, { height: 150 }]}
                        placeholderTextColor="black"
                        onChangeText={(text) => {
                            setAnnouncementDetails(text);
                            setViewError(0); // Reset error state only when typing
                        }}
                        value={announcementDetails}
                    />

                    <LoginButton text="Post" onPress={handleAccouncementSubmit} />

                    {/* VALIDATING FORM */}
                    {viewError === -1 && <Text style={stylesLogin.textError}>Please fill in required fields</Text>}

                </View>

            </Modal>
        </ScrollView>
    );

    function isFormValid() {
        if (announcementDetails === "" || announcementTitle === "") {
            setViewError(-1);
            return
        }
        setViewError(1);
        setTimeout(closePostModal, 350); //0.3 s
    }

    function closePostModal() {
        setIsCreatePost(false);
        setViewError(0);
    }

}