import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SigninScreen from '../../Screens/Auth/SigninScreen'
import RecoverPasswordScreen from '../../Screens/Auth/RecoverPasswordScreen'
import VerficationCode from '../../Screens/Auth/VerficationCode'
import NewPasswordScreen from '../../Screens/Auth/NewPasswordScreen'
const AuthStack = () => {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator>
          <Stack.Screen   name="signin" component={SigninScreen} />
        <Stack.Screen   name="recover" component={RecoverPasswordScreen} />
        <Stack.Screen   name="verificationCode" component={VerficationCode} />
        <Stack.Screen   name="newpassword" component={NewPasswordScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack