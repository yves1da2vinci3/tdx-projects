import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../Constants/Colors'
import tw from 'twrnc'

import { BasketContext } from '../Context/Basket'
import formatDate from '../helpers/formatDate'
const OfferItem = ({offer,pair}) => {
  //  console.log(offer.offerId)
  console.log(pair)
    const {addToCart,deleteFromCart,isAlaredyPicked} = useContext(BasketContext)
  return (
    <View style={tw `flex h-15 ${pair ? "bg-gray-100" : "bg-white"} w-full`} > 
    <View style={tw `w-full h-8     flex-row items-center`} >
    <View style={tw `flex-1 justify-center items-center`} >
      <Text style={tw `text-black `}> {formatDate(offer.offerContractDate)} </Text>
    </View>
    <View style={tw `w-35 justify-start ml-2 `} >
      <Text style={tw `text-black text-center capitalize `}>{offer.city.cityName}</Text>
    </View>
    <View style={tw `flex-1 justify-center items-center`} >
      <Text style={tw `text-black `}>{(offer.offerContactQuantityInKg)} kg</Text>
    </View>
    <View style={tw `flex-1 justify-center items-center`} >
      <Text style={tw `text-black `}> {offer.offerContactPrice} GHS</Text>
    </View>
   
    
  </View>
    <View style={tw `flex-1 self-end justify-center items-center`} >
          <TouchableOpacity onPress={()=> isAlaredyPicked(offer.id)  ?  deleteFromCart(offer.id) : addToCart(offer)  } style={tw `h-6 w-18 ml-2 bg-[${ isAlaredyPicked(offer.id) ?  Colors.redColor : Colors.greenColor}] justify-center items-center`} >
          <Text style={tw ` uppercase text-white font-semibold`}> { isAlaredyPicked(offer.id) ?  "remove" : "add"}</Text>

          </TouchableOpacity>
        </View>
    </View>
    
  )
}

export default OfferItem