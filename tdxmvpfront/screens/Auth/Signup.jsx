import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import tw from 'twrnc'
import Colors from '../../Constants/Colors'
const Signup = (props) => {
  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({title : "S'enregistrer ", headerShown : true, headerLeft: ()=>       <Icon onPress={()=> props.navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
      ,      })
      },[])
  return (
    <View style={tw `flex-1 p-4 bg-white`}>
      <Text style={tw `text-center font-semibold `}>Choississez votre moyen de création de compte</Text>
      <TouchableOpacity onPress={()=> props.navigation.navigate("secondSignup")} style={ tw ` mt-30 bg-[${Colors.secondaryColor}] h-14  px-2 flex-row flex justify-center items-center rounded-lg w-full`} >
      <Icon size={30} type="ionicon" color={`${Colors.whiteColor}`} name="person"  />
        <Text style={tw `  text-xl text-[${Colors.whiteColor}] font-medium ml-4`} >Email et mot de passe</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ tw `bg-[#D8392C] h-14 mt-4 px-2 flex-row flex justify-center items-center rounded-lg w-full`} >
      <Icon size={30} type="ionicon" color={`${Colors.whiteColor}`} name="logo-google"  />
        <Text style={tw `  text-xl text-[${Colors.whiteColor}] font-medium ml-4`} >Continuer avec Google</Text>
      </TouchableOpacity>
    <TouchableOpacity style={ tw `bg-violet-500 h-14 mt-4 px-2 flex-row flex justify-center items-center rounded-lg w-full`} >
      <Icon size={30} type="ionicon" color={`${Colors.whiteColor}`} name="logo-yahoo"  />
        <Text style={tw `  text-xl text-[${Colors.whiteColor}] font-medium ml-4`} >Continuer avec Yahoo</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Signup