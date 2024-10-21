import { View, Text } from 'react-native'
import React from 'react'

import BottomNav from './BottomNav'
import ReportIssue from '../Screens/Drawer/ReportIssue'
import RequestCall from '../Screens/Drawer/RequestCall'
import { createDrawerNavigator } from '@react-navigation/drawer';
const MainNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator screenOptions={{ headerShown : false }} >
    <Drawer.Screen name="BottomNav" component={BottomNav} />
    <Drawer.Screen name="ReportIssue" component={ReportIssue} />

    <Drawer.Screen name="requestCall" component={RequestCall} />
  </Drawer.Navigator>
  )
}

export default MainNavigator





