import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MarketScreen from '../../Screens/Home/MarketScreen'
import SingleTickerScreen from '../../Screens/Home/SingleTickerScreen'
import TradeTicker from '../../Screens/Home/TradeTicker'
import SearchScreen from '../../Screens/Home/SearchScreen'
import SearchOneSpecifyCommodity from '../../Screens/Home/SearchNext'
import SearchResults from '../../Screens/Home/SearchResuts'
const HomeStack = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown : false }} name='market' component={MarketScreen} />
        <Stack.Screen options={{ headerShown : true }} name='singleTicker' component={SingleTickerScreen} />
        <Stack.Screen options={{ headerShown : true }} name='tradeTicker' component={TradeTicker} />
        <Stack.Screen options={{ headerShown : true }} name='searchCommodity' component={SearchScreen} />
        <Stack.Screen options={{ headerShown : true }} name='searchNext' component={SearchOneSpecifyCommodity} />
        <Stack.Screen options={{ headerShown : true }} name='searchResults' component={SearchResults} />
    </Stack.Navigator>
  )
}

export default HomeStack