import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { ToastProvider } from 'react-native-toast-notifications'
import { Icon } from '@rneui/base';
import tw from 'twrnc'
import Colors from './Constants/Colors';
import AuthProvider from './Contexts/AuthContext'
import HomeProvider from './Contexts/HomeContext'
import AppNavigator from './Navigators/AppNavigator.jsx';
import { MenuProvider } from 'react-native-popup-menu';
export default function App() {
  return (
    <AuthProvider>
    
    <HomeProvider>
    <MenuProvider>
    <ToastProvider  renderToast={(toastOptions) => <View style={tw `h-17   shadow   border-l-[${ toastOptions.type === "success"? Colors.greenColor : Colors.redColor}] border-l-8 min-w-70 flex  px-3 justify-center rounded-lg bg-white pl-4  `}><Text style={tw `font-semibold `}> {toastOptions.message}</Text></View> }  dangerIcon={<Icon color="white" type="ionicon" name="alert-circle" /> }   > 
    <AppNavigator/>
  
    </ToastProvider>
    </MenuProvider>
    </HomeProvider>
 
    </AuthProvider>

  );
}


