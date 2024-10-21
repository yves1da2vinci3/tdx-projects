import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Colors from '../Constants/Colors'
import { useNavigation } from '@react-navigation/core'
import { ParentOrderStatusVariables} from '../Constants/StatusVariables'
import moment from 'moment'
import { Badge } from '@rneui/base'
const HistoryOrderItem = ({order }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity  onPress={()=> navigation.navigate("singleOrder",{ order})} style={tw `w-full h-40 bg-white flex mt-2  p-2 justify-between`}>
      <View style={tw `h-8   ${order.tickerId ? "w-30" : "w-22"}  p-2 bg-pink-300 rounded-lg`} >
        <Text style={tw `text-white`}>{ order.tickerId ? "advanced order" : "basic order"}</Text>
      </View>
        <View style={tw `flex-row items-center justify-between px-3`} >
          
          <Text style={tw `font-semibold`}>Order ID : {order?.id.toString().padStart(10,"0")}</Text>
          
         <Text style={tw `${ order.status ===ParentOrderStatusVariables.pending ? `text-[${Colors.yellowColor}]` : order.status ===ParentOrderStatusVariables.completed ?  `text-[${Colors.greenColor}]` : order.status ===ParentOrderStatusVariables.canceled? "text-red-500" : order.status ===ParentOrderStatusVariables.placed ? "text-pink-400" : order.status ===ParentOrderStatusVariables.partial ? "text-green-700" : 'text-red-700' } font-semibold mt-2`}>{order.status ===ParentOrderStatusVariables.pending  ? "pending" : order.status ===ParentOrderStatusVariables.completed  ?  "completed" : order.status ===ParentOrderStatusVariables.canceled  ? "canceled" : order.status ===ParentOrderStatusVariables.placed ? "placed" :order.status ===ParentOrderStatusVariables.partial ? "partial" : "declined" }</Text>
        </View>
        {/* Others Informations */}
        <View style={tw `flex-1 `}>

          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>{order.tickerId ? 'Ticker' : 'Commodity Type' } : </Text>
        <Text style={tw ` ml-3 mt-1`}>{order.ticker ? order.ticker.title : order.commoditType.commodityTypeName }  </Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Order Type : </Text>
        <Text style={tw ` ml-3 mt-1`}>{`${order?.commodityTypeId ? "Market" : order?.orderType ===1 ? "Market" : "Limit" }/${order.orderCategory ===1 ? "BUY" : "SELL"}`} </Text>
          </View>
           { order.tickerId && <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Price : </Text>
        <Text style={tw ` ml-3 mt-1`}>{order.limitPrice ===0 ? "No Price Set" : order.limitPrice} </Text>
          </View> }
          

          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Qty : </Text>
        <Text style={tw ` ml-3 mt-1`}>{order?.qty} MT </Text>
          </View>

        </View>
        <View style={tw `h-8  p-1`}>
        <Text style={tw `font-semibold text-gray-400 text-right `}> { moment(order?.createdAt).format('DD MMM YYYY')}</Text>
        </View>
        
      </TouchableOpacity>
  )
}

export default HistoryOrderItem