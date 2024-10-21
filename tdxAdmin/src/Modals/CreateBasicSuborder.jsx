import { Avatar, Button, Checkbox, Input, InputBase, Loader, LoadingOverlay, Menu, Modal, Radio, Select ,Skeleton} from '@mantine/core'
import { Calendar } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';

import apiUrl from '../utils/ApiUrl';


function CreateBasicSuborder({Order,isLoading,opened,setOpened,fetchSubOrders,tickers,subOrders}) {
// state declaration
const [limitPrice, setSetLimitPrice] = useState(0);
const [OrderType, setOrderType] = useState("");
const [OrderValidity, setOrderValidity] = useState("");
const [harverstYear, setHavertYear] = useState("");
const [season, setSeason] = useState("");
const [availableQty,setAvailableQty] = useState(0)
const quantityRef = useRef(null) 
const [value, setValue] = useState(null)
const [TickerId,setTickerId] = useState()
const [years,setYears] = useState([])
const [isLimit,setIsLimit] = useState(false)
const [isGTD,setIsGTD] = useState(false)
const [submitLoading,setSubmitLoading] = useState(false)
useEffect(()=>{
    let years = []
  const currentYear = (new Date()).getFullYear()
  for(let index = 0; index < 3;index++){
    const newYear = currentYear - index
    const newArrays = [...years,newYear.toString()]
    years = newArrays
  }
  setYears(years)
   },[])
     // on Order Type select
 const onChangeOrderType = (e) => { 
    setOrderType(e)
    if(e === "Limit") {
      setOrderType(2)
      setIsLimit(true)
    }else{
      setOrderType(1)
      setIsLimit(false)
    }
    }
    // submit function
    const submitHandler = async (e) => {
        e.preventDefault() 
        setSubmitLoading(true)
        //-1 test if the quantity enter is superior of the order
        //-2 tet if the sum of qty for suborders already made + the new one is superior to the main order
    
        if( quantityRef.current.value > Order.basicOrder.qty ){
          showNotification({
            title: 'suborders  Addition FeedBack',
            message: ` the new suborder  quantity  is superior to the quantity of the main order `,
            styles: (theme) => ({
              root: {
                backgroundColor: theme.colors.red[6],
                borderColor: theme.colors.red[6],
        
                '&::before': { backgroundColor: theme.white },
              },
        
              title: { color: theme.white },
              description: { color: theme.white },
              closeButton: {
                color: theme.white,
                '&:hover': { backgroundColor: theme.colors.red[7] },
              },
            })})
            setSubmitLoading(false)
        }
        else if((subOrders.reduce((previousValue,currentSubOrder)=> previousValue + currentSubOrder.qty ,0) + quantityRef.current.value) > Order.basicOrder.qty   ){
          showNotification({
            title: 'suborders  Addition FeedBack',
            message: `the addition of  the new suborder  quantity and the quantities for the suborders already made is superior to the quantity of the main order `,
            styles: (theme) => ({
              root: {
                backgroundColor: theme.colors.red[6],
                borderColor: theme.colors.red[6],
        
                '&::before': { backgroundColor: theme.white },
              },
        
              title: { color: theme.white },
              description: { color: theme.white },
              closeButton: {
                color: theme.white,
                '&:hover': { backgroundColor: theme.colors.red[7] },
              },
            })})
            setSubmitLoading(false)
        }else{
          try {
            const subOrderStructure = {
              isAttached : true,
              userId : Order.basicOrder.user.id,
              orderCategory : Order.basicOrder.orderCategory,
              basicOrderId : Order.basicOrder.id,
              tickerId : TickerId,
              limitPrice : Number(limitPrice) ,
              dateValidity : value?.toISOString(),
              orderValidity : OrderValidity === "Day" ? 1 : OrderValidity === "GTC" ? 2 : 3,
              qty : Number(quantityRef.current.value),
              harverstYear : harverstYear ,
              season : Number(season),
              orderType : OrderType
            }
            console.log(subOrderStructure)
            await axios.post(`${apiUrl}/api/orders/${Order.basicOrder.id}/basic`,subOrderStructure)
          fetchSubOrders()
          setOpened(false)
            showNotification({
              title: 'suborders  Addition FeedBack',
              message: `suborder   succesfully added`,
              styles: (theme) => ({
                root: {
                  backgroundColor: theme.colors.green[6],
                  borderColor: theme.colors.green[6],
          
                  '&::before': { backgroundColor: theme.white },
                },
          
                title: { color: theme.white },
                description: { color: theme.white },
                closeButton: {
                  color: theme.white,
                  '&:hover': { backgroundColor: theme.colors.green[7] },
                },
              })})
            setSubmitLoading(false)
            setsubBasicOrderLoading(true)
          } catch (error) {
            console.log(error)
            setSubmitLoading(false)
          }
        }
    
    
       }

       const onChangeOrderValidity = (e) => { 
        console.log(e)
        setOrderValidity(e)
        if(e === "GTD") {
          setIsGTD(true)
        }else{
    
          setIsGTD(false)
        }
       
    
        }
          // select ticker
  const onSelectTicker = (value) => { 
    if(Order.basicOrder.orderCategory ===2){
      const TickerIndex = tickers.findIndex(userTicker => userTicker.ticker.title === value)
      setTickerId(tickers[TickerIndex].ticker.id)
      setAvailableQty(tickers[TickerIndex].qty)
    }else{
      const TickerIndex = tickers.findIndex(ticker => ticker.title === value)
      setTickerId(tickers[TickerIndex].id)
    }
    
       } 
  return (
     <Modal  size="md" opened={opened} title="add new suborder" onClose={()=> setOpened(false) } centered>
       <form className='flex flex-col '  onSubmit={submitHandler} >

<InputBase
     label="commodity related"
     defaultValue={Order?.basicOrder.commoditType.commodity.commodityName}
   />

<Select
     label="select ticker"
     placeholder="Pick one"
     searchable
     onChange={onSelectTicker}
     nothingFound="No options"
     data={isLoading? "..." : Order?.basicOrder.orderCategory ===1 ? tickers?.map(ticker => ticker?.title ) : tickers?.map(userTicker => userTicker?.ticker?.title )  }
   />
   <div className='flex flex-row gap-x-4' >
<Select
     label="select harverst year"
     placeholder="Pick one"
     searchable
     onChange={(e)=> setHavertYear(e)}
     nothingFound="No options"
     data={years}
   />
<Select
     label="select season"
     placeholder="Pick one"
     searchable
     onChange={(e)=>setSeason(e) }
     nothingFound="No options"
     data={["1","2","3","4"]}
   />
</div>
<Radio.Group
     label="Order Type"
     onChange={onChangeOrderType}      
   >
     <Radio color="green" value="Market" label="Market" />
     <Radio  color="green" value="Limit" label="Limit" />
   </Radio.Group>
<label>quanity(MT)</label>
   <input  type="number" className='py-2 mt-1 px-2   mb-6 w-full text-base  font-medium  cursor-pointer leading-6 ring-gray-300  ring-2 focus:ring-2 focus:ring-green-500  rounded-md shadow-sm'  ref={quantityRef}   />
   { isLoading ? "" : Order?.basicOrder?.orderCategory === 2  ?  <p className='flex ' >Available quantity : <span className='ml-5 font-medium'>{availableQty !==0 ? availableQty + " MT" : 0 }</span>  </p>  :null}
  
   { isLimit ?  <><label>Price</label>

   <input onChange={(e)=> setSetLimitPrice(e.target.value)}  className='py-2 mt-1 px-2   mb-6 w-full text-base  font-medium  cursor-pointer leading-6 ring-gray-300  ring-2 focus:ring-2 focus:ring-green-500  rounded-md shadow-sm'     /> </> : null }

  
   <Radio.Group
   onChange={onChangeOrderValidity}
     label="Order Validity"
   >
     <Radio color="green" value="Day" label="Day" />
     <Radio  color="green" value="GTC" label="GTC" />
     <Radio  color="green" value="GTD" label="GTD" />
   </Radio.Group>
   {isGTD ? <div className='self-center' ><Calendar color='green' value={value} onChange={setValue} /> </div> : "" }
   

{submitLoading ? <div className='py-3 mt-8 px-7 justify-center flex  mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm' >
   <Loader color="white" />
   </div>  : <input type='submit'
             className="inline-block py-3 mt-8 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
   value=" confirm"
          />   }
 
      
          </form>
</Modal> 
  )
}

export default CreateBasicSuborder