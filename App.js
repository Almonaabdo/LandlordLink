import Greet from "./components/Greet";
import {ConfirmButton, CancelButton} from "./components/Buttons";

import { useState} from "react";
import { View, Text, Image,
  ImageBackground, ScrollView, Button,
  Pressable, Modal, StatusBar,
  ActivityIndicator, Alert} from "react-native";

const logoImg = require("./assets/adaptive-icon.png");




export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const openModal = () => 
  {
    setIsModalVisible(true);
  };
  const closeModal = () =>
  {
    setIsModalVisible(false);
    Alert.alert("Hiii", "I'm back!", [
      {
        text: "close",
      },
      {
        text: "open",
        onPress: () => openModal()
      },
    ])
  };

  return (
    <View style={{ flex: 1, backgroundColor: "plum", padding: 40 }}>

      <ScrollView 
      showsVerticalScrollIndicator={false} 
      showsHorizontalScrollIndicator={false}
      >
        <StatusBar barStyle="light-content" />
        <View style={{backgroundColor: "plum", padding: 20 }}>
        <ActivityIndicator
          size={"large"}
          color={"red"}
          animating={isModalVisible}
        />
        </View>

        <Greet name={"Abdell"}/>
        <Greet name={"Clark"}/>

        <Image source={logoImg} style={{width: 300, height: 300}}/>

        <ConfirmButton text="Open" onPress={openModal}/>

      </ScrollView>

      <Modal 
        visible={isModalVisible} 
        onRequestClose={closeModal} // Closes if Scrolled Down
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={{ height: 200, width: 200, backgroundColor: "cyan", padding: 40 }}>
          <CancelButton text="Close" onPress={closeModal}/>
        </View>
      </Modal>
    </View>
  );
}