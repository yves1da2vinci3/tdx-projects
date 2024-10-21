import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountHomeScreen from '../../Screens/Account/HomeScreen'
import Notifications from '../../Screens/Account/Notifications'
import OrderScreen from '../../Screens/Account/OrderScreen'
import SingleOrder from '../../Screens/Account/Order/SingleOrder'
import DepositsAndWithDrawalScreen from '../../Screens/Account/DepositsAndWithdrawals/DepositsAndWithdrawalScreen'
import AlertScreen from '../../Screens/Account/AlertScreen'
import SettingsStack from './SettingsStack'
import OrderList from '../../Screens/Account/Order/OrderList'
const AccountStack = () => {
    const Stack = createNativeStackNavigator()
    return (
      <Stack.Navigator>
          <Stack.Screen options={{ headerShown : false}} name='account' component={AccountHomeScreen} />
          <Stack.Screen options={{ headerShown : true}} name='notifications' component={Notifications} />
          <Stack.Screen options={{ headerShown : true}} name='orders' component={OrderList} />
          <Stack.Screen options={{ headerShown : true}} name='singleOrder' component={SingleOrder} />
          <Stack.Screen options={{ headerShown : true}} name='depositAndWithdrawal' component={DepositsAndWithDrawalScreen} />
          <Stack.Screen options={{ headerShown : true}} name='alerts' component={AlertScreen} />
          <Stack.Screen options={{ headerShown : false}} name='settings' component={SettingsStack} />
      </Stack.Navigator>
    )
}

export default AccountStack