import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { CheckBox, Icon, Overlay } from '@rneui/base'
import tw from 'twrnc'
import Colors from '../../Constants/Colors'
import ModalDropdown from 'react-native-modal-dropdown';
import Loader from '../../Components/Loader'
import { useToast } from 'react-native-toast-notifications'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { httpClient } from '../../apis/Api'
import CalendarPicker from 'react-native-calendar-picker';

const TradeTicker = (props) => {
  // primary importation
  const {user} = useContext(AuthContext)
  const toast  = useToast()
  // State for our managment
  const [selectedMarketIndex, setSelectedMarketIndex] = useState(1);
  const [OrderValidyIndex, setOrderValidyIndex] = useState(1);
  const [fillTypeIndex, setfillTypeIndex] = useState(1);
  const [BasicOption,setBaiscOption] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [Quantity,setQuantity] = useState(0)
  const [price,setPrice] = useState(0)
  const [HarvestYear,setHarvestYear] = useState("")
  const [Season,setSeason] = useState("1")
  const [callDate,setCallDate] = useState(null)
  const [years,setYears] = useState([])
 

  useEffect(()=>{
 let years = []
 const currentYear = (new Date()).getFullYear()
 for(let index = 0; index < 3;index++){
   const newYear = currentYear - index
   const newArrays = [...years,newYear.toString()]
   years = newArrays
 }
 console.log(years)
 setYears(years)
  },[])
  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({title : 'Trade',headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
      ,      })
      },[])
      const [selecteBtn,SetSelectedBtn] = useState(props.route.params.orderCategory)
      // Make Order Handler
      // ** Advanced Order
      const CreateAdvancedOrderApi = async () => {
        if(Quantity === 0){
            toast.show(`Please enter quantity`, {
              type: "error",
              placement: "bottom",
              duration: 4000,
              offset: 60,
              animationType: "slide-in",
            })
        }else  if ((selectedMarketIndex === 2 && price === 0)) {
            toast.show(`Please Enter Price`, {
              type: "error",
              placement: "bottom",
              duration: 4000,
              offset: 60,
              animationType: "slide-in",
            })
        }else if(selecteBtn !== "buy" && props.route.params.tickerDATA.userTicker.qty < Quantity && props.route.params.tickerDATA.userTicker.qty !== null){
          toast.show(`You cannot sell more that what you have .`, {
            type: "error",
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
        }
        else {
            let data = {}
            data["orderType"] = selectedMarketIndex;
            data["fillType"] = fillTypeIndex;
            data["orderValidity"] =  OrderValidyIndex ;
            data["tickerId"] = props.route.params.tickerDATA.ticker.id;
            data["userId"] = user.id;
            data["limitPrice"] = price === ""?0 :price;
            data["qty"] = Number(Quantity);
            data["harverstYear"] = HarvestYear === "" ? years[0] : HarvestYear;
            data["season"] =  Number(Season);
            data["dateValidity"] = selectedDate ? new Date(selectedDate) : null;
            data["orderCategory"] = selecteBtn === "buy" ? 1 : 2;
            console.log(data)
            //make the Api request
            try {
        setIsLoading(true)
                await httpClient.post(`/api/orders/advanced`,data)
                toast.show(`Order  has been successfully Made`, {
                  type: "success",
                  placement: "bottom",
                  duration: 4000,
                  offset: 60,
                  animationType: "slide-in",
                })
                props.navigation.navigate("market")
            } catch (error) {
                console.log(error)
                toast.show(`${error.response.data.message}`, {
                  type: "error",
                  placement: "bottom",
                  duration: 4000,
                  offset: 60,
                  animationType: "slide-in",
                })
            }
    
            setIsLoading(false)
            
        }
    }
    // ** Basic Order
    const CreateOrderApiBasic = async () => {
    
      
     if(Quantity === 0){
      toast.show(`Please enter quantity`, {
        type: "error",
        placement: "bottom",
        duration: 4000,
        offset: 60,
        animationType: "slide-in",
      })
     }else{
      setIsLoading(true)
      let data = {}
      data["commodityTypeId"] = Number(props.route.params.tickerDATA.ticker.commodityType.id);
      data["orderCategory"] = selecteBtn === "buy" ? 1 : 2;
      data["qty"] = Number(Quantity) 
      data["userId"] = Number(user.id);
      try {
          await httpClient.post(`/api/orders/basic`,data)
          toast.show(`Order  has been successfully Made`, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
          props.navigation.navigate("market")
      } catch (error) {
          console.log(error)
          toast.show(`${error.response.data.message}`, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
          props.navigation.navigate("market")
      }

      setIsLoading(false)
     }
        
      
  }
  // GTD
  const [minDate, setMinDate] = useState('')
  const [CalendarMoal, setCalendarModal] = useState(false)
  const [selectedDate,setSelectedDate] = useState("1")
  useEffect(()=>{
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMinDate(tomorrow.toISOString().split('T')[0])
  },[])

   const onDateChange = (date) => {
    console.log(typeof  date.toISOString()) 
    setSelectedDate(date.toISOString())
    setCalendarModal(false)

   }
   const OnSelectGTD = () => { 
    setOrderValidyIndex(3)
    setCalendarModal(true)
    }

    // Manage Dropdown
    const DisplayIcon = ({Status}) => {
      return (
        <View style={tw `flex-1  items-end `}>
          <Icon style={tw ``} type='ionicon' name={`caret-${Status? "up" : "down"}`}  />
           </View>
      )
    }
    
        // Handle DropdownIcon
        const [HarverstYearDropdownStatus,setHarverstYearDropdownStatus] = useState(false)
        const [SeasonDropdwonStatus,setSeasonDropdwonStatus] = useState(false)
  return (
    <View style={tw `flex-1 bg-white relative`}>

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
      <View style={tw `top-0 h-22 flex items-center justify-center flex-row bg-white  w-full`}>
      <TouchableOpacity   onPress={()=> SetSelectedBtn("buy")}  style={ tw `${selecteBtn === "buy" ?   `bg-[${Colors.greenColor}]` : "bg-green-300"} h-12 mt-6 flex flex-row justify-center items-center rounded-lg w-40 self-center`} >
    
        <Text style={tw `capitalize text-white text-lg font-semibold `} >BUY</Text>
      </TouchableOpacity>
      <TouchableOpacity    onPress={()=> SetSelectedBtn("sell")} style={ tw `${selecteBtn !== "buy" ? `bg-[${Colors.redColor}]` :  "bg-red-300"  } h-12 ml-4 mt-6 flex flex-row justify-center items-center rounded-lg w-40 self-center`} >
    
        <Text style={tw `capitalize text-white text-lg font-semibold `} >SELL</Text>
      </TouchableOpacity>
      </View>
      {/* Options */}
      <ScrollView showsVerticalScrollIndicator={false} style={tw `flex-1 mt-4 px-2 `}>
        {/* Commodity */}
         <Text>Commodity</Text>
         <TouchableOpacity  style={tw `h-15 bg-[#DEDEDE] mt-2 flex-row items-center flex px-3 justify-between rounded-lg w-full`}>
        <View style={tw `w-50  h-18 flex flex-row items-center`}>
         
          <Text style={tw `ml-2`}>{props.route.params.tickerDATA.ticker.commodity.commodityName}</Text>
        </View>
      </TouchableOpacity>

      {/* Commodity Type Or Ticker */}
      { BasicOption ?  <Text style={tw`mt-4`}>Commodity Type</Text> : <Text style={tw`mt-4`}>Ticker</Text>}
        
         <TouchableOpacity  style={tw `h-15 bg-[#DEDEDE] mt-2 flex-row items-center flex px-3 justify-between rounded-lg w-full`}>
        <View style={tw `w-50  h-18 flex flex-row items-center`}>
         
          {  BasicOption ?  <Text style={tw `ml-2`}>{props.route.params.tickerDATA.ticker.commodityType.commodityTypeName}</Text> : <Text style={tw `ml-2`}>{props.route.params.tickerDATA.ticker.title}</Text> }
          
        </View>
      </TouchableOpacity>
      {/* WarehouseLocation */}
      { !BasicOption &&  <Text style={tw`mt-4`}> Warehouse Location</Text>}
      { !BasicOption &&  <TouchableOpacity  style={tw `h-15 bg-[#DEDEDE] mt-2 flex-row items-center flex px-3 justify-between rounded-lg w-full`}>
        <View style={tw `w-50  h-18 flex flex-row items-center`}>
          <Text style={tw `ml-2`}>{props.route.params.tickerDATA.ticker.warehouse.warehouseLocation}</Text>
        </View>
      </TouchableOpacity> }

        { !BasicOption && <View style={tw `flex flex-row items-center px-2 h-30 `}>
          <View style={tw `h-full flex-1 `}>
            <Text style={tw `mb-3 mt-2`}>Harverst Year : </Text>
            <ModalDropdown  onSelect={(idx, DropDownItem) => setHarvestYear(DropDownItem)}  showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1   p-2`} >
        <Text style={tw `font-semibold`}>{option}</Text>
      </View>)} onDropdownWillHide={()=> setHarverstYearDropdownStatus(false)}  onDropdownWillShow={()=> setHarverstYearDropdownStatus(true)} renderRightComponent={ ()=> <DisplayIcon Status={HarverstYearDropdownStatus} /> } dropdownStyle={tw`min-h-24 w-70  border-2  border-gray-100  rounded-lg `}  style={ tw `h-15 bg-[#DEDEDE] text-lg justify-center rounded-xl p-2`} textStyle={ { fontSize : 20 }} options={years}/>
          </View>
          <View style={tw `h-full flex-1 ml-2 `}>
          <Text style={tw `mb-3 mt-2`}>Season : </Text>
          <ModalDropdown  onSelect={(idx, DropDownItem) => setSeason(DropDownItem)}  showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1   p-2`} >
        <Text style={tw `font-semibold`}>{option}</Text>
      </View>)} onDropdownWillHide={()=> setSeasonDropdwonStatus(false)}  onDropdownWillShow={()=> setSeasonDropdwonStatus(true)} renderRightComponent={ ()=> <DisplayIcon Status={SeasonDropdwonStatus} /> } dropdownStyle={tw`min-h-24 w-70  border-2  border-gray-100  rounded-lg `}  style={ tw `h-15 bg-[#DEDEDE] text-lg justify-center rounded-xl p-2`} textStyle={ { fontSize : 20 }} options={['1', '2',"3","4"]}/>
          </View>
        </View> }
        
        {/* Order Type */}
         <Text style={tw`mt-4`}> Order Type</Text>
         { !BasicOption && <View style={tw `flex flex-row items-center`} >
          <View style={tw `flex flex-row items-center`}>
          <CheckBox
          style={tw `m-0`}
           checked={selectedMarketIndex === 1}
           onPress={() => setSelectedMarketIndex(1)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           checkedColor={`${Colors.greenColor}`}
         />
         <Text >Market</Text>
          </View>
         
          <View style={tw `flex flex-row items-center`}>
          <CheckBox
           checked={selectedMarketIndex === 2}
           onPress={() => setSelectedMarketIndex(2)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           checkedColor={`${Colors.greenColor}`}
         />
         <Text >Limit</Text>
          </View>
       </View> }
         
         
        { BasicOption &&  <View style={tw `w-25 justify-center mt-4  bg-[#DEDEDE] rounded-lg h-10 flex flex items-center`}>
              <Text style={tw ``}>Market</Text>
            </View>    }
     
      {/* Quantity */}
      <View style={tw `flex items-center flex-row justify-between px-4`}>
      <Text style={tw`mt-4`}>Quantity(MT) </Text>
      <Text style={tw`mt-4`}>Bags : {Quantity*20}  </Text>

      </View>
         <TouchableOpacity  style={tw `h-15 bg-[#DEDEDE] mt-2 flex-row items-center flex px-3 justify-between rounded-lg w-full`}>
       <TextInput onChangeText={(txt)=> setQuantity(Number(txt)) } style={tw`flex-1`} keyboardType="number-pad" />
      </TouchableOpacity>
      { selecteBtn !== "buy" && <Text style={tw`mt-4 text-right mr-4`}>Available Quantity : {props.route.params.tickerDATA.userTicker !== null ? props.route.params.tickerDATA.userTicker.qty : 0} </Text> }
      
      {selectedMarketIndex === 2 && <>
            <Text style={tw`mt-4 text-left mr-4`}>Limit Price </Text>
            <TouchableOpacity  style={tw `h-15 bg-[#DEDEDE] mt-2 flex-row items-center flex px-3 justify-between rounded-lg w-full`}>
           <TextInput onChangeText={(txt)=> setPrice(Number(txt)) } style={tw`flex-1`} keyboardType="number-pad" />
          </TouchableOpacity>
          </> }
      {!BasicOption && <Text style={tw`mt-4`}> Order Validity</Text>  }
         { !BasicOption && <View style={tw `flex flex-row items-center`} >
          <View style={tw `flex flex-row items-center`}>
          <CheckBox
          containerStyle={tw `m-0`}
          style={tw `m-0`}
           checked={OrderValidyIndex === 1}
           onPress={() => setOrderValidyIndex(1)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           checkedColor={`${Colors.greenColor}`}
         />
         <Text >Day</Text>
          </View>
         
          <View style={tw `flex flex-row items-center`}>
          <CheckBox
          containerStyle={tw `m-0`}
           checked={OrderValidyIndex === 2}
           onPress={() => setOrderValidyIndex(2)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           checkedColor={`${Colors.greenColor}`}
         />
         <Text >GTC</Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
          <CheckBox
          containerStyle={tw `m-0`}
           checked={OrderValidyIndex === 3}
           onPress={() => OnSelectGTD()}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           checkedColor={`${Colors.greenColor}`}
         />
         <Text >GTD</Text>
          </View>
       </View> }
      {!BasicOption && <Text style={tw`mt-4`}> Fill Type</Text>  }
         { !BasicOption && <View style={tw `flex flex-row items-center`} >
          <View style={tw `flex flex-row items-center`}>
          <CheckBox
          containerStyle={tw `m-0`}
          style={tw `m-0`}
           checked={fillTypeIndex === 1}
           onPress={() => setfillTypeIndex(1)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           checkedColor={`${Colors.greenColor}`}
         />
         <Text >Partial</Text>
          </View>
         
          <View style={tw `flex flex-row items-center`}>
          <CheckBox
          containerStyle={tw `m-0`}
           checked={fillTypeIndex === 2}
           onPress={() => setfillTypeIndex(2)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           checkedColor={`${Colors.greenColor}`}
         />
         <Text >All Or None</Text>
          </View>
          <View style={tw `flex flex-row items-center`}>
          <CheckBox
          containerStyle={tw `m-0`}
           checked={fillTypeIndex === 3}
           onPress={() => setfillTypeIndex(3)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           checkedColor={`${Colors.greenColor}`}
         />
         <Text >Fill Or Kill</Text>
          </View>
       </View> }

       { BasicOption ?  <Text onPress={()=> setBaiscOption(!BasicOption)} style={tw `mt-2 text-center`}>Advanced Options</Text> : <Text onPress={()=> setBaiscOption(!BasicOption)} style={tw `mt-2 text-center`}>Basic Options</Text>   }
     
      
      <TouchableOpacity  onPress={()=> BasicOption ? CreateOrderApiBasic() : CreateAdvancedOrderApi() }   style={ tw `bg-[#455154] h-12 mb-10 mt-6 flex flex-row justify-center self-center items-center rounded-lg w-40`} >
            <Text style={tw `capitalize text-white text-xl font-semibold `} >Submit</Text>
          </TouchableOpacity>
      </ScrollView>

      <Loader isLoading={isLoading} />
    </View>
  )
}

export default TradeTicker