import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SettingsHome from '../../Screens/Account/Settings/SettingsHomeScreen'
import NotificationsSettings from '../../Screens/Account/Settings/NotificationsSettings'
import ChangePassword from '../../Screens/Account/Settings/ChangePassword'
import ProfileSettings from '../../Screens/Account/Settings/ProfileScreen'
const SettingsStack = () => {
    const navigation = useNavigation()
    useEffect(()=>{
        navigation.setOptions({title : 'Settings',headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
        ,      })
        },[])
        const Stack = createNativeStackNavigator ()
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown :true}} name='settingsHome' component={SettingsHome} />
      <Stack.Screen name='notificationSettings' component={NotificationsSettings} />
      <Stack.Screen name='changePassword' component={ChangePassword} />
      <Stack.Screen options={{ headerShown :true}} name='profilesettings' component={ProfileSettings} />
    </Stack.Navigator>
  )
}

export default SettingsStack