import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
const NotificationItem = () => {
  return (
    <View style={ tw `bg-white h-24 mt-2 w-full flex p-3 rounded-lg`} >
    <Text style={tw `text-blue-600 font-bold`} >Order feedback</Text>
    <View style={ tw`flex-1 h-18`}>
    <Text style={tw `font-semibold `} >Your sell order has been placed by the TDX Team </Text>

    </View>

    <Text style={tw`self-end text-gray-400 italic`}>07/02/2023</Text>
  </View>
  )
}

export default NotificationItem