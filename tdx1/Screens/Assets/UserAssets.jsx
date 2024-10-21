import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from  "twrnc"
import Colors from '../../Constants/Colors'
import tdxlogo from "../../assets/Images/Logo.png"
import DepositIcon from '../../assets/Icons/Deposit.png'
import WithdrawlIcon from '../../assets/Icons/Withdrawal.png'
import { LineChart } from 'react-native-chart-kit'
import ticker from '../../data.js'
import { wp } from '../../helpers/Responsiveness'
import { AuthContext } from '../../Contexts/AuthContext'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { HomeContext } from '../../Contexts/HomeContext'
import { httpClient } from '../../apis/Api'
import UserCommdityTicker from '../../Components/UserCommdityTicker'
import { Icon } from '@rneui/base'
const UserAssets = (props) => {
   const navigation = useNavigation()
   useEffect(()=>{
    navigation.setOptions({  title : "User Assets"
     })
    },[])
  const { user} = useContext(AuthContext)
  // console.log(user.id)
  const { currency} = useContext(HomeContext)
  
  const [isLoading,setIsLoading] = useState(false)
  // FetchCommdoties
  const [commodoties,setCommodities] = useState([])
  const [userTickers,setUserTickers] = useState([])
  const [userAssets,setUserAssets] = useState([])
  const [totalValue, setTotalValue] = useState('')
  const [totalAllQuantity, setTotalAllQuantity] = useState(0)
  const [userMoneyAccount,setUserMoneyAccount] = useState(0)
  const fetchUsersAssets =  async() => { 
    setIsLoading(true)
    try {
       const {data} = await httpClient.post("/api/users/assets",{ userId : user.id })
      //  console.log(data.commoditiesTickers)
      setUserMoneyAccount(data.user.moneyAccount)
      groupByFun(data.commodities,data.userTickers)
       setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
   }
  
   useFocusEffect(
    React.useCallback(() => {
      fetchUsersAssets()
    }, [])

  )

  // definition of the group function
   
  function groupByFun(Commodities,userTickers) {
    // assign commdities array to a new array due to immutabilityb od the array
   let newCommdities = Commodities.map(commodity => ({
    ...commodity,tickers : []
   }))


   for(var index =0; index < userTickers.length ;index++){
    // find the index of commodity where the ticker belongs to
    const commodityIndex = newCommdities.findIndex(commodity => commodity.id === userTickers[index].ticker.commodityId)
    // update the ticker to a parent commodity
    newCommdities[commodityIndex].tickers.push({ticker : userTickers[index].ticker,qty : userTickers[index].qty })
   }
    setUserAssets(newCommdities)

    // set total quantity and totalValue
    //* totalQTY
    setTotalAllQuantity( newCommdities.reduce(
        (previousValue,currentValue,index)=> 
            
         previousValue + currentValue.tickers.reduce((previousQty,currentTicker)=> previousQty + currentTicker.qty,0)
        ,0) 
        )
      //*  Total Value

      setTotalValue(newCommdities.reduce(
        (previousValue,currentValue)=> 
         previousValue + currentValue.tickers.reduce((previousValue,currentTicker)=> previousValue + currentTicker.ticker.prices[currentTicker.ticker.prices.length-1].priceValue *currentTicker.qty ,0)
        ,0) )

       // set user ticker ticker in the { title : "GSAWM1",qty : 2 }
       const UserTicker  = []
       for(var index =0; index < userTickers.length ;index++){
        const ticker = {title : userTickers[index].ticker.title, id : userTickers[index].ticker.id ,qty : userTickers[index].qty }
        UserTicker.push(ticker)
        // update the ticker to a parent commodity
       }
       setUserTickers(UserTicker)
       console.log(UserTicker)

}
  return (
    <View style={tw `pt-2 bg-white flex-1 relative`}>
      {/* Card */}
      <View style={tw `h-48 w-[95%] p-4 self-center rounded-lg bg-[${Colors.TextInputBackgroundColor}] `}>
        <View style={tw `flex flex-row items-center`}>
        <Text style={tw`text-xl text-[${Colors.yellowColor}] font-semibold`}>Cash Balance</Text>
        <Text style={tw` text-[${Colors.black}] ml-3 font-semibold`}>({currency.label})</Text>

        </View>
        <Text style={tw` text-xl  text-[${Colors.black}] mt-1 font-bold`}>{ isLoading ? "..." : (userMoneyAccount*currency.currencyRate)?.toFixed(2)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>


 {/* Actions */}
 <View style={tw ` flex-1 flex-row  items-center justify-center`}>
  {/* deposit */}
  <View>
  <TouchableOpacity onPress={()=> props.navigation.navigate("deposit")} style={tw `h-12 w-15 rounded-lg flex justify-center items-center bg-white mb-1`}>
    <Image source={DepositIcon} style={tw `h-6 w-6`} />
  </TouchableOpacity>
<Text>deposit</Text>
  </View>
  {/* withdrawal */}
  <View style={tw `ml-4 flex items-center `}>
  <TouchableOpacity onPress={()=> props.navigation.navigate("withdrawal",{userTickers})} style={tw `h-12 w-15  rounded-lg flex justify-center items-center bg-white mb-1`}>
    <Image  source={WithdrawlIcon} style={tw `h-6 w-6`}/>
  </TouchableOpacity>
<Text>withdrawal</Text>
  </View>
 </View>

 {/* Logo */}
 {/* <Image style={tw `h-18 w-18 absolute bottom-3 right-3 `} source={tdxlogo} /> */}
      
      </View>

      {/* Total */}
      <View style={tw `h-20 flex items-center p-2 justify-between flex-row mt-4 bg-[${Colors.TextInputBackgroundColor}]`}>
        <Text>Total Stock</Text>
        <View style={tw `w-50 px-2 flex flex-row justify-between  h-18`} >
          <View style={tw `flex py-2 h-18 items-center justify-between`}>
            <Text>Quantity (MT)</Text>
            <Text>{totalAllQuantity?.toFixed(2)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</Text>
          </View>
          <View style={tw `flex py-2 h-18 items-center justify-between`}>
            <Text>GH£ (value)</Text>
            <Text>{parseFloat(totalValue*currency.currencyRate).toFixed(2)}</Text>
          </View>
        </View>
        </View> 

<ScrollView showsVerticalScrollIndicator={false} style={tw `flex-1`} >
            {/* User Commodities   */}
            { userAssets?.map(commodityTicker => (
              <UserCommdityTicker  UserCommdityTicker={commodityTicker} />
            )) }
            </ScrollView>
    </View>
  )
}

export default UserAssets