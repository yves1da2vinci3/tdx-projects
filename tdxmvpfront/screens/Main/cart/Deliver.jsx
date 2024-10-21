import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twrnc'
import { Icon } from '@rneui/base'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Colors from '../../../Constants/Colors'
import { useNavigation } from '@react-navigation/native'
import Loader from '../../../Components/Loader'
import { AuthContext } from '../../../Context/AuthContext'
import httpClient from '../../../config/Api'
import { useToast } from 'react-native-toast-notifications'
import { BasketContext } from '../../../Context/Basket'
const Deliver = (props) => {
  const toast = useToast()
     const [isLoading,setIsLoading] = useState(false)
     const {Token} = useContext(AuthContext)
     const {ClearCart} = useContext(BasketContext)
    const navigation = useNavigation()
    useEffect(()=>{
      navigation.setOptions({title : 'Resume', headerShown : true,headerLeft : ()=> <Icon onPress={()=> props.navigation.goBack()} name='arrow-back' type='ionicon' />    
   
      ,      })
      },[])
      const PostADeliver = async() => { 
        setIsLoading(true)
        try {
          const requestBody = {
            offerAggregationStatus: "PENDING",
            offerAggregationQuantityInKg: props.route.params.CartToDeliver.reduce((previousValue,currentCartItem)=> previousValue + currentCartItem.items.reduce((previousValue,currentItem)=> previousValue + currentItem.offerItems.reduce((pr,curr)=> pr + curr.offerContactQuantityInKg,0)  ,0),0),
            offerAggregationPrice: props.route.params.CartToDeliver.reduce((previousValue,currentCartItem)=> previousValue + currentCartItem.items.reduce((previousValue,currentItem)=> previousValue + currentItem.offerItems.reduce((pr,curr)=> pr + curr.offerContactPrice,0)  ,0),0),
            offerAggregationDate: (new Date()).toISOString()
          }
          const {data} = await httpClient.post("/traderur/offer-aggregations",requestBody,{
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          })
         const offerIds = []
         props.route.params.CartToDeliver.map(cartItem => cartItem.items.map(item=>  item.offerItems.map(offerContract=>offerIds.push(offerContract.id))) )
         console.log("offerIds: ", offerIds,"offer-aggregationIds: ", data.id)
          await httpClient.put(`/traderur/offer-aggregations/${data.id}`,{ offerIds },{
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          })
          ClearCart()
          setIsLoading(false)
          toast.show("offer aggregation created  Successfully", {
            type: "success",
            dangerColor :`${Colors.greenColor}`,
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
          props.navigation.navigate("home")
        } catch (error) {
          console.log(error)
        }
       }
  return (
    <View style={tw`flex-1 `}>

      
        {/* Items */}
        <View style={tw `flex-1`} >
      <ScrollView  showsVerticalScrollIndicator={false} style={tw `flex-1 `} >
      { props.route.params.CartToDeliver.map((cartItem,index) => (<View  style={tw `   min-h-50 mt-2 ${(index +1) %2 === 0 ? "bg-white" : "bg-gray-100"} `} >
          {/* Commodity Information */}
      <View style={tw `h-10 justify-between flex flex-row items-center w-full `}>

<View style={tw `flex items-center flex-row`}>
<Image  style={tw `h-12 w-12 rounded-full`} source={{ uri : cartItem.commodityUrl }} />
<Text style={tw `text-lg ml-2 font-semibold`}>{cartItem.commodityName}</Text>
</View>
</View>
{/* Commdotity Group Item */}
<View style={tw ` flex-1`} >

{ cartItem.items.map(item => (<TouchableOpacity  style={tw `h-10 border-b-2 border-gray-100 $ flex items-center flex-row`} >
  {/* Location  */}
  <View style={tw `flex  w-45 flex-row items-center`}>
        <Text style={tw ` ml-1 `}>{item.cityName}  </Text>
          </View>
  {/* Price */}
<View style={tw `flex  w-22 flex-row items-center`}>
        <Text style={tw ` ml-1   `}>{item.offerItems.reduce((previousValue,currentItem)=> previousValue + currentItem.offerContactPrice ,0)} GHS </Text>
          </View>
          {/* MT */}
          <View style={tw `flex-1 flex-row items-center`}>
        <Text style={tw ` ml-1 `}> {item.offerItems.reduce((previousValue,currentItem)=> previousValue + currentItem.offerContactQuantityInKg ,0)/1000 }MT </Text>
          </View>
          {/* Actions */}
         
</TouchableOpacity>)) }


</View>

{/* OH */}
<View style={tw `h-10  flex items-center flex-row`} >
  {/* Location  */}
  <View style={tw `flex  w-45 flex-row items-center`}>
        <Text style={tw ` ml-1 font-semibold `}>Total  </Text>
          </View>
  {/* Price */}
<View style={tw `flex  w-22 flex-row items-center`}>
        <Text style={tw ` ml-1   `}> {cartItem.items.reduce((previousValue,currentItem)=> previousValue + currentItem.offerItems.reduce((pr,curr)=> pr + curr.offerContactPrice,0) ,0)}  GHS </Text>
          </View>
          {/* MT */}
          <View style={tw `flex-1 flex-row items-center`}>
        <Text style={tw ` ml-1 `}> {cartItem.items.reduce((previousValue,currentItem)=> previousValue + currentItem.offerItems.reduce((pr,curr)=> pr + curr.offerContactQuantityInKg,0)  ,0)/1000}MT </Text>
          </View>
          {/* Actions */}
          <View style={tw `flex flex-row ml-1  items-center`}>
         
         
          </View>
</View>
{/* Summary */}

</View>)) }

      </ScrollView>
      </View>
        {/* Summary */}
        <View style={tw `h-50 border-t-2 border-gray-100 bg-white p-2 `}>
        <View style={tw `flex-1`}>
            <Text style={tw `font-semibold `}>Order Summary</Text>
            {/* Order Price */}
            <View style={ tw `flex ml-4 mt-2 items-center w-full flex-row`}>
    <Icon type='ionicon' name='card-outline' color={Colors.greenColor} />
    <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 `}>Total Amount : </Text>
        <Text style={tw ` ml-3 `}>{props.route.params.CartToDeliver.reduce((previousValue,currentCartItem)=> previousValue + currentCartItem.items.reduce((previousValue,currentItem)=> previousValue + currentItem.offerItems.reduce((pr,curr)=> pr + curr.offerContactPrice,0)  ,0),0)} GHS</Text>
          </View>

  </View>
  <View style={tw `flex flex-row   items-center`}>
     {/* Start Point */}
    

 
  </View>
 
 

    
  {/* Estimated  Time */}
            <View style={ tw `flex ml-4 mt-2 items-center w-full flex-row`}>
    <Icon type='ionicon' name='server-outline' color={Colors.greenColor} />
    <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 `}>Total Quantity : </Text>
        <Text style={tw ` ml-3 `}> {props.route.params.CartToDeliver.reduce((previousValue,currentCartItem)=> previousValue + currentCartItem.items.reduce((previousValue,currentItem)=> previousValue + currentItem.offerItems.reduce((pr,curr)=> pr + curr.offerContactQuantityInKg,0)  ,0),0)/1000} MT</Text>
          </View>

  </View>
  {/* OverAll */}
  {/* <View style={ tw `flex ml-4 mt-2 items-center w-full flex-row`}>
    <Icon type='ionicon' name='cash-outline' color={Colors.greenColor} />
    <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 `}>Total  : </Text>
        <Text style={tw ` ml-3 `}></Text>
          </View>

  </View> */}
        </View>
      <TouchableOpacity  onPress={()=>  PostADeliver() }  style={ tw `bg-[${Colors.greenColor}] h-14  flex justify-center items-center rounded-lg w-full`} >
      <Text style={tw `capitalize text-white text-xl font-semibold`} >Confirm</Text>
    </TouchableOpacity>
      </View>
      <Loader isLoading={isLoading} />
    </View>
  )
}

export default Deliver