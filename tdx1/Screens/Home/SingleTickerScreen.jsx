import { View, Text, Image, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Icon, Skeleton,Overlay } from '@rneui/base'
import  tw from 'twrnc'
import Colors from '../../Constants/Colors'
import { LineChart } from 'react-native-chart-kit'
import ticker from '../../data'
import { wp ,hp} from '../../helpers/Responsiveness'
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import formatDate from '../../helpers/formatDateFromDb'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { HomeContext } from '../../Contexts/HomeContext'
import { httpClient } from '../../apis/Api'
import { AuthContext } from '../../Contexts/AuthContext'
import Loader from '../../Components/Loader'
import priceVariation from '../../helpers/priceVariationValue'
import * as Progress from 'react-native-progress';
import pricePercentage from '../../helpers/pricePercentage'
import { TextInput } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import moment from 'moment'
const SingleTickerScreen = (props) => {
  const {user} = useContext(AuthContext)
  const {currency,isInTheCheckList,addItemToWatchList,removeItemToWatchList} = useContext(HomeContext)
  const [filterModal, setFilterModal] = useState(false)
  const [alertModal, setAlertModal] = useState(false)
  const [alertModalSucces, setAlertModalSucces] = useState(false)
  const [allWatchLists, setAllWatchLists] = useState([])
  const [blogsPosts, setBlogsPosts] = useState([])
  const [alertPrice, setAlertPrice] = useState('')
  const [weekPrice,setWeekPrice] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [tickerDATA, setTickerDATA] = useState({})
  const [dataSetArray, setDataSetArray] = useState([])
  const [dataSetArrayLoading, setDataSetArrayLoading] = useState(true)
  const [WeekPriceLoading, setWeekPriceLoading] = useState(true)
  const [alertLoading, setAlertLoading] = useState(false)
  const [datesLabel, setDatesLabel] = useState([])
  const [selectedId,setselectedId] = useState(0)

  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({title : 'Assets',headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
      ,      })
      },[])

  const filterList = [
    {
      id : 0,
      title : "1W"
    },
    {
      id : 1,
      title : "1M"
    },
    {
      id : 2,
      title : "3M"
    },
    {
      id : 3,
      title : "6M"
    },
    {
      id : 4,
      title : "1Y"
    },
    {
      id : 5,
      title : "All"
    },
  ]
  // Hide button
  const [Show,setShow] = useState(true)
  
  const AddToWashList = async () => {
    if(isInTheCheckList(tickerDATA.ticker.id)){
removeItemToWatchList(tickerDATA.ticker.id)
    }else{
        addItemToWatchList(tickerDATA.ticker.id)
    }
    
    setFilterModal(false)
}
function createDate(days, months, years) {
  var date = new Date();
  date.setDate(date.getDate() - days);
  date.setMonth(date.getMonth() - months);
  date.setFullYear(date.getFullYear() - years);
  return date.toISOString();
  // return date.toISOString().slice(0, 19).replace('T', ' ');
}


const changeDataset = async (item) => {
  setDataSetArrayLoading(true)
      setselectedId(item?.id)
      const tickerId = props.route.params.ticker.id
  try {
      const {data} = await httpClient.get(`/api/tickers/${tickerId}/price?dateFilter=${item.id}`)
      setDataSetArray(data)
      setDataSetArrayLoading(false)
  } catch (error) {
      setDataSetArrayLoading(false)
      console.log(error)
  }
  //    alert(JSON.stringify(data))
}
 
