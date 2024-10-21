import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Avatar, Divider, Icon } from '@rneui/base'
import tw from 'twrnc'
import Colors from '../../Constants/Colors'
import { AuthContext} from '../../Contexts/AuthContext'
import { Image } from 'react-native'
import depositIcon from '../../assets/Icons/depositeWithdraw.png'
import orderIcon from '../../assets/Icons/orders.png'
import alertIcon from '../../assets/Icons/alerts.png'
const HomeScreen = (props) => {
  const {user} = useContext(AuthContext)
  return (
    <View style={ tw `flex-1 relative bg-white pt-10`}>

    <View style={tw`flex flex-row mt-10 justify-between items-center px-5`}>
      <View style={ tw `flex justify-center pl-2 `} >
       <Text style={tw `text-xl font-semibold`}>{ user.firstName + " " + user.lastName }</Text>
     
       <Text style={ tw `  font-semibold`}>ID : {user.id.toString().padStart(10,"0")}</Text>
      </View>

      <Icon onPress={()=> props.navigation.navigate("settings")} type='ionicon' name='settings' style={tw `ml-4`} />
    </View>

{/* settings options  */}
<View style={ tw `px-3 h-auto mt-12`}>

 <TouchableOpacity onPress={()=>props.navigation.navigate("notifications") }  style={ tw `flex  bg-[${Colors.TextInputBackgroundColor}] rounded-lg my-2 flex-row  items-center p-2 h-auto justify-between`} >
   <View style={ tw`items-center flex flex-row`}>
   <View style={ tw `flex justify-center  items-center h-12 w-12 rounded-lg`}>
   <Icon type='font-awesome' name='bell'  />
   </View>
   <Text style={tw`pl-2`}>Notifications</Text>
   </View>
 <Icon type='ionicon' name='chevron-forward-outline' />
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>props.navigation.navigate("alerts") }   style={ tw `flex flex-row  bg-[${Colors.TextInputBackgroundColor}] rounded-lg my-2 items-center p-2 h-auto justify-between`} >
   <View style={ tw`items-center flex flex-row`}>
   <View style={ tw `flex justify-center  items-center h-12 w-12 rounded-lg`}>
   <Image source={alertIcon} style={tw `h-6 w-6`} />

   </View>
   <Text style={tw`pl-2`}>Alerts</Text>
   </View>
 <Icon type='ionicon' name='chevron-forward-outline' />
 </TouchableOpacity>

 <TouchableOpacity  onPress={()=> props.navigation.navigate("orders")} style={ tw `flex flex-row bg-[${Colors.TextInputBackgroundColor}] rounded-lg my-2  items-center p-2 h-auto justify-between`} >
   <View style={ tw`items-center flex flex-row`}>
   <View style={ tw `flex justify-center  items-center h-12 w-12 rounded-lg`}>
   <Image source={orderIcon} style={tw `h-6 w-6`} />
   
   </View>
   <Text style={tw`pl-2`}>Orders</Text>
   </View>
 <Icon type='ionicon' name='chevron-forward-outline' />
 </TouchableOpacity>

 <TouchableOpacity  onPress={()=> props.navigation.navigate("depositAndWithdrawal")} style={ tw `flex flex-row  bg-[${Colors.TextInputBackgroundColor}] rounded-lg my-2 items-center p-2 h-auto justify-between`} >
   <View style={ tw`items-center flex flex-row`}>
   <View style={ tw `flex justify-center  items-center h-12 w-12 rounded-lg`}>
   <Image source={depositIcon} style={tw `h-6 w-6`} />
   </View>
   <Text style={tw`pl-2`}>Deposits and withdrawals</Text>
   </View>
 <Icon type='ionicon' name='chevron-forward-outline' />
 </TouchableOpacity>
</View>

   
   </View>
  )
}

export default HomeScreen