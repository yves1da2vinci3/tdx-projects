import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserHome from '../screens/Main/UserHome'
import TransactionDetail from '../screens/Main/TransactionDetail'
import Search from '../screens/Main/Search'
import SingleFarmer from '../screens/Main/SingleFarmer'
import VerficationCode from '../screens/Main/VerficationCode'
const UserStack = () => {
    const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ headerShown : true }}>
        <Stack.Screen options={{ headerShown : false }} name='userHome' component={UserHome} />
        <Stack.Screen options={{ headerShown : false }} name='detail' component={TransactionDetail} />
        <Stack.Screen options={{ headerShown : true }} name='search' component={Search} />
        <Stack.Screen options={{ headerShown : true }} name='singleFarmer' component={SingleFarmer} />
        <Stack.Screen options={{ headerShown : true }} name='verificationCode' component={VerficationCode} />
    </Stack.Navigator>
  )
}

export default UserStack