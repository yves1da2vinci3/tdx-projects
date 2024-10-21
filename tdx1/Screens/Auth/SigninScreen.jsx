import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twrnc'
import Colors from '../../Constants/Colors'
import { useNavigation } from '@react-navigation/native'
import { CheckBox, Divider, Icon ,Overlay} from '@rneui/base'
import { Image } from 'react-native'
import tdxlogo from "../../assets/Images/Logo.png"
import { useToast } from "react-native-toast-notifications";
import Loader from '../../Components/Loader'
import { httpClient } from '../../apis/Api'
import PasswordInput from '../../Components/PasswordInput'
import { AuthContext } from '../../Contexts/AuthContext'
const SigninScreen = (props) => {

  const [visible, setVisible] = useState(false);
  const {setSession} = useContext(AuthContext)
  // State For Data
  const [Email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const toast = useToast();
    const navigation = useNavigation()
useEffect(()=>{
    navigation.setOptions({title : 'Sign in', headerShown : false, headerLeft: ()=>       <Icon size={30} type="ionicon" name='arrow-back-outline'  />
    ,      })
    },[])
  const LoginHandler =  async() => { 
   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if (reg.test(Email) === false) {
    toast.show("Enter a Valid Email", {
      type: "custom",
      dangerColor :`${Colors.redColor}`,
      placement: "bottom",
      duration: 4000,
      offset: 60,
      animationType: "slide-in",
    })
}
else if (password === '') {
  toast.show("Please Enter Password", {
    type: "custom",
    dangerColor :`${Colors.redColor}`,
    placement: "bottom",
    duration: 4000,
    offset: 60,
    animationType: "slide-in",
  })
   
}
else if (password.length < 6) {
  toast.show("Passwords must be at least 6 characters", {
    type: "custom",
    dangerColor :`${Colors.redColor}`,
    placement: "bottom",
    duration: 4000,
    offset: 60,
    animationType: "slide-in",
  })
   
} else{
  
  try {
    setVisible(true)
       const response =  await  httpClient.post("/api/users/login", {email : Email,password})
      setVisible(false)
      setSession(response.data)
      console.log(response.data)
    
  } catch (error) {
    setVisible(false)
    console.log("error")
    toast.show(`${error?.response?.data?.message}`, {
      type: "custom",
      dangerColor :`${Colors.redColor}`,
      placement: "bottom",
      duration: 4000,
      offset: 60,
      animationType: "slide-in",
    })
  }
}
   
   }
  return (
    <View style={tw `pt-20  flex-1 flex bg-white px-4`}>
        
      <Image style={tw `h-24 w-24  md:h-38 md:w-38 self-center`} source={tdxlogo} />
      <Text style={tw `text-center mb-2`}>Welcome !</Text>
      <Text style={tw `text-center mt-4 mb-2`}>Enter credentials to login</Text>
        {/* Input */}
        <Text style={tw`mt-5 mb-3`} >Email</Text>
      <TextInput onChangeText={(txt)=> setEmail(txt)} selectionColor={`${Colors.greenColor}`} secureTextEntry={false} style={ tw `p-2 text-gray-600 font-semibold  bg-[${Colors.TextInputBackgroundColor}] h-15 rounded-lg border-b-gray-200`} placeholder="E-mail " />
      <Text style={tw`mt-5 mb-3`}>password</Text>
    <PasswordInput  setPassword={setPassword} />
      
     <TouchableOpacity onPress={()=> props.navigation.navigate("recover")}>
     <Text style={tw `text-right mt-4`}>Forgot Password ?</Text>
      
     </TouchableOpacity>
    
      {/* Sigin Button */}
      <TouchableOpacity  onPress={LoginHandler}  style={ tw `bg-[${Colors.greenColor}] h-14 mt-16 md:mt-26 flex justify-center items-center rounded-lg w-full`} >
        <Text style={tw `capitalize text-white text-xl font-semibold`} >Sign in</Text>
      </TouchableOpacity>
     
<Loader isLoading={visible} />
    </View>
  )
}

export default SigninScreen