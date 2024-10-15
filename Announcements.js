import {React,useState} from "react";
import {View, Text,Image, ScrollView, TouchableOpacity, Modal, TextInput,StatusBar} from "react-native";
import AnnouncementCard from "./components/AnnouncementCard.js";
import { StylesHome } from "./styles/stylesHome.js";
import { stylesLogin } from "./styles/stylesLogin.js";
import { LoginButton } from "./components/Buttons.js";

const penIcon = require("./assets/penIcon.png");
const CloseIcon= require("./assets/close.png");


export function AnnouncementsScreen ({navigation})
{
    const [isCreatePost, setIsCreatePost] = useState(false);

    // Announcements Input Fields
    const [announcementTitle, setAnnouncementTitle] = useState("");
    const [announcementDetails, setAnnouncementDetails] = useState("");
    const [viewError, setViewError] = useState(0);

    return(
        <ScrollView style={{flex:1,padding:20,backgroundColor:"#f9f9f9"}}>
            
            {/* Post Announcement Icon*/} 
            <TouchableOpacity onPress={() => {setIsCreatePost(true)}}>
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



           {/* Writing Announcement MODAL */}
            <Modal 
                visible={isCreatePost} 
                onRequestClose={()=> setIsCreatePost(false)} // Closes if Scrolled Down
                animationType="slide"
                presentationStyle="pageSheet">
                    
                    {/* CLOSE ICON */}
                    <TouchableOpacity onPress={() => {setIsCreatePost(false)}}>
                        <Image source={CloseIcon} style={StylesHome.IconsSmall}/>
                        <Text style={StylesHome.TextHeader}>Write Announcement</Text>               
                    </TouchableOpacity>

                    <View style={stylesLogin.container}>
                        {/* Issue Title*/}
                        <TextInput
                        placeholder="Announcement Title"
                        style={stylesLogin.textInput}
                        placeholderTextColor="black"
                        onChangeText={(text) => 
                        {
                          setAnnouncementTitle(text);
                          setViewError(0); // Reset error state only when typing
                        }}                        
                        value={announcementTitle}
                        />

                        {/* Issue Description*/}
                        <TextInput
                        placeholder="Announcement Details"
                        style={[stylesLogin.textInput, {height: 150}]}
                        placeholderTextColor="black"
                        onChangeText={(text) => 
                        {
                          setAnnouncementDetails(text);
                          setViewError(0); // Reset error state only when typing
                        }}
                        value={announcementDetails}
                        />

                        <LoginButton text="Post"  onPress={() => isFormValid()} />

                        {/* VALIDATING FORM */}
                        {viewError === -1 &&<Text style={stylesLogin.textError}>Please fill in required fields</Text>}

                    </View>

            </Modal>
        </ScrollView>
    );

  function isFormValid()
  {
  if (announcementDetails === "" || announcementTitle ==="")
  {
      setViewError(-1);
      return
  }
  setViewError(1);
  setTimeout(closePostModal, 350); //0.3 s
  }

  function closePostModal() 
  {
  setIsCreatePost(false);
  setViewError(0);
  }

}