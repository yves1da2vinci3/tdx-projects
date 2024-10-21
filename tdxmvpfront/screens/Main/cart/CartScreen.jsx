import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ShoppingCart from '../../../assets/Images/shopping-cart.png'
import tw from "twrnc"
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import Colors from '../../../Constants/Colors'
import { CheckBox, Icon } from '@rneui/base'
import { BasketContext } from '../../../Context/Basket'
import DropDown from '../../../Components/OtherDropDown'

import { AuthContext } from '../../../Context/AuthContext'
import getLocationsFromCart from '../../../utils/RetreiveLocation'
import { useFocusEffect } from '@react-navigation/native'
const CartScreen = (props) => {
  const { Cart } = useContext(BasketContext)
   const [offersId,setOffersId] = useState([])
   const [copyCart,setCopyCart] = useState([])
 const [isAllSelected,setisAllSelected] = useState(false)
   const [isOneSelected,setIsOneSelected] = useState(false)
   const [changeOccured,setChangeOccured] = useState(Math.random())
   const [cities,setCities] = useState([])
   const onLongPress = (offerId) => { 
           const copyOfferId = offersId
        const newOffersId = [...copyOfferId,offerId]
        setOffersId(newOffersId)
        setIsOneSelected(true)
        setChangeOccured(Math.random())

    }
    const OnPress = (offerId) =>{
      const copyOfferId = offersId
      const index = copyOfferId.findIndex(offer => offer === offerId)
      if(index === -1){
        const newOffersId = [...copyOfferId,offerId]
        setOffersId(newOffersId)
        setChangeOccured(Math.random())
      }else{
        const newOffersId = copyOfferId.filter(elt => elt !== offerId)
        setOffersId(newOffersId)
        setChangeOccured(Math.random())

      }
   
    }

    const selectAll = () => { 
        const offersId = Cart.reduce((previousValue,currentItem)=> [...previousValue ,currentItem.items.map(item => (item.id))]  ,[])
          const realOfferid =  offersId.flat()
          setOffersId(realOfferid)
          setisAllSelected(true)
     }
     const DeselectAll = () => { 
      
      setOffersId([])
      }

      useFocusEffect(
        React.useCallback(() =>{
    const value =  Cart.length ===0 ?0 :Cart?.reduce((previousValue,currentItem)=> previousValue + currentItem.items.length) 
        const info = {
          offerIdLenght : offersId.length,
          totalInCart : value
        }
        console.log(info)
       if(offersId.length === Cart?.reduce((previousValue,currentItem)=> previousValue + currentItem.items.length,0) ){
        setisAllSelected(true)
       }else{
        setisAllSelected(false)
       }
        },[JSON.stringify(offersId),Cart ])
      )
      useEffect(()=>{
        // console.log(Cart.reduce((previousValue,currentItem)=> previousValue + currentItem.items.length,0))
    
      },[])
      // 
  //  Go to Deliver Page
  const goToDeliverPage = () => { 
    // const CartToDeliver =  (Cart.map((cartItem,index) => ({...cartItem,items :cartItem.items.filter(item => offersId.includes(item.id) )})  )).filter(cartItem => cartItem.items.length >0 )
    props.navigation.navigate('deliverOption',{CartToDeliver : copyCart})
   }
  //  Request for Cities

   

    useEffect(() => {
      setCopyCart(Cart)
      console.log(Cart)
       setCities(getLocationsFromCart(Cart)) 
    }, [Cart])
  return (
    <View style={tw `  flex-1 bg-white px-1 flex pt-10 relative`}>
     {isOneSelected  && <View style={tw ``}>
       <View style={tw `h-30 items-center flex-row justify-center flex `} >
      <TouchableOpacity onPress={()=> goToDeliverPage() } style={tw `h-12 w-34 bg-[${Colors.greenColor}]  flex justify-center  items-center flex-row`} >
        <Icon type='ionicon' name='boat' color="white" />
        <Text style={tw `font-semibold uppercase ml-4 text-white`} >Deliver</Text>
      </TouchableOpacity>
      <View style={tw `h-12 w-34 bg-[${Colors.redColor}]  ml-4 flex justify-center  items-center flex-row`} >
        <Icon type='ionicon' name='trash' color="white" />
        <Text style={tw `font-semibold uppercase ml-2 text-white`} >Remove</Text>
      </View>
      </View>
      <View style={tw `flex items-center justify-between px-2 flex-row`} >
      <TouchableOpacity  onPress={() => isAllSelected ? DeselectAll() : selectAll()} style={tw `flex flex-row items-center`}>
          <CheckBox
          style={tw `m-0`}
           checked={isAllSelected}
          
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           checkedColor={`${Colors.greenColor}`}
         />
         <Text style={tw `text-black`} >{isAllSelected ? "Deselect All" : "Select All"}</Text>
          </TouchableOpacity>
          {/* DropDown */}
          <View style={tw `bg-red-400 w-auto`}></View>
           <DropDown setCopyCart={setCopyCart}  copyCart={copyCart}  Cart={Cart} data={cities}/>
         {/* <DropDown  placeholder=" location" bgColor="white"  data={["sandema","karaga","wah"]} /> */}

      </View>
      
          
      </View> }
      { copyCart.length >0? <ScrollView  showsVerticalScrollIndicator={false} style={tw `flex-1 `} >
      { copyCart.map((cartItem,index) => (<View  style={tw `   min-h-50 mt-2 ${(index +1) %2 === 0 ? "bg-white" : "bg-gray-100"} `} >
          {/* Commodity Information */}
      <View style={tw `h-10 justify-between flex flex-row items-center w-full `}>

<View style={tw `flex items-center flex-row`}>
<Image  style={tw `h-12 w-12 rounded-full`} source={{ uri : cartItem.commodityUrl }} />
<Text style={tw `text-lg ml-2 font-semibold`}>{cartItem.commodityName}</Text>
</View>
</View>
{/* Commdotity Group Item */}
<View style={tw ` flex-1`} >
{ cartItem.items.map(item => (
<TouchableOpacity  onPress={()=> isOneSelected ? OnPress(item.id): console.log("nothin")    } onLongPress={()=> onLongPress(item.id)} style={tw `h-10 border-b-2 border-gray-100 ${ (offersId.findIndex(offersId => offersId === item.id ) !== -1) &&( (index +1) %2 ===0) ?  "bg-green-100" :  (offersId.findIndex(offersId => offersId === item.id ) !== -1) &&( (index +1) %2 !==0) ? "bg-white" : "" } flex items-center flex-row`} >
  {/* Location  */}
  <View style={tw `flex  w-45 flex-row items-center`}>
        <Text style={tw ` ml-1 `}>{item.cityName}  </Text>
          </View>
  {/* Price */}
<View style={tw `flex  w-22 flex-row items-center`}>
        <Text style={tw ` ml-1   `}> {item.offerItems.reduce((previousValue,currentItem)=> previousValue + currentItem.offerContactPrice ,0)} GHS </Text>
          </View>
          {/* MT */}
          <View style={tw `flex-1 flex-row items-center`}>
        <Text style={tw ` ml-1 `}> {item.offerItems.reduce((previousValue,currentItem)=> previousValue + currentItem.offerContactQuantityInKg ,0)/1000 }MT </Text>
          </View>
          {/* Actions */}
          <View style={tw `flex flex-row ml-1  items-center`}>
            { offersId.findIndex(offersId => offersId === item.id ) !== -1 ?  <View style={tw `h-5 w-5 bg-[${Colors.greenColor}] flex rounded-full items-center justify-center `} >
          <Icon type='ionicon' size={15} name='checkmark' color="white" />
        </View> :  <View style={tw `h-5 w-5 ${(index +1) %2 === 0 ? `bg-[${Colors.TextInputBackgroundColor}]` : `bg-[${Colors.greenColor}]` }  flex rounded-full items-center justify-center `} >
        </View>  }
         
         
          </View>
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

      </ScrollView> :  <>
     <View style={tw `flex-1 justify-center flex items-center `}>
      <View style={tw `relative`}>
        <View style={tw `bg-green-200 h-80 w-80 rounded-full justify-center items-center flex`} >
        <Image source={ShoppingCart} style={tw `w-48 h-48`} />

        </View>
<Text style={tw `text-2xl text-center mt-4 font-semibold`}>Your cart is empty</Text>
<Text style={tw `text-xl text-gray-600 text-center mt-4  mb-24`}>Please select an offer to complete your cart.</Text>
      </View>
     </View>
     </> }
    </View>
  )
}

export default CartScreen