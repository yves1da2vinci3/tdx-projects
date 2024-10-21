import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { CheckBox, Icon, Overlay } from '@rneui/base'
import tw from 'twrnc'
import Colors from '../Constants/Colors'
import ModalDropdown from 'react-native-modal-dropdown';
import Loader from '../Components/Loader'
import { useToast } from 'react-native-toast-notifications'
import { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import { httpClient } from '../apis/Api'
import CalendarPicker from 'react-native-calendar-picker';
import { useRef } from 'react'

const TradeScreen = (props) => {
    // primary importation
    const {user} = useContext(AuthContext)
    const toast  = useToast()
    // State for our managment
    const [selectedMarketIndex, setSelectedMarketIndex] = useState(1);
    const [OrderValidyIndex, setOrderValidyIndex] = useState(1);
    const [fillTypeIndex, setfillTypeIndex] = useState(1);
    const [BasicOption,setBaiscOption] = useState(true)
    const [isLoading,setIsLoading] = useState(true)
    const [Quantity,setQuantity] = useState(0)
    const [price,setPrice] = useState("")
    const [HarvestYear,setHarvestYear] = useState("")
    const [Season,setSeason] = useState("1")
    const [callDate,setCallDate] = useState(null)
    const [years,setYears] = useState([])
   const [IsMaxQuantityError,setIsQuantityError] = useState(false)
    // Primary
      //  Assets
  const [maxQty,setMaxQty] = useState([])
  const [commodities,setCommodities] = useState([])
  const [commodityTypes,setCommodityTypes] = useState([])
  const [commodityTypesBackup,setCommodityTypesBackup] = useState([])
  const [warehouses,setWarehouses] = useState([])
  const [tickers,setTickers] = useState([])
  const [tickersBackup,setTickersBackup] = useState([])
  const [userAssets,setUserAssets] = useState([])
  // AssetId
  const [commodityId,setCommodityId] = useState(0)
  const [commodityTypeId,setCommodityTypeId] = useState(0)
  const [warehouseId,setWarehouseId] = useState(0)
  const [warehouseName,setWareHouseName] = useState("")
  const [tickerId,setTickerId] = useState(0)
  // Functions
  const  onSymbolSelect = (index) => {
    // test if this a sell order
     if(BasicOption === false ){
        // select ticker Id
        // const index = tickers.findIndex(ticker => ticker.title === item)
        setTickerId(tickers[index].id)
        // select warehouseLocation 
         const warehouse = warehouses.filter(warehouse => warehouse.id === tickersBackup[index].warehouseId)
         setWarehouseId(warehouse[0].id)
        setWareHouseName(warehouse[0].warehouseLocation)
        // enter the qty
        if(selecteBtn === "sell"){
          const tickerConcerned = userAssets.filter(userTicker => userTicker.tickerId === tickers[index].id )
          console.log(tickerConcerned)
          setMaxQty(tickerConcerned.length > 0 ? tickerConcerned[0].qty : 0)
        }
     }else{
        if(selecteBtn === "sell"){
    //    get all the tickers
    // **get the index
    // ** get the tickers
    const userTickers = userAssets.filter( userTicker => userTicker.ticker.commodityTypeId === commodityTypes[index].id)
    setCommodityTypeId(commodityTypes[index].id)

    const commodityTypesTickerQty = userTickers.reduce((previousValue,currentValue)=> previousValue + currentValue.qty ,0)
    setMaxQty(commodityTypesTickerQty)
    // 
        }else{
            setCommodityTypeId(commodityTypes[index].id)
        }
   
     }
   
}
const chooseCommodity = (index,commodityName) => { 
  // reset the values(commodityId, qty,commodity,warehouseName,warehouseId)
const commodityId  = 1
  if(selecteBtn === "sell"){
      setMaxQty(0)
  }
  //  selected tickers
  const tickers = tickersBackup.filter( ticker => ticker.commodityId === commodities[index].id)
  // select commodityTypes
  const commodityTypes = commodityTypesBackup.filter(commodityType => commodityType.commodityId === commodityId)
  // set the filtered
  setCommodityTypes(commodityTypes)
  setTickers(tickers)
  setCommodityId( Number(commodityId))

}
  // GetTrade
  const getTrade = async() => { 
    try {
      const {data} = await httpClient.get(`/api/users/${user.id}/trade`)
            setUserAssets(data.userAssets)
             setCommodities(data.commodities)
            setCommodityTypesBackup(data.commodityTypes)
            setTickersBackup(data.tickers)
            setWarehouses(data.warehouses)
            setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
   }
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
 getTrade()

    },[])
    // Check Quanity
    // useEffect(()=>{
    //   if(BasicOption && selecteBtn !== "buy"){
    //    const maxQty = userAssets.filter(userTicker => userTicker.ticker.commodityTypeId === commodityTypeId).reduce((previousValue,currentUserTicker)=> previousValue + currentUserTicker.qty)
    //    setMaxQty(maxQty)
    //   }else if(BasicOption === false &&  selecteBtn !== "buy") {
    //     const maxQty = userAssets.filter(userTicker => userTicker.tickerId === tickerId) 
    //     setMaxQty(maxQty)
    //   }
    // },[commodityTypeId])
    const navigation = useNavigation()
    useEffect(()=>{
        navigation.setOptions({title : 'Trade',headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
        ,      })
        },[])
        const [selecteBtn,SetSelectedBtn] = useState("buy")
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
          }else if(selecteBtn !== "buy" && maxQty < Quantity ){
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
              data["tickerId"] = tickerId;
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
                  clearData()
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
        data["commodityTypeId"] = commodityTypeId;
        data["orderCategory"] = selecteBtn === "buy" ? 1 : 2;
        data["qty"] = Quantity 
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
            clearData()
        } catch (error) {
            console.log(error)
            toast.show(`${error.response.data.message}`, {
              type: "success",
              placement: "bottom",
              duration: 4000,
              offset: 60,
              animationType: "slide-in",
            })
            clearData()
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
      const symbolRef = useRef(null)
      const commodityRef = useRef(null)
      const HarverstRef = useRef(null)
      const seasonRef = useRef(null)
      const quantityRef = useRef(null)
      // Btn Handler
      useEffect(()=>{
        symbolRef.current.select(-1)
      },[selecteBtn])

      const clearData = async () => {
        setOrderValidyIndex(1)
        setTickerId(0)
        setWarehouseId(0)
        setWareHouseName('')
        setQuantity(0)
        setPrice(0)
        setfillTypeIndex(1)
        setHarvestYear('')
        setMaxQty(0)
        setSelectedMarketIndex(1)
        commodityRef.current.select(-1)
        symbolRef.current.select(-1)
        seasonRef.current.select(-1)
        HarverstRef.current.select(-1)
        quantityRef.current.value = 0

    }

    // Handle DropdownIcon
    const [CommodityDropdownStatus,setCommodityDropdownStatus] = useState(false)
    const [CommodityTypeDropdownStatus,setCommodityTypeDropdownStatus] = useState(false)

  
    
    const DisplayIcon = ({Status}) => {
      return (
        <View style={tw `flex-1  items-end `}>
          <Icon style={tw ``} type='ionicon' name={`caret-${Status? "up" : "down"}`}  />
           </View>
      )
    }
    
    
  return (
    <View style={tw `flex-1 bg-white pt-10 relative`}>

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
          <TouchableOpacity   onPress={()=> SetSelectedBtn("buy")}  style={ tw `${selecteBtn === "buy" ?   `bg-[${Colors.greenColor}]` : "bg-green-400"} h-12 mt-6 flex flex-row justify-center items-center rounded-lg w-40 self-center`} >
        
            <Text style={tw `capitalize text-white text-lg font-semibold `} >BUY</Text>
          </TouchableOpacity>
          <TouchableOpacity    onPress={()=> SetSelectedBtn("sell")} style={ tw `${selecteBtn !== "buy" ? `bg-[${Colors.redColor}]` :  "bg-red-400"  } h-12 ml-4 mt-6 flex flex-row justify-center items-center rounded-lg w-40 self-center`} >
        
            <Text style={tw `capitalize text-white text-lg font-semibold `} >SELL</Text>
          </TouchableOpacity>
          </View>
          {/* Options */}
          <ScrollView showsVerticalScrollIndicator={false} style={tw `flex-1 mt-4 px-2 `}>
            {/* Commodity */}
             <Text>Commodity</Text>
             <ModalDropdown ref={commodityRef} options={ isLoading ? [] : commodities.map(commodity => commodity.commodityName) } onSelect={chooseCommodity} showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1  mt-2 border-b-2 border-gray-100 p-2`} >
        <Text style={tw `font-semibold`}>{option}</Text>
      </View>)}  onDropdownWillHide={()=> setCommodityDropdownStatus(false)}  onDropdownWillShow={()=> setCommodityDropdownStatus(true)} renderRightComponent={ ()=> <DisplayIcon Status={CommodityDropdownStatus} /> } dropdownStyle={tw`min-h-24 w-70  border-2 border-gray-100  rounded-lg `}  style={ tw `h-15 bg-[#DEDEDE] text-lg justify-center rounded-xl p-2`}  textStyle={ { fontSize : 20 }}  
                      /> 
    
          {/* Commodity Type Or Ticker */}
          { BasicOption ?  <Text style={tw`mt-4`}>Commodity Type</Text> : <Text style={tw`mt-4`}>Ticker</Text>}
            
          <ModalDropdown ref={symbolRef} options={ isLoading ? [] : BasicOption ? commodityTypes.map(commodityType => commodityType.commodityTypeName) : tickers.map(ticker => ticker.title)} onSelect={onSymbolSelect} showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1  mt-2 border-b-2 border-gray-100 p-2 `} >
        <Text style={tw `font-semibold `}>{option}</Text>
      </View>)} onDropdownWillHide={()=> setCommodityTypeDropdownStatus(false)}  onDropdownWillShow={()=> setCommodityTypeDropdownStatus(true)} renderRightComponent={ ()=> <DisplayIcon Status={CommodityTypeDropdownStatus} /> } dropdownStyle={tw`min-h-24 w-70  border-2 border-gray-100  rounded-lg `}  style={ tw `h-15 bg-[#DEDEDE] text-lg justify-center rounded-xl p-2`}  textStyle={ { fontSize : 20 }}  
                      /> 
            
          {/* WarehouseLocation */}
          { !BasicOption &&  <Text style={tw`mt-4`}> Warehouse Location</Text>}
          { !BasicOption && <TouchableOpacity  style={tw `h-15 bg-[#DEDEDE] mt-2  flex-row items-center flex px-3 justify-between rounded-lg w-full`}>
           <Text>{warehouseName}</Text>
          </TouchableOpacity>   }
    
            { !BasicOption && <View style={tw `flex flex-row items-center px-2 h-30 `}>
              <View style={tw `h-full flex-1 `}>
                <Text style={tw `mb-3 mt-2`}>Harverst Year : </Text>
                <ModalDropdown ref={HarverstRef}  onSelect={(idx, DropDownItem) => setHarvestYear(DropDownItem)}  showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1   p-2`} >
            <Text style={tw `font-semibold`}>{option}</Text>
          </View>)} dropdownStyle={tw`min-h-24 w-70  border-2  border-gray-100  rounded-lg `}  style={ tw `h-15 bg-[#DEDEDE] text-lg justify-center rounded-xl p-2`} textStyle={ { fontSize : 20 }} options={years}/>
              </View>
              <View style={tw `h-full flex-1 ml-2 `}>
              <Text style={tw `mb-3 mt-2`}>Season : </Text>
              <ModalDropdown ref={seasonRef}  onSelect={(idx, DropDownItem) => setSeason(DropDownItem)}  showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1   p-2`} >
            <Text style={tw `font-semibold`}>{option}</Text>
          </View>)} dropdownStyle={tw`min-h-24 w-70  border-2  border-gray-100  rounded-lg `}  style={ tw `h-15 bg-[#DEDEDE] text-lg justify-center rounded-xl p-2`} textStyle={ { fontSize : 20 }} options={['1', '2',"3","4"]}/>
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
           <TextInput ref={quantityRef} onChangeText={(txt)=> setQuantity(Number(txt)) } style={tw`flex-1`} keyboardType="number-pad" />
          </TouchableOpacity>
          { selecteBtn !== "buy" && <Text style={tw`mt-4 text-right mr-4`}>Available Quantity : {maxQty } </Text> }
          
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
         
            <View style={tw `h-auto mb-10 flex-row  justify-center items-center`}>
          <TouchableOpacity  onPress={()=> clearData() }   style={ tw `bg-gray-400 mr-4 h-12 mt-6 flex flex-row justify-center self-center items-center rounded-lg w-40`} >
            <Text style={tw `capitalize text-white text-xl font-semibold `} >Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=> BasicOption ? CreateOrderApiBasic() : CreateAdvancedOrderApi() }   style={ tw `bg-[#455154] h-12 mt-6 flex flex-row justify-center self-center items-center rounded-lg w-40`} >
            <Text style={tw `capitalize text-white text-xl font-semibold `} >Submit</Text>
          </TouchableOpacity>
          </View>
          </ScrollView>
    
          <Loader isLoading={isLoading} />
        </View>
  )
}

export default TradeScreen