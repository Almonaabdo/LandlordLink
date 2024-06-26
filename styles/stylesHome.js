import { StyleSheet } from "react-native";
const primaryColor = "#60099c"


export const StylesHome = StyleSheet.create({

    AppartmentImage:{
        width: 440,
        borderRadius:5,
        height: 200,
    },

    Icons:{
        width: 30,
        height: 30,
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


    ModalSmall:{
        backgroundColor:"#b8b4b2",
        width:"60%", 
        height:60, 
        alignSelf:"center",
        justifyContent: 'center',
        borderRadius:7,
        justifyContent:"space-around",
        flexDirection:"row"
    },

    parentView:{
        flex: 1, justifyContent: 'center',alignSelf:"center",
    },


})