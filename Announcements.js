import {React, useState} from "react";
import {View, Text,Image, ScrollView, TouchableOpacity, Modal, TextInput,StatusBar} from "react-native";



// Styles
import { StylesHome } from "./styles/stylesHome";
import { stylesLogin } from "./styles/stylesLogin";



export function AnnouncementsScreen ({navigation})
{
    return(
        <View style={{flex:1, backgroundColor:"cyan"}}>
            <StatusBar barStyle="light-content" />


            <TouchableOpacity style={{alignSelf:"center"}} onPress={() => navigation.navigate("Home")}>
                <Text style={stylesLogin.textLabel}>HOME</Text>
            </TouchableOpacity>  
        </View>

    );
}
