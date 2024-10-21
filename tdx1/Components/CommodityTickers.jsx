import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../Constants/Colors'
import tw from 'twrnc'
import { LineChart } from 'react-native-chart-kit'
import { hp, wp } from '../helpers/Responsiveness'
import pricePercentage from '../helpers/pricePercentage'
import priceVariation from '../helpers/priceVariationValue'
import {HomeContext} from '../Contexts/HomeContext'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import { useState } from 'react'
import { useEffect } from 'react'
const CommodityTickers = ({CommodityTicker}) => {
    const { currency } = useContext(HomeContext)
    const navigation = useNavigation()
    const [expanded,setExpanded] = useState(false)


    // test if the are expandatation

    useEffect(()=>{
      const expansionValue = CommodityTicker.tickers.length > 2
      setExpanded(expansionValue)
    },[])

    const toggleExpansion = () => { 
      setExpanded(!expanded)
     }
  return (
    <View style={tw `h-auto bg-[#F5F5F5] mt-3 p-2`}>
              <View style={tw `h-10 justify-between flex flex-row items-center w-full `}>

                <View style={tw `flex items-center flex-row`}>
                <Image  style={tw `h-12 w-12 rounded-full`} source={{ uri : CommodityTicker.commodityUrl }} />
                <Text style={tw `text-lg ml-2 font-semibold`}>{CommodityTicker.commodityName}</Text>
                </View>
              <Text style={tw `font-bold`}>{currency.label}/MT</Text>
              </View>
             {CommodityTicker.tickers.slice(0,expanded ? 2 : CommodityTicker.tickers.length ).map((ticker,index) => (<TouchableOpacity key={ticker.id} onPress={()=> navigation.navigate("singleTicker",{ ticker : ticker})} style={tw`h-20  ${CommodityTicker.tickers.length -1 === index ? "border-b-2 border-gray-500" : ""} flex-row mt-1  `}>
                <View style={tw `flex-1 justify-center  h-full`}>
                  <Text style={tw `text-left`}>{ticker.title}</Text>
                </View>
                
                <View style={tw `flex-1 items-center flex flex-row  h-full`}>
                <LineChart
                                    data={{
                                      datasets: [
                                        {
                                            data: ticker?.prices.map((item) => {
                                                return (
                                                    parseInt(item.priceValue)
                                                )
                                            })
                                        }
                                    ]
                                    }}
                                    width={wp(30)} // from react-native
                                    height={hp(11)}
                                    withHorizontalLabels={false}
                                    flatColor={true}
                                    chartConfig={{
                                        backgroundGradientFromOpacity: 0,
                                        backgroundGradientToOpacity: 0,
                                        color: (opacity = 1) => pricePercentage(ticker?.prices) >  -0.1  ? Colors.greenColor : Colors.redColor,
                                        propsForDots: { r: "0" },
                                        propsForBackgroundLines: { stroke: "#CCCCCC33" }
                                    }}
                                    bezier
                                    style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: -15 }] }}
                                />
                </View>
                <View style={tw`flex justify-between p-1 items-end  w-20`}>
        <Text style={tw `font-bold text-[${  pricePercentage(ticker?.prices) >= 0  ?Colors.greenColor : Colors.redColor}]`}> {parseFloat(ticker?.prices[ticker?.prices.length-1].priceValue * currency.currencyRate).toFixed(1)} </Text>
        <Text style={tw `font-bold text-[${ pricePercentage(ticker?.prices) >= 0 ? Colors.greenColor : Colors.redColor}]`}> {"" + (pricePercentage(ticker?.prices)) + " %"}</Text>
        <Text style={tw `font-bold italic text-[${Colors.blueAccent}]`}>{priceVariation(ticker?.prices)}</Text>
    </View>
                
              </TouchableOpacity>)) }
              {/* Expanded */}

              {  CommodityTicker.tickers.length >2 &&  <Icon onPress={()=> toggleExpansion()} type='ionicon' name='ellipsis-horizontal' style={tw `self-start ml-2`} /> }
              
             

              
            </View>
  )
}

export default CommodityTickers