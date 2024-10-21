import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twrnc'
// import NotificationItem from '../../Components/NotificationItem'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Button, Icon, Overlay } from '@rneui/base'
import { httpClient } from '../../apis/Api'
import Colors from '../../Constants/Colors'
import moment from 'moment'
import { AuthContext } from '../../Contexts/AuthContext'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useToast } from 'react-native-toast-notifications'
const Notifications = () => {
  const toast = useToast()
  const [notifications,setNotifications] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const {user} = useContext(AuthContext)
  const [notification,setNotification] = useState()
  const fetchUserNotifications = async() => { 
    setIsLoading(true)
    try {
      const {data} = await httpClient.get(`/api/users/${user.id}/notifications`)
      setNotifications(data)
    setIsLoading(false)
      
    } catch (error) {
      console.log(error)
    setIsLoading(false)
    }
   }

   useFocusEffect(
    React.useCallback(() => {
      fetchUserNotifications()
    }, [])
  )
  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({title : 'My Notifications',headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
      ,      })
      },[])
      const [visible, setVisible] = useState(false);
      const toggleOverlay = () => {
        setVisible(!visible);
      };

      const seeOneNotification = (item) => { 
        setNotification(item)
        setVisible(true)
       }

      function NotificationItem  ({item})  { 
         return <TouchableOpacity style={ tw `bg-white h-28 mt-2 w-full flex p-3 rounded-lg`} onPress={()=> seeOneNotification(item) } >
            <Menu style={tw `self-end `}>
      <MenuTrigger  >
      <Icon  type='ionicon' name='ellipsis-horizontal' style={tw `self-end`} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption style={tw `flex flex-row items-center h-10 `} onSelect={() => deleteHandler(item.id)} >
            <Icon  style={tw `ml-1`} color={`${Colors.redColor}`} type='ionicon' name='trash-outline' />
          <Text style={tw `ml-1`} >Delete</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
            <Text style={tw `text-[${item.notificationTitle.startsWith("Deposit") ? Colors.greenColor : item.notificationTitle.startsWith("Order") ?  Colors.blueAccent  : Colors.yellowColor}] font-bold`} >{item.notificationTitle}</Text>
    <View style={ tw`flex-1 h-18`}>
    <Text ellipsizeMode="tail" style={tw `font-semibold `} >{[...item?.notificationContent].splice(0,43).join("") + "..."}</Text>

    </View>

    <Text style={tw`self-end text-gray-400 italic`}>{moment(item?.createdAt).format('DD MMM YYYY')}</Text>
         </TouchableOpacity>
       }

      //  deleteHandler
      const deleteHandler = async(id) => { 
        try {
          setIsLoading(true)
          await httpClient.delete(`/api/users/${user.id}/notifications/${id}`)
          const newNotifications = notifications.filter(notification => notification.id !== id)
         setNotifications(newNotifications)
          toast.show(`Notifiction Successfully deleted`, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
       }
  return (
    <View style={ tw ` px-2`}>
      
    <Overlay overlayStyle={tw `border-0 border-red-500 bg-white rounded-lg` }   isVisible={visible} onBackdropPress={toggleOverlay}>
     <View style={tw`flex  p-3 h-40 w-85 bg-white`}>
      <Text style={tw `text-[${notification?.notificationTitle.startsWith("Deposit") ? Colors.greenColor : notification?.notificationTitle.startsWith("Order") ?  Colors.blueAccent  : Colors.yellowColor}] font-semibold text-lg`}>{notification?.notificationTitle}</Text>
       <View style={tw `flex-1 px-2 pt-4`}> 
       <Text style={tw ``}>{notification?.notificationContent}</Text>
       </View>
      <Text style={tw`self-end   text-gray-400 italic`}>{moment(notification?.createdAt).format('DD MMM YYYY')}</Text>

     </View>
    </Overlay>
<FlatList showsVerticalScrollIndicator={false} ListEmptyComponent={<View style={tw`flex-1 bg-white  h-200 flex justify-center items-center`}>
        <Text style={tw `font-semibold`}> Nothing found</Text>
      </View>} data={notifications} renderItem={NotificationItem} />
     

    </View>
  )
}
const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
  });
export default Notifications