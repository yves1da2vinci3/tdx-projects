import { View, Text, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import { Icon, Overlay } from '@rneui/base'
import {  Overlay as DeleteOverlay } from '@rneui/themed'
import tw from 'twrnc'
import Colors from '../../Constants/Colors'
import { LineChart } from 'react-native-chart-kit'
import { wp } from '../../helpers/Responsiveness'
import AlertItem from '../../Components/AlertItem'
import Loader from '../../Components/Loader'
import { AuthContext } from '../../Contexts/AuthContext'
import { httpClient } from '../../apis/Api'
import { HomeContext } from '../../Contexts/HomeContext'
import { useToast } from 'react-native-toast-notifications'

const AlertScreen = () => {
  const toast = useToast()
  const {user} = useContext(AuthContext)
  const {currency} = useContext(HomeContext)
  const [isLoading,setisLoading] = useState(false)
  const [modifyAlertModal,setmodifyAlertModal] = useState(false)
  const [deleteModal,setdeleteModal] = useState(false)
  const [Alerts,setAlerts] = useState([])
  const [alertPrice, setAlertPrice] = useState('')

 const [Alert,setAlert] = useState({ticker : { title : "tickerTitle" } , price : "price" } )
  const fetchUserAlerts =  async() => { 
    setisLoading(true)
    try {
      const {data} = await httpClient.get(`/api/users/${user.id}/alerts`)
      setAlerts(data)
      setisLoading(false)

    } catch (error) {
      console.log(error)
      setisLoading(false)
    }
   }

   useFocusEffect(
    React.useCallback(() => {
      fetchUserAlerts()
    }, [])
  )
  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({title : 'My Alerts',headerLeft: ()=>       <Icon  onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
      ,      })
      },[])


      // Manage  Alert

      const deleteAlert = async () => { 
        try {
          setisLoading(true)
          await httpClient.delete(`/api/users/${Alert.id}/alerts`)
          toast.show(`alert successfully deleted`, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
          // Modify Current
             
             setdeleteModal(false)
            fetchUserAlerts()
        } catch (error) {
          console.log(error)
          setisLoading(false)
          toast.show(`${error.response.data.message}`, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
        }
       }
      const modifyAlert = async() => { 
        if(alertPrice === ""){
          toast.show(`Please enter the price`, {
            type: "error",
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
        }else{
          try {
            setisLoading(true)

            await httpClient.put(`/api/users/${user.id}/alerts`,{ alertId : Alert.id, price : Number(alertPrice) })
            toast.show(`Alert Successfully modified`, {
              type: "success",
              placement: "bottom",
              duration: 4000,
              offset: 60,
              animationType: "slide-in",
            })
            // Modify the array
            const index = Alerts.findIndex(alt => alt.id === Alert.id)
            console.log("index :",index)
             let alertsCopy = Alerts
             console.log(alertsCopy)
             alertsCopy[index].price = Number(alertPrice)
             setAlerts(alertsCopy)
             setisLoading(false)
             setmodifyAlertModal(false)
          } catch (error) {
            console.log(error)
            toast.show(`${error.response.data.message}`, {
              type: "error",
              placement: "bottom",
              duration: 4000,
              offset: 60,
              animationType: "slide-in",
            })
            setisLoading(false)
            setmodifyAlertModal(false)

          }
        }


       }
  return (
    <ScrollView  showsVerticalScrollIndicator={false} style={tw `flex-1 bg-white p-3`}>
<Overlay overlayStyle={tw `border-0 border-red-500 bg-white rounded-lg` }   isVisible={modifyAlertModal} >
          <View style={tw `h-52 w-60 bg-white flex  p-2 `}>
            <Icon onPress={()=> setmodifyAlertModal(false) } type='ionicon' name='close-outline' style={tw `self-end`} />
            <Text style={tw `font-semibold mt-2 mb-5`}>Modify the price </Text>
              <Text>Ticker : {Alert?.ticker.title}</Text>
              <Text style={tw `mt-4`}>Old Price : {Alert?.price*currency.currencyRate}({currency.label})</Text>
            <TextInput onChangeText={(txt) => setAlertPrice(txt) }  keyboardType='numeric' style={tw`h-10  p-3 mt-3 rounded-lg bg-gray-100 w-full`} />
          </View>
          <TouchableOpacity  onPress={()=> modifyAlert() } style={tw `self-end h-12 w-24 flex bg-[${Colors.greenColor}] mt-2 rounded-xl justify-center items-center`}>
        <Text style={tw `text-white`}>update</Text>
      </TouchableOpacity>
    </Overlay>
    {/* Delete */}
<DeleteOverlay overlayStyle={tw `border-0 border-red-500 bg-white rounded-lg` }   isVisible={deleteModal} >
          <View style={tw `h-26 w-68 bg-white flex  p-2 `}>
            <Text style={tw `font-semibold`}>Are you sure that you want to delete ?</Text>
            <View style={tw `h-auto mt-5 flex flex-row items-center justify-around`}>
            <TouchableOpacity  onPress={()=> deleteAlert()}  style={tw `self-end h-12 w-24 flex bg-[${Colors.greenColor}] mt-2 rounded-xl justify-center items-center`}>
        <Text style={tw `text-white`}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> setdeleteModal(false) }  style={tw `self-end h-12 w-24 flex bg-[${Colors.redColor}] mt-2 rounded-xl justify-center items-center`}>
        <Text style={tw `text-white`}>No</Text>
      </TouchableOpacity>
            </View>
          </View>
         
    </DeleteOverlay>
        {  Alerts.length===0 ? <View style={tw`flex-1 bg-white  h-200 flex justify-center items-center`}>
        <Text style={tw `font-semibold`}> Nothing found</Text>
      </View> :  Alerts.map( (alert)=> (<AlertItem   setdeleteModal={setdeleteModal} setAlert={setAlert} alert={alert} setmodifyAlertModal={setmodifyAlertModal} />)) }

      
    <Loader isLoading={isLoading} />      
    </ScrollView>
  )
}

export default AlertScreen