import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { Icon } from '@rneui/themed'
import Colors from '../Constants/Colors'
import { Ionicons } from '@expo/vector-icons'; 
const PasswordInput = ({setPassword,placeholder}) => {
    
    const [Hide,setHide] = useState(true)
  return (
    <View style={ tw`flex-row flex items-center h-15 bg-[${Colors.TextInputBackgroundColor}]  rounded-lg `} >
      <TextInput onChangeText={(txt)=> setPassword(txt)} selectionColor={`${Colors.greenColor}`} secureTextEntry={Hide} style={ tw `p-2 flex-1  text-gray-600 font-semibold `} placeholder={placeholder? placeholder :"Password"} />
      <TouchableOpacity onPress={()=> setHide(!Hide)} style={tw `w-10 h-full items-center justify-center flex`}>
        {/* <Image style={ tw `h-6 w-6`} source={depositIcon} /> */}
        <Icon type='ionicon' size={20}  color={`${Colors.greenColor}`} name={Hide ? "eye" : "eye-off"} />
      </TouchableOpacity>
    </View>
  )
}

export default PasswordInput