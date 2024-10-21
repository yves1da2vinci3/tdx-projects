import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import Colors from '../../Constants/Colors'
import tw from 'twrnc'
import {httpClient} from '../../apis/Api'
import Loader from '../../Components/Loader'
import { useToast } from 'react-native-toast-notifications'
const SearchScreen = (props) => {
  const Toast = useToast()
  const [searchText, setSearchText] = useState('')

  const [isVisible,setisVisible] = useState(false)
  const [Commodities,setCommdities] = useState([])

  const fetchCommodities =  async() => { 
    try {
      const  {data} = await httpClient.get("/api/utils/commodities")
      setCommdities(data)
    } catch (error) {
      console.log(error)
      setisVisible(false)
    }
   }
   useFocusEffect(
    React.useCallback(()=>{
       fetchCommodities()
    },[])
   )
  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({title : 'Choose Commodity',  headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
      ,      })
      },[])

      const getSearchedTicker = async () => {

        if (searchText !== '') {
            let dataJson = {
                searchText
            }
            try {
                const {data} = await httpClient.post('/api/tickers/byName',dataJson)
                props.navigation.navigate("SearchResults", {allData:data,searchText : searchText })
            } catch (error) {
              Toast.show(`No results Found`, {
                type: "custom",
                dangerColor :`${Colors.redColor}`,
                placement: "bottom",
                duration: 4000,
                offset: 60,
                animationType: "slide-in",
              })
            }
            
        }
               
    }
  return (
    <View style={tw `flex-1 bg-white p-3`}>
    <TouchableOpacity  style={tw `h-15 bg-gray-100 mt-2  mb-5 flex-row items-center flex px-3 justify-between rounded-full w-full`}>
      <Icon type='ionicon' color={`${Colors.darkGreen}`}  name='search' style={tw `mr-2 text-white`} />
       <TextInput style={tw`flex-1`}   onChangeText={text => setSearchText(text)}
                        onSubmitEditing={() => getSearchedTicker()}  placeholder="Enter a ticker Name" />
      </TouchableOpacity>

      {/* List of Commodity */}
      {Commodities.map(Commodity => (<TouchableOpacity onPress={()=> props.navigation.navigate("searchNext",{ Commodity :  Commodity })} style={tw `flex mt-3 items-center flex-row`}>
                <Image  style={tw `h-12 w-12 rounded-full`} source={{ uri : Commodity.commodityUrl }} />
                <Text style={tw `text-lg ml-2 font-semibold`}>{Commodity.commodityName}</Text>
                </TouchableOpacity>))}
     

      <Loader isLoading={isVisible} />
    </View>
  )
}

export default SearchScreen