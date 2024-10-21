import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import tw from 'twrnc'
import HistoryOrderItem from '../../../Components/HistoryOrderItem'
import { AuthContext } from '../../../Contexts/AuthContext'
import { httpClient } from '../../../apis/Api'
import { useFocusEffect } from '@react-navigation/native'
import bubbleSort from '../../../algorithms/BubbleSort'
import Loader from '../../../Components/Loader'
const HistoryOrder = () => {
  const {user} = useContext(AuthContext)
  const [HistoryOrders,setHistoryOrders] = useState([]) 
  const [isVisible,setIsVisible] = useState(true) 
  const fetchHistoryOrders = async() => { 
    try {
      setIsVisible(true)
      const { data} = await httpClient.get(`/api/users/${user.id}/orders?status=history`) 
      const arraysOfOrders =  data.basicOrders.concat(data.advancedOrders)
      const firstTimeSortArray = bubbleSort(arraysOfOrders)
    setHistoryOrders(firstTimeSortArray)
    setIsVisible(false)
    } catch (error) {
    setIsVisible(false)
      console.log(error)
    }
   }
  useFocusEffect(
    React.useCallback(() => {
      fetchHistoryOrders()
    }, [])

  )
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={ tw `flex-1 p-2`}>
{ HistoryOrders.length === 0 ? <View style={tw`flex-1 bg-white  h-200 flex justify-center items-center`}>
        <Text style={tw `font-semibold`}> Nothing found</Text>
      </View> : HistoryOrders.map((HistoryOrder)=> ( <HistoryOrderItem order={HistoryOrder} />)) }
   
                 
    <Loader  isLoading={isVisible}/>
      

      

    </ScrollView>
  )
}

export default HistoryOrder