const setLabelsForGraphPrice = () => { 
  const dateLabels = []
  
  // week
  if(selectedId===0){
      for(var index = 0; index <7;index++ ){
         
       dateLabels.push( formatDate(createDate(index,0,0)))
      }
      
      setDatesLabel([])
      setDatesLabel(dateLabels.reverse())
  }
  // 1 month
  if(selectedId===1){
      for(var index = 0; index <4;index++ ){
       dateLabels.push(formatDate(createDate(index*7,0,0)) )
      
      }
      setDatesLabel([])
      setDatesLabel(dateLabels.reverse())
  }
  // 3month
  if(selectedId===2){
      for(var index = 0; index <3;index++ ){
       dateLabels.push(formatDate(createDate(0,index,0)) )
      
      }
      setDatesLabel([])
      setDatesLabel(dateLabels.reverse())
  }
  // 6month
  if(selectedId===3){
      for(var index = 0; index <6;index++ ){
          if((index+1) %2 ==0){
              dateLabels.push("_@")
          }else{
              dateLabels.push(formatDate(createDate(0,index,0)) )
          }
      
      
      }
      setDatesLabel([])
      setDatesLabel(dateLabels.reverse())
  }
  // 1 year
  if(selectedId===4){
      for(var index = 0; index <12;index++ ){
          if((index+1) %2 ==0){
              dateLabels.push("_@")
          }else{
              dateLabels.push(formatDate(createDate(0,index,0)) )
          }
      
      }
      setDatesLabel([])
      setDatesLabel(dateLabels.reverse())
  }
  // all time
  if(selectedId===5){
     
      dateLabels.push('all time')
     setDatesLabel([])
      setDatesLabel(dateLabels.reverse())
  }
 

}
useEffect(()=>{
  setLabelsForGraphPrice()
},[selectedId])
const fecthSingleTicker = async () => { 
  
  const tickerId = props.route.params.ticker.id
  const userId = user.id
try {

const {data} = await httpClient.post(`/api/tickers/${tickerId}/users`,{userId})
// console.log(data)
setTickerDATA(data)
setLabelsForGraphPrice()
setWeekPrice(data.data)
setDataSetArray(data.data)
setDataSetArrayLoading(false)
setIsLoading(false)
// setWeekPriceLoading(false)
} catch (error) {
console.log(error)
}
}
useEffect(()=>{
fecthSingleTicker()
},[])
// useFocusEffect(
//   React.useCallback(() => {
//     fecthSingleTicker()
//   }, [])
// )
// A;ert Management
const toast = useToast()
const [alertModalStatus,setAlertModalStatus] = useState(false)
const saveAlert = async () => {
  // console.log(" ohhhhh :" , alertPrice) 
// Make the request 
if (alertPrice === '') {
  toast.show(`Please enter the price`, {
    type: "error",
    placement: "bottom",
    duration: 4000,
    offset: 60,
    animationType: "slide-in",
  })
} else {

  let data = {
      
  }
  data["tickerId"] = tickerDATA.ticker.id;
  data["price"] = Number(alertPrice);
  // console.log(user.id)
  setAlertModal(false)
  console.log(data)
  try {
      setIsLoading(true)
      await httpClient.post(`/api/users/${user.id}/alerts`,data)
      setIsLoading(false)
      toast.show(`Alert successfully added`, {
        type: "success",
        placement: "bottom",
        duration: 4000,
        offset: 60,
        animationType: "slide-in",
      })
  } catch (error) {
      setIsLoading(false)
      // Display the Toast
toast.show(`${error.response.data.message}`, {
  type: "error",
  placement: "bottom",
  duration: 4000,
  offset: 60,
  animationType: "slide-in",
})
      console.log(error)
  }
}

setAlertModalStatus(false)
  
 }

