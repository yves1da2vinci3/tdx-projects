import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import tw from 'twrnc'
import Colors from '../../../Constants/Colors'
import { commodities, commoditTypes, Offers } from '../../../dummyData'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch } from 'react-redux'
import {addOffer} from '../../../redux/cartSlice'
const SingleOffer = (props) => {
    const navigation = useNavigation()
    const toast = useToast()
    const dispatch = useDispatch()
  useEffect(()=>{
    navigation.setOptions({title : 'Offer detail', headerShown : true, headerLeft: ()=>   (<Icon onPress={()=> navigation.goBack()} name='arrow-back-outline' type='ionicon' />)     
 
    ,      })
    },[])

    const AddTocart = () => { 
      try {
        const offer  = Offers[props.route.params.offerId-1]
        dispatch( addOffer({
          offer : offer
        }))
        toast.show("offer successully added to the cart", { type : "success" })
        props.navigation.goBack()
      } catch (error) {
        console.log(error)
      }
    
     }

  return (
    <View style={tw `flex-1 bg-white p-3`}>
      <View style={tw ` flex-1`}>
      <View style={tw `h-100 bg-white w-93 p-3 shadow `}>
    <View style={tw `flex-row items-center justify-between px-3`} >
          
          <Text style={tw `font-semibold`}>identifiant  : 23jsdoje34 </Text>
         <Text style={tw ` font-semibold mt-2 bg-green-300 text-green-700 p-2 rounded-full`}> Available</Text>
          
        </View>
        {/* Others Informations */}
        <View style={tw `flex-1 mt-2 `}>

         
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Commodity Name: </Text>
        <Text style={tw ` ml-3 mt-1`}>{commodities[commoditTypes[Offers[props.route.params.offerId-1].commodityTypeId-1].commodityId-1].commodityName}</Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Commodity Type Name : </Text>
        <Text style={tw ` ml-3 mt-1`}>{commoditTypes[Offers[props.route.params.offerId-1].commodityTypeId-1].commoditTypeName}</Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Bags : </Text>
        <Text style={tw ` ml-3 mt-1`}>{Offers[props.route.params.offerId-1].bags}</Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Warehouse Location : </Text>
        <Text style={tw ` ml-3 mt-1`}>{Offers[props.route.params.offerId-1].warehouseLocation} </Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
        <Text style={tw `font-semibold ml-3 mt-1`}>Order Price  : </Text>
        <Text style={tw ` ml-3 mt-1`}>{Offers[props.route.params.offerId-1].orderPrice} GHS</Text>
          </View>
      
         
          
          
         
        
         
       
         

        </View>
        <View style={tw `h-8  p-1`}>
        <Text style={tw `font-semibold text-gray-400 text-right `}> 6th february 2023 </Text>
        </View>
    </View>
      </View>
      <TouchableOpacity  onPress={()=> AddTocart()}  style={ tw `bg-[${Colors.greenColor}] h-14  flex justify-center items-center rounded-lg w-full`} >
      <Text style={tw `capitalize text-white text-xl font-semibold`} >Pick the offer</Text>
    </TouchableOpacity>
    </View>
  )
}

export default SingleOffer