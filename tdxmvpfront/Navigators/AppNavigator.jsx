import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomNavBar from './BottomNavBar'
import LoginScreen from '../screens/Auth/LoginScreen'
import { AuthContext } from '../Context/AuthContext'
import { createStackNavigator } from '@react-navigation/stack'
import AuthStack from './Stack/AuthStack'

const AppNavigator = () => {
  const Stack = createStackNavigator()
  const {isLogin} = useContext(AuthContext)

    
  return (
    <NavigationContainer>
    <Stack.Navigator>
     { isLogin ?  <Stack.Screen options={{ headerShown : false}} name='user' component={BottomNavBar} /> : <Stack.Screen options={{ headerShown : false}} name='auth' component={AuthStack} />  }
      
      
    </Stack.Navigator>
        </NavigationContainer>
  )
}

export default AppNavigator