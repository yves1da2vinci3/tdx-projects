import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import { TextInput } from 'react-native'
import Colors from '../../Constants/Colors'
import { Avatar } from '@rneui/themed'
const Search = () => {
    const navigation = useNavigation()
    useEffect(()=>{
        navigation.setOptions({title : 'Search Farmer', headerShown : true, headerLeft: ()=>       <Icon  onPress={()=> navigation.goBack() } size={30} type="ionicon" name='arrow-back-outline'  />
        ,      })
        },[])
  return (
    <View style={tw `bg-white flex-1 p-2 `}>
      <TextInput style={tw `w-full h-15  border-b-2 border-b-[${Colors.greenColor}] `} placeholder="enter ID or phoneNumber" />
      {/* List of the Farmers */}
      <ScrollView  showsVerticalScrollIndicator={false} style={tw `flex-1 mt-4`}>
        <View style={tw `h-15 mt-2  flex px-2 items-center flex-row `} >
        <Avatar size={40} source={{ uri : "https://media.licdn.com/dms/image/C4E03AQGr1ATJxgLlFg/profile-displayphoto-shrink_800_800/0/1639553598181?e=2147483647&v=beta&t=UInTmNwhvz8vV051gs45Uo28k_e5aYk6NKnmMSRj5Zo"}} rounded={true} />
 
 {/* Name and Number */}
 <TouchableOpacity onPress={()=> navigation.navigate("singleFarmer")} style={tw`flex-1  pt-2 h-full ml-2`}>
 <Text style={tw `  text-lg`}>Samuel JackSon </Text>
 <Text style={tw ` text-gray-400 `}>0505528714</Text>

 </TouchableOpacity>
        </View>
        <View style={tw `h-15 mt-2  flex px-2 items-center flex-row `} >
        <Avatar size={40} source={{ uri : "https://media.licdn.com/dms/image/C4E03AQGr1ATJxgLlFg/profile-displayphoto-shrink_800_800/0/1639553598181?e=2147483647&v=beta&t=UInTmNwhvz8vV051gs45Uo28k_e5aYk6NKnmMSRj5Zo"}} rounded={true} />
 
 {/* Name and Number */}
 <View style={tw`flex-1  pt-2 h-full ml-2`}>
 <Text style={tw `  text-lg`}>Randall Kolo muani </Text>
 <Text style={tw ` text-gray-400 `}>0505528714</Text>

 </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Search