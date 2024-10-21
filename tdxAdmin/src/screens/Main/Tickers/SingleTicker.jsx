import { Button, InputBase, Table ,Modal, Badge, LoadingOverlay} from '@mantine/core';
import { IconFileExport,IconFileImport } from '@tabler/icons';
import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import OneTickerTableSort from '../../../Tables/OneTickerTableSort'
import { CSVLink, CSVDownload } from "react-csv";
import { useParams } from 'react-router';
import { useEffect } from 'react';
import apiUrl from '../../../utils/ApiUrl';
import axios from 'axios'
import { DatePicker } from '@mantine/dates';
import { useRef } from 'react';
import { showNotification } from '@mantine/notifications';
import getDateMonth from '../../../utils/GetDateMonth';
import convertToByte from '../../../utils/convertToByte';

function SingleTicker() {
  const [opened, setOpened] = useState(false);
  const [openedImport, setOpenedImport] = useState(false);
  const [file, setFile] = useState();
  const fileInput = useRef(null)
  const params = useParams()
  const [data,setData] = useState({})
  const [isLoading,setIsLoading] = useState(true)
  const [date,setDate] = useState(new Date())
  const priceInput = useRef(null)
  const fetchAdmin = async () => { 
    try {
      const {data} =  await axios.get(`${apiUrl}/api/tickers/${params.tickerId}`)
      console.log(data)
      setData(data)
    
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)

    }


   }
  useEffect(()=>{
    fetchAdmin()
  },[isLoading])

  const ArraysMonths = ["juanary","February","March","April","May","June","July","August","September","October","November","December"]

const fileHandler = (e) => { 
 console.log(e.target.files[0])
 setFile(e.target.files[0])
 setOpenedImport(true)
 }
