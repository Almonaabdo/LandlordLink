import {StyleSheet} from "react-native";

const primaryColor = "#3e1952"

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
      margin:'2%',
      padding: '4%',
      borderWidth:1,
      borderColor: '#000',
      borderRadius: 10,
      justifyContent: 'center',
    },

  
    inputLabel: 
    {
      marginBottom: '3%',
      fontWeight: 'bold',
    },
  
    textInput:
    {
      width: '100%',
      height: '15%',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 3,
      paddingHorizontal: '3%',
      textAlign:"left",
      marginBottom: '2%',
    },

    textInputSignup:
    {
      width: '100%',
      height: '7.5%',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 3,
      paddingHorizontal: '3%',
      textAlign:"left",
      marginBottom: '2%',
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
      padding:'5%',
      alignSelf:"center",
      fontWeight:"bold"
    },

    textError:{
      color:"red",
      fontSize:12,
      fontWeight:"bold",
      alignSelf:"center",
      marginVertical: '2%',
    }
  }); 