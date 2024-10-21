import { View, Text } from 'react-native'
import React from 'react'
import moment from 'moment'
import Colors from '../Constants/Colors'
import { ParentOrderStatusVariables } from '../Constants/StatusVariables'
import tw from 'twrnc'

const SingleBasicOrderDetail = ({order,subOrders,isLoading}) => {
  return (
    <View style={tw `h-60 bg-white w-80 `}>
    <View style={tw `flex-row items-center  justify-between px-3`} >
          
          <Text style={tw `font-semibold`}>Order ID : {order.id.toString().padStart(10,"0")}</Text>
         <Text style={tw `${ order.status ===ParentOrderStatusVariables.pending ? `text-[${Colors.yellowColor}]` : order.status ===ParentOrderStatusVariables.completed ?  `text-[${Colors.greenColor}]` : order.status ===ParentOrderStatusVariables.canceled? "text-red-500" : order.status ===ParentOrderStatusVariables.placed ? "text-pink-400" : order.status ===ParentOrderStatusVariables.partial ? "text-green-700" : 'text-red-700' } font-semibold mt-2`}>{order.status ===ParentOrderStatusVariables.pending  ? "pending" : order.status ===ParentOrderStatusVariables.completed  ?  "completed" : order.status ===ParentOrderStatusVariables.canceled  ? "canceled" : order.status ===ParentOrderStatusVariables.placed ? "placed" :order.status ===ParentOrderStatusVariables.partial ? "partial" : "declined" }</Text>
          
        </View>
        {/* Others Informations */}
        <View style={tw `flex-1 mt-10 `}>

          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Commodity : </Text>
        <Text style={tw ` ml-3 mt-1`}>{order.commoditType.commodity.commodityName} </Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Commodity Type : </Text>
        <Text style={tw ` ml-3 mt-1`}>{order.commoditType.commodityTypeName} </Text>

          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Order Type : </Text>
        <Text style={tw ` ml-3 mt-1`}> Market </Text>
          </View>
         
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Order category : </Text>
        <Text style={tw ` ml-3 mt-1`}>{order.orderCategory === 1 ? "Buy" : "Sell"}</Text>
          </View>
        
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Quantity Requested : </Text>
        <Text style={tw ` ml-3 mt-1`}>{order.qty} </Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Quantity Filled : </Text>
        <Text style={tw ` ml-3 mt-1`}> {isLoading ? "..." : subOrders.filter(suborder => suborder.status === ChildrenOrderStatusVariables.completed).reduce((previousValue,currentOrder)=> previousValue + currentOrder.qty ,0)  } </Text>
          </View>

        </View>
        <View style={tw `h-8  p-1`}>
        <Text style={tw `font-semibold text-gray-400 text-right `}> {moment(order?.createdAt).format('DD MMM YYYY')} </Text>
        </View>
    </View>
  )
}

export default SingleBasicOrderDetail