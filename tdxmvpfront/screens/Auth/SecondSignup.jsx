import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Constants/Colors'
import { Avatar, CheckBox, Icon,Overlay } from '@rneui/base'
import tw from'twrnc'
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker';

const SecondSignup = (props) => {
    const [selectGenderIndex,setSelectGenderIndex] = useState(1)
    const [show,setShow] = useState(false)
    const [date,setDate] = useState(new Date())
    const navigation = useNavigation()
    useEffect(()=>{
        navigation.setOptions({title : 'Register the information',headerLeft: ()=>       <Icon onPress={()=> props.navigation.goBack() } size={30} type="ionicon" name='arrow-back-outline'  />
        ,      })
        },[])
        const onChange = (e,selectedDate) => { 
            console.log( selectedDate)
            const currentDate = selectedDate;
            setDate(currentDate);
           }
         
  return (
    <View style={tw `flex-1 relative bg-white px-2`}>
        {/* DatePciker */}
        <Overlay overlayStyle={tw `border-0 border-red-500 bg-white rounded-lg` }   isVisible={show} onBackdropPress={()=> setShow(false)}>
     <View style={tw`flex  p-3 h-85 w-85 bg-white`}>
      <Text style={tw `text-lg font-semibold my-2`}>Date de Naissance</Text>
     <DateTimePicker
          testID="dateTimePicker"
          mode="date"
          value={date}
          
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
     <TouchableOpacity  onPress={()=> setShow(false) } style={tw `self-end h-12 w-24 flex bg-[${Colors.greenColor}] mt-2 rounded-xl justify-center items-center`}>
        <Text style={tw `text-white`}>Valider</Text>
      </TouchableOpacity>
     </View>
    </Overlay>
    {/* Avatar */}
    

{/* Value */}
<View style={tw `h-15 w-full  p-2`}>
<Text style={tw `text-gray-400 ml-3`}>  First Name </Text>
<View style={tw`flex justify-between  flex-row items-center px-2`}>
  <TextInput selectionColor={`${Colors.blackColor}`} secureTextEntry={false} style={ tw `p-2  flex-1 text-gray-500 font-semibold border-b-2 border-b-gray-200`} value=" DIOMANDE" />

    
</View>
</View>
<View style={tw `h-15 w-full mt-2 p-2`}>
<Text style={tw `text-gray-400 ml-3`}>Last Name</Text>
<View style={tw`flex justify-between  flex-row items-center px-2`}>
  <TextInput selectionColor={`${Colors.blackColor}`} secureTextEntry={false} style={ tw `p-2  flex-1 text-gray-500 font-semibold border-b-2 border-b-gray-200`} value="Manan Yves Lionel" />

    
</View>
</View>
<View style={tw `h-15 w-full mt-2 p-2`}>
<Text style={tw `text-gray-400 ml-3`}>Phone Number</Text>
<View style={tw`flex justify-between  flex-row items-center px-2`}>
  <TextInput selectionColor={`${Colors.blackColor}`} secureTextEntry={false} style={ tw `p-2  flex-1 text-gray-500 font-semibold border-b-2 border-b-gray-200`} value="0140117596" />

    
</View>
</View>
<View style={tw `h-15 w-full mt-2 p-2`}>
<Text style={tw `text-gray-400 ml-3`}>Email</Text>
<View style={tw`flex justify-between  flex-row items-center px-2`}>
  <TextInput selectionColor={`${Colors.blackColor}`} secureTextEntry={false} style={ tw `p-2  flex-1 text-gray-500 font-semibold border-b-2 border-b-gray-200`} value="yves.lionel.diomande@gmail.com" />

    
</View>
</View>
    <View style={tw `h-15 w-full mt-2 p-2`}>
    <Text style={tw `text-gray-400 ml-3`}>Birth Date</Text>
    <View style={tw`flex justify-between  flex-row items-center px-2`}>
    <TextInput selectionColor={`${Colors.blackColor}`} secureTextEntry={false} style={ tw `p-2  flex-1 text-gray-500 font-semibold border-b-2 border-b-gray-200`} value="12/09/1984" />

<Icon onPress={()=> setShow(true)} type='ionicon' name='calendar' />        
    </View>
    </View>
    <View style={tw `h-20 w-full mt-2 p-2`}>
    <Text style={tw `text-gray-400 ml-3`}>Gender </Text>
    <View style={tw `flex flex-row items-center`} >
          <View style={tw `flex flex-row items-center`}>
          <CheckBox
          style={tw `m-0`}
           checked={selectGenderIndex === 1}
           onPress={() => setSelectGenderIndex(1)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           checkedColor={`${Colors.blueColor}`}
         />
         <Text >Male</Text>
          </View>
         
          <View style={tw `flex flex-row items-center`}>
          <CheckBox
           checked={selectGenderIndex === 2}
           onPress={() => setSelectGenderIndex(2)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           checkedColor={`${Colors.blueColor}`}
         />
         <Text >Female</Text>
          </View>
       </View>
    </View>

{/* bton for confirmation */}
  <TouchableOpacity onPress={()=> props.navigation.navigate("SignupSecond")}  style={ tw ` absolute bottom-6 self-center bg-[${Colors.greenColor}] h-14 mt-36 flex justify-center items-center rounded-lg w-full`} >
    <Text style={tw `capitalize text-white text-xl font-semibold`} >Continue</Text>
  </TouchableOpacity>
</View>
  )
}

export default SecondSignup