import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Colors from '../../../Constants/Colors'

const CurrentOrder = (props) => {
  return (
    <View style={ tw `flex-1 `}>
      <View style={ tw `h-20 bg-white p-3`}>
        <Text style={tw `font-semibold`}>Order ID : 98241455</Text>
        <Text style={tw `text-[${Colors.yellowColor}] font-semibold`}>In progress</Text>
      </View>
      {/* pList  */}
      <ScrollView style={tw `mt-4 px-2`} >
     
    
      {/* Rember Price */}
      <View style={tw ` min-h-78 bg-white p-2 flex mt-4 `}>
      <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Farmer FirstName : </Text>
        <Text style={tw ` ml-3 mt-1`}>David</Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Farmer FirstName : </Text>
        <Text style={tw ` ml-3 mt-1`}>Ouattara Abraham</Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Commodity Name: </Text>
        <Text style={tw ` ml-3 mt-1`}>Soya Bean</Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Commodity Type Name : </Text>
        <Text style={tw ` ml-3 mt-1`}>Yellow Soya Bean</Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Bags : </Text>
        <Text style={tw ` ml-3 mt-1`}>20</Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Warehouse Location : </Text>
        <Text style={tw ` ml-3 mt-1`}> Sandema </Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Order Price  : </Text>
        <Text style={tw ` ml-3 mt-1`}>4000 GHS</Text>
          </View>
      <TouchableOpacity onPress={()=> props.navigation.navigate("trackOrder")}  style={ tw ` absolute bottom-2 self-center bg-[${Colors.greenColor}] h-14 mt-36 flex justify-center items-center rounded-lg w-full`} >
        <Text style={tw `capitalize text-white text-xl font-semibold`} >Track order</Text>
      </TouchableOpacity>
        </View>
  
    
     </ScrollView>
    </View>
  )
}

export default CurrentOrder