const importFunction = () => { 
  fileInput.current.click()
 }
  const submitHandler = async (e) => { 
    e.preventDefault()
    const priceValue = Number(priceInput.current.value);
    const createdAt = date
    try {
      const reponse = await axios.post(`${apiUrl}/api/tickers/${params.tickerId}/price`,{priceValue,createdAt})
      console.log(reponse)
      showNotification({
        title: 'Price Addition FeedBack',
        message: `Price succesfully added`,
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
        setOpened(false)
        setIsLoading(true)
    } catch (error) {
      console.log(error)
    }

   }

   const importHandler =  async(e) => { 
    e.preventDefault()
    const formData = new FormData()
  formData.append('file', file)
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

     const {data} = await axios.post(`${apiUrl}/api/tickers/${params.tickerId}/import`, formData, config)
     showNotification({
      title: 'Prices importation FeedBack',
      message: `Prices succesfully imported`,
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
      console.log(data)
    setOpenedImport(false)
    setIsLoading(true)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='h-screen flex flex-col ' >
      { isLoading ? <LoadingOverlay visible={isLoading} /> : (  <div>   <Modal  opened={opened} title="New Price ticker" onClose={()=> setOpened(false) } centered>
        <form  onSubmit={(e) => submitHandler(e)} >
<label>PRICE</label>
    <InputBase ref={priceInput}  type='number' />
  <DatePicker value={date} onChange={ (date) => {
 setDate(date.toISOString().slice(0, 19).replace('T', ' '))
 console.log(date.toISOString().slice(0, 19).replace('T', ' '))
  }
   
  } placeholder='pick date' label="date price" />
  
               <input type='submit'
              className="inline-block py-3 mt-8 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
    value=" save new price"
           /> 
       
           </form>
</Modal> 
<Modal  opened={openedImport} title="New Price ticker" onClose={()=> setOpenedImport(false) } centered>
        <form  onSubmit={(e) => importHandler(e)} >
<div className='flex gap-x-8' >
<p className='font-semibold' >File Name : </p>
<p className='font-[300]' > {file ? file.name : "..."} </p>
</div>
<div className='flex gap-x-8' >
<p className='font-semibold' >File size : </p>
<p className='font-[300] ' > {file ? convertToByte(file.size) : "..." } </p>
</div>

<div className='flex gap-x-4 justify-between px-4' >
<div  onClick={ ()=> setOpenedImport(false) }
              className="inline-block py-3 mt-8 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md shadow-sm"
   
           > 
           <p>cancel</p>
           </div> 
           <input type='submit'
              className="inline-block py-3 mt-8 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
    value=" validate"
           /> 
</div>

           </form>
</Modal> 
 <div className='h-[30rem]  grid grid-cols-2' >
 <div className='' >
   <p className='text-center font-bold'>Information About Ticker</p>
 <table className='table-auto border-separate  border-slate-400 border-2 w-full'>
   <thead>
     <tr>
       <td className='border border-slate-300 font-bold text-center'>Information Name</td>
       <td className='border border-slate-300 font-bold text-center'>Value</td>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td className='border border-slate-300 font-semibold'>Ticker Name</td>
       <td className='border border-slate-300'>{data.ticker.title}</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Country</td>
       <td className='border border-slate-300'>{data.ticker.country.countryName}</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>commodity</td>
       <td className='border border-slate-300'>{data.ticker.commodity.commodityName}</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Commodity Type</td>
       <td className='border border-slate-300'>{data.ticker.commodityType.commodityTypeName}</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Warehouse</td>
       <td className='border border-slate-300'>{data.ticker.warehouse.warehouseName}</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>grade</td>
       <td className='border border-slate-300'>{data.ticker.grade.gradeValue}</td>
     </tr>
   </tbody>
 </table>
 <p className='my-4  text-gray-500'>Current Price</p>
 <div className='' >
  { data.ticker.prices.length >0 ? (<div className='flex gap-x-4 items-center ' ><p className='my-4  text-black font-semibold '>{data.fromYesterdayToTodayPrices[0].priceValue} GHS</p>
 { data?.fromYesterdayToTodayPrices.length <2 ? "" :  Number(  ((( data?.fromYesterdayToTodayPrices[0].priceValue -  data?.fromYesterdayToTodayPrices[1].priceValue)/data.fromYesterdayToTodayPrices[1].priceValue) * 100).toFixed(2 ) ) < 0 ? <Badge color="red" >{((( data?.fromYesterdayToTodayPrices[0].priceValue -  data?.fromYesterdayToTodayPrices[1].priceValue)/data.fromYesterdayToTodayPrices[1].priceValue) * 100).toFixed(2 )} %</Badge> : <Badge color="green" >+{((( data?.fromYesterdayToTodayPrices[0].priceValue -  data?.fromYesterdayToTodayPrices[1].priceValue)/data.fromYesterdayToTodayPrices[1].priceValue) * 100).toFixed(2 )}% </Badge>  }</div>) : <div className='w-full h-full justify-center items-center' >
    <p>no prices registered, please add a price</p>
    </div> }
 
 
 </div>
 
 <Button  onClick={()=> setOpened(true) } className='bg-green-500 hover:bg-green-700' >add new price</Button>
 
 {/* <div className='h-[12rem]  mt-0 shadow-md p-5 flex flex-col gap-y-2  bg-white rounded-lg w-[34rem]' >
       
    
     
       </div> */}
   </div>
 <div className='' >
   <p className='text-center font-bold'> Average Price  Last 6 months</p>
   { data.ticker.prices.length >0 ? (<ResponsiveContainer width="100%" height="90%">
         <LineChart
           width={500}
           height={300}
           data={
            data.last6MonthsPrices.map(monthPrice => (
              {
                price : Number(monthPrice.avgprice),
                name :   ArraysMonths[getDateMonth(monthPrice.pricemonth) ] 
              }
            ))
           }
           margin={{
             top: 5,
             right: 30,
             left: 20,
             bottom: 5,
           }}
         >
           <CartesianGrid strokeDasharray="3 3" />
           <XAxis dataKey="name" />
           <YAxis />
           <Tooltip />
           <Legend />
           <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
         </LineChart>
       </ResponsiveContainer>)  :  <div className='w-full h-full justify-center items-center' >
    <p className='text-center' >no prices registered, please add a price</p>
    </div>}
   </div>
       <div className='flex flex-col w-[70vw]'>
<p className='text-center mt-4'>Ticker price variation over the time</p>
<div className='flex justify-between' >
    <input ref={fileInput}  type="file" onChange={fileHandler} className="hidden" />
  <CSVLink className='self-end' data={data.ticker?.prices}><Button className='self-end mb-4 bg-white hover:text-white text-black border-2 border-slate-300' leftIcon={<IconFileExport />} >Export</Button></CSVLink>
<Button onClick={ importFunction  } className='self-end mb-4 bg-white hover:text-white text-black border-2 border-slate-300' leftIcon={<IconFileImport />} >import</Button>
  </div>
{ data.ticker.prices.length >0 ? (<div className='overflow-y-scroll'   >
<OneTickerTableSort data={data.ticker?.prices} />
</div>)  : <div className='w-full h-full justify-center items-center' >
    <p>no prices registered, please add a price</p>
    </div> }

     </div>
      </div>
      </div>)     }
 
    
     
      </div>
  )
}

export default SingleTicker