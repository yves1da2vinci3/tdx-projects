import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import PasswordInput from '../../components/PasswordInput'
import tdxlogo from '../../assets/Images/Logo.png'
import Colors from '../../Constants/Colors'
import Loader from '../../components/Loader'
import tw from 'twrnc'
const LoginScreen = (props) => {
    const [visible, setVisible] = useState(false);
    // State For Data
    const [Email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const LoginHandler = () => { 
        props.navigation.navigate("user")
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

export default LoginScreen