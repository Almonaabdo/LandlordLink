import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import { Image } from 'react-native';
const primaryColor = "#60099c";

const CustomDrawerItem = ({ icon, label, onPress, headerStyle, headerTintColor }) => 
{
    return (
        <>
            <DrawerItem
                icon={() => <Image source={icon} style={{ width: 24, height: 24 }} />}
                label={label}
                onPress={onPress}
                headerStyle={{ backgroundColor: primaryColor }}
                headerTintColor="#fff"
            />
        </>
    );
};

export default CustomDrawerItem;