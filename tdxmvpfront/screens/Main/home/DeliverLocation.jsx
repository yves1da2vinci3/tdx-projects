import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { TouchableOpacity } from 'react-native'
import Colors from '../../../Constants/Colors'
import { BottomSheet, Icon } from '@rneui/base'
import MapView,{Marker,Polyline} from 'react-native-maps';

const DeliverLocation = (props) => {
    const [isVisible,setIsVisible] = useState(false)
    const EndPointHandler = (txt) => { 
      if(txt.length >2){
        setIsVisible(true)
      }
     }
  return (
    <View style={tw `pt-10 flex-1`}>
        
      <View style={tw ` relative flex-1`}>
        {/* Search postion */}
      <View style={tw `h-35 absolute  z-50 w-full `}>
        <View style={tw `h-15 items-center justify-center px-2 mt-2`}>
        <View style={tw `h-12 w-full shadow-lg rounded-full bg-white flex flex-row items-center px-4`}>
      <Icon type='ionicon' name='pin-outline' />
      <TextInput  value="sandama"  placeholder='enter the phone or Id Number' style={tw ` ml-2 flex-1 h-full bg-white rounded-full`} />
     </View>
        </View>
        {/* Endpoint */}
        <View style={tw `h-15 items-center justify-center px-2 `}>
        <View style={tw `h-12 w-full shadow-lg rounded-full bg-white flex flex-row items-center px-4`}>
      <Icon type='ionicon' name='search-outline' />
      <TextInput onChangeText={EndPointHandler}  placeholder='enter your location' style={tw ` ml-2 flex-1 h-full bg-white rounded-full`} />
     </View>
        </View>
        </View>
      <MapView
        style={{ flex : 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker  coordinate={{ latitude: 37.7725, longitude: -122.4324 }} >
            <View style={tw `w-8 h-8 bg-white justify-center items-center rounded-full border-4 border-[${Colors.greenColor}]`}>
                <Icon name='car' type='ionicon' size={20} />
            </View>
        </Marker>
        <Marker pinColor={Colors.greenColor} coordinate={{ latitude: 37.78805, longitude: -122.4300 }} />
        <Polyline
          coordinates={[
            { latitude: 37.7725, longitude: -122.4324 },
            { latitude: 37.78805, longitude: -122.4300 },
          ]}
          strokeColor={`${Colors.greenColor}`}
          strokeWidth={2}
        />
      </MapView>
      </View>

      {/* Information */}

      <BottomSheet isVisible={isVisible} >

     
      <View style={tw `h-80 bg-white p-2 `}>
        <View style={tw `flex-1`}>
            <Text style={tw `font-semibold `}>Order Summary</Text>
            {/* Order Price */}
            <View style={ tw `flex ml-4 mt-2 items-center w-full flex-row`}>
    <Icon type='ionicon' name='card-outline' color={Colors.greenColor} />
    <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 `}>Order Price : </Text>
        <Text style={tw ` ml-3 `}> 4000 GHS </Text>
          </View>

  </View>
  <View style={tw `flex flex-row   items-center`}>
     {/* Start Point */}
     <View style={ tw `flex ml-4 mt-2 items-center w-full flex-row`}>
    <Icon type='ionicon' name='pin-outline' color={Colors.greenColor} />
    <View style={tw `flex flex-row items-center`}>
        <Text style={tw `  `}> Sandama-</Text>
        <Text style={tw `  `}> Kumasi</Text>

          </View>

  </View>

 
  </View>
 
  {/* Distance Point */}
            <View style={ tw `flex ml-4 mt-2 items-center w-full flex-row`}>
    <Icon type='ionicon' name='navigate-outline' color={Colors.greenColor} />
    <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 `}>Distance  : </Text>
        <Text style={tw ` ml-3 `}> 12.2 Km</Text>
          </View>

  </View>
  {/* Estimated Delivery Time */}
            <View style={ tw `flex ml-4 mt-2 items-center w-full flex-row`}>
    <Icon type='ionicon' name='time-outline' color={Colors.greenColor} />
    <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 `}>Estimated Delivery Time  : </Text>
        <Text style={tw ` ml-3 `}> 3 days</Text>
          </View>

  </View>
  {/* Estimated Delivery Time */}
            <View style={ tw `flex ml-4 mt-2 items-center w-full flex-row`}>
    <Icon type='ionicon' name='car-outline' color={Colors.greenColor} />
    <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 `}>Transportation Fee  : </Text>
        <Text style={tw ` ml-3 `}> 400 GHS</Text>
          </View>

  </View>
  {/* OverAll */}
  <View style={ tw `flex ml-4 mt-2 items-center w-full flex-row`}>
    <Icon type='ionicon' name='cash-outline' color={Colors.greenColor} />
    <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 `}>Total  : </Text>
        <Text style={tw ` ml-3 `}> 4400 GHS</Text>
          </View>

  </View>
        </View>
      <TouchableOpacity  onPress={()=> props.navigation.navigate("userHome")}  style={ tw `bg-[${Colors.greenColor}] h-14  flex justify-center items-center rounded-lg w-full`} >
      <Text style={tw `capitalize text-white text-xl font-semibold`} >Confirm</Text>
    </TouchableOpacity>
      </View>
      </BottomSheet>
    </View>
  )
}

export default DeliverLocation