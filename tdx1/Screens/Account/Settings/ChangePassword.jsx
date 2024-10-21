import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import Colors from '../../../Constants/Colors'
import tw from 'twrnc'
import { AuthContext} from '../../../Contexts/AuthContext'
import { useContext } from 'react'
import PasswordInput from '../../../Components/PasswordInput'
import { useToast } from 'react-native-toast-notifications'
import { httpClient } from '../../../apis/Api'
import Loader from '../../../Components/Loader'
const ChangePassword = (props) => {
  const {user,setSession} = useContext(AuthContext)
  const [isLoading,setIsLoading] =useState(false)
   const toast = useToast()
  const navigation = useNavigation()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  useEffect(()=>{
      navigation.setOptions({title : 'Change Password',headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()  } size={30} type="ionicon" name='arrow-back-outline'  />
      ,      })
      },[])
      const HandlePassword = async () => {
        if (oldPassword === '') {
        toast.show("Please Enter Old Password", {
          type: "custom",
          dangerColor :`${Colors.redColor}`,
          placement: "bottom",
          duration: 2500,
          offset: 60,
          animationType: "slide-in",
        })
        }
         else if (newPassword === '') {
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
        else {
            if (newPassword !== confirmPassword) {
              toast.show("password and confirm password must match", {
                type: "custom",
                dangerColor :`${Colors.redColor}`,
                placement: "bottom",
                duration: 2500,
                offset: 60,
                animationType: "slide-in",
              })
            } else {
              setIsLoading(true)
                let data = {
                    currentPassword : oldPassword,
                    newPassword
                }
                try {
               const response = await   httpClient.put(`/api/users/${user.id}/password`,data)
               setSession(response.data.updateUser)
               setIsLoading(false)
               props.navigation.goBack()
                } catch (error) {
                    console.log(error)
                    toast.show("something went wrong", {
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
    <View style={tw `flex-1 relative bg-white px-2`}>
      <Text style={tw `mt-4 text-center mb-8`}>Setup a new password to continue</Text>
        






<View style={tw `min-h-15 w-full mt-2 p-2`}>
    <Text style={tw `text-gray-400 ml-3 `}>Enter the old password</Text>
    <PasswordInput setPassword={setOldPassword} />
   
</View>
<View style={tw `min-h-15 w-full mt-2 p-2`}>
    <Text style={tw `text-gray-400 ml-3`}>Enter a new password</Text>
   <PasswordInput setPassword={setNewPassword} />
</View>
<View style={tw `min-h-15 w-full mt-2 p-2`}>
    <Text style={tw `text-gray-400 ml-3`}>Confirm the new password</Text>
    <PasswordInput  setPassword={setConfirmPassword} />
   
</View>
{/* bton for confirmation */}
      <TouchableOpacity onPress={()=> HandlePassword()}  style={ tw ` absolute bottom-2 self-center bg-[${Colors.greenColor}] h-14 mt-36 flex justify-center items-center rounded-lg w-full`} >
        <Text style={tw `capitalize text-white text-xl font-semibold`} >Done</Text>
      </TouchableOpacity>
      <Loader isLoading={isLoading} />
    </View>
  )
}

export default ChangePassword