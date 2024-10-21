import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Colors from '../Constants/Colors'
const HistoryOrderItem = ({isCompleted,orderId,totalPrice, date }) => {
  return (
    <View style={tw `w-full h-20 bg-white flex mt-2 flex-row p-2 justify-between`}>
        <View>
        <Text style={tw `font-semibold`}>Order ID : {orderId}</Text>
        <Text style={tw `${ isCompleted ? `text-[${Colors.greenColor}]` : "text-red-500" } font-semibold mt-2`}>{isCompleted ?  "completed" : "canceled"}</Text>
        </View>
        <View style={tw `h-full w-36 flex justify-between py-1`}>
        <Text style={tw `font-semibold text-gray-400 text-center`}> Date : {date}</Text>
        <Text style={tw `font-semibold text-center`}> Total : {totalPrice}GHS</Text>
        </View>
      </View>
  )
}

export default HistoryOrderItem