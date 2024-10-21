import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import HistoryOrderItem from '../../../Components/HistoryOrderItem'
const HistoryOrder = () => {
  return (
    <ScrollView style={ tw `flex-1 p-2`}>
<HistoryOrderItem orderId="98258455" isCompleted={true} date="15/03/2021" totalPrice="40.00" />
<HistoryOrderItem orderId="98258455" isCompleted={false} date="15/03/2021" totalPrice="40.00" />
<HistoryOrderItem orderId="98258455" isCompleted={true} date="15/03/2021" totalPrice="40.00" />
<HistoryOrderItem orderId="98258455" isCompleted={true} date="15/03/2021" totalPrice="40.00" />
<HistoryOrderItem orderId="98258455" isCompleted={false} date="15/03/2021" totalPrice="40.00" />
<HistoryOrderItem orderId="98258455" isCompleted={true} date="15/03/2021" totalPrice="40.00" />
<HistoryOrderItem orderId="98258455" isCompleted={true} date="15/03/2021" totalPrice="40.00" />
<HistoryOrderItem orderId="98258455" isCompleted={false} date="15/03/2021" totalPrice="40.00" />
      

      

    </ScrollView>
  )
}

export default HistoryOrder