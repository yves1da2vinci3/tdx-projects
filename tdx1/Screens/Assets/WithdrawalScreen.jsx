import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon, Overlay } from '@rneui/base'
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc'
import Colors from '../../Constants/Colors'
import { Image } from '@rneui/themed';
import ModalDropdown from 'react-native-modal-dropdown';
import { httpClient } from '../../apis/Api';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { useToast } from 'react-native-toast-notifications';
import Loader from '../../Components/Loader';
import CalendarPicker from 'react-native-calendar-picker';
import formatDate from '../../helpers/formatDateFromDb';
import { ScrollView } from 'react-native';
const WithdrawalScreen = (props) => {
        const { user} = useContext(AuthContext)
        const toast = useToast()
    const navigation = useNavigation()
    useEffect(()=>{
        navigation.setOptions({title : 'Withdrawal',headerLeft: ()=>       <Icon onPress={()=> props.navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
        ,      })
        },[])
        const [amount,setAmount] = useState("")
    const [ selectedId,setSelectedId ] = useState(1)
    // for withdrawal
    const [ WithdrawalTo,setWithdrawalTo ] = useState("")
    const [ maxQty,setmaxQty ] = useState(0)
    const [ Qty,setQty ] = useState(0)
    const [minDate, setMinDate] = useState('')

    const [isLoading,setIsLoading] = useState(false)
    const [tickerId,setTickerId] = useState(0)
    const [CalendarModal,setCalendarModal] = useState(false)
    const [selectedDate,setSelectedDate] = useState("1")
    useEffect(()=>{
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setMinDate(tomorrow.toISOString().split('T')[0])
    },[])
  console.log("from withdrwal:",props.route.params.userTickers)
       const Tickers = [
        {
          id : 1,
          title :"GSAMW1",
          qty : 20
        },
        {
          id : 2,
          title :"GWEGCN2",
          qty : 12
        },
        
       
      ]
      // Withdrawal Handler
      const WithDrawFun = async () => {
        if (selectedId === 1) {
            CashWithdraw()
        } else {
            CommodityWithdraw()
        }
    }

    const CommodityWithdraw = async () => {
        if (tickerId === 0) {
          toast.show(`Please select a ticker`, {
            type: "error",
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
        }
        else if (maxQty < Qty ) {
          toast.show(`the quantity selected is more than you have.`, {
            type: "error",
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
        }
        else if (Qty === 0) {
          toast.show(`Please enter the quantity `, {
            type: "error",
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
        }
        else {
            let data = {}
            data["qty"] = Number(Qty)
            data["type"] = 2
            data["dateToWithdrawal"] = selectedDate
            data["tickerId"] = tickerId
            data["userId"] = user.id
            console.log(data)
            // // alert(JSON.stringify(data))
            try {
                setIsLoading(true)
                const config = {
                    headers: {
                        'Accept': 'application/json',
                    },
                  }
              await  httpClient.post("/api/users/withdrawal",data,config)
              setIsLoading(false)
              toast.show(`Withdrawal successfully added `, {
                type: "success",
                placement: "bottom",
                duration: 4000,
                offset: 60,
                animationType: "slide-in",
              })
              props.navigation.goBack()
            } catch (error) {
                console.log(error)
              setIsLoading(false)
            }
         
            // alert(JSON.stringify(data))
        }
    }

    const CashWithdraw = async () => {

        if (amount === '') {
          toast.show(`Please enter an amount`, {
            type: "error",
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
        }else if(WithdrawalTo === ""){
          toast.show(`Please select the way of withdraw`, {
            type: "error",
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
        }  else {
            let data = {}
            data["amount"] = Number(amount) 
            data["userId"] =  user.id
            data["withDrawalTo"] = WithdrawalTo
            data["type"] = 1
            console.log(data)
            try {
                setIsLoading(true)
                const config = {
                    headers: {
                        'Accept': 'application/json',
                    },
                  }
              await  httpClient.post("/api/users/withdrawal",data,config)
              setIsLoading(false)
              toast.show(`withdrawal successfully added`, {
                type: "success",
                placement: "bottom",
                duration: 4000,
                offset: 60,
                animationType: "slide-in",
              })
              props.navigation.navigate("userAssets")
            } catch (error) {
                console.log(error)
              setIsLoading(false)
            }
            setAmount('')
        }
    }

    const onDateChange = (date) => {
      console.log(typeof  date.toISOString()) 
      setSelectedDate(date.toISOString())
      setCalendarModal(false)

     }

    //  DropDown Management
    // Manage Dropdwon
const DisplayIcon = ({Status}) => {
  return (
    <View style={tw `flex-1  items-end `}>
      <Icon style={tw ``} type='ionicon' name={`caret-${Status? "up" : "down"}`}  />
       </View>
  )
}

    // Handle DropdownIcon
    const [withdrawalDpStatus,setwithdrawalDpStatus] = useState(false)
    const [WithdrawTo,setWithdrawTo] = useState(false)
    const [tickerDPstatus,settickerDPstatus] = useState(false)
  return (
    <ScrollView style={tw `flex-1 bg-white p-2  `}>
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
    <Text style={tw `mt-7 text-gray-400 mb-4 font-semibold`}>Choose Withdrawal Type</Text>
  

<ModalDropdown  options={ ["Cash","Commodity"] } onSelect={(idx, DropDownItem) => {
        const selectedId = DropDownItem === "Cash" ? 1 :  2 
        setSelectedId(selectedId)
      }} showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1   p-2`} >
        <Text style={tw `font-semibold`}>{option}</Text>
      </View>)} onDropdownWillHide={()=> setwithdrawalDpStatus(false)}  onDropdownWillShow={()=> setwithdrawalDpStatus(true)} renderRightComponent={ ()=> <DisplayIcon Status={withdrawalDpStatus} /> } dropdownStyle={tw`min-h-24 w-70  border-2  border-gray-100  rounded-lg `}  style={ tw `h-17 bg-[${Colors.TextInputBackgroundColor}] text-lg justify-center rounded-xl p-2`} textStyle={ { fontSize : 20 }} />

    { selectedId === 1 && <>
        <Text style={tw `mt-7 text-gray-400 font-semibold`}>Enter Amount to withdraw</Text>
    
  <TouchableOpacity  style={tw `h-15 bg-[#DEDEDE] mt-2 flex-row items-center flex px-3 justify-between rounded-lg w-full`}>
<Text style={tw `font-semibold text-lg mx-2  `}>{WithdrawalTo === 'Wire Transfer' ? "$" : "GHS"}</Text>

          <TextInput onChangeText={(txt)=> setAmount(Number(txt)) } style={tw`flex-1 px-3 border-l-2`} keyboardType="number-pad" />
          </TouchableOpacity>

    </> }
    
        {
            selectedId !== 1 && <View style={ tw `mt-5`}>
    <Text style={tw `mt-7 text-gray-400 font-semibold mb-4`}>Select Ticker</Text>
           
         
                  <ModalDropdown  options={ props.route.params.userTickers.map( ticker => ticker.title ) } onSelect={(idx, DropDownItem) => {
        setTickerId(props.route.params.userTickers[idx].id)       
        setmaxQty(props.route.params.userTickers[idx].qty)
      }} showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1   p-2`} >
        <Text style={tw `font-semibold`}>{option}</Text>
      </View>)} onDropdownWillHide={()=> settickerDPstatus(false)}  onDropdownWillShow={()=> settickerDPstatus(true)} renderRightComponent={ ()=> <DisplayIcon Status={tickerDPstatus} /> } dropdownStyle={tw`min-h-24 w-70  border-2  border-gray-100  rounded-lg `}  style={ tw `h-17 bg-[${Colors.TextInputBackgroundColor}] text-lg justify-center rounded-xl p-2`} textStyle={ { fontSize : 20 }} />    
            </View>
        }

  {  selectedId !== 1 && <View style={tw `flex`}>
    <Text style={tw `mt-7 text-gray-400 font-semibold`}>Enter the Quantity </Text>
  
  <TouchableOpacity  style={tw `h-15 bg-[#DEDEDE] mt-2 flex-row items-center flex px-3 justify-between rounded-lg w-full`}>

          <TextInput onChangeText={(txt)=> setQty(Number(txt)) } style={tw`flex-1 px-3 `} keyboardType="number-pad" />
          </TouchableOpacity>
  <Text style={tw `text-right mt-4 mr-4`}>Available Qunatity : {maxQty}</Text>
  </View>  }
  
{/* withdrawal where */}

{ selectedId ===1 && <>
  <Text style={tw `mt-7 text-gray-400 font-semibold mb-4`}>Withdrawal to : </Text>
  
     <ModalDropdown   options={['Bank Account', 'MTN Mobile money', 'Wire Transfer']} onSelect={(idx, DropDownItem) => {
        // const selectedId = DropDownItem === "Bank Account" ? 1 : DropDownItem === "MTN Mobile money" ?  2 : 3 
        setWithdrawalTo(DropDownItem)
      }} showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1   p-2`} >
        <Text style={tw `font-semibold`}>{option}</Text>
      </View>)} onDropdownWillHide={()=> setWithdrawTo(false)}
        onDropdownWillShow={()=> setWithdrawTo(true)} renderRightComponent={ ()=> <DisplayIcon Status={WithdrawTo} /> }
       dropdownStyle={tw`min-h-24 w-70  border-2  border-gray-100  rounded-lg `}  style={ tw `h-17 bg-[${Colors.TextInputBackgroundColor}] text-lg justify-center rounded-xl p-2`} textStyle={ { fontSize : 20 }} />                 
</>   }
{ selectedId ===2 && <>
  <Text style={tw `mt-7 text-gray-400 font-semibold`}>  Choose Withdrawal Date : </Text>
 
<TouchableOpacity onPress={()=> setCalendarModal(true)} style={tw `flex items-center flex-row px-3 h-17 mt-2 rounded-lg bg-[${Colors.TextInputBackgroundColor}]`} >
  <Text style={tw `flex-1 text-black p-3 `}>{selectedDate.length >1 ? formatDate(selectedDate) : ""}</Text>
<Icon name='calendar' type='ionicon' />
</TouchableOpacity>
</>   }
     

  
  <View style={tw `flex items-center ${ selectedId ===1 ? "mt-12 md:mt-29" : "mt-5"} justify-center mb-10 md:mb-0 flex-row`}>
  <TouchableOpacity onPress={()=> props.navigation.goBack()}   style={ tw `bg-[#00000066] h-14 mt-6 flex flex-row justify-center items-center rounded-lg w-42`} >
  <Icon  type='ionicon' name='close-circle-outline' color="white" />
      <Text style={tw `capitalize text-white text-xl font-semibold ml-3`} >Cancel</Text>
    </TouchableOpacity>
  <TouchableOpacity  onPress={()=> WithDrawFun()}   style={ tw `bg-[#455154] h-14 mt-6 flex flex-row justify-center ml-4 items-center rounded-lg w-42`} >
  <Icon  type='ionicon' name='checkmark-circle' color="white" />
      <Text style={tw `capitalize text-white text-xl font-semibold ml-3`} >Submit</Text>
    </TouchableOpacity>
  </View>
  <Loader  isLoading={isLoading} />
  </ScrollView>
  )
}

export default WithdrawalScreen