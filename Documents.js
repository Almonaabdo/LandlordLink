import React, { useState } from 'react';
import { View, StatusBar  } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import { WebView } from 'react-native-webview';

// my custom components
import { LoginButton } from './components/Buttons';

const DocumentsList = [
    { key: '1', value: 'Lease Document' },
    { key: '2', value: 'Contract Document' },
    { key: '3', value: 'Bills' },
];

export function Documents({ navigation }) {
    const [selected, setSelected] = useState("");
    const [isViewPressed, setIsViewPressed] = useState(false);

    const pdfUri = 'https://css4.pub/2015/icelandic/dictionary.pdf'; // Replace with your PDF URL

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
            <StatusBar barStyle="light-content" />

            <SelectList 
                setSelected={setSelected}
                selected={selected}
                data={DocumentsList}
                boxStyles={{ marginTop: 25, width: '100%', borderColor: '#3e1952' }}
                save="value"/>

            <View style={{marginVertical:'2%'}}></View>
            
            {/*Conditional view */}
            {isViewPressed && selected !="" && (
                <View style={{ flex: 0, height:'70%' }}>
                    <WebView
                        originWhitelist={['*']}
                        source={{ uri: pdfUri }}
                        style={{ flex: 1 }}
                    />
                </View>
            )}      

            {/* VIEW BUTTON */}
            <LoginButton 
            text={isViewPressed === false ? "View" : "Download"} 
            onPress={() => {if (selected !== "") {setIsViewPressed(true)}}} />

        </View>
    );
}