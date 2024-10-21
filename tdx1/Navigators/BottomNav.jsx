import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './stack/HomeStack';
import NewScreen from './../Screens/NewScreen';
import TradeScreen from './../Screens/TradeScreen';

import AccountStack from './stack/AccountStack';
import AssetsStack from './stack/AssetsStack';
import Colors from '../Constants/Colors';
import { Badge, Icon } from '@rneui/base';
import tw from 'twrnc'
import MarketIcon from '../assets/Icons/market.png'
import MarketDarkIcon from '../assets/Icons/marketDark.png'
import newsIcon from '../assets/Icons/news.png'
import newsDarkIcon from '../assets/Icons/newsDark.png'
import assetIcon from '../assets/Icons/AssetIcon.png'
import assetDarkIcon from '../assets/Icons/AssetIconDark.png'
import profileIcon from '../assets/Icons/profile.png'
import profileDarkIcon from '../assets/Icons/profileDark.png'
const BottomNav = () => {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator  screenOptions={{ tabBarActiveTintColor : `${Colors.greenColor}` ,tabBarInactiveTintColor : "lightgrey"} } >
      <Tab.Screen  options={{ headerShown : false , tabBarShowLabel : false, tabBarIcon: ({ focused }) => (
              
            <View style={{ padding: 4, borderRadius: 8, alignItems: "center" }}>
             <Image source={focused ? MarketDarkIcon  : MarketIcon} style={tw `h-6 w-6`} />
               
            </View>
            
            )} } name="home" component={HomeStack} />

      <Tab.Screen options={{ headerShown : false , tabBarShowLabel : false, tabBarIcon: ({ focused }) => (
            <View style={{ padding: 4, borderRadius: 8, alignItems: "center" }}>
                 <Image source={focused ? newsDarkIcon  : newsIcon} style={tw `h-6 w-6`} />
            </View>)} } name="news" component={NewScreen} />

      <Tab.Screen options={{ headerShown : false , tabBarShowLabel : false, tabBarIcon: ({ focused }) => (
            <View style={tw `flex justify-center items-center p-2 w-full h-full rounded-full rounded-lg bg-[${Colors.greenColor}]` }>
                <Icon color="white" name="swap-vertical-outline" type='ionicon' />
               
            </View>)} } name="trade" component={TradeScreen} />

      <Tab.Screen options={{ headerShown : false , tabBarShowLabel : false, tabBarIcon: ({ focused }) => (
            <View style={{ padding: 4, borderRadius: 8, alignItems: "center" }}>
                <Image source={focused ? assetDarkIcon  : assetIcon} style={tw `h-6 w-6`} />
            </View>)} } name="assets" component={AssetsStack} />

      <Tab.Screen options={{ headerShown : false , tabBarShowLabel : false, tabBarIcon: ({ focused }) => (
            <View style={{ padding: 4, borderRadius: 8, alignItems: "center" }}>
                 <Image source={focused ? profileDarkIcon  : profileIcon} style={tw `h-6 w-6`} />
            </View>)} } name="account" component={AccountStack} />
    </Tab.Navigator>
  )
}

export default BottomNav