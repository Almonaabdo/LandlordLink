import React from "react";
import {StyleSheet, TouchableOpacity, Text, View } from "react-native";




export function ConfirmButton({text , onPress}) {
    return (
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress}>
            <View style={styles.ConfirmButton}>
                <Text style={styles.ButtonText}>{text}</Text>
            </View>
        </TouchableOpacity>
        </View>
    )
}

export function CancelButton({text , onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.CancelButton}>
                <Text style={styles.ButtonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    buttonContainer: 
    {
      alignItems: 'center',
      justifyContent: 'center',
    },
     
    ConfirmButton: 
    {
        borderRadius : 8,
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: '#5cb85c',
        maxWidth: 150,
    },

    CancelButton:
    {
        borderRadius : 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#d9534f'
    },

    ButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform : 'uppercase',
        fontSize:16,
        textAlign: 'center'
    },
})