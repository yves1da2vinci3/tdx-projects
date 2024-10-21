import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Colors from '../../Constants/Colors'
import { Avatar, Icon } from '@rneui/base'
import { Image } from 'react-native'
import tdxlogo from '../../assets/Images/Logo.png'
import { TextInput } from 'react-native-gesture-handler'

const UserHome = (props) => {
  const SearchText = (txt) => { 
    if(txt.length > 3) {
      props.navigation.navigate("search")
    }
   }
  return (
    <View style={tw `flex-1 relative bg-[${Colors.TextInputBackgroundColor}] pt-10`}>
        <Icon type='ionicon' name='settings' size={20} color="black" style={tw `self-start ml-4`} />
      <View style={tw `h-45 `}></View>
      {/* Card */}
      <View style={tw `h-45 flex  p-2 absolute self-center top-30 shadow rounded-lg z-20 w-80 bg-green-500`}>
        <View style={tw `flex-1 items-center p-2 flex-row`}>
{/* User Image */}
<Avatar size={80} source={{ uri : "https://media.licdn.com/dms/image/C4E03AQGr1ATJxgLlFg/profile-displayphoto-shrink_800_800/0/1639553598181?e=2147483647&v=beta&t=UInTmNwhvz8vV051gs45Uo28k_e5aYk6NKnmMSRj5Zo"}} rounded={true} />
{/* Name */}
<View style={tw `ml-4`}>
    {/* Id */}
    <View style={tw `flex flex-row items-center`}>
        <Icon type='ionicon' name='card-outline' color="white" />
    <Text style={tw `font-bold ml-1 text-lg text-white`}>23ykdwkdwdw</Text>
    </View>
    {/* FirstName */}
    <View style={tw `flex flex-row items-center`}>
        <Icon type='ionicon' name='person-circle-outline' color="white" />
    <Text style={tw `font-semibold ml-1 text-lg text-white`}>Benjamin</Text>
    </View>
    {/* Last Name */}
    <View style={tw `flex flex-row items-center`}>
        <Icon type='ionicon' name='person-circle-outline' color="white" />
    <Text style={tw `font-semibold ml-1 text-lg text-white`}>Bice Asiedu </Text>
    </View>
    {/* location Name */}
    <View style={tw `flex flex-row items-center`}>
        <Icon type='ionicon' name='pin-outline' color="white" />
    <Text style={tw `font-semibold ml-1 text-lg text-white`}>Sandama </Text>
    </View>
   
</View>
        </View>
        <Image source={tdxlogo} style={tw ` self-end h-10 w-10`} />
      </View>
      {/* Other space */}
      <View style={tw `bg-white flex-1 rounded-t-[3] `}>
        <View style={tw `h-17 items-center justify-center px-2 mt-20`}>
        <View style={tw `h-15 w-full shadow-lg rounded-full bg-white flex flex-row items-center px-4`}>
      <Icon type='ionicon' name='search-outline' />
      <TextInput onChangeText={SearchText}  placeholder='enter the phone or Id Number' style={tw ` ml-2 flex-1 h-full bg-white rounded-full`} />
     </View>
        </View>

        {/* Old Transactions */}
        <ScrollView style={tw `flex-1 border-t-8 border-t-[${Colors.TextInputBackgroundColor}] mt-3`} showsVerticalScrollIndicator={false} >
           {/* Sellting Items */}
           <TouchableOpacity onPress={()=> props.navigation.navigate("detail")} style={tw `h-20 items-center flex-row p-2`} >
            <View style={tw `flex-1`}>
            <Text style={tw ` text-[${Colors.greenColor}] font-semibold `}>  Yellow soya bean sold</Text>
            <Text style={tw `text-gray-300 ml-2`}>february 6th 2023</Text>
            </View>
    
            <Text style={tw `text-black font-semibold italic`}>20 bags</Text>
        
           </TouchableOpacity>
           {/* Withdraw */}
           <View style={tw `h-20 items-center flex-row p-2`} >
            <View style={tw `flex-1`}>
            <Text style={tw ` text-[${Colors.greenColor}] font-semibold `}>  Grey Cashew Nuts Withdrew</Text>
            <Text style={tw `text-gray-300 ml-2`}>february 12th 2023</Text>
            </View>
    
            <Text style={tw `text-black font-semibold italic`}>30 bags</Text>
        
           </View>
        </ScrollView>
      </View>

    </View>
  )
}

export default UserHome