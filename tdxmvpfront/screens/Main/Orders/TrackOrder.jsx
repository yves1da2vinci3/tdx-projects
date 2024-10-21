import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import tw from 'twrnc'
import Colors from '../../../Constants/Colors'
const TrackOrder = (props) => {
   const navigation = useNavigation()
    useEffect(()=>{
        navigation.setOptions({title : 'Track order',headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
        ,      })
        },[])
  return (
    <View style={ tw`flex-1 bg-white p-2 relative`}>

      <View style={tw `flex items-center flex-row p-2 h-20 `}>
        <View style={ tw `h-14 w-14 rounded-full flex items-center justify-center bg-[${Colors.greenColor}]`}>
        <Icon size={30} type="ionicon" color="white" name='checkmark-outline'  />
        </View>
        <View style={ tw `flex-1 h-20  pl-1 ml-2 justify-center flex py-1`}>
    <Text style={tw `font-semibold mb-2 `}>Order confirmed</Text>
    
    
    <Text style={tw `text-gray-400 ml-2`}>20.00</Text>
    
   
    </View>
      </View>
      <View style={tw `flex items-center flex-row p-2 h-20 `}>
        <View style={ tw `h-14 w-14 rounded-full flex items-center justify-center bg-[${Colors.greenColor}]`}>
        <Icon size={30} type="ionicon" color="white" name='checkmark-outline'  />
        </View>
        <View style={ tw `flex-1 h-20  pl-1 ml-2 justify-center flex py-1`}>
    <Text style={tw `font-semibold mb-2 `}>Order in progress</Text>
    
    
    <Text style={tw `text-gray-400 ml-2`}>20.00</Text>
    
   
    </View>
      </View>
      <View style={tw `flex items-center flex-row p-2 h-20 `}>
        <View style={ tw `h-14 w-14 rounded-full flex items-center justify-center bg-[${Colors.greenColor}]`}>
        <Icon size={30} type="ionicon" color="white" name='checkmark-outline'  />
        </View>
        <View style={ tw `flex-1 h-20  pl-1 ml-2 justify-center flex py-1`}>
    <Text style={tw `font-semibold mb-2 `}>Order sent</Text>
    
    
    <Text style={tw `text-gray-400 ml-2`}>20.00</Text>
    
   
    </View>
      </View>
      <View style={tw `flex items-center flex-row p-2 h-20 `}>
        <View style={ tw `h-14 w-14 rounded-full flex items-center justify-center bg-[${Colors.greenColor}]`}>
        <Icon size={30} type="ionicon" color="white" name='checkmark-outline'  />
        </View>
        <View style={ tw `flex-1 h-20  pl-1 ml-2 justify-center flex py-1`}>
    <Text style={tw `font-semibold mb-2 `}>Order delivered</Text>
    
    
    <Text style={tw `text-gray-400 ml-2`}>20.00</Text>
    
   
    </View>
      </View>
      <View style={tw `flex items-center flex-row p-2 h-20 `}>
        <View style={ tw `h-14 w-14 rounded-full flex items-center justify-center bg-gray-300`}>
        <Icon size={30} type="ionicon" color="white" name='checkmark-outline'  />
        </View>
        <View style={ tw `flex-1 h-20  pl-1 ml-2 justify-center flex py-1`}>
    <Text style={tw `font-semibold mb-2 `}>Order recieved</Text>
    
    
    <Text style={tw `text-gray-400 ml-2`}>20.00</Text>
    
   
    </View>
      </View>
      <TouchableOpacity onPress={()=> props.navigation.navigate("orderOnMap")}  style={ tw ` absolute bottom-2 self-center bg-[${Colors.greenColor}] h-14 mt-36 flex justify-center items-center rounded-lg w-full`} >
        <Text style={tw `capitalize text-white text-xl font-semibold`} >Show on map</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TrackOrder