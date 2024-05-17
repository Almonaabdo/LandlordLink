import {React,useState} from "react";
import { View, Text,Image, ScrollView, TouchableOpacity,Modal, TextInput,StatusBar} from "react-native";
import * as ImagePicker from "expo-image-picker"
import { SelectList } from 'react-native-dropdown-select-list'
import { LoginButton } from "./components/Buttons";

// Styles
import { StylesHome } from "./styles/stylesHome";
import { stylesLogin } from "./styles/stylesLogin";



// icons
const AppartmentImg = require("./assets/256LesterSt.jpg");
const icons = {
    WrenchIcon: require("./assets/wrenchIcon.png"),
    CloseIcon: require("./assets/close.png"),
    AddImagesLogo: require("./assets/addImagesLogo.png"),
    CameraLogo: require("./assets/cameraLogo.png"),
    GalleryLogo: require("./assets/galleryLogo.png"),
    NfcLogo: require("./assets/nfcLogo.png"),
    NfcCardLogo: require("./assets/nfcCardLogo.png"),
    ArrowDownIcon: require("./assets/arrowDownIcon.png"),
  };

export function HomeScreen({ navigation })
 {
    // Input Fields
    const [issueTitle, setIssueTitle] = useState("");
    const [issueDescription, setIssueDescription] = useState("");
    const [selected, setSelected] = useState("");
    const [image, setImage] = useState();

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

    //Modal Windows condition
    const [isMaintenanceVisible, setIsMaintenanceVisible] = useState(false);
    const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
    const [isNfcModalVisible, setIsNfcModalVisible] = useState(false);

    let imageResult = {};
    // function for image uploads from camera/gallery
    const uploadImage = async (mode) =>
    {
        try
        {
            // GALLERY MODE
            if (mode === "Gallery")
            {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                imageResult = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing:false,
                    aspect:[1,1],
                    quality:1,
                    allowsMultipleSelection:true,
                });
            }
            // CAMERA MODE
            else
            {
                await ImagePicker.requestCameraPermissionsAsync();
                imageResult = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.back,
                    allowsEditing:true,
                    aspect:[1,1],
                    quality:1,
                });
            }
        } // end of try
        catch(error)
        {
            console.log(error)
        }
        // user saved image
        if (!imageResult.canceled)
        {
            // save image
            await saveImage(imageResult.assets[0].uri);
        }
        // hide imagePicker modal window
        setImagePickerModalVisible(false);
    }


    const saveImage = async (image) =>
    {
        try
        {
            setImage(image);
        }
        catch(error)
        {
            console.log("saveImage: " + error)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white"}}>
            <StatusBar barStyle="light-content" />

            <View style={{ flexDirection: "row", alignItems: "center",justifyContent:"space-between"}}>
                    {/* MAINTAINENCE BUTTON */}
                    <TouchableOpacity onPress={() => { setIsMaintenanceVisible(true) }}>
                        <Image source={icons.WrenchIcon} style={StylesHome.Icons} />
                    </TouchableOpacity>

                    {/* NFC BUTTON */}
                    <TouchableOpacity onPress={() => {setIsNfcModalVisible(true); setTimeout(() => setIsNfcModalVisible(false), 5000)}}>
                        <Image source={icons.NfcLogo} style={[StylesHome.Icons, { marginLeft: 10 }]} />
                    </TouchableOpacity>
            </View>

            <ScrollView>
                <Text style={StylesHome.TextHeader}>256 Lester St N</Text>

                <Image source={AppartmentImg} style={StylesHome.AppartmentImage}/>


                {/* MAINTENCE REQUEST MODAL */}
                <Modal 
                visible={isMaintenanceVisible} 
                onRequestClose={()=> setIsMaintenanceVisible(false)} // Closes if Scrolled Down
                animationType="slide"
                presentationStyle="pageSheet">
                    
                    {/* CLOSE ICON */}
                    <TouchableOpacity onPress={() => {setIsMaintenanceVisible(false)}}>
                        <Image source={icons.closeIcon} style={StylesHome.IconsSmall}/>
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


                        {/* MAINTAINENCE LIST (MIGHT DELETE SECOND LINE)*/}
                        <SelectList 
                            setSelected={(val) => setSelected(val)}
                            selected = {selected}
                            data={maintainenceData}
                            boxStyles={{marginTop:25, width:'100%', borderColor:"purple"}}
                            save="value"/>

                        {/* IMAGE UPLOAD */}
                        <TouchableOpacity onPress={() => {setImagePickerModalVisible(true)}}> 
                            <Image source={icons.addImagesLogo} style={[StylesHome.AppartmentImage, {width:300,marginVertical:20, marginHorizontal:28}]}/>
                        </TouchableOpacity>

                        {/* PHOTO UPLOAD MODAL */}
                        <Modal
                        visible={imagePickerModalVisible}
                        animationType="slide"
                        transparent={true}
                        onDismiss={() =>setImagePickerModalVisible(false)}
                        onRequestClose={() => setImagePickerModalVisible(false)}>

                            {/* We use View inside a View to achieve horizontal centering */}
                            <View style={StylesHome.parentView}> 
                                <View style={StylesHome.ModalSmall}>

                                    {/* Camera Logo */}
                                    <TouchableOpacity onPress={() => uploadImage("Camera")}>
                                        <Image source={icons.cameraLogo} style={StylesHome.Icons}/>
                                    </TouchableOpacity>

                                    {/* Gallery Logo */}
                                    <TouchableOpacity onPress={() => uploadImage("Gallery")}>
                                        <Image source={icons.gallerylogo} style={StylesHome.Icons}/>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal>
                        <LoginButton text="Submit"/>
                    </View>
                </Modal>

                {/* NFC SCANNER MODAL */}
                <Modal 
                visible={isNfcModalVisible}
                animationType="slide"
                onRequestClose={()=> setIsNfcModalVisible(false)} // Closes if Scrolled Down
                presentationStyle="pageSheet">
                    
                    {/* CLOSE ICON */}
                    <TouchableOpacity onPress={() => {setIsNfcModalVisible(false)}}>
                        <View style={[StylesHome.parentView, {marginVertical:30}]}>
                            <Image source={icons.ArrowDownIcon} style={StylesHome.IconsSmall}/>
                        </View>
                        <Text style={StylesHome.TextHeader}>Scan your Lock!</Text>               
                    </TouchableOpacity>

                    <View style={StylesHome.parentView}>
                        <Image style={{width:450}} source={icons.NfcCardLogo}></Image>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
 }