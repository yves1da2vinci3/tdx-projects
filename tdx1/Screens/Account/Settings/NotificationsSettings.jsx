import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon, Switch } from '@rneui/base'
import tw from 'twrnc'
import Colors from '../../../Constants/Colors'
const NotificationsSettings = () => {
  const [open, setOpen] = React.useState(false);

  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({title : 'Profile settings',headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
      ,      })
      },[])
  return (
    <View style={ tw `flex-1 bg-white p-2`}>
       <TouchableOpacity style={tw `h-18 flex flex-row items-center rounded-lg py-4  bg-gray-100 px-2`}>
          <View style={tw `flex-1 flex items-center flex-row`}>
            <Text style={tw ` ml-4 font-semibold`}> Deposits and Withdrawals</Text>
          </View>
           
            <Switch color={`${Colors.greenColor}`} value={open} onValueChange={setOpen} />
        </TouchableOpacity>
       <TouchableOpacity style={tw `h-18 flex mt-3 flex-row items-center rounded-lg py-4  bg-gray-100 px-2`}>
          <View style={tw `flex-1 flex items-center flex-row`}>
            <Text style={tw ` ml-4 font-semibold`}> Order Status</Text>
          </View>
           
            <Switch color={`${Colors.greenColor}`} value={open} onValueChange={setOpen} />
        </TouchableOpacity>
       <TouchableOpacity style={tw `h-18 flex mt-3 flex-row items-center rounded-lg py-4  bg-gray-100 px-2`}>
          <View style={tw `flex-1 flex items-center flex-row`}>
            <Text style={tw ` ml-4 font-semibold`}> News</Text>
          </View>
           
            <Switch color={`${Colors.greenColor}`} value={open} onValueChange={setOpen} />
        </TouchableOpacity>
       <TouchableOpacity style={tw `h-18 flex mt-3 flex-row items-center rounded-lg py-4  bg-gray-100 px-2`}>
          <View style={tw `flex-1 flex items-center flex-row`}>
            <Text style={tw ` ml-4 font-semibold`}>App Notifications</Text>
          </View>
           
            <Switch color={`${Colors.greenColor}`} value={open} onValueChange={setOpen} />
        </TouchableOpacity>
    </View>
  )
}

export default NotificationsSettings