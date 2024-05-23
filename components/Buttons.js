import React from "react";
import {StyleSheet, TouchableOpacity, Text, View } from "react-native";


const primaryColor = "#60099c"


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


export function LoginButton({text , onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.LoginButton}>
                <Text style={styles.ButtonText}>{text}</Text>
            </View>
        </TouchableOpacity>
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

    ConfirmButton: 
    {
        borderRadius : 8,
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: '#5cb85c',
        maxWidth: 150,
    },

    LoginButton: 
    {
        borderRadius : 10,
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: primaryColor,
        maxWidth: 450,
        width: 330,
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