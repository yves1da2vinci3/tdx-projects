import { View, Text, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { CheckBox, Image } from '@rneui/base'
import tdxlogo from '../../assets/Images/Logo.png'
import PasswordInput from '../../Components/PasswordInput'
import { TouchableOpacity } from 'react-native-gesture-handler'
import tw from 'twrnc'
import Colors from '../../Constants/Colors'
import { useToast } from 'react-native-toast-notifications'
import httpClient from '../../config/Api'
import { AuthContext } from '../../Context/AuthContext'
import Loader from '../../Components/Loader'
const LoginScreen = (props) => {
  // Call the setSessions Methods
  const {setSession,setTokenHandler} = useContext(AuthContext)
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [remenberMe,setRemenberMe] = useState(false)
    const [visible,setVisible] = useState(false)

        // const LoginHandler = (second) => { 
        //   props.navigation.navigate("user")
        //  }
  const toast = useToast()
     const LoginHandler =  async() => { 
      if (username === "") {
       toast.show("Enter a valid Username", {
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
          const response =  await  httpClient.post("/authenticate", {username ,password,rememberMe : remenberMe})
         setVisible(false)
         setTokenHandler(response.data.id_token)
          //  GET user Base on the Token
          const response2 =  await  httpClient.get("/account", {
            headers: {
              Authorization: `Bearer ${response.data.id_token}`,
            },
          })
          setSession(response2.data)
          setUserName("")
          setPassword("")
          setRemenberMe(false)
          toast.show("Login Successful", {
            type: "success",
            dangerColor :`${Colors.greenColor}`,
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
          props.navigation.navigate("user")
       } catch (error) {
       setVisible(false)
       console.log(error.response)
       toast.show(`${error?.response?.data?.detail}`, {
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
    <View style={tw `pt-20 flex  flex-1 flex bg-white px-4`}>
      <View style={tw `self-center`}>
      <Image source={tdxlogo} style={tw `h-24 w-24  `} />   

      </View>
    <Text style={tw `text-center mb-2`}>Welcome !</Text>
    <Text style={tw `text-center mt-4 mb-2`}>Enter credentials to login</Text>
      {/* Input */}
      <Text style={tw`mt-5 mb-3`} >UserName</Text>
    

    <TextInput onChangeText={(txt)=> setUserName(txt)} selectionColor={`${Colors.greenColor}`} secureTextEntry={false} style={ tw `p-2 text-gray-600 font-semibold  bg-[${Colors.TextInputBackgroundColor}] h-15 rounded-lg border-b-gray-200`} placeholder="enter your username " />
    <Text style={tw`mt-5 mb-3`}>password</Text>
  <PasswordInput  setPassword={setPassword} />
    
    <View style={tw`flex flex-row items-center justify-between`}>

   <View style={tw `flex flex-row items-center`}>
          <CheckBox
           checked={remenberMe}
           onPress={() => setRemenberMe(!remenberMe)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           checkedColor={`${Colors.greenColor}`}
         />
         <Text >Remember me</Text>
          </View>

   <TouchableOpacity onPress={()=> props.navigation.navigate("recover")}>
   <Text style={tw `text-right `}>Forgot Password ?</Text>
    
   </TouchableOpacity>
    </View>

    {/* Sigin Button */}
    <TouchableOpacity  onPress={LoginHandler}  style={ tw `bg-[${Colors.greenColor}] h-14 mt-16 md:mt-26 flex justify-center items-center rounded-lg w-full`} >
      <Text style={tw `capitalize text-white text-xl font-semibold`} >Sign in</Text>
    </TouchableOpacity>
    <TouchableOpacity  onPress={()=>props.navigation.navigate("SignupFirst")}  style={ tw `bg-[${Colors.darkGreen}] h-14 mt-4 md:mt-26 flex justify-center items-center rounded-lg w-full`} >
      <Text style={tw `capitalize text-white text-xl font-semibold`} >Sign up</Text>
    </TouchableOpacity>
   
<Loader isLoading={visible} />
  </View>
  )
}

export default LoginScreen