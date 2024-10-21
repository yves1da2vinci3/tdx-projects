import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserAssets from '../../Screens/Assets/UserAssets'
import DepositScreen from '../../Screens/Assets/DepositScreen'
import WithdrawalScreen from '../../Screens/Assets/WithdrawalScreen'
const AssetsStack = () => {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator>
        <Stack.Screen name='userAssets' component={UserAssets} />
        <Stack.Screen name='deposit' component={DepositScreen} />
        <Stack.Screen name='withdrawal' component={WithdrawalScreen} />
    </Stack.Navigator>
  )
}

export default AssetsStack