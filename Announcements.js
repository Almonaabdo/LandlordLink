import {React} from "react";
import {View, Text,Image, ScrollView, TouchableOpacity, Modal, TextInput,StatusBar} from "react-native";
import AnnouncementCard from "./components/AnnouncementCard.js";


export function AnnouncementsScreen ({navigation})
{
    return(
        <ScrollView style={{flex:1,padding:20,backgroundColor:"#f9f9f9"}}>
            <StatusBar barStyle="light-content" />

            <TouchableOpacity>
                <AnnouncementCard
                    title="Announcement Title 1"
                    details="Details about the first announcement go here."
                    timeAgo="2 hours ago">
                </AnnouncementCard>
            </TouchableOpacity>

            <TouchableOpacity>
                <AnnouncementCard
                    title="Announcement Title 1"
                    details="Details about the first announcement go here."
                    timeAgo="2 hours ago">
                </AnnouncementCard>
            </TouchableOpacity>

        </ScrollView>
    );
}
