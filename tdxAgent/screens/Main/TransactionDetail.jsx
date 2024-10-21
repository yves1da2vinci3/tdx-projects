import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Icon } from '@rneui/base'
import { Avatar } from '@rneui/themed'
const TransactionDetail = () => {
  return (
    <View style={tw `flex-1 bg-white pt-10 px-4`}>
        <Icon type='ionicon' name='arrow-back-outline' size={30} color="black" style={tw `self-start  mb-4`} />
        <Avatar size={60} source={{ uri : "https://media.licdn.com/dms/image/C4E03AQGr1ATJxgLlFg/profile-displayphoto-shrink_800_800/0/1639553598181?e=2147483647&v=beta&t=UInTmNwhvz8vV051gs45Uo28k_e5aYk6NKnmMSRj5Zo"}} rounded={true} />

      <Text style={tw `font-bold mt-4 text-lg`}>-20 bags </Text>
      <Text style={tw ` mt-4 text-gray-400 `}>Farmer Name</Text>
      <Text style={tw ` mt-1 `}> samuel jackson</Text>
      <Text style={tw ` mt-4 text-gray-400 `}>Id or phone Number </Text>
      <Text style={tw ` mt-1 `}> 01491187445</Text>
      <Text style={tw ` mt-4 text-gray-400 `}>Commodity Name </Text>
      <Text style={tw ` mt-1 `}> Yellow soya bean</Text>
      <Text style={tw ` mt-4 text-gray-400 `}>Amount </Text>
      <Text style={tw ` mt-1 `}> 2000 GHS</Text>
      <Text style={tw ` mt-4 text-gray-400 `}>Status </Text>
      <Text style={tw ` mt-1 `}> completed </Text>
      <Text style={tw ` mt-4 text-gray-400 `}>Date </Text>
      <Text style={tw ` mt-1 `}> february 6th 2023 </Text>
      <Text style={tw ` mt-4 text-gray-400 `}>Transction Id </Text>
      <Text style={tw ` mt-1 `}> 12hdsy2932 </Text>

    </View>
  )
}

export default TransactionDetail