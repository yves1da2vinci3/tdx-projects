import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { ParentOrderStatusVariables } from '../Constants/StatusVariables'
import Colors from '../Constants/Colors'
const OrderItem = () => {
  return (
    <View style={tw `w-full h-18  flex items-center flex-row `}>
      {/* Columns */}
      <View style={tw `justify-center flex-1 items-center `}>
        <Text style={tw `text-black text-[0.8rem] `}>12/02/2023</Text>
      </View>
      <View style={tw `justify-center flex-1 items-center `}>
        <View style={tw `items-center`}>
        <Text style={tw `text-black text-sm  text-[0.6rem] font-bold `}>SY</Text>
        <Text style={tw `text-gray-500 text-[0.6rem] text-center  `}>(soya bean mea)</Text>
        </View>
        
      </View>
      <View style={tw `justify-center flex-1 items-center `}>
        <Text style={tw `text-black `}>market/Sell</Text>
      </View>
      <View style={tw `justify-center flex-1 items-center `}>
        <Text style={tw `text-black `}>{item.qty}</Text>
      </View>
      <View style={tw `justify-center flex-1 items-center `}>
      <Text style={tw `${ item.status ===ParentOrderStatusVariables.pending ? `text-[${Colors.yellowColor}]` : item.status ===ParentOrderStatusVariables.completed ?  `text-[${Colors.greenColor}]` : item.status ===ParentOrderStatusVariables.canceled? "text-red-500" : item.status ===ParentOrderStatusVariables.placed ? "text-pink-400" : item.status ===ParentOrderStatusVariables.partial ? "text-green-700" : 'text-red-700' } font-semibold mt-2`}>{item.status ===ParentOrderStatusVariables.pending  ? "pending" : item.status ===ParentOrderStatusVariables.completed  ?  "completed" : item.status ===ParentOrderStatusVariables.canceled  ? "canceled" : item.status ===ParentOrderStatusVariables.placed ? "placed" :item.status ===ParentOrderStatusVariables.partial ? "partial" : "declined" }</Text>

      </View>
      
     </View>
  )
}

export default OrderItem