//  Manage WatchList
const toggleWatchList = () => { 
  if(isInTheCheckList(tickerDATA.ticker.id)){
    removeItemToWatchList(tickerDATA.ticker.id)
    toast.show(`Ticker  successfully removed to the watchlist`, {
      type: "success",
      placement: "bottom",
      duration: 4000,
      offset: 60,
      animationType: "slide-in",
    })
  }else{
    addItemToWatchList(tickerDATA.ticker.id)
    toast.show(`Ticker  successfully added to the watchlist`, {
      type: "success",
      placement: "bottom",
      duration: 4000,
      offset: 60,
      animationType: "slide-in",
    })
  }

 }
  return (
    <View  style={tw `flex-1 relative bg-white`}>
      <Overlay overlayStyle={tw `border-0 border-red-500 bg-white rounded-lg` }   isVisible={alertModal} >
          <View style={tw `h-48 w-60 bg-white flex  p-2 `}>
            <Text style={tw `font-semibold mt-7`}>Enter the price </Text>
            <TextInput onChangeText={(txt) => setAlertPrice(txt) }  keyboardType='numeric' style={tw`h-10  p-3 mt-3 rounded-lg bg-gray-100 w-full`} />
          </View>
          <TouchableOpacity  onPress={()=> saveAlert() } style={tw `self-end h-12 w-24 flex bg-[${Colors.greenColor}] mt-2 rounded-xl justify-center items-center`}>
        <Text style={tw `text-white`}>save</Text>
      </TouchableOpacity>
    </Overlay>
      <ScrollView  onMomentumScrollEnd={(e) => {
    const { contentOffset, contentSize } = e.nativeEvent;
    if (contentOffset.y >= contentSize.height - height) {
      setShow(false)
    }
  }} onMomentumScrollBegin={()=>setShow(true) }  showsVerticalScrollIndicator={false}>
      {/* Label */}
      <View style={tw `mt-4 h-20 w-full justify-between flex flex-row p-4  pr-8 items-center `}>
      
       <View style={tw `flex items-center flex-row`}>
        {isLoading ? <Skeleton circle width={40} height={40} /> :  <Image  style={tw `h-12 w-12 bg-gray-400 rounded-full`} source={{ uri : tickerDATA.ticker.commodity.commodityUrl }} /> }
       
       
        <View style={ tw `flex-1 h-20  pl-1 ml-2 justify-center flex py-1`}>
    <Text style={tw `font-semibold mb-2 `}>{isLoading ? "..." : tickerDATA.ticker.commodity.commodityName }</Text>
    
    
    <Text style={tw `text-gray-400 `}>{isLoading ? "..." : tickerDATA.ticker.commodityType.commodityTypeName }</Text>
      </View>
      </View>
      {/* Menu */}
      <View>
      <Menu  style={tw `self-end `}>
      <MenuTrigger  >
      <Icon  type='ionicon' name='ellipsis-vertical' style={tw `self-end`} />
      </MenuTrigger>
      <MenuOptions>

        <MenuOption style={tw `flex flex-row items-center h-10 `} onSelect={() =>  setAlertModal(true)} >
          
            <Icon  style={tw `ml-1`} color={`${Colors.black}`} type='font-awesome' name='bell' />
          <Text style={tw `ml-1`} >Add to Alert</Text>
        </MenuOption>
        <MenuOption style={tw `flex flex-row items-center h-10 `} onSelect={() =>  toggleWatchList()} >
            <Icon  style={tw `ml-1`} color={`${Colors.black}`} type='ionicon' name={  isLoading ? "..." : isInTheCheckList(tickerDATA.ticker.id) ? "eye-off" :"eye" } />
          <Text style={tw `ml-1`} >{  isLoading ? "..." : isInTheCheckList(tickerDATA.ticker.id) ? "Remove to the WatchList" :"Add to WatchList" } </Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
      </View>
      
      </View>
      {/* Chart */}
      <View style={tw`h-70 bg-[${Colors.TextInputBackgroundColor}] flex p-2`}>
        {/* Tilte and Variations informations */}
        <View style={tw `h-15 px-3 items-center flex-row  justify-between flex`}>
          <Text style={tw ` font-bold`}>{isLoading? "..." : tickerDATA?.ticker.title}</Text>
          <View style={tw`flex justify-between p-1 items-end  w-25`}>
            { isLoading ? <Text>...</Text> : <Text style={tw `font-bold text-[${ (tickerDATA?.data[tickerDATA?.data.length-1].priceValue -tickerDATA?.data[tickerDATA?.data.length-2].priceValue)   >= 0 ?Colors.greenColor : Colors.redColor}]`}> {parseFloat(tickerDATA?.data[tickerDATA?.data.length-1].priceValue * currency.currencyRate).toFixed(1) + ` ${currency.label}`} </Text> }
          { isLoading ? <Text>...</Text> :<Text style={tw `font-bold text-[${ pricePercentage(tickerDATA?.data) >= 0 ? Colors.greenColor : Colors.redColor}]`}> {"" + (pricePercentage(tickerDATA?.data)) + " %"}</Text>  }
        
        {isLoading ? <Text>...</Text> : <Text style={tw `font-bold italic text-[${Colors.blueAccent}]`}>{priceVariation(tickerDATA?.data)}</Text>}
        
    </View>
        </View>
        {/* Chart */}
        <View style={tw `h-40  justify-center items-center   flex  `}>
          { dataSetArrayLoading ?  <Progress.Circle size={50} indeterminate={true} /> :  dataSetArray.length > 0 &&   <LineChart
                                    data={{
                                      labels : datesLabel,
                                      datasets: [
                                        {
                                            data: dataSetArray?.map((item) => {
                                                return (
                                                    parseInt(item.priceValue)
                                                )
                                            })
                                        }
                                    ]
                                    }}
                                    
                                    width={320} // from react-native
                                    height={hp(20)}
                                    flatColor={true}
                                    xAxisLabel={""}
                                    chartConfig={{
                                      propsForVerticalLabels: {
                                        translateX : selectedId ==0 ? 2 : selectedId ==3 ? 12 : selectedId ==4 ? 1 :  33,
                                        stroke: `${Colors.black}`,
                                        fontSize :  selectedId ===4 || selectedId ===0? 6 : 12,
                                        fontWeight : 200
                                      },
                                        backgroundGradientFromOpacity: 0,
                                        backgroundGradientToOpacity: 0,
                                        color: (opacity = 1) => pricePercentage(dataSetArray) >  -0.1  ? Colors.greenColor : Colors.redColor,
                                        propsForDots: { r: "0" },
                                        propsForBackgroundLines: { stroke: "#CCCCCC33" },
                                        decimalPlaces: 1,
                                        
                                      labelColor: (opacity = 1) => Colors.black,

                                    }}
                                    bezier
                                    style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: 3 }] }}
                                />}
              
                </View>
        {/* Filters */}
        <ScrollView  horizontal={true}  contentContainerStyle={ { height : Platform.OS ==="ios"? 0 : 40 , backgroundColor: " red"}} showsHorizontalScrollIndicator={false} style={tw `mt-1   flex-row flex-1`}   >
        { filterList.map(filter =>(
          <TouchableOpacity  activeOpacity={0.7} onPress={()=> changeDataset(filter) } style={tw ` ${selectedId === filter.id? `bg-[${Colors.greenColor}]` : "bg-[#dedede]"} w-20 ml-2 flex justify-center items-center h-8 rounded-full`} >
            <Text style={tw `${selectedId === filter.id? "text-white" : "text-black"}`} >{filter.title}</Text>
            
          </TouchableOpacity>
        )) }
      </ScrollView>
      </View>
      {/* Your Stock */}
      <View style={tw `h-18 flex items-center p-2 justify-between flex-row mt-4 bg-[${Colors.TextInputBackgroundColor}]`}>
        <Text>Your Stock</Text>
        <View style={tw `w-50 px-2 flex flex-row justify-between  h-18`} >
          <View style={tw `flex py-2 h-18 items-center justify-between`}>
            <Text>Quantity (MT)</Text>
            { isLoading? <Text>...</Text> : <Text>{tickerDATA.userTicker !== null ? tickerDATA.userTicker.qty : "0" }</Text> }
            
          </View>
          <View style={tw `flex py-2 h-18 items-center justify-between`}>
            <Text>Bags </Text>
            <Text>{ isLoading ? "..." : tickerDATA.userTicker !== null ? tickerDATA.userTicker.qty*20 : "0" }</Text>
          </View>
        </View>
        </View>
        
        {/* Infotmation on Commodity */}
        <View style={tw `h-40 flex  p-2   mt-4 bg-[${Colors.TextInputBackgroundColor}]`}>
          {/* Colums */}
          <View style={tw `flex flex-row h-8 w-full justify-between items-center px-4`}>
          <Text style={tw `font-bold`}>Commodity Information</Text>
          <Text style={tw `font-bold`}>Symbol</Text>
          </View>
          {/* Warehouse */}
          <View style={tw `flex flex-row h-8 w-full justify-between items-center px-4`}>
          <View style={tw `flex`}>
            <Text style={tw `text-gray-400 font-bold`}>Country of Origin</Text>
            <Text style={tw `text-gray-700 font-bold`}>{isLoading ? "..." : tickerDATA?.ticker.country.countryName }</Text>
          </View>
          <Text style={tw `font-bold`}>{isLoading ? "..." : tickerDATA?.ticker.country.countrySymbol }</Text>
          </View>
          {/* WarehouseLocation */}
          <View style={tw `flex flex-row mt-2 h-8 w-full justify-between items-center px-4`}>
          <View style={tw `flex`}>
            <Text style={tw `text-gray-400  font-bold`}>Warehouse Location</Text>
            <Text style={tw `text-gray-700 font-bold`}>{isLoading ? "..." : tickerDATA?.ticker.warehouse.warehouseLocation }</Text>
          </View>
          <Text style={tw `font-bold`}>{isLoading ? "..." : tickerDATA.ticker.warehouse.warehouseSymbol }</Text>
          </View>
          {/* Grade */}
          <View style={tw `flex flex-row mt-2 h-8 w-full justify-between items-center px-4`}>
          <View style={tw `flex`}>
            <Text style={tw `text-gray-400  font-bold`}>Grade</Text>
            <Text style={tw `text-gray-700 font-bold`}>{isLoading ? "..." : tickerDATA?.ticker.grade.gradeValue }</Text>
          </View>
          
          </View>
        </View>
        {/* View Contract */}
        <TouchableOpacity  onPress={()=> pickImage()}  style={ tw `bg-[#455154] h-14 mt-6 flex flex-row justify-center items-center rounded-lg w-70 self-center`} >
    <Icon  type='ionicon' name='receipt' color="white" />
        <Text style={tw `capitalize text-white text-xl font-semibold ml-3`} >View Contract</Text>
      </TouchableOpacity>

      {/* News */}
      <Text style={tw `text-lg ml-3 font-bold `}>News</Text>
      {  isLoading ?<Text>...</Text> : tickerDATA?.articles.length !== 0 &&  tickerDATA?.articles.map(article => ( <View style={tw `flex bg-[${Colors.TextInputBackgroundColor}] mb-9 self-center w-80 min-h-20 rounded-lg p-3`}>
        <Text style={tw `font-semibold`}>{article.title}</Text>
        <Text style={tw `text-gray-500 my-2 self-end`}>{moment(article?.createdAt).format('DD MMM YYYY')}</Text>
      </View>) )  }
     
      </ScrollView>
      {/* Booutton */}
        <View style={tw `bottom-0 h-22 flex items-center justify-center flex-row bg-white absolute w-full`}>
      <TouchableOpacity  onPress={()=> props.navigation.navigate("tradeTicker",{ orderCategory : "buy",tickerDATA  })}  style={ tw `bg-[${Colors.greenColor}] h-12 mt-6 flex flex-row justify-center items-center rounded-lg w-40 self-center`} >
    
        <Text style={tw `capitalize text-white text-lg font-semibold ml-3`} >BUY</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=> props.navigation.navigate("tradeTicker",{ orderCategory : "sell",tickerDATA  })}  style={ tw `bg-[${Colors.redColor}] h-12 ml-4 mt-6 flex flex-row justify-center items-center rounded-lg w-40 self-center`} >
    
        <Text style={tw `capitalize text-white text-lg font-semibold ml-3`} >SELL</Text>
      </TouchableOpacity>
      </View>
      
      <Loader isLoading={isLoading} /> 
      {/* Alert Modal */}
      <Overlay overlayStyle={tw `border-0 border-red-500 bg-white rounded-lg` }   isVisible={alertModalStatus} >
          <View style={tw `h-40 w-80 bg-white flex p-4`}>
            <Text>Enter your price alert</Text>
            <View  style={tw `h-10 bg-gray-100 mt-5 flex-row items-center flex px-3 justify-between rounded-lg w-full`}>
       <TextInput style={tw`flex-1`} keyboardType="number-pad" />
      </View>
      <TouchableOpacity onPress={()=> saveAlert()} style={tw `self-end h-12 w-27 flex bg-[${Colors.greenColor}] mt-2 rounded-xl justify-center items-center`}>
        <Text style={tw `text-white`}>save the alert</Text>
      </TouchableOpacity>
          </View>
    </Overlay>
    </View>
  )
}

export default SingleTickerScreen