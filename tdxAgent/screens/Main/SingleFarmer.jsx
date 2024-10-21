import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { Avatar, Icon, Overlay } from '@rneui/base'
import ModalDropdown from 'react-native-modal-dropdown';
import { ScrollView } from 'react-native-gesture-handler'
import Colors from '../../Constants/Colors'
import CalendarPicker from 'react-native-calendar-picker';
import formatDate from '../../helpers/formatDate'
const SingleFarmer = () => {
    const navigation = useNavigation()
    useEffect(()=>{
        navigation.setOptions({title : 'Make Transaction', headerShown : true, headerLeft: ()=>       <Icon  onPress={()=> navigation.goBack() } size={30} type="ionicon" name='arrow-back-outline'  />
        ,      })
        },[])
        const [CommodityTypeDropdownStatus,setCommodityTypeDropdownStatus] = useState(false)
  
   const DisplayIcon = ({Status}) => {
    return (
      <View style={tw `flex-1  items-end `}>
        <Icon style={tw ``} type='ionicon' name={`caret-${Status? "up" : "down"}`}  />
         </View>
    )
  }
//   State Managemnt
const [transactionId,setTransactionId] = useState(0)
const [CalendarModal,setCalendarModal] = useState(false)
    const [selectedDate,setSelectedDate] = useState("1")
    useEffect(()=>{
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setMinDate(tomorrow.toISOString().split('T')[0])
      },[])
    const [minDate, setMinDate] = useState('')
    const onDateChange = (date) => {
        console.log(typeof  date.toISOString()) 
        setSelectedDate(date.toISOString())
        setCalendarModal(false)
  
       }
  return (
    <View style={tw `flex-1 bg-white p-2`}>
         <Overlay overlayStyle={tw `border-0 border-red-500 bg-white rounded-lg` }   isVisible={CalendarModal} >
          <View style={tw `min-h-56 min-w-78 bg-white flex  p-2 `}>
          <CalendarPicker
          selectedDayColor={`${Colors.greenColor}`}
          selectedDayStyle={tw`bg-[${Colors.greenColor}] `}
          selectedDayTextStyle={tw `text-white font-semibold`}
          selectedDayTextColor={`#fff`}
          onDateChange={(date)=>onDateChange(date)}
          minDate={minDate}
        />
          </View>
         
    </Overlay>
        <View style={tw `h-34 w-full  mt-2 flex justify-center items-center`}>
            <View style={tw`relative`}>
           <Avatar size={120} rounded source={{ uri : "https://media.licdn.com/dms/image/C4E03AQGr1ATJxgLlFg/profile-displayphoto-shrink_800_800/0/1639553598181?e=2147483647&v=beta&t=UInTmNwhvz8vV051gs45Uo28k_e5aYk6NKnmMSRj5Zo"}} />
            </View>
        </View>
        <View style={tw `ml-4`}>
    {/* Id */}
    <View style={tw `flex flex-row items-center`}>
        <Icon type='ionicon' name='card-outline' color="black" />
    <Text style={tw `font-bold ml-1 text-lg text-black`}>0193y4y85629</Text>
    </View>
    {/* Full Name */}
    <View style={tw `flex flex-row items-center`}>
        <Icon type='ionicon' name='person-circle-outline' color="black" />
    <Text style={tw `font-semibold ml-1 text-lg text-black`}>Benjamin Bice Asiedu</Text>
    </View>
    {/* Last Name */}
    
    {/* location Name */}
    <View style={tw `flex flex-row items-center`}>
        <Icon type='ionicon' name='pin-outline' color="black" />
    <Text style={tw `font-semibold ml-1 text-lg text-black`}>Sandama </Text>
    </View>
   
</View>
<ScrollView showsVerticalScrollIndicator={false} style={tw `flex-1`} >
<Text style={tw `font-semibold mt-6 md:mt-12 mb-2`}>Choose Transaction Type</Text>
      <ModalDropdown  options={["Sell","Withdraw"]}  onSelect={(idx,option)=> setTransactionId(idx) }  showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1  mt-2 border-b-2 border-gray-100 p-2 `} >
        <Text style={tw `font-semibold `}>{option}</Text>
      </View>)} onDropdownWillHide={()=> setCommodityTypeDropdownStatus(false)}  onDropdownWillShow={()=> setCommodityTypeDropdownStatus(true)} renderRightComponent={ ()=> <DisplayIcon Status={CommodityTypeDropdownStatus} /> } dropdownStyle={tw`min-h-24 w-70  border-2 border-gray-100  rounded-lg `}  style={ tw `h-15 bg-[#DEDEDE] text-lg justify-center rounded-xl p-2`}  textStyle={ { fontSize : 20 }}  
                      />
<Text style={tw `font-semibold mt-6 md:mt-12 mb-2`}>Choose Commodity </Text>
      <ModalDropdown  options={["Soya Bean","Rice"]}  showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1  mt-2 border-b-2 border-gray-100 p-2 `} >
        <Text style={tw `font-semibold `}>{option}</Text>
      </View>)} onDropdownWillHide={()=> setCommodityTypeDropdownStatus(false)}  onDropdownWillShow={()=> setCommodityTypeDropdownStatus(true)} renderRightComponent={ ()=> <DisplayIcon Status={CommodityTypeDropdownStatus} /> } dropdownStyle={tw`min-h-24 w-70  border-2 border-gray-100  rounded-lg `}  style={ tw `h-15 bg-[#DEDEDE] text-lg justify-center rounded-xl p-2`}  textStyle={ { fontSize : 20 }}  
                      />
<Text style={tw `font-semibold mt-6 md:mt-12 mb-2`}>Choose Commodity Type </Text>
      <ModalDropdown  options={["Soya Bean","Rice"]}  showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1  mt-2 border-b-2 border-gray-100 p-2 `} >
        <Text style={tw `font-semibold `}>{option}</Text>
      </View>)} onDropdownWillHide={()=> setCommodityTypeDropdownStatus(false)}  onDropdownWillShow={()=> setCommodityTypeDropdownStatus(true)} renderRightComponent={ ()=> <DisplayIcon Status={CommodityTypeDropdownStatus} /> } dropdownStyle={tw`min-h-24 w-70  border-2 border-gray-100  rounded-lg `}  style={ tw `h-15 bg-[#DEDEDE] text-lg justify-center rounded-xl p-2`}  textStyle={ { fontSize : 20 }}  
                      />
              { transactionId ===1 && <>
  <Text style={tw `mt-7 text-gray-400 font-semibold`}>  Choose Withdrawal Date : </Text>
 
<TouchableOpacity onPress={()=> setCalendarModal(true)} style={tw `flex items-center flex-row px-3 h-17 mt-2 rounded-lg bg-[${Colors.TextInputBackgroundColor}]`} >
  <Text style={tw `flex-1 text-black p-3 `}>{selectedDate.length >1 ? formatDate(selectedDate) : ""}</Text>
<Icon name='calendar' type='ionicon' />
</TouchableOpacity>
</>   }        
<Text style={tw `font-semibold mt-6 md:mt-12 mb-2`}>Enter the number of bags </Text>

      <TextInput style={tw `w-full h-15  border-b-2 border-b-[${Colors.greenColor}] `} placeholder="Bags Quantity" />
      <TouchableOpacity  onPress={()=> navigation.navigate("verificationCode")}  style={ tw `bg-[${Colors.greenColor}] h-14 mt-5 md:mt-8 flex justify-center items-center rounded-lg w-full`} >
        <Text style={tw `capitalize text-white text-xl font-semibold`} >submit</Text>
      </TouchableOpacity>
                      </ScrollView>
    </View>
  )
}

export default SingleFarmer