import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileHome from '../../screens/Main/Profile/ProfileHome'
import ModifyProfile from '../../screens/Main/Profile/ModifyProfile'
const ProfileStack = () => {
    const Stack = createStackNavigator()
  return (
  <Stack.Navigator>
    <Stack.Screen options={{ headerShown : false}} name='profileHome' component={ProfileHome}  />
    <Stack.Screen options={{ headerShown : false}} name='modifyProfile' component={ModifyProfile}  />
  </Stack.Navigator>
  )
}

export default ProfileStack