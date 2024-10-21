import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../../screens/Auth/LoginScreen'
import Signup from '../../screens/Auth/Signup'
import SecondSignup from '../../screens/Auth/SecondSignup'
import ThirdSignup from '../../screens/Auth/ThirdSignup'

const AuthStack = () => {
    const Stack = createStackNavigator()
  return (
    <Stack.Navigator>
    <Stack.Screen options={{ headerShown : false}} name='login' component={LoginScreen}  />
    <Stack.Screen options={{ headerShown : true}} name='SignupFirst' component={SecondSignup}  />
    <Stack.Screen  options={{ headerShown : true}} name='SignupSecond' component={ThirdSignup}  />
  </Stack.Navigator>
  )
}

export default AuthStack