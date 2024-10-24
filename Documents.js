import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { WebView } from 'react-native-webview';
import { LoginButton } from './components/Buttons';


const DocumentsList =
    [
        { key: '1', value: 'Lease Document' },
        { key: '2', value: 'Contract Document' },
        { key: '3', value: 'Bills' },
    ];

export function Documents({ navigation }) {
    const [selected, setSelected] = useState("");
    const [isViewPressed, setIsViewPressed] = useState(false);
    const [loading, setLoading] = useState(false);

    const pdfUri = 'https://css4.pub/2015/icelandic/dictionary.pdf';

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <Text style={styles.header}>Documents</Text>
            <Text style={styles.description}>
                Select a document to view or download. Tap "View" to open the document or "Download" to save it.
            </Text>

            <SelectList
                setSelected={setSelected}
                selected={selected}
                data={DocumentsList}
                boxStyles={styles.selectBox}
                save="value"/>


            {/* Conditional view */}
            {isViewPressed && selected !== "" && (
                <View style={styles.webViewContainer}>
                    {loading && <ActivityIndicator size="large" color="#3e1952" />}
                    <WebView
                        originWhitelist={['*']}
                        source={{ uri: pdfUri }}
                        style={styles.webView}
                        onLoadStart={() => setLoading(true)}
                        onLoadEnd={() => setLoading(false)}
                    />
                </View>
            )}

            <View style={{marginVertical:'2%'}}/>
            
            {/* VIEW BUTTON */}
            <LoginButton
                text={isViewPressed ? "Download" : "View"}
                onPress={() => {
                    if (selected !== "") {
                        setIsViewPressed(true);
                    }
                }}
            />

            <View style={{marginVertical:'2%'}}/>

            {/* RESET BUTTON*/}
            {isViewPressed && 
            (
              <LoginButton
                text="Reset"
                onPress={() => 
                {
                  setIsViewPressed(false);
                  setSelected("");
                }}/>
            )}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "white",
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3e1952',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
    },
    selectBox: {
        marginTop: 25,
        width: '100%',
        borderColor: '#3e1952',
    },
    webViewContainer: 
    {
        marginVertical:'5%',
        flex: 0,
        height: '50%',
    },

});