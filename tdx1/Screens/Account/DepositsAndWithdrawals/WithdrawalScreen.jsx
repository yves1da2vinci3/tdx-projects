import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import tw from 'twrnc'
import WithdrawalItem from '../../../Components/WithdrawalItem'
import { useFocusEffect } from '@react-navigation/native'
import Loader from '../../../Components/Loader'
import { AuthContext } from '../../../Contexts/AuthContext'
import {httpClient} from '../../../apis/Api'
const WithdrawalScreen = () => {
  const { user} = useContext(AuthContext)
  
  const [Withdrawals,setWithdrawals] = useState([])
  const [isVisible,setIsVisible] = useState(true) 
  
  const fetchWithdrawal = async() => { 
    try {
      setIsVisible(true)
      const { data} = await httpClient.get(`/api/users/${user.id}/transactions?transactionType=withdrawal`) 
    setWithdrawals(data)
    setIsVisible(false)
    } catch (error) {
    setIsVisible(false)
      console.log(error)
    }
   }
  useFocusEffect(
    React.useCallback(() => {
      fetchWithdrawal()
    }, [])

  )
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={ tw `flex-1 p-2`}>

      { Withdrawals.length === 0 ? <View style={tw`flex-1 bg-white  h-200 flex justify-center items-center`}>
        <Text style={tw `font-semibold`}> Nothing found</Text>
      </View> : Withdrawals.map((withdrawal)=> ( <WithdrawalItem withdrawal={withdrawal} />)) }
   
                 
    <Loader  isLoading={isVisible}/>
    
        </ScrollView>
  )
}

export default WithdrawalScreen