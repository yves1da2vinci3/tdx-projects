import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OrderList from '../../screens/Main/Orders/OrderList'
import TrackOrder from '../../screens/Main/Orders/TrackOrder'
import OrderMap from '../../screens/Main/Orders/OrderMap'
const OrderStack = () => {
    const Stack = createStackNavigator()
  return (
  <Stack.Navigator>
    
    <Stack.Screen name='orderlist'  component={OrderList} />
          <Stack.Screen name='trackOrder'  component={TrackOrder} />
          <Stack.Screen name='orderOnMap'  component={OrderMap} />
  </Stack.Navigator>
  )
}

export default OrderStack