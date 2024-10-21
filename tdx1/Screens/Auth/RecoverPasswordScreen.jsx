import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import tw from "twrnc"
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import Colors from '../../Constants/Colors'
import { useState } from 'react'
import Loader from '../../Components/Loader'
import { useToast } from 'react-native-toast-notifications'
import { httpClient } from '../../apis/Api'
const RecoverPasswordScreen = (props) => {
    const navigation = useNavigation()
    const [isLoading,setIsLoading] =useState(false)
    const [email,setEmail] = useState("")
    useEffect(()=>{
        navigation.setOptions({title : 'Recover password',headerLeft: ()=>       <Icon onPress={()=> props.navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
        ,      })
        },[])
        const toast = useToast()
        const forgotpassword = async () => {
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (reg.test(email) === false) {
              toast.show("Please Enter Valid Email", {
                type: "custom",
                dangerColor :`${Colors.redColor}`,
                placement: "bottom",
                duration: 2500,
                offset: 60,
                animationType: "slide-in",
              })
          }
          else {
              setIsLoading(true)
              try {
                 await httpClient.post("/api/users/forgotpassword",{email })
                  setIsLoading(false)
                  props.navigation.navigate("verificationCode")
              } catch (error) {
                  setIsLoading(false)
                  console.log(error)
              }
             
          }
      }
  return (
    <View style={tw `flex-1 bg-white p-5 flex relative`}>
      <Text style={tw`text-[${Colors.black}] text-center`}>Please enter your email or phone numer that we can send you a verfication code</Text>
      <TextInput  onChangeText={(text)=> setEmail(text) } selectionColor={`${Colors.greenColor}`} secureTextEntry={false} style={ tw `p-2 mt-8 text-gray-600 bg-[${Colors.TextInputBackgroundColor}] h-15 rounded-lg font-semibold border-b-2 border-b-gray-200`} placeholder="E-mail " />
      
      <TouchableOpacity onPress={()=>forgotpassword() }  style={ tw ` absolute bottom-8 self-center bg-[${ email === ""? Colors.TextInputBackgroundColor :  Colors.greenColor}] h-14 mt-36 flex justify-center items-center rounded-lg w-full`} >
        <Text style={tw `capitalize text-white text-xl font-semibold`} >Continue</Text>
      </TouchableOpacity>
      <Loader  isLoading={isLoading} />

    </View>
  )
}

export default RecoverPasswordScreen