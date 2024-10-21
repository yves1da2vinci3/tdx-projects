import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Deliver from '../../screens/Main/cart/Deliver'
import CartScreen from '../../screens/Main/cart/CartScreen'

const CartStack = () => {

    const Stack = createStackNavigator()
    return (
    <Stack.Navigator screenOptions={{ headerShown : false}}>
      
      <Stack.Screen name='mainCart'  component={CartScreen} />
            <Stack.Screen name='deliverOption'  component={Deliver} />
    </Stack.Navigator>
  )
}

export default CartStack