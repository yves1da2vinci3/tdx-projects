import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twrnc'
import HistoryOrderItem from '../../../Components/HistoryOrderItem'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { httpClient } from '../../../apis/Api'
import { AuthContext } from '../../../Contexts/AuthContext'
import bubbleSort from '../../../algorithms/BubbleSort'
import Loader from '../../../Components/Loader'
import FormatDate from '../../../helpers/formatDateFromDb'
import {wp } from '../../../helpers/Responsiveness'
import { ParentOrderStatusVariables } from '../../../Constants/StatusVariables'
import Colors from '../../../Constants/Colors'
import getInitial from '../../../helpers/GetInitial'
import { Icon } from '@rneui/base'
const OrderList = (props) => {
  const {user} = useContext(AuthContext)
  const [Orders,setOrders] = useState([]) 
  const [isVisible,setIsVisible] = useState(true) 
  const navigation = useNavigation()
  useEffect(()=>{
    navigation.setOptions({title : 'My orders',headerLeft: ()=>       <Icon onPress={()=> navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
    ,      })
    },[])
  const fetchOpenOrders = async() => { 
    try {
      setIsVisible(true)
      const { data} = await httpClient.get(`/api/users/${user.id}/orders`) 
      const arraysOfOrders =  data.basicOrders.concat(data.advancedOrders)
      const firstTimeSortArray = bubbleSort(arraysOfOrders)
      setOrders(firstTimeSortArray.reverse())
    setIsVisible(false)
    } catch (error) {
    setIsVisible(false)
      console.log(error)
    }
   }
  useFocusEffect(
    React.useCallback(() => {
      fetchOpenOrders()
    }, [])

  )
 
   const [selectedId,setSelectedId] = useState(1)
  const types =  [
    {
      id :1 ,
      title : "Open"
    },
    {
      id :2 ,
      title : "History"
    }
  ]

  function OrderItem ({item}) {

    return  <TouchableOpacity onPress={()=> props.navigation.navigate("singleOrder",{ order :  item})} style={tw `w-full h-18  flex items-center flex-row `}>
    {/* Columns */}
    <View style={tw `justify-center flex-1 items-center `}>
      <Text style={tw `text-black text-[0.8rem] `}>{ FormatDate(item?.createdAt)}</Text>
    </View>
    <View style={tw `justify-center flex-1 items-center `}>
      <View style={tw `items-center`}>
      <Text style={tw `text-black text-sm  text-[0.6rem] font-bold `}>{item.tickerId ? getInitial(item.ticker.commodity.commodityName) : getInitial(item.commoditType.commodity.commodityName)   }</Text>
      <Text style={tw `text-gray-500 text-[0.6rem] text-center  `}>{item.tickerId ? item.ticker.commodity.commodityName : item.commoditType.commodity.commodityName   }</Text>
      </View>
      
    </View>
    <View style={tw `justify-center flex-1 items-center `}>
    <Text style={tw ` `}>{`${item?.commodityTypeId ? "Market" : item?.orderType ===1 ? "Market" : "Limit" }/${item.orderCategory ===1 ? "Buy" : "Sell"}`} </Text>

    </View>
    <View style={tw `justify-center flex-1 items-center `}>
      <Text style={tw `text-black `}>{item.qty}</Text>
    </View>
    <View style={tw `justify-center flex-1 items-center `}>
    <Text style={tw `${ item.status ===ParentOrderStatusVariables.pending ? `text-[${Colors.yellowColor}]` : item.status ===ParentOrderStatusVariables.completed ?  `text-[${Colors.greenColor}]` : item.status ===ParentOrderStatusVariables.canceled? "text-red-500" : item.status ===ParentOrderStatusVariables.placed ? "text-pink-400" : item.status ===ParentOrderStatusVariables.partial ? "text-green-700" : 'text-red-700' } font-semibold `}>{item.status ===ParentOrderStatusVariables.pending  ? "pending" : item.status ===ParentOrderStatusVariables.completed  ?  "completed" : item.status ===ParentOrderStatusVariables.canceled  ? "canceled" : item.status ===ParentOrderStatusVariables.placed ? "placed" :item.status ===ParentOrderStatusVariables.partial ? "partial" : "declined" }</Text>

    </View>
    
   </TouchableOpacity>
  }
  return (
    <View showsVerticalScrollIndicator={false} style={ tw `flex-1 bg-white`}>
      {/* First Header */}
      <View style={tw `h-17  justify-center flex flex-row items-center` }>
          { types.map(type => (<TouchableOpacity onPress={()=> setSelectedId(type.id)} style={tw `h-13 p-2 mx-2 w-34 rounded-xl justify-center items-center ${type.id === selectedId ? "bg-[#979797]" : "bg-gray-200"}`}  > 
          <Text style={tw `text-white font-semibold`}>{type.title}</Text>
           </TouchableOpacity>)) }
      </View>
      {/* Header */}
     <View style={tw `w-full h-10 bg-[#979797] flex items-center flex-row `}>
      {/* Columns */}
      <View style={tw `justify-center flex-1 items-center `}>
        <Text style={tw `text-white `}>Date</Text>
      </View>
      <View style={tw `justify-center flex-1 items-center `}>
        <Text style={tw `text-white `}>Commodity</Text>
      </View>
      <View style={tw `justify-center flex-1 items-center `}>
        <Text style={tw `text-white `}>OrderType</Text>
      </View>
      <View style={tw `justify-center flex-1 items-center `}>
        <Text style={tw `text-white `}>Quantity</Text>
      </View>
      <View style={tw `justify-center flex-1 items-center `}>
        <Text style={tw `text-white `}>Status</Text>
      </View>
      
     </View>
   {/* Real Row */}
  <FlatList 
   extraData={[]}
   keyExtractor={(item, index) => index.toString()}
   style={{ marginTop: wp(2) }}
   contentContainerStyle={{}}
   showsVerticalScrollIndicator={false}
   data={selectedId === 1 ? Orders.length >0? Orders.filter( order => order.status !==3) : [] : Orders.filter( order => order.status ===3)} 
   renderItem={OrderItem}
   />
   
                 
    <Loader  isLoading={isVisible}/>
        </View>
  )
}

export default OrderList

// { OpenOrders.length === 0 ? <View style={tw`flex-1 bg-white  h-200 flex justify-center items-center`}>
// <Text style={tw `font-semibold`}> Nothing found</Text>
// </View> : OpenOrders.map((openOrder)=> ( <HistoryOrderItem order={openOrder} />)) }