import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../Constants/Colors'
import { LineChart } from 'react-native-chart-kit'
import tw from 'twrnc'
import ticker from '../data.js'
import { wp } from '../helpers/Responsiveness'
import { Icon } from '@rneui/base'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import pricePercentage from '../helpers/pricePercentage'
import priceVariation from '../helpers/priceVariationValue'
import { useContext } from 'react'
import { HomeContext } from '../Contexts/HomeContext'
  
const AlertItem = ({alert,setmodifyAlertModal,setdeleteModal,setAlert}) => {
  const {currency} = useContext(HomeContext)
  // handle Modify 
const handleModify = () => { 
  setAlert(alert)
  setmodifyAlertModal(true)
 }
  // handle Delete
  const handleDelete = () => { 
    setAlert(alert)
    setdeleteModal(true)
   }
  return (
    <View>
        <Menu style={tw `self-end `}>
      <MenuTrigger  >
      <Icon  type='ionicon' name='ellipsis-horizontal' style={tw `self-end`} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption  style={tw `flex flex-row items-center h-10 `} onSelect={() => handleModify()} >
            <Icon  style={tw `ml-1`} color={`${Colors.blueAccent}`} type='ionicon' name='pencil' />
          <Text style={tw `ml-1`} >Modifier</Text>
        </MenuOption>
        <MenuOption style={tw `flex flex-row items-center h-10 `} onSelect={() => handleDelete() } >
            <Icon  style={tw `ml-1`} color={`${Colors.redColor}`} type='ionicon' name='trash-outline' />
          <Text style={tw `ml-1`} >Delete</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
    
    
    <View style={tw `flex-row h-20 border-b-2 border-gray-300 `}>
    <View style={tw`flex w-40 justify-between `}>
        <Text>{alert.ticker.title}</Text>
        <View style={tw `flex  flex-row items-center`} >
        <Text style={tw `font-semibold`}> price :</Text>
        <Text style={tw `font-bold text-[${Colors.greenColor}]`}> { alert.price} (GH£)</Text>

        </View>
    </View>
    {/* Chart */}
    <View style={tw `flex-1 pl-2 items-center  flex-row justify-end `}>
    <LineChart
                                    data={{
                                      datasets: [
                                        {
                                            data: alert.ticker?.prices.map((item) => {
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
                                        color: (opacity = 1) => pricePercentage(ticker?.prices) >  -0.1  ? Colors.greenColor : Colors.redColor,
                                        propsForDots: { r: "0" },
                                        propsForBackgroundLines: { stroke: "#CCCCCC33" }
                                    }}
                                    bezier
                                    style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: -15 }] }}
                                />
    </View>
    {/* Others Informations */}
    <View style={tw`flex justify-between p-1 items-end  w-24`}>
        <Text style={tw `font-bold text-[${ (alert.ticker?.prices[alert.ticker?.prices.length-1].priceValue -alert.ticker?.prices[alert.ticker?.prices.length-2].priceValue)   >= 0 ?Colors.greenColor : Colors.redColor}]`}> {parseFloat(alert.ticker?.prices[alert.ticker?.prices.length-1].priceValue * currency.currencyRate).toFixed(1)} </Text>
        <Text style={tw `font-bold text-[${ pricePercentage(alert.ticker?.prices) >= 0 ? Colors.greenColor : Colors.redColor}]`}> {"" + (pricePercentage(alert.ticker?.prices)) + " %"}</Text>
        <Text style={tw `font-bold italic text-[${Colors.blueAccent}]`}>{priceVariation(alert.ticker?.prices)}</Text>
    </View>
  </View>
  </View>
  )
}

export default AlertItem