import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import tw from 'twrnc'
import DespositItem from '../../../Components/DespositItem'
import { useFocusEffect } from '@react-navigation/native'
import Loader from '../../../Components/Loader'
import { AuthContext } from '../../../Contexts/AuthContext'
import {httpClient} from '../../../apis/Api'

const DepositsScreen = () => {
  const { user} = useContext(AuthContext)
  
  const [deposits,setDeposits] = useState([])
  const [isVisible,setIsVisible] = useState(true) 
  
  const fetchDeposits = async() => { 
    try {
      setIsVisible(true)
      const { data} = await httpClient.get(`/api/users/${user.id}/transactions?transactionType=deposit`) 
    setDeposits(data)
    setIsVisible(false)
    } catch (error) {
    setIsVisible(false)
      console.log(error)
    }
   }
  useFocusEffect(
    React.useCallback(() => {
      fetchDeposits()
    }, [])

  )
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={ tw `flex-1 p-2`}>
   { deposits.length === 0 ? <View style={tw`flex-1 bg-white  h-200 flex justify-center items-center`}>
        <Text style={tw `font-semibold`}> Nothing found</Text>
      </View> : deposits.map((deposit)=> ( <DespositItem deposit={deposit} />)) }
   
                 
    <Loader  isLoading={isVisible}/>

      

      

    </ScrollView>
  )
}

export default DepositsScreen