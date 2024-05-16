import { StyleSheet } from "react-native";
const primaryColor = "#60099c"


export const StylesHome = StyleSheet.create({

    AppartmentImage:{
        width: 440,
        borderRadius:5,
        height: 200,
    },

    Icons:{
        width: 40,
        height: 40,
        margin:10,
    },
    IconsSmall:{
        width: 20,
        height: 20,
        margin:20,
        alignSelf:"flex-end"
    },

    TextHeader:{
        fontSize: 24,
        color:primaryColor,
        alignSelf:"center",
        marginVertical:5,
        fontFamily: 'Avenir'
    },


})