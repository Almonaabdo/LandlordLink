import {React,useState} from "react";
import { View, Text,Image, ScrollView, TouchableOpacity,Modal, TextInput} from "react-native";

import { StylesHome } from "./styles/stylesHome";
import { stylesLogin } from "./styles/stylesLogin";
import { SelectList } from 'react-native-dropdown-select-list'
import { LoginButton } from "./components/Buttons";


// icons
const AppartmentImg = require("./assets/256LesterSt.jpg")
const WrenchIcon = require("./assets/wrenchIcon.png")
const closeIcon = require("./assets/close.png")
const addImagesLogo = require("./assets/addImagesLogo.png")

export function HomeScreen({ navigation })
 {
    // fields
    const [issueTitle, setIssueTitle] = useState("");
    const [issueDescription, setIssueDescription] = useState("");

    const [selected, setSelected] = useState("");

    //{key:'1', value:'Mobiles', disabled:true},
    const maintainenceData = [
      {key:'1', value:'Pest control'},
      {key:'2', value:'Electrical'},
      {key:'3', value:'Water Leakage'},
      {key:'4', value:'HVAC'},
      {key:'5', value:'Appliances'},
      {key:'6', value:'Flooring'},
      {key:'7', value:'Doors/Windows'},
    ]


    const [isModalVisible, setIsModalVisible] = useState(false);
    const openMaintainenceModal = () => 
    {
      setIsModalVisible(true);
    };
    const closeMaintainenceModal = () =>
    {
      setIsModalVisible(false);
    };
    return (
        <View style={{ flex: 1, backgroundColor: "white"}}>
            <Image source={AppartmentImg} style={StylesHome.AppartmentImage}/>
            <ScrollView>
                <Text style={StylesHome.TextHeader}>256 Lester St N</Text>

                {/* MAINTENCE REQUEST ICON */}
                <TouchableOpacity onPress={() => {openMaintainenceModal()}}>
                    <Image source={WrenchIcon} style={StylesHome.Icons}/>                 
                </TouchableOpacity>


                {/* MAINTENCE REQUEST WINDOW */}
                <Modal 
                visible={isModalVisible} 
                onRequestClose={closeMaintainenceModal} // Closes if Scrolled Down
                animationType="slide"
                presentationStyle="pageSheet">
                    
                    {/* CLOSE ICON */}
                    <TouchableOpacity onPress={() => {closeMaintainenceModal()}}>
                        <Image source={closeIcon} style={StylesHome.IconsSmall}/>
                        <Text style={StylesHome.TextHeader}>Request Maintenence</Text>               
                    </TouchableOpacity>

                    <View style={stylesLogin.container}>
                        {/* Issue Title*/}
                        <TextInput
                        placeholder="Issue Title"
                        style={stylesLogin.textInput}
                        onChangeText={(text) => {setIssueTitle(text)}}
                        value={issueTitle}
                        />

                        {/* Issue Description*/}
                        <TextInput
                        placeholder="Issue Description"
                        style={[stylesLogin.textInput, {height: 200}]}
                        onChangeText={(text) => {setIssueDescription(text)}}
                        value={issueDescription}
                        />


                        {/* MAINTAINENCE LIST */}
                        <SelectList 
                            setSelected={(val) => setSelected(val)} 
                            data={maintainenceData}
                            boxStyles={{marginTop:25, width:'100%', borderColor:"purple"}}
                            save="value"/>


                        <TouchableOpacity onPress={() => {closeMaintainenceModal()}}> 
                            <Image source={addImagesLogo} style={[StylesHome.AppartmentImage, {width:300,marginVertical:20, marginHorizontal:28}]}/>
                        </TouchableOpacity>

                        <LoginButton text="Submit"/>


                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
 }