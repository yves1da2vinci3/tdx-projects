import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Colors from '../Constants/Colors'
import moment from 'moment'
import formatDate from '../helpers/formatDateFromDb'
const WithdrawalItem = ({withdrawal}) => {
  return (
    <View  style={tw `w-full h-30 bg-white flex mt-2  p-2 justify-between`}>
    <View style={tw `flex-row items-center justify-between px-3`} >

    <View style={tw `flex flex-row items-center`}>
    <Text style={tw `font-semibold  `}>Withdrawal Type : </Text>
    <Text style={tw ``}>  { withdrawal.type === 1? "Bank deposit" : "Commodity "}</Text>
      </View>
      
      
     <Text style={tw `${ withdrawal.status ===0 ? `text-[${Colors.yellowColor}]` : withdrawal.status ===1 ?  `text-[${Colors.greenColor}]` :  "text-red-500"  } font-semibold mt-2`}>{withdrawal.status ===0  ? "pending" : withdrawal.status ===1  ?  "completed" : "rejected" }</Text>
    </View>
    {/* Others Informations */}
    <View style={tw `flex-1 `}>

      <View style={tw `flex flex-row items-center`}>
    <Text style={tw `font-semibold ml-3 mt-1`}>{ withdrawal.type === 1 ? "Amount" : "Quantity"} : </Text>
    <Text style={tw ` ml-3 mt-1`}> { withdrawal.type === 1 ? withdrawal.amount?.toFixed(1)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " +(withdrawal.withDrawalTo === "3"? "USD" : "GHS" ) : withdrawal.qty +" MT"}  </Text>
      </View>
      {  withdrawal.type === 2 &&  <View style={tw `flex flex-row items-center`}>
    <Text style={tw `font-semibold ml-3 mt-1`}> Ticker :  </Text>
    <Text style={tw ` ml-3 mt-1`}> { withdrawal.ticker.title} </Text>
      </View> }
      {  withdrawal.type === 2 &&  <View style={tw `flex flex-row mb-5 items-center`}>
    <Text style={tw `font-semibold  mt-1`}> withdrawal Date :  </Text>
    <Text style={tw `  mt-1`}> {  formatDate(withdrawal?.dateToWithdrawal) } </Text>
      </View> }
      
      
     
      

    </View>
    <View style={tw `h-8  p-1`}>
    <Text style={tw `font-semibold text-gray-400 text-right `}> Date : {moment(withdrawal?.createdAt).format('DD MMM YYYY')}</Text>
    </View>
    
  </View>
  )
}

export default WithdrawalItem