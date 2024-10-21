import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import reportIssue from '../../assets/Images/ReportIssue.png'
import Colors from '../../Constants/Colors'
import Loader from '../../Components/Loader'
import { useState } from 'react'
import { httpClient } from '../../apis/Api'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { useToast } from 'react-native-toast-notifications'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
const ReportIssue = (props) => {
  const {user } = useContext(AuthContext)
  const [isLoading,setIsLoading] = useState(false)
  const [content,setContent] = useState("")
  const toast = useToast()
  const createReportIssue = async() => {
    if(content === ""){
      toast.show(`Please enter something `, {
        type: "success",
        placement: "bottom",
        duration: 4000,
        offset: 60,
        animationType: "slide-in",
      })
    }else{
      setIsLoading(true)
      try {
        const data = {
          content,
          user : user
        }
      await httpClient.post("/api/issues",data)
      setIsLoading(false)
      toast.show(`Issue successfully reported `, {
        type: "success",
        placement: "bottom",
        duration: 4000,
        offset: 60,
        animationType: "slide-in",
      })
      props.navigation.goBack()
      } catch (error) {
        console.log(error)
      }
    }
   
   }
   const navigation = useNavigation()
   useEffect(()=>{
       navigation.setOptions({title : 'Report an issue',  headerLeft: ()=>       <Icon onPress={()=> navigation.goBack() } size={30} type="ionicon" name='arrow-back-outline'  />
       ,      })
       },[])
  return (
    <KeyboardAvoidingView  style={tw ` relative flex-1 bg-white pt-10 px-4`}>
      <View style={tw `flex-1`}>

     
      <View style={tw `w-80 h-80 bg-green-200 rounded-full mt-6 self-center flex justify-center items-center`}>
           <Image source={reportIssue} style={tw`h-40 w-40`} />
           </View>
      <TextInput onChangeText={(text)=> setContent(text)} selectionColor={`${Colors.greenColor}`} multiline={true} secureTextEntry={false} style={ tw `p-2 mt-8 text-gray-600 font-semibold border-b-2 border-b-gray-200`} placeholder="Define the issue" />
      <TouchableOpacity onPress={()=> createReportIssue()}  style={ tw ` absolute bottom-8 self-center bg-[${Colors.greenColor}] h-14 mt-36 flex justify-center items-center rounded-lg w-full`} >
        <Text style={tw `capitalize text-white text-xl font-semibold`} >report the issue </Text>
      </TouchableOpacity>
      </View>


      <Loader isLoading={isLoading} />
    </KeyboardAvoidingView>
  )
}

export default ReportIssue