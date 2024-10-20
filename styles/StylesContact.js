import {StyleSheet} from "react-native";

linkColor = "#1560BD"
linkSize = 15.5
linkIconSize = 20

export const stylesContact = StyleSheet.create
({ 
    header:
    {
      fontSize:18,
      alignSelf:'center'
    },

    linkText:
    {
      fontSize:linkSize,
      color:linkColor,
      alignSelf:'center',
    },

    linkIcon:
    {
      width:linkIconSize,
      height:linkIconSize,
      marginHorizontal:'2%'
    }

}); 