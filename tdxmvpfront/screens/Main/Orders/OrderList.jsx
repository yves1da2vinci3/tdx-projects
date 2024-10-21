import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'

import CurrentOrder from './CurrentOrder'
import HistoryOrder from './HistoryOrder'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Colors from '../../../Constants/Colors'
const OrderList = () => {
  const length =0
  const navigation = useNavigation()
    useEffect(()=>{
        navigation.setOptions({title : 'My orders',headerLeft: ()=>       <Icon size={30} type="ionicon" name='arrow-back-outline'  />
        ,      })
        },[])
        const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator  screenOptions={{
      tabBarLabelStyle: { fontSize: 13 , fontStyle : "normal" ,textTransform : "capitalize", color : `grey`},
     tabBarIndicatorStyle : { backgroundColor : `${Colors.greenColor}` },
     tabBarContentContainerStyle : { paddingHorizontal : 5}
    }}>
      <Tab.Screen options={{ title : "in progress" ,tabBarStyle : { color : "lightgrey" , }  }} name="currentOrder" component={CurrentOrder} />
      <Tab.Screen options={{title : "history" }}  name="history" component={HistoryOrder} />
    </Tab.Navigator>
  )
}

export default OrderList