import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../Constants/Colors'
import ticker from '../data'
import tw from 'twrnc'
import { LineChart } from 'react-native-chart-kit'
import { wp } from '../helpers/Responsiveness'
import pricePercentage from '../helpers/pricePercentage'
import priceVariation from '../helpers/priceVariationValue'
import { useContext } from 'react'
import { HomeContext } from '../Contexts/HomeContext'
const UserCommdityTicker = ({ UserCommdityTicker}) => {
  // console.log(UserCommdityTicker)
  const {currency} = useContext(HomeContext)
  return (
    <View style={tw `min-h-50 bg-[${Colors.TextInputBackgroundColor}] mt-3 p-2`}>
              <View style={tw `h-10 flex flex-row items-center w-48 `}>
                <Image  style={tw `h-10 w-10 rounded-full`} source={{ uri :UserCommdityTicker.commodityUrl }} />
                <Text style={tw `text-lg ml-2 font-semibold`}>{UserCommdityTicker.commodityName}</Text>
              </View>
              {/* Column */}
              <View style={tw`  flex-row mt-1 `}>
                <View style={tw `flex-1  h-7`}>
                  <Text style={tw `text-center`}>Ticker</Text>
                </View>
                <View style={tw `flex-1  h-7`}>
                <Text style={tw `text-center text-[3] `}>Quantity (MT)</Text>
                </View>
                <View style={tw `flex-1  h-7`}></View>
                <View style={tw `flex-1  h-7`}>
                <Text style={tw `text-center`}>GH£ (value)</Text>
                </View>
              </View>
              {/* Rows */}
              { UserCommdityTicker.tickers.map(userTicker => (
   <View style={tw`h-20  flex-row mt-1 `}>
   <View style={tw `flex-1 justify-center  h-full`}>
     <Text style={tw `text-center`}>{userTicker.ticker.title}</Text>
   </View>
   <View style={tw `flex-1 justify-center  h-full`}>
   <Text style={tw `text-center`}>{userTicker.qty}</Text>
   </View>
   <View style={tw `flex-1  h-full`}>
   <LineChart
                       data={{
                         datasets: [
                           {
                               data: userTicker.ticker?.prices.map((item) => {
                                   return (
                                       parseInt(item.priceValue)
                                   )
                               })
                           }
                       ]
                       }}
                       width={wp(30)} // from react-native
                       height={wp(11)}
                       withHorizontalLabels={false}
                       flatColor={true}
                       chartConfig={{
                           backgroundGradientFromOpacity: 0,
                           backgroundGradientToOpacity: 0,
                           color: (opacity = 1) => pricePercentage(userTicker.ticker?.prices) >  -0.1  ? Colors.greenColor : Colors.redColor,
                           propsForDots: { r: "0" },
                           propsForBackgroundLines: { stroke: "#CCCCCC33" }
                       }}
                       bezier
                       style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: -15 }] }}
                   />
   </View>
 
<View style={tw`flex justify-between p-1 items-end  w-20`}>
        <Text style={tw `font-bold text-[${ (userTicker.ticker?.prices[userTicker.ticker?.prices.length-1].priceValue -userTicker.ticker?.prices[userTicker.ticker?.prices.length-2].priceValue)   >= 0 ?Colors.greenColor : Colors.redColor}]`}> {parseFloat(userTicker.ticker?.prices[userTicker.ticker?.prices.length-1].priceValue * currency.currencyRate).toFixed(1)} </Text>
        <Text style={tw `font-bold text-[${ pricePercentage(userTicker.ticker?.prices) >= 0 ? Colors.greenColor : Colors.redColor}]`}> {"" + (pricePercentage(userTicker.ticker?.prices)) + " %"}</Text>
        <Text style={tw `font-bold italic text-[${Colors.blueAccent}]`}>{priceVariation(userTicker.ticker?.prices)}</Text>
    </View>
   
 </View>
              )) }
             <View style={tw`  flex-col flex mt-1  `}>
             <View style={{ backgroundColor: "#D8D8D8", height: 1.5, width: "60%", alignSelf: "center", marginVertical: 18 }} />
                <View style={tw `flex flex-row items-center`}>

               
                <View style={tw `flex-1  h-7`}>
                  <Text style={tw `text-center`}>Total</Text>
                </View>
                <View style={tw `flex-1  h-7`}>
                <Text style={tw `text-center ml-5`}>{UserCommdityTicker.tickers.reduce((previousQty,currentTicker)=> previousQty + currentTicker.qty,0)}</Text>
                </View>
                <View style={tw `flex-1  h-7`}></View>
                <View style={tw `w-[30]  h-full `}>
                <Text style={tw `text-center font-semibold text-[2.5]` }>({currency.label}) {UserCommdityTicker.tickers.reduce((previousValue,currentTicker)=> previousValue + (currentTicker.ticker.prices[currentTicker.ticker.prices.length-1].priceValue * currency.currencyRate)*currentTicker.qty ,0).toFixed(2)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  </Text>
                {/* <Text m style={ tw `text-center font-semibold md:text-[1] text-sm`}>({currency.label}) 123456789023564.000  </Text> */}
                </View>
                </View>
              </View>
            </View>
  )
}

export default UserCommdityTicker