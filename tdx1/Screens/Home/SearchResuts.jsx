import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'

import tw from 'twrnc'
import Colors from '../../Constants/Colors'
import { hp, wp } from '../../helpers/Responsiveness'
import { LineChart } from 'react-native-chart-kit'
import priceVariation from '../../helpers/priceVariationValue'
import pricePercentage from '../../helpers/pricePercentage'
import { HomeContext } from '../../Contexts/HomeContext'
const SearchResuts = (props) => {
  const {currency} = useContext(HomeContext)
  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({  title : "",  headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'   />
      ,    headerRight: ()=>       <Icon onPress={()=> navigation.navigate("market") } size={30} type="ionicon" name='close-outline'   />
       })
      },[])
  return (
    <View style={tw `flex-1 bg-white p-2`}>

      <View style={tw `flex flex-row items-center h-20 `}>
      <Text style={tw `text-lg`}>Search Results : </Text>
      <Text style={tw ` font-semibold text-[${Colors.greenColor}]`}>{props.route?.params?.searchText} </Text>
      </View>

      <View style={tw `mt-4 bg-[${Colors.TextInputBackgroundColor}] flex-1 p-2`}>
        <Text style={tw `font-semibold mt-2  self-end`}>Price/MT</Text>

        {/* Ticker */}
        <ScrollView style={tw `flex-1 `} showsHorizontalScrollIndicator={false} >
        {props.route?.params?.allData.map(ticker =>(<TouchableOpacity key={ticker.id} onPress={()=> navigation.navigate("singleTicker",{ ticker : ticker})} style={tw`h-20  flex-row mt-1  `}>
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
        <Text style={tw `font-bold text-[${ (ticker?.prices[ticker?.prices.length-1].priceValue -ticker?.prices[ticker?.prices.length-2].priceValue)   >= 0 ?Colors.greenColor : Colors.redColor}]`}> {parseFloat(ticker?.prices[ticker?.prices.length-1].priceValue * currency.currencyRate).toFixed(1)} </Text>
        <Text style={tw `font-bold text-[${ pricePercentage(ticker?.prices) >= 0 ? Colors.greenColor : Colors.redColor}]`}> {"" + (pricePercentage(ticker?.prices)) + " %"}</Text>
        <Text style={tw `font-bold italic text-[${Colors.blueAccent}]`}>{priceVariation(ticker?.prices)}</Text>
    </View>
                
              </TouchableOpacity>))}
      
        </ScrollView>
      </View>
      
    </View>
  )
}

export default SearchResuts