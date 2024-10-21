import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Avatar, Icon } from '@rneui/base'
import tw from 'twrnc'
import Colors from '../../../Constants/Colors'
import OfferItem from '../../../Components/OfferItem'
import { Offers,commodities, commoditTypes } from '../../../dummyData'
import { BasketContext } from '../../../Context/Basket'
import Loader from '../../../Components/Loader'
import httpClient from '../../../config/Api'
import { AuthContext } from '../../../Context/AuthContext'
import { TouchableOpacity } from 'react-native'
// {commodities[props.route.params.commodityId-1].commodityName}
export const Header = ({commodityName}) => { 

  return (
    <View style={ tw `flex flex-row  `}>

      <Text style={tw `ml-3 font-semibold text-center text-xl border-b-2 border-gray-100 `}>Aggregation of </Text>
      <Text style={tw ` font-semibold text-center text-xl text-[${Colors.greenColor}] border-b-2 border-gray-100 `}> {commodityName}</Text>
      </View>
  )
 }

const UserHome = (props) => {
  const { Cart }  = useContext(BasketContext)

  const [isLoading,setIsLoading] = useState(true)
  const [Offers,setOffers] = useState([])
  const navigation = useNavigation()
  const {Token} = useContext(AuthContext)
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true)
      getOffers()
    }, [])
  )
  useEffect(()=>{
    navigation.setOptions({title : 'Aggregation page', headerShown : true, headerTitle: ()=>  <Header  commodityName={props.route.params.commodityName} /> ,headerLeft : ()=> <Icon onPress={()=> props.navigation.goBack()} name='arrow-back' type='ionicon' />    
 
    ,      })
    getOffers()
    },[])

    const getOffers = async() => { 
      try {
        const reponse = await httpClient.get(`/traderur/offer-contracts?commodityId.equals=${props.route.params.commodityId}&offerContractStatus.equals=ACCEPTED`,{
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        })
        // console.log(reponse)
        setOffers(reponse.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)

      }
     }
  return (
    <View style={tw`bg-white flex-1 `}>
      {/* NavBar */}
      <View style={ tw `h-60 bg-white border-b-2 border-b-gray-100 shadow  pb-2  android:px-1 ios:px-2  `} >
      
     {/* Table */}
     <View style={tw `flex-1 border-gray-200 `} >
      {/* firstColumn */}
      <View style={tw `w-full h-8  bg-[#979797]  flex-row items-center`} >
        <View style={tw `flex-1 justify-center items-center`} >
          <Text style={tw `text-white font-semibold`}>Location</Text>
        </View>
        <View style={tw `flex-1 justify-center items-center`} >
          <Text style={tw `text-white font-semibold`}>Quantity</Text>
        </View>
        <View style={tw `flex-1 justify-center items-center`} >
          <Text style={tw `text-white font-semibold`}>Aggregate price</Text>
        </View>
      </View>
      {/* Rows */}
      <View style={tw `flex-1 `} >
       <ScrollView>

      
      {
        Cart.length >0? Cart.filter(item=> item.commodityId === props.route.params.commodityId)[0].items.map(cartItem => (<View style={tw `w-full h-8  flex-row items-center`} >
        <View style={tw `flex-1 justify-center items-center`} >
          <Text>{cartItem.cityName}</Text>
        </View>
        <View style={tw `flex-1 justify-center items-center`} >
          <Text>{cartItem.offerItems.reduce((previousValue,currentItem)=> previousValue + currentItem.offerContactQuantityInKg ,0)}</Text>
        </View>
        <View style={tw `flex-1 justify-center items-center`} >
          <Text>{cartItem.offerItems.reduce((previousValue,currentItem)=> previousValue + currentItem.offerContactPrice ,0)} GHS</Text>
        </View>
      </View>)) : <Text></Text>
      }
       </ScrollView>
     
       </View>
      {/* Total */}
      <View style={tw `w-full h-8    flex-row items-center`} >
        <View style={tw `flex-1 justify-center items-center`} >
          <Text style={tw `text-black font-semibold`}>Total</Text>
        </View>
        <View style={tw `flex-1 justify-center items-center`} >
          <Text style={tw `text-black font-semibold`}>{Cart.length >0? Cart.filter(item=> item.commodityId === props.route.params.commodityId)[0]?.items.reduce((previousValue,cartItem)=> previousValue +  cartItem.offerItems.reduce((previousValue,currentItem)=> previousValue + currentItem.offerContactQuantityInKg ,0),0) : "0" }</Text>
        </View>
        <View style={tw `flex-1 justify-center items-center`} >
          <Text style={tw `text-black font-semibold`}>{Cart.length >0? Cart.filter(item=> item.commodityId === props.route.params.commodityId)[0]?.items.reduce((previousValue,cartItem)=> previousValue +  cartItem.offerItems.reduce((previousValue,currentItem)=> previousValue + currentItem.offerContactPrice ,0),0) : "0" } GHS</Text>
        </View>
      </View>
      
     </View>
     <TouchableOpacity onPress={()=> props.navigation.navigate("cart")} style={tw `h-8 w-24 bg-[${Colors.greenColor}] self-end mt-2  justify-center items-center`} >
      <Text style={tw `text-white uppercase font-semibold `} >proceed</Text>
     </TouchableOpacity>
    </View>
    {/* Offer */}
    <View style={tw `w-full h-8  bg-[#979797]  flex-row items-center`} >
    <View style={tw `flex-1 justify-center items-center`} >
          <Text style={tw `text-white font-semibold`}>Date</Text>
        </View>
        <View style={tw `w-24 justify-center items-center`} >
          <Text style={tw `text-white font-semibold`}>Location</Text>
        </View>
        <View style={tw `flex-1 justify-center items-center`} >
          <Text style={tw `text-white font-semibold`}>Qty</Text>
        </View>
        <View style={tw `flex-1 justify-center items-center`} >
          <Text style={tw `text-white font-semibold`}> price</Text>
        </View>
       
      </View>
      { isLoading ? <Text>...</Text> : Offers.length <0 ? <Text>No offers right now</Text> :   <ScrollView showsVerticalScrollIndicator={false} style={tw `flex-1 bg-white p-2`}>
      
      {      Offers.map((offer,index) => (<OfferItem  pair={ (index +1) %2 === 0}  key={offer.id} offer={offer} />))}
      
          </ScrollView>  }
   
    <Loader isLoading={isLoading} />
    </View>
  )
}

export default UserHome