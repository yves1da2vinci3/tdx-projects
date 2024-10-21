import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Avatar, Icon } from '@rneui/base'
import tw from 'twrnc'
import Colors from '../../../Constants/Colors'
import MapView,{Marker,Polyline} from 'react-native-maps';
const OrderMap = () => {
  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({title : 'Track order',headerLeft: ()=>       <Icon  onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
      ,      })
      },[])
  return (
    <View style={ tw `flex-1`}>
      {/* map */}
      <View style={tw ` flex-1 `}>
  
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
      {/* information opn the deliver */}
      <View style={tw `h-46 bg-white p-4 `}>
        {/* detail on the delivrer */}
        <View style={tw `h-20  flex flex-row items-center justify-between`}>
             <View style={tw `h-18 w-64 flex flex-row items-center`}>
              <Avatar size={50} rounded={true} source={{ uri : "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80" }} />

              <View style={ tw `flex-1 h-20  pl-1 ml-2 justify-center flex py-1`}>
    <Text style={tw `font-semibold mb-2 `}>David</Text>
    <Text style={tw `text-gray-400 font-semibold ml-2`}>Delivery person</Text>
          </View>
             </View>
             <View style={ tw `h-14 w-14 rounded-full flex items-center justify-center bg-[${Colors.greenColor}]`}>
        <Icon size={30} type="ionicon" color="white" name='call-outline'  />
        </View>
        </View>
        {/* develivery time  */}
        <View style={tw `flex flex-row`}>
    <Text style={tw `text-black font-bold `}>Delivery Time</Text>
    <Text style={tw `text-[${Colors.greenColor}] font-semibold ml-2`}>00.02.32</Text>

    </View>
    {/* Dtails location */}
    <View style={tw `flex items-center flex-row p-2 h-20 `}>
        <View style={ tw `h-4 w-4 border-2 rounded-full flex items-center justify-center border-[${Colors.greenColor}]`}>
        </View>
        <View style={ tw `flex-1 h-20  pl-1 ml-2 justify-center flex py-1`}>
    <Text style={tw `font-semibold  `}>Boulverard de marseille</Text>
    </View>
      </View>
      </View>
    </View>
  )
}

export default OrderMap



