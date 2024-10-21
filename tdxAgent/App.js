import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {  NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/Auth/LoginScreen';
import UserStack from './Navigators/UserStack';
export default function App() {
  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{ headerShown : false }}>
        <Stack.Screen name='login' component={LoginScreen}  />
        <Stack.Screen name='user' component={UserStack} />
       </Stack.Navigator>
    </NavigationContainer>
  );
}


