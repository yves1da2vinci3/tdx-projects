import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Constants/Colors'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import { useToast } from 'react-native-toast-notifications'
import { httpClient } from '../../apis/Api'
import PasswordInput from '../../Components/PasswordInput'
import Loader from '../../Components/Loader'
const NewPasswordScreen = (props) => {
    const navigation = useNavigation()
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    useEffect(()=>{
        navigation.setOptions({title : 'Enter new password',headerLeft: ()=>       <Icon onPress={()=> props.navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
        ,      })
        },[])
        const setNewPasswordFun = async () => {
          if (newPassword === '') {
              toast.show("Please Enter New Password", {
                type: "custom",
                dangerColor :`${Colors.redColor}`,
                placement: "bottom",
                duration: 2500,
                offset: 60,
                animationType: "slide-in",
              })
          }
          else if (newPassword.length < 6) {
              toast.show("Passwords must be at least 6 characters", {
                type: "custom",
                dangerColor :`${Colors.redColor}`,
                placement: "bottom",
                duration: 2500,
                offset: 60,
                animationType: "slide-in",
              })
          }
          else if (confirmPassword === '') {
              toast.show("Please Enter Confirm Password", {
                type: "custom",
                dangerColor :`${Colors.redColor}`,
                placement: "bottom",
                duration: 2500,
                offset: 60,
                animationType: "slide-in",
              })
          }
          else {
              if (newPassword !== confirmPassword) {
                  toast.show("The   two Passwords must match", {
                    type: "custom",
                    dangerColor :`${Colors.redColor}`,
                    placement: "bottom",
                    duration: 2500,
                    offset: 60,
                    animationType: "slide-in",
                  })
              } else {
                  setIsLoading(true)
              try {
                  await httpClient.put(`/api/users/${props.route.params.userId}/resetPassword`,{newPassword})
                  props.navigation.navigate("signin")
                  setIsLoading(false)
  
              } catch (error) {
                  setIsLoading(false)
                  toast.show(`${error.response.data.message}`, {
                    type: "custom",
                    dangerColor :`${Colors.redColor}`,
                    placement: "bottom",
                    duration: 2500,
                    offset: 60,
                    animationType: "slide-in",
                  })
              
              }
              
              }
          }
      }
  return (
    <View style={tw `flex-1 bg-white p-5 flex relative`}>
      <PasswordInput  placeholder="enter the new password" setPassword={setNewPassword} />
      <View style={tw `mt-3`}></View>
      <PasswordInput placeholder="confirm the new password" setPassword={setConfirmPassword}/>
      
      
      
      <TouchableOpacity onPress={()=> setNewPasswordFun()}  style={ tw ` absolute bottom-8 self-center bg-[${Colors.greenColor}] h-14 mt-36 flex justify-center items-center rounded-lg w-full`} >
        <Text style={tw `capitalize text-white text-xl font-semibold`} >Continue</Text>
      </TouchableOpacity>
      <Loader isLoading={isLoading} />
    </View>
  )
}

export default NewPasswordScreen