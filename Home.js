import {React,useState} from "react";
import { View, Text,Image, Animated,ScrollView, TouchableOpacity,Modal, TextInput,StatusBar} from "react-native";
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
    NfcScannerScreen: require("./assets/nfcScannerScreen.png")
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

//================== IMAGE ANIMATION====================================================
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity set to 0
    const startFading = () => {
        // Loop for fade in and fade out
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800, // Duration for fade in ms
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 800, // Duration for fade out ms
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };
    // Call startFading when the NFC modal is shown
    const handleNfcModalOpen = () => {
        setIsNfcModalVisible(true);
        startFading();
        setTimeout(() => setIsNfcModalVisible(false), 6000); // closes the NFC modal again for security purposes
    };
//=====================================================================================
    return (
        <View style={{ flex: 1, backgroundColor: "white"}}>
            <StatusBar barStyle="light-content"/>
            <View>

              <View style={{ flexDirection: "row", alignItems: "center",justifyContent:"space-between"}}>
                  {/* MAINTAINENCE BUTTON */}
                  <TouchableOpacity onPress={() => { setIsMaintenanceVisible(true) }}>
                      <Image source={icons.WrenchIcon} style={StylesHome.Icons} />
                  </TouchableOpacity>

                  {/* NFC BUTTON */}
                  <TouchableOpacity onPress={handleNfcModalOpen}>
                      <Image source={icons.NfcLogo} style={[StylesHome.Icons, { marginLeft: 10 }]} />
                  </TouchableOpacity>
              </View>

                {/* Appartment */}
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
                        <Image source={icons.CloseIcon} style={StylesHome.IconsSmall}/>
                        <Text style={StylesHome.TextHeader}>Request Maintenence</Text>               
                    </TouchableOpacity>

                    <View style={stylesLogin.container}>
                        {/* Issue Title*/}
                        <TextInput
                        placeholder="Issue Title"
                        style={stylesLogin.textInput}
                        placeholderTextColor="black"
                        onChangeText={(text) => {setIssueTitle(text)}}
                        value={issueTitle}
                        />

                        {/* Issue Description*/}
                        <TextInput
                        placeholder="Issue Description"
                        style={[stylesLogin.textInput, {height: 150}]}
                        placeholderTextColor="black"
                        onChangeText={(text) => {setIssueDescription(text)}}
                        value={issueDescription}
                        />


                        {/* MAINTAINENCE LIST (MIGHT DELETE SECOND LINE)*/}
                        <SelectList 
                            setSelected={(val) => setSelected(val)}
                            selected = {selected}
                            data={maintainenceData}
                            boxStyles={{marginTop:25, width:'100%', borderColor:'#3e1952'}}
                            save="value"/>

                        {/* IMAGE UPLOAD */}
                        <TouchableOpacity onPress={() => {setImagePickerModalVisible(true)}}> 
                            <Image source={icons.AddImagesLogo} style={[StylesHome.AppartmentImage, {width:200,marginVertical:20, marginHorizontal:68}]}/>
                        </TouchableOpacity>

                        {/* IMAGE UPLOAD MODAL */}
                        <Modal
                        visible={imagePickerModalVisible}
                        animationType="slide"
                        transparent={true}
                        onDismiss={() =>setImagePickerModalVisible(false)}
                        onRequestClose={() => setImagePickerModalVisible(false)}>

                            {/* We use View inside a View to achieve horizontal centering */}
                            <View style={StylesHome.parentView}> 
                                <View style={StylesHome.ModalSmall}>

                                    {/* Gallery Logo */}
                                    <TouchableOpacity onPress={() => uploadImage("Gallery")}>
                                        <Image source={icons.GalleryLogo} style={[StylesHome.Icons, {marginHorizontal: -30,marginVertical:15}]}/>
                                    </TouchableOpacity>


                                    {/* Camera Logo */}
                                    <TouchableOpacity onPress={() => uploadImage("Camera")}>
                                        <Image source={icons.CameraLogo} style={[StylesHome.Icons, { marginVertical:15}]}/>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal>

                        <LoginButton text="Submit"  onPress={() => setTimeout(() => setIsMaintenanceVisible(false), 250)} />
                            
                    </View>
                </Modal>

                {/* NFC SCANNER MODAL */}
                <Modal 
                visible={isNfcModalVisible}
                animationType="fade"
                onRequestClose={() => setIsNfcModalVisible(false)}
                presentationStyle="pageSheet">
                
                <TouchableOpacity onPress={() => { setIsNfcModalVisible(false) }}>
                    <View style={[StylesHome.parentView, { marginVertical: 30 }]}>
                        <Image source={icons.ArrowDownIcon} style={StylesHome.IconsSmall} />
                    </View>
                    <Text style={StylesHome.TextHeader}>Scan your Lock!</Text>               
                </TouchableOpacity>

                <View style={StylesHome.parentView}>
                    <Animated.Image
                        style={{
                            width: 450,
                            opacity: fadeAnim, // Use the animated value for opacity
                        }}
                        source={icons.NfcScannerScreen}
                    />
                </View>
                </Modal>

            </View>
        </View>
    );
 }