import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Colors from '../Constants/Colors'
import  moment from 'moment'
const DespositItem = ({deposit}) => {

  return (
    <View  style={tw `w-full h-30 bg-white flex mt-2  p-2 justify-between`}>
        <View style={tw `flex-row items-center justify-between px-3`} >

        <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold  `}>Deposit Type : </Text>
        <Text style={tw ``}>  {deposit?.type ===1 ? "Bank Deposit" : deposit.type === 2? "MTN Mobile Money" : "Wire Transfer" }</Text>
          </View>
          
          
         <Text style={tw `${ deposit.status ===0 ? `text-[${Colors.yellowColor}]` : deposit.status ===1 ?  `text-[${Colors.greenColor}]` :  "text-red-500"  } font-semibold mt-2`}>{deposit.status ===0  ? "pending" : deposit.status ===1  ?  "completed" : "rejected" }</Text>
        </View>
        {/* Others Informations */}
        <View style={tw `flex-1 `}>

          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Amount : </Text>
        <Text style={tw ` ml-3 mt-1`}> {deposit?.amount?.toFixed(1)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({deposit.type ===3 ? "USD" : "GH₵"}) </Text>
          </View>
         
          

        </View>
        <View style={tw `h-8  p-1`}>
        <Text style={tw `font-semibold text-gray-400 text-right `}> Date : {moment(deposit?.createdAt).format('DD MMM YYYY')}</Text>
        </View>
        
      </View>
  )
}

export default DespositItem