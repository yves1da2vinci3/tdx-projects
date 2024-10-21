import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserHome from '../../screens/Main/home/UserHome'
import Aggregation from '../../screens/Main/home/Aggregation'
import SingleOffer from '../../screens/Main/home/SingleOffer'
import DeliverLocation from '../../screens/Main/home/DeliverLocation'
const HomeStack = () => {
    const Stack = createStackNavigator()
  return (
  <Stack.Navigator>
    <Stack.Screen options={{ headerShown : false}} name='userHome' component={UserHome}  />
    <Stack.Screen name='singleOffer' component={SingleOffer}  />
    <Stack.Screen  name='aggregation' component={Aggregation}  />
    <Stack.Screen options={{ headerShown : false}} name='deliverLocation' component={DeliverLocation}  />
  </Stack.Navigator>
  )
}

export default HomeStack