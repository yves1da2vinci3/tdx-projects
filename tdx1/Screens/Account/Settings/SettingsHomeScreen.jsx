import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twrnc'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../../Contexts/AuthContext'
import { HomeContext } from '../../../Contexts/HomeContext'
import { ScrollView } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import Colors from '../../../Constants/Colors'
const SettingsHomeScreen = (props) => {
  const {currency,SetCurrentcurrency} = useContext(HomeContext)
  const {user} = useContext(AuthContext)
  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({title : 'Settings',headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
      ,      })
      },[])
    const [currencySign, setCurrencySign] = useState('')

  const [ selectedId,setSelectedId ] = useState(1)
  const CurrencyList = [
    {
      id : 1,
      title :"USD"
    },
    {
      id : 1,
      title :"GH£"
    },
  ]
  
   const changeCurrency = async(value) =>{
    let currencyS = '$';
    if (value === 'GHS') {
        setCurrencySign('GH₵')
        currencyS='GH₵'
        SetCurrentcurrency(1)
    } else {
        setCurrencySign('$')
        SetCurrentcurrency(2)
    }
    
}
useEffect(() => {

  // setDropDownItem(currency.label)
  setCurrencySign(currency.label)
}, [])
const DisplayIcon = ({Status}) => {
  return (
    <View style={tw `flex-1  items-end `}>
      <Icon style={tw ``} type='ionicon' name={`caret-${Status? "up" : "down"}`}  />
       </View>
  )
}
const [currencyDpStatus,setcurrencyDpStatus] = useState(false)
const [SeasonDropdwonStatus,setSeasonDropdwonStatus] = useState(false)


  return (
    <ScrollView  showsVerticalScrollIndicator={false} style={tw `flex-1 bg-white p-2`}>

      <View style={tw `h-10  flex-row justify-between p-2 bg-gray-100 `} >
        <Text style={tw `font-bold`}>Contact Details</Text>
      </View>
      <View style={tw `h-20 justify-center p-2 `} >
        <Text style={tw `font-bold`}>{user.firstName + " " + user.lastName}</Text>
        <Text style={tw `font-semibold`}>id : {user.id.toString().padStart(10,"0")}</Text>
      </View>
      {/* Currency Details */}
      <View style={tw `h-10  mb-3 flex-row justify-between p-2 bg-gray-100 `} >
        <Text style={tw `font-bold `}>Currency </Text>
      </View>
      
   {/* OH oh */}
<View style={tw `flex items-center flex-row rounded-lg bg-[${Colors.TextInputBackgroundColor}] p-2`} >
<Text style={tw `font-semibold text-lg mx-4`}>{currencySign}</Text>

   <ModalDropdown options={ ["GHS","USD"] }  
       onSelect={(idx, DropDownItem) => changeCurrency(DropDownItem)}     showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1   p-2`} >
        <Text style={tw `font-semibold`}>{option}</Text>
      </View>)} onDropdownWillHide={()=> setcurrencyDpStatus(false)}  onDropdownWillShow={()=> setcurrencyDpStatus(true)} renderRightComponent={ ()=> <DisplayIcon Status={currencyDpStatus} /> } dropdownStyle={tw`min-h-24 w-70  border-2  border-gray-100  rounded-lg `}  style={ tw `h-15 bg-[${Colors.TextInputBackgroundColor}] text-lg justify-center flex-1 rounded-xl p-2`} textStyle={ { fontSize : 20 }} />
      </View>

      {/* Notifications settings */}
      <View style={tw `h-10  mb-3 mt-3 flex-row justify-between p-2 bg-gray-100 `} >
        <Text style={tw `font-bold `}>App settings </Text>
      </View>
      <TouchableOpacity  onPress={()=> props.navigation.navigate("notificationSettings")} style={ tw `flex flex-row bg-gray-100 rounded-lg items-center px-2 py-3 h-auto justify-between`} >
   <View style={ tw`items-center flex flex-row`}>
   <View style={ tw `flex justify-center   items-center h-12 w-12 rounded-lg`}>
   <Icon type='ionicon' name='notifications'  />
   </View>
   <Text style={tw`pl-2`}>notifications settings</Text>
   </View>
 </TouchableOpacity>
      {/* Security settings */}
      <View style={tw `h-10  mb-3 mt-3 flex-row justify-between p-2 bg-gray-100 `} >
        <Text style={tw `font-bold `}>Security settings </Text>
      </View>
      <TouchableOpacity  onPress={()=> props.navigation.navigate("changePassword")} style={ tw `flex flex-row bg-gray-100 rounded-lg items-center px-2 py-3 h-auto justify-between`} >
   <View style={ tw`items-center flex flex-row`}>
   <View style={ tw `flex justify-center   items-center h-12 w-12 rounded-lg`}>
   <Icon type='ionicon' name='lock-closed'  />
   </View>
   <Text style={tw`pl-2`}>Change Password</Text>
   </View>
 </TouchableOpacity>
      {/* Security settings */}
      <View style={tw `h-10  mb-3 mt-3 flex-row justify-between p-2 bg-gray-100 `} >
        <Text style={tw `font-bold `}>General settings </Text>
      </View>
      <TouchableOpacity  onPress={()=> props.navigation.navigate("notificationSettings")} style={ tw `flex mb-10 md:mb-3 flex-row bg-gray-100 rounded-lg items-center px-2 py-3 h-auto justify-between`} >
   <View style={ tw`items-center flex flex-row`}>
   <View style={ tw `flex justify-center   items-center h-12 w-12 rounded-lg`}>
   <Icon type='ionicon' name='help-circle'  />
   </View>
   <Text style={tw`pl-2`}>Help</Text>
   </View>
 </TouchableOpacity>

      
    </ScrollView>
  )
}

export default SettingsHomeScreen


