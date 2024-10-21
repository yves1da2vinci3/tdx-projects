import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import ModalDropdown from 'react-native-modal-dropdown';
import tw from  "twrnc"
import Loader from '../../Components/Loader';
import { httpClient } from '../../apis/Api';
import { useToast } from 'react-native-toast-notifications';
import Colors from '../../Constants/Colors';
const SearchNext = (props) => {
  const Toast = useToast()
  const [isVisible,setisVisible] = useState(false)
  const [commoditiesTypesDropDown, setcommoditiesTypesDropDown] = useState('')
  const [warehouseDropDown, setwarehouseDropDown] = useState('')
  const [commoditiesTypes,setCommoditiesTypes] = useState([])
  const [Warehouses,setWarehouses] = useState([])
  const fetchSubInformationsForOneCommunicitation = async () => { 
  try {
    setisVisible(true)
    const {data} = await httpClient.get(`/api/utils/${props.route.params.Commodity.id}/commodityTypes`)
    setCommoditiesTypes(data.commodityTypes)
    setWarehouses(data.warehouses)
    setisVisible(false)
  } catch (error) {
  console.log(error)
  setisVisible(false)
  }
   }
   useFocusEffect(
    React.useCallback(()=>{
      fetchSubInformationsForOneCommunicitation()
    },[])
   )
   const [CommodityTypeDropdownStatus,setCommodityTypeDropdownStatus] = useState(false)
   const [warehouseDropdownStatus,setwarehouseDropdownStatus] = useState(false)
   const DisplayIcon = ({Status}) => {
    return (
      <View style={tw `flex-1  items-end `}>
        <Icon style={tw ``} type='ionicon' name={`caret-${Status? "up" : "down"}`}  />
         </View>
    )
  }
  //  search for tickers based 
  const getSearchedTicker = async () => {
    // console.log(commoditiesTypesDropDown)
    if (commoditiesTypesDropDown === '') {
    
      Toast.show(`please select a type`, {
        type: "custom",
        dangerColor :`${Colors.redColor}`,
        placement: "bottom",
        duration: 4000,
        offset: 60,
        animationType: "slide-in",
      })

    }else{
        try {
            const data = {
                warehouseId : Number( warehouseDropDown),
                commodityTypeId : Number(commoditiesTypesDropDown)
            }
            const reponse = await httpClient.post('/api/tickers/searchByCommoditiesTypesAndLocation',data)
            // console.log(reponse)
            if( reponse.data.length > 0 ) {
                const searchText = `${ commoditiesTypes.filter(commoditiesType => commoditiesType.id === commoditiesTypesDropDown)[0].commodityTypeName } in ${Warehouses.filter(warehouse => warehouse.id === warehouseDropDown )[0].warehouseLocation }  `
                props.navigation.navigate("searchResults", { allData: reponse.data ,searchText : searchText })

            }
                       
                    
        } catch (error) {
          Toast.show(`No Result Found`, {
            type: "custom",
            dangerColor :`${Colors.redColor}`,
            placement: "bottom",
            duration: 4000,
            offset: 60,
            animationType: "slide-in",
          })
          console.log(error)
        }
    }
}
  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({  title : "",  headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'   />
      ,    headerRight: ()=>       <Icon size={30} type="ionicon" name='close-outline'   />
       })
      },[])
      
  return (
    <View style={ tw `bg-white flex-1 p-3`}>
      {/* Commoditues Presentation */}
      <View style={tw `h-40  flex justify-center items-center `}>
      <Image  style={tw `h-28 w-28 rounded-full`} source={{ uri :  props.route.params.Commodity.commodityUrl }} />
      <Text style={tw `mt-2 text-xl`}>{props.route.params.Commodity.commodityName}</Text>
      </View>
      {/* Select Option */}
      <Text style={tw `font-semibold mt-6 md:mt-12 mb-2`}>Choose Commodity Type</Text>
      <ModalDropdown  options={commoditiesTypes?.map(commodityType => commodityType.commodityTypeName)} onSelect={(idx, DropDownItem) => {
                        const index = commoditiesTypes.findIndex(commodityType => commodityType.commodityTypeName ===DropDownItem )
                        setcommoditiesTypesDropDown(commoditiesTypes[index].id)
                    }} showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1  mt-2 border-b-2 border-gray-100 p-2 `} >
        <Text style={tw `font-semibold `}>{option}</Text>
      </View>)} onDropdownWillHide={()=> setCommodityTypeDropdownStatus(false)}  onDropdownWillShow={()=> setCommodityTypeDropdownStatus(true)} renderRightComponent={ ()=> <DisplayIcon Status={CommodityTypeDropdownStatus} /> } dropdownStyle={tw`min-h-24 w-70  border-2 border-gray-100  rounded-lg `}  style={ tw `h-15 bg-[#DEDEDE] text-lg justify-center rounded-xl p-2`}  textStyle={ { fontSize : 20 }}  
                      />

      {/* <ModalDropdown  showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1   p-2`} >
        <Text style={tw `font-semibold`}>{option}</Text>
      </View>)} dropdownStyle={tw`min-h-24 w-70  border-2 border-gray-100  rounded-lg `}  style={ tw `h-20 bg-gray-100 text-lg justify-center rounded-xl p-2`}  onSelect={(idx, DropDownItem) => {
                        const index = commoditiesTypes.findIndex(commodityType => commodityType.commodityTypeName ===DropDownItem )
                        setcommoditiesTypesDropDown(commoditiesTypes[index].id)
                    }} textStyle={ { fontSize : 20 }} options={commoditiesTypes?.map(commodityType => commodityType.commodityTypeName)}/> */}
      


      <Text style={tw `font-semibold mt-6 md:mt-12 mb-2`}>Choose Warehouse Location</Text>

      <ModalDropdown  options={Warehouses?.map(warehouse => warehouse.warehouseLocation) } onSelect={(idx, DropDownItem) => {
                        const index = Warehouses.findIndex(warehouse => warehouse.warehouseLocation === DropDownItem)
                        setwarehouseDropDown(Warehouses[index].id)
                    }} showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1  mt-2 border-b-2 border-gray-100 p-2 `} >
        <Text style={tw `font-semibold `}>{option}</Text>
      </View>)} onDropdownWillHide={()=> setwarehouseDropdownStatus(false)}  onDropdownWillShow={()=> setwarehouseDropdownStatus(true)} renderRightComponent={ ()=> <DisplayIcon Status={warehouseDropdownStatus} /> } dropdownStyle={tw`min-h-24 w-70  border-2 border-gray-100  rounded-lg `}  style={ tw `h-15 bg-[#DEDEDE] text-lg justify-center rounded-xl p-2`}  textStyle={ { fontSize : 20 }}  
                      />


      

{/* Searching Button */}
      <TouchableOpacity  onPress={()=> getSearchedTicker()}   style={ tw `bg-[#455154] h-14 mt-16 flex flex-row justify-center items-center rounded-lg w-full`} >
    <Icon  type='ionicon' name='search-outline' color="white" />
        <Text style={tw `capitalize text-white text-xl font-semibold ml-3`} >Search</Text>
      </TouchableOpacity>
      <Loader isLoading={isVisible} />

    </View>
  )
}

export default SearchNext