import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Badge, Icon } from '@rneui/base'
import Colors from '../Constants/Colors'
import ProfileStack from './Stack/ProfileStack'
import OrderStack from './Stack/OrderStack'
import HomeStack from './Stack/HomeStack'
import CartScreen from '../screens/Main/cart/CartScreen'
import tw from 'twrnc'
import CartStack from './Stack/CartStack'
import { Image } from 'react-native'
import assetDarkIcon from '../assets/Icons/AssetIconDark.png'
import assetIcon from '../assets/Icons/AssetIcon.png'
const BottomNavBar = () => {
    const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator  screenOptions={{ tabBarActiveTintColor : `${Colors.greenColor}` ,tabBarInactiveTintColor : "lightgrey"} } >
      <Tab.Screen  options={{ headerShown : false , tabBarShowLabel : false, tabBarIcon: ({ focused }) => (
              
            <View style={{ padding: 4, borderRadius: 8, alignItems: "center" }}>
                <Icon color={`${ focused ? Colors.black : "lightgrey"}`} name="home" type='font-awesome' />
                {/* {focused && <Badge  status='success' />} */}
            </View>
            
            )} } name="home" component={HomeStack} />
      <Tab.Screen  options={{ headerShown : false , tabBarShowLabel : false, tabBarIcon: ({ focused }) => (
          <View style={{ padding: 4, borderRadius: 8, alignItems: "center" }}>
          <Image source={focused ? assetDarkIcon  : assetIcon} style={tw `h-6 w-6`} />
      </View>
            
            )} } name="cart" component={CartStack} />



      {/* <Tab.Screen options={{ headerShown : false , tabBarShowLabel : false, tabBarIcon: ({ focused }) => (
            <View style={{ padding: 4, borderRadius: 8, alignItems: "center" }}>
                <Icon color={`${ focused ? Colors.black : "lightgrey"}`} name="receipt-outline" type='ionicon' />
                {focused && <Badge  status='success' />}
            </View>)} } name="order" component={OrderStack} /> */}

      <Tab.Screen options={{ headerShown : false , tabBarShowLabel : false, tabBarIcon: ({ focused }) => (
            <View style={{ padding: 4, borderRadius: 8, alignItems: "center" }}>
                <Icon color={`${ focused ? Colors.black : "lightgrey"}`} name="person" type='ionicon' />
                {/* {focused && <Badge  status='success' />} */}
            </View>)} } name="profile" component={ProfileStack} />
    </Tab.Navigator>
  )
}

export default BottomNavBar