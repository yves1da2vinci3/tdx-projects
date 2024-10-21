import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Icon, Overlay } from '@rneui/base'

import tw from 'twrnc'
import Colors from '../../../Constants/Colors'
import moment from 'moment'
import {httpClient} from '../../../apis/Api'
import Loader from '../../../Components/Loader'
import { ChildrenOrderStatusVariables, ParentOrderStatusVariables } from '../../../Constants/StatusVariables'
import formatDate from '../../../helpers/formatDateFromDb.js'
import { useContext } from 'react'
import { AuthContext } from '../../../Contexts/AuthContext'
import { useToast } from 'react-native-toast-notifications'
import SingleAdvancedOrderDetail from '../../../presentation/SingleAdvancedOrderDetail'
import SingleBasicOrderDetail from '../../../presentation/SingleBasicOrderDetail'
const SingleOrder = (props) => {
  const toast = useToast()
    const { user} = useContext(AuthContext)
    const navigation = useNavigation()
    useEffect(()=>{
        navigation.setOptions({title : `Order Details `,headerLeft: ()=>       <Icon onPress={()=> props.navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
        ,      })
        },[])
        const status = 0
        const [visible, setVisible] = useState(false);
        const toggleOverlay = () => {
          setVisible(!visible);
        };
        // HandleSubOrders
        const [subOrders,setSubOrders] = useState([])
        const [isLoading,setIsLoading] = useState(true)
        const [cancelModal,setCancelModal] = useState(false)
        
        const fetchSubOrders =  async() => { 
          
          try {
            
            const  {data} = await httpClient.get(`/api/orders/${props.route.params.order.id}/${props.route.params.ticker !== null ? "advanced" : "basic"}/suborders`)
            console.log(data)
            setSubOrders(data)
            setIsLoading(false)
          } catch (error) {
            console.log(error)
            setIsLoading(false)

          }
         }
         useEffect(()=>{
               fetchSubOrders()
         },[])

         const CancelOrder = async() => { 
          setIsLoading(true)
          try {
            const data = {
                userId : user.id,
                parentId : props.route.params.order.id,
                type : props.route.params.order.ticker ?  2 : 1 
            }
            // console.log(data)
            await httpClient.post('/api/requests',data)
            setIsLoading(false)
            toast.show(`Your demand has been  successfully sent`, {
              type: "success",
              placement: "bottom",
              duration: 4000,
              offset: 60,
              animationType: "slide-in",
            })
            setCancelModal(false)
            props.navigation.goBack()
          } catch (error) {
            console.log(error)
            setIsLoading(false)
          }
          }
  return (
    <View style={ tw `flex-1 justify-center  items-center`}> 
    {/* Confirm   Modal */}
    <Overlay overlayStyle={tw `border-0 border-red-500 bg-white rounded-lg` }   isVisible={cancelModal} >
          <View style={tw `h-26 w-68 bg-white flex  p-2 `}>
            <Text style={tw `font-semibold`}>Are you sure that you want to cancel ?</Text>
            <View style={tw `h-auto mt-5 flex flex-row items-center justify-around`}>
            <TouchableOpacity  onPress={()=> CancelOrder()}  style={tw `self-end h-12 w-24 flex bg-[${Colors.greenColor}] mt-2 rounded-xl justify-center items-center`}>
        <Text style={tw `text-white`}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> setCancelModal(false) }  style={tw `self-end h-12 w-24 flex bg-[${Colors.redColor}] mt-2 rounded-xl justify-center items-center`}>
        <Text style={tw `text-white`}>No</Text>
      </TouchableOpacity>
            </View>
          </View>
         
    </Overlay>
    {/*  SubOrder Modal */}
<Overlay  overlayStyle={tw `border-0 border-red-500 bg-white rounded-lg` }   isVisible={visible} onBackdropPress={toggleOverlay}>
     <View style={tw`flex   h-90 w-90 bg-white`}>
       {/* Column */}
      <View style={tw `bg-gray-400 h-12 flex-row items-center flex`} >

        <View style={tw `flex p-2 flex-1 items-center`}>
            <Text style={tw `text-white font-bold`}>Ticker</Text>
        </View>
        <View style={tw `flex p-2 flex-1 items-center`}>
            <Text style={tw `text-white font-bold`}>Quantity</Text>
        </View>
        <View style={tw `flex p-2 flex-1 items-center`}>
            <Text style={tw `text-white font-bold`}>Date</Text>
        </View>
        <View style={tw `flex p-2 flex-1 items-center`}>
            <Text style={tw `text-white font-bold`}>Status</Text>
        </View>

      </View>

      {/* Rows */}
      { subOrders.map(suborder => ( <View style={tw ` h-12 flex-row items-center flex`} >

   
<View style={tw `flex p-2 flex-1 items-center`}>
    <Text style={tw `text-black font-semibold`}>{suborder.tickerId ? suborder.ticker.title  : props.route.params.order.ticker.title }</Text>
</View>
<View style={tw `flex p-2 flex-1 items-center`}>
    <Text style={tw `text-black font-semibold`}>{suborder.qty}</Text>
</View>
<View style={tw `flex p-2 flex-1 items-center`}>
    <Text style={tw `text-black  `}>{formatDate(suborder.createdAt)}</Text>
</View>
<View style={tw `flex p-2 flex-1 items-center`}>
    <Text style={tw `text-[${ suborder.status === ChildrenOrderStatusVariables.pending? Colors.yellowColor : suborder.status === ChildrenOrderStatusVariables.completed? Colors.greenColor : Colors.redColor}] font-semibold`}>{suborder.status === ChildrenOrderStatusVariables.pending? "pending" : suborder.status === ChildrenOrderStatusVariables.completed? "completed" : "cancelled" }</Text>
</View>

</View>)) }
     
      

     </View>
    </Overlay>
    {/* Main Orders Information */}
   { props.route.params.order.ticker ? <SingleAdvancedOrderDetail order={props.route.params.order} subOrders={subOrders} isLoading={isLoading} /> : <SingleBasicOrderDetail order={props.route.params.order} subOrders={subOrders} isLoading={isLoading} /> }

    <View style={ tw `flex items-center  mt-14 md:mt-26 justify-around flex-row`}>
    <TouchableOpacity onPress={()=> props.route.params.order.status === ParentOrderStatusVariables.canceled || props.route.params.order.status === ParentOrderStatusVariables.declined ? alert("you cannot cancel") : setCancelModal(true) }  style={ tw `bg-[${props.route.params.order.status === ParentOrderStatusVariables.canceled || props.route.params.order.status === ParentOrderStatusVariables.declined ? Colors.TextInputBackgroundColor : Colors.redColor}] h-14  flex flex-row justify-center items-center rounded-lg w-1/3`} >
    <Icon type='ionicon' size={29} color="white"  name='close-circle' />

        <Text style={tw `capitalize text-white text-xl font-semibold ml-1`} >Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=> toggleOverlay() } style={ tw `bg-[${Colors.greenColor}] h-14   ml-4 flex-row flex justify-center items-center rounded-lg w-56`} >
        <Icon type='ionicon' size={29} color="white"  name='eye' />
        <Text style={tw `capitalize text-white text-lg font-semibold ml-3`} >see sub orders</Text>
      </TouchableOpacity>
    </View>
    <Loader  isLoading={isLoading} />
    </View>
  )
}

export default SingleOrder