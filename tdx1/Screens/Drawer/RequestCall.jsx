import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { Icon, Overlay } from '@rneui/base'
import Colors from '../../Constants/Colors'
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarPicker from 'react-native-calendar-picker';
import { useState } from 'react'
import { useToast } from 'react-native-toast-notifications'
import FormatDate from '../../helpers/formatDateFromDb'
import Loader from '../../Components/Loader'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { httpClient } from '../../apis/Api'
const RequestCall = (props) => {
  const {user} = useContext(AuthContext)
  const toast = useToast()
  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({title : 'Request A Call',  headerLeft: ()=>       <Icon onPress={()=> navigation.goBack() } size={30} type="ionicon" name='arrow-back-outline'  />
      ,      })
      },[])
      const [DatePortion,setDatePortion] = useState("start")
      const [show,setShow] = useState(false)
      const [isLoading,setIsLoading] = useState(false)
      const [startTime,setStartTime] = useState("10:00:00")
      const [endTime,setEndTime] = useState("16:00:00")
      const [callDate,setCallDate] = useState("")
      const [CalendarMoal,setCalendarModal] =useState(false)
      const [date, setDate] = useState(new Date(1598051730000));
      const onChange = (e,selectedDate) => { 
        console.log( selectedDate)
        const currentDate = selectedDate;
        setDate(currentDate);
       }
       const selectDatePortion = (portion) => { 
        setDatePortion(portion)
        setShow(true)
        }
        const saveTime = () => { 
          if(DatePortion === "end"){
            if(Number(date.toISOString().split("T")[1].split(":")[0]) <16  ){
              setEndTime(date.toISOString().split("T")[1])
              setShow(false)
            }else{
              toast.show("please pick time a time in the available period", {
                type: "custom",
                dangerColor :`${Colors.redColor}`,
                placement: "bottom",
                duration: 2500,
                offset: 60,
                animationType: "slide-in",
              })
            }
            
          }
          if(DatePortion === "start"){
            if(Number(date.toISOString().split("T")[1].split(":")[0]) >10  ){
              setStartTime(date.toISOString().split("T")[1])
               setShow(false)
            }else{
              toast.show("please pick time a time in the available period", {
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
         const onDateChange = (date) => {
          console.log(typeof  date.toISOString()) 
          setCallDate(date.toISOString().split("T")[0])
          setCalendarModal(false)
      
         }
         const [minDate, setMinDate] = useState('')
    
         useEffect(()=>{
           var tomorrow = new Date();
           tomorrow.setDate(tomorrow.getDate() + 1);
           setMinDate(tomorrow.toISOString().split('T')[0])
         },[])
        

         const  onRequestSubmit = () =>{
          setIsLoading(true)
          let data = {}
          data["fromTime"] =`${Number(startTime.split(":")[0]) > 12 ? Number(startTime.split(":")[0]) -12 : Number(startTime.split(":")[0]) }:${Number(startTime.split(":")[1])} ${Number(startTime.split(":")[0]) > 12 ? "PM" : "AM"} `;
          data["endTime"] = `${Number(endTime.split(":")[0]) > 12 ? Number(endTime.split(":")[0]) -12 : Number(endTime.split(":")[0]) }:${Number(endTime.split(":")[1])} ${Number(endTime.split(":")[0]) > 12 ? "PM" : "AM"} `;
          data["callDate"] = callDate;
          data["userId"] = user.id
  try {
      httpClient.post("/api/calls",data)
      setIsLoading(false)
      toast.show("Call registered", {
        type: "success",
        dangerColor :`${Colors.redColor}`,
        placement: "bottom",
        duration: 2500,
        offset: 60,
        animationType: "slide-in",
      })
      props.navigation.goBack()
  } catch (error) {
      setIsLoading(false)
  }
  
      }
  return (
    <View style={tw `flex-1 bg-white  relative px-2`}>
      <Overlay overlayStyle={tw `border-0 border-red-500 bg-white rounded-lg` }   isVisible={show} onBackdropPress={()=> setShow(false)}>
     <View style={tw`flex  p-3 h-85 w-85 bg-white`}>
      <Text style={tw `text-lg font-semibold my-2`}>Select the time : { DatePortion === "start"? "Start Time" : "End Time" }</Text>
     <DateTimePicker
          testID="dateTimePicker"
          mode="time"
          value={date}
          
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
     <TouchableOpacity  onPress={()=> saveTime()} style={tw `self-end h-12 w-24 flex bg-[${Colors.greenColor}] mt-2 rounded-xl justify-center items-center`}>
        <Text style={tw `text-white`}>Save Time</Text>
      </TouchableOpacity>
     </View>
    </Overlay>
    
<Overlay overlayStyle={tw `border-0 border-red-500 bg-white rounded-lg` }   isVisible={CalendarMoal} >
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
   
      <Text lineBreakMode="tail"  numberOfLines={2} style={tw `mt-4 text-center font-semibold `}>To request a call please select your available time within which you will be contacted</Text>
   {/* From */}
   <Text style={tw `mt-15 ml-4`}>I am available from:</Text>

{/* Rnge of */}
   <View style={tw `flex items-center flex-row h-17 items-center  mt-5`}>
    {/* Min & Sec */}
    <View style={tw `w-58  h-17 flex pl-4 flex-row items-center`} >
      <TouchableOpacity onPress={()=> selectDatePortion("start") } style={tw `w-12 h-12 rounded-lg items-center justify-center bg-[${Colors.TextInputBackgroundColor}]`}>
        <Text style={tw `text-lg`}>{Number(startTime.split(":")[0]) > 12 ? Number(startTime.split(":")[0]) -12 : Number(startTime.split(":")[0])  }</Text>
      </TouchableOpacity>
      <Text style={tw `text-lg mx-2`}>:</Text>
      <TouchableOpacity onPress={()=> selectDatePortion("start") }  style={tw `w-12 h-12 rounded-lg items-center justify-center bg-[${Colors.TextInputBackgroundColor}]`}>
        <Text style={tw `text-lg`}>{Number(startTime.split(":")[1])}</Text>
      </TouchableOpacity>
      <View style={tw `w-12 h-12 ml-5 rounded-lg items-center justify-center bg-[${Colors.TextInputBackgroundColor}]`}>
        <Text style={tw `text-lg`}> {Number(startTime.split(":")[0]) > 12 ? "PM" : "AM"}</Text>
      </View>
    </View>
    {/* Icon */}
    <TouchableOpacity  onPress={()=> setCalendarModal(true)} style={tw`  flex-1 h-full justify-center flex items-end`}>
      <Icon name='calendar' type='ionicon' />
    </TouchableOpacity>
   </View>

   {/* To */}
   <Text style={tw `mt-8 md:mt-15 ml-4`}>To:</Text>

{/* Rnge of */}
   <View style={tw `flex items-center flex-row h-17 items-center  mt-5`}>
    {/* Min & Sec */}
    <View style={tw `w-58  h-17 flex pl-4 flex-row items-center`} >
      <TouchableOpacity  onPress={()=> selectDatePortion("end") } style={tw `w-12 h-12 rounded-lg items-center justify-center bg-[${Colors.TextInputBackgroundColor}]`}>
        <Text style={tw `text-lg`}>{Number(endTime.split(":")[0]) > 12 ? Number(endTime.split(":")[0]) -12 : Number(endTime.split(":")[0])  }</Text>
      </TouchableOpacity>
      <Text style={tw `text-lg mx-2`}>:</Text>
      <TouchableOpacity onPress={()=> selectDatePortion("end") } style={tw `w-12 h-12 rounded-lg items-center justify-center bg-[${Colors.TextInputBackgroundColor}]`}>
        <Text style={tw `text-lg`}>{Number(endTime.split(":")[1])}</Text>
      </TouchableOpacity>
      <View style={tw `w-12 h-12 ml-5 rounded-lg items-center justify-center bg-[${Colors.TextInputBackgroundColor}]`}>
        <Text style={tw `text-lg`}>{Number(endTime.split(":")[0]) > 12 ? "PM" : "AM"}</Text>
      </View>
    </View>
   
    {/* Icon */}
    <TouchableOpacity onPress={()=> setCalendarModal(true) } style={tw`  flex-1 h-full justify-center flex items-end`}>
      <Icon  name='calendar' type='ionicon' />
    </TouchableOpacity>
   </View>
 {/* Call Date*/}
 <View style={tw `flex items-center mt-4 flex-row flex`}>
      <Text style={tw `text-lg font-semibold`}>Call Date :</Text>
      <View style={tw  `flex-1 flex items-center justify-center`}>
      <View style={tw `w-30 h-12 ml-5 rounded-lg items-center justify-center bg-[${Colors.TextInputBackgroundColor}]`}>
        <Text style={tw `text-lg`}>{FormatDate(callDate)}</Text>
      </View>
      </View>
    </View>
{/* Button */}
<TouchableOpacity  onPress={()=>  onRequestSubmit()}  style={ tw `bg-[#455154] h-14 mt-3 md:mt-13 flex flex-row justify-center items-center  rounded-lg w-48 self-center`} >
        <Text style={tw `capitalize text-white text-xl font-semibold `} >Request</Text>
      </TouchableOpacity>
   {/* Waring Text */}
     <View style={tw `w-full h-20 bg-red-100 rounded-lg  absolute self-center bottom-2 md:bottom-8 flex justify-center  items-center`}>
      <Text style={tw `text-center text-sm`}>
      We are not available at the weekends. Call can be made between 10am and 4pm on weekdays
      </Text>
     </View>
     <Loader isLoading={isLoading} />
    </View>
  )
}

export default RequestCall