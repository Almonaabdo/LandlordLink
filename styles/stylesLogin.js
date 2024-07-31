import {StyleSheet} from "react-native";

const primaryColor = "#60099c"

export const stylesLogin = StyleSheet.create({ 
    profileImage: 
    { 
      width: 380, 
      marginTop: -30,
      resizeMode:"stretch",
      height:125,
      borderRadius: 10, 
    },
    smallLogo: 
    {
      width: 70, 
      resizeMode:"contain",
      alignSelf:"center",
      marginTop: -20,
    },
  
    container: 
    {
      margin:7,
      padding: 20,
      borderWidth:1,
      borderColor: primaryColor,
      borderRadius: 3,
      justifyContent: 'center',
    },
  
    inputContainer: 
    {
      marginBottom: 20,
    },
  
    inputLabel: 
    {
      marginBottom: 5,
      fontWeight: 'bold',
    },
  
    textInput:
    {
      width: '100%',
      height: 40,
      borderColor: primaryColor,
      borderWidth: 1,
      borderRadius: 3,
      paddingHorizontal: 10,
      textAlign:"left",
      marginBottom: 20,
    },
  
    textHeader:{
      fontSize: 24,
      fontWeight:"bold",
      fontFamily: 'sans-serif-medium',
    },
  
    textLabel:
    {
      color:primaryColor,
      fontSize:12,
      marginVertical:20,
      alignSelf:"center",
      fontWeight:"bold"
    },

    textError:{
      color:"red",
      fontSize:12,
      fontWeight:"bold",
      alignSelf:"center",
      marginVertical: 7,
    }
  }); 