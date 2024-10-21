import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Icon } from '@rneui/base'
import Colors from '../../../Constants/Colors'


import DepositsScreen from './DepositsScreen'
import WithdrawalScreen from './WithdrawalScreen'
const DepositsAndWithdrawalScreen = () => {
  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({title : 'Deposits and withdrawals',headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
      ,      })
      },[])
      const Tab = createMaterialTopTabNavigator();
return (
  <Tab.Navigator screenOptions={{
    tabBarLabelStyle: { fontSize: 13 , fontStyle : "normal" ,textTransform : "capitalize", color : `grey`},
   tabBarIndicatorStyle : { backgroundColor : `${Colors.greenColor}` },
   tabBarContentContainerStyle : { paddingHorizontal : 5},
   
  }}>
    <Tab.Screen options={{ title : "Deposits" ,tabBarStyle : { color : "lightgrey" , }  }} name="deposits" component={DepositsScreen} />
    <Tab.Screen options={{title : "Withdrawal" }}  name="withdrawal" component={WithdrawalScreen} />
  </Tab.Navigator>
)
}

export default DepositsAndWithdrawalScreen