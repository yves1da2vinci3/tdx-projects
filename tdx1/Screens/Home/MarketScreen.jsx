import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import tdxLogo from '../../assets/Images/Logo.png'
import drawerIcon from '../../assets/Icons/drawerIcon.png'
import { Icon, Overlay } from '@rneui/base'
import Colors from '../../Constants/Colors'
import { wp } from '../../helpers/Responsiveness'
import ticker from '../../data'
import { LineChart } from 'react-native-chart-kit'
import { httpClient } from '../../apis/Api'
import { useFocusEffect } from '@react-navigation/native'
import Loader from '../../Components/Loader'
import CommodityTickers from '../../Components/CommodityTickers'
import ModalDropdown from 'react-native-modal-dropdown';
import { useContext } from 'react'
import { HomeContext } from '../../Contexts/HomeContext'
import MarketDarkIcon from '../../assets/Icons/marketDark.png'
import filterIcon from '../../assets/Icons/homeFilter.png'
const MarketScreen = (props) => {
  const [isLoading,setIsLoading] = useState(false)
  const { watchList } = useContext(HomeContext)
// FetchCommdoties
const [commodotiesTickers,setCommoditiesTickers] = useState([])
const [CommoditiesTickersBackUp, setCommoditiesTickersBackUp] = useState([])
const [warehouse,setWarehouses] = useState([])
const [commodities,setCommodities] = useState([])
const [GradeDropDownValue,setGradeDropdownValue] = useState("1")
const [commodityDropDownValue,setcommodityDropDownValue] = useState("1")
const [warehouseDropDownValue,setwarehouseDropDownValue] = useState("1")

const fetchCommdoities =  async() => { 
  setIsLoading(true)
  try {
     const {data} = await httpClient.get("/api/tickers/users")
     console.log(data.commoditiesTickers)
     setCommoditiesTickers(data.commoditiesTickers)
     setCommoditiesTickersBackUp(data.commoditiesTickers)
     setWarehouses(data.warehouses)
     setCommodities(data.commodities)
     setIsLoading(false)
  } catch (error) {
    setIsLoading(false)
    console.log(error)
  }
 }

 useFocusEffect(
  React.useCallback(() => {
    fetchCommdoities()
  }, [])
)
//  useEffect(()=>{
//     fetchCommdoities()
//  },[])
  // Control modal
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  // FilterOptions
  const FilerOps = [
    {
      id : 1,
      title : "Grade"
    },
    {
      id : 2,
      title : "Commodity"
    },
    {
      id : 3,
      title : "Warehouse"
    },
  ]

  const [selectedFilterId,SetselectedFilterId] = useState(1)

 const applyFilter = () => { 
  setVisible(false)
  if(selectedFilterId ===1){
filterByGrade()
  }else if(selectedFilterId === 2){
  filterByCommodity()
  }else{
    filterByWarehouse()
  }
  }

  // Visisbility options
  const [ visiblitySelectedId,setvisiblitySelectedId ] = useState(1)
  const visibiltyOptions = [
    {
      id : 1,
      title :"All"
    },
    {
      id : 2,
      title :"eye"
    },
  
  ]
  
  //  Filter Function
  const filterByWatchList = () => { 
    // have a copy of the array
    let commodotiesArray=  JSON.parse(JSON.stringify(CommoditiesTickersBackUp))  
    // apply filter on it
    for(var index =0;index<commodotiesArray.length;index++){
        const newTickersArray = commodotiesArray[index].tickers.filter(ticker => watchList.includes(ticker.id) )
        commodotiesArray[index].tickers = newTickersArray
    }
    
    // console.log(commodotiesArray)
    setCommoditiesTickers(commodotiesArray)
 }

 const filterByCommodity = () => { 
    const commodityId = +commodityDropDownValue
    let commodotiesArray= JSON.parse(JSON.stringify(CommoditiesTickersBackUp))
    const  newCommodityTickers = commodotiesArray.filter(commodityTicker => commodityTicker.id === commodityId)
    setCommoditiesTickers(newCommodityTickers)
  }

  const filterByGrade = () => { 
     // have a copy of the array
     let commodotiesArray= JSON.parse(JSON.stringify(CommoditiesTickersBackUp))
     // apply filter on it
     const gradeId = +GradeDropDownValue
     for(var index =0;index<commodotiesArray.length;index++){
         const newTickersArray = commodotiesArray[index].tickers.filter(ticker => ticker.gradeId === gradeId )
         commodotiesArray[index].tickers = newTickersArray
     }
    //  console.log(commodotiesArray)
    setCommoditiesTickers(commodotiesArray)
   }
   const filterByWarehouse = () => { 
     // have a copy of the array
     let commodotiesArray= JSON.parse(JSON.stringify(CommoditiesTickersBackUp))
     const warehouseId = +warehouseDropDownValue
     // apply filter on it
     for(var index =0;index<commodotiesArray.length;index++){
         const newTickersArray = commodotiesArray[index].tickers.filter(ticker => ticker.warehouseId === warehouseId )
         commodotiesArray[index].tickers = newTickersArray
     }
    //  console.log(commodotiesArray)
    setCommoditiesTickers(commodotiesArray)
    }

    // WatchList Filter 
    useEffect(()=>{
    if(visiblitySelectedId ===1){
        fetchCommdoities()
    }else{
        filterByWatchList()
    }
    },[visiblitySelectedId])
  return (
    <View style={tw `pt-10  flex-1 bg-white`}>
      {/* Modal */}
      
      <Overlay overlayStyle={tw `border-0 border-red-500 bg-white rounded-lg` }   isVisible={visible} onBackdropPress={toggleOverlay}>
     <View style={tw`flex  p-3 min-h-70 w-90 bg-white`}>
      <Text style={tw `text-[${Colors.greenColor}] font-semibold text-lg`}>Filters</Text>
      <View style={tw `flex-row mb-2 items-center`}>
      { FilerOps.map( filter => (
            <TouchableOpacity onPress={()=> SetselectedFilterId(filter.id)} style={tw `h-12 w-max-46 flex mx-2 ${filter.id === selectedFilterId ? `bg-white border-2 border-[${Colors.greenColor}] ` : "bg-gray-300 " }  px-3 rounded-xl justify-center items-center`} >
              <Text >{filter.title}</Text>
            </TouchableOpacity>
          ))}
      </View>
         {/* Dropdown */}
       { selectedFilterId ===1 ?  <ModalDropdown options={ ["1","2","3","4","5"] } onSelect={(idx, DropDownItem) => setGradeDropdownValue(DropDownItem)} showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1  mt-2 border-b-2 border-gray-100 p-2`} >
        <Text style={tw `font-semibold`}>{option}</Text>
      </View>)} dropdownStyle={tw`min-h-24 w-70  border-2 border-gray-100  rounded-lg `}  style={ tw `h-20 bg-gray-100 text-lg justify-center rounded-xl p-2`}  textStyle={ { fontSize : 20 }}  
                      /> : selectedFilterId === 2 ? <ModalDropdown options={commodities?.map(commodity => commodity.commodityName)} onSelect={(idx, DropDownItem) => {
                        const  filteredArray = commodities.filter( commodity => commodity.commodityName === DropDownItem)
                        setcommodityDropDownValue(filteredArray[0].id)
                    }}  showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1  mt-2 border-b-2 border-gray-100 p-2`} >
                      <Text style={tw `font-semibold`}>{option}</Text>
                    </View>)} dropdownStyle={tw`min-h-24 w-70  border-2 border-gray-100  rounded-lg `}  style={ tw `h-20 bg-gray-100 text-lg justify-center rounded-xl p-2`} textStyle={ { fontSize : 20 }}  
                                    /> : <ModalDropdown showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1  mt-2 border-b-2 border-gray-100 p-2`} >
                                    <Text style={tw `font-semibold`}>{option}</Text>
                                  </View>)} dropdownStyle={tw`min-h-24 w-70  border-2 border-gray-100  rounded-lg `}  style={ tw `h-20 bg-gray-100 text-lg justify-center rounded-xl p-2`}   onSelect={(idx, DropDownItem) => {
                                                const  filteredArray = warehouse.filter( warehouse => warehouse.warehouseLocation === DropDownItem)
                                                setwarehouseDropDownValue(filteredArray[0].id)
                                            }} options={warehouse?.map(warehouse => warehouse.warehouseLocation)} textStyle={ { fontSize : 20 }}  
                                                  /> }
         
       {/* Boutton Apply */}
      <TouchableOpacity onPress={()=> applyFilter()} style={tw `self-end h-12 w-24 flex bg-[${Colors.greenColor}] mt-2 rounded-xl justify-center items-center`}>
        <Text style={tw `text-white`}>Apply</Text>
      </TouchableOpacity>

     </View>
    </Overlay>
      {/* Menu */}
     <View style={tw `h-15 px-3 flex-row justify-between items-center flex`}>
     <TouchableOpacity  onPress={()=> props.navigation.openDrawer()} >
     <Image style={tw `h-8 w-8`} source={drawerIcon} />
     </TouchableOpacity>
     <Image style={tw `h-10 w-10`} source={tdxLogo} />
     <TouchableOpacity  onPress={()=> props.navigation.navigate("searchCommodity")} >
     <Icon  type='ionicon' name='search' size={30} />
     </TouchableOpacity>
     </View>
     {/* Markets */}
     <View style={tw `h-15 px-3 flex flex-row items-center`}>
     <Image source={ MarketDarkIcon  } style={tw `h-6 w-6`} />
    
     <Text style={tw `font-bold ml-2`}>Markets</Text>
     </View>
     {/* Filter */}
      <View style={tw `h-15 px-3 flex flex-row justify-between items-center`}>
        <View style={tw `flex items-center flex-row`}>
          {
            visibiltyOptions.map(visibiltyOption => ( <TouchableOpacity onPress={()=> setvisiblitySelectedId(visibiltyOption.id)} style={tw `h-8 ${ visiblitySelectedId === visibiltyOption.id ? `bg-[${Colors.greenColor}]` :  "bg-gray-400"} mx-1 flex items-center rounded-full w-12 justify-center`}>
           { visibiltyOption.id !== 1 ? <Icon type='ionicon' name={visibiltyOption.title} color="white" /> :   <Text style={tw `text-white`}>{visibiltyOption.title}</Text> }
           
            </TouchableOpacity>))
          }
       
       
        </View>
        {/* Filter Button */}
        <TouchableOpacity  onPress={()=> toggleOverlay()} style={tw `h-8 ml-3 flex items-center rounded-full w-12 justify-center`}>
     <Image source={ filterIcon  } style={tw `h-6 w-6`} />
          
          </TouchableOpacity >
      </View>

      {/* Present Commodoties */}
      <ScrollView showsVerticalScrollIndicator={false} style={tw `flex-1 pb-5`}>
      { commodotiesTickers?.map( commodityTicker => (
        <CommodityTickers key={commodityTicker.id} CommodityTicker={commodityTicker} />
      )) }
      </ScrollView>
     

      <Loader isLoading={isLoading} />
    </View>
  )
}

export default MarketScreen

