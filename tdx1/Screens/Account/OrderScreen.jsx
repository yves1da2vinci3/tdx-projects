import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import Colors from '../../Constants/Colors'
import HistoryOrder from './Order/HistoryOrder'
import OrderList from './Order/OrderList'
const OrderScreen = () => {
    const navigation = useNavigation()
    useEffect(()=>{
        navigation.setOptions({title : 'My orders',headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
        ,      })
        },[])
        const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: { fontSize: 13 , fontStyle : "normal" ,textTransform : "capitalize", color : `grey`},
     tabBarIndicatorStyle : { backgroundColor : `${Colors.greenColor}` },
     tabBarContentContainerStyle : { paddingHorizontal : 5}
    }}>
      <Tab.Screen options={{ title : "in progress" ,tabBarStyle : { color : "lightgrey" , }  }} name="OrderList" component={OrderList} />
      <Tab.Screen options={{title : "history" }}  name="history" component={HistoryOrder} />
    </Tab.Navigator>
  )
}

export default OrderScreen