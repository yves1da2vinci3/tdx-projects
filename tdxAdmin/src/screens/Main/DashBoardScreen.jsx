import React, { useEffect } from 'react'
import {BsBasket, BsBasket2Fill} from 'react-icons/bs'
import {IoArrowUpSharp,IoArrowDownSharp} from 'react-icons/io5'
import Notification from '../../components/Notification'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import apiUrl from '../../utils/ApiUrl'
import { useState } from 'react';
import { Skeleton } from '@mantine/core';
function homeScreen() {
  const [isLoading,setIsLoading] = useState(true)
  const [withdrawalCount,setWithdrawalCount] = useState(0)
  const [DepositCount,setDepositsCount] = useState(0)
  const [ordersCount,setOrdersCount] = useState(0)
  const [notifications,setNotifications] = useState([])
  const fetchDashBoardInformation = async () => { 
     const {data} = await axios.get(`${apiUrl}/api/admins/dashboard`)
     setDepositsCount(data.depositsCount)
     setNotifications(data.adminNotifications)
     setOrdersCount(data.ordersCount)
     setWithdrawalCount(data.withdrawalCount)
     setIsLoading(false)
     
   }
   useEffect(()=>{
    fetchDashBoardInformation()
   },[])
  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    { 
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]
  return (
    <div className='h-[80vh] flex w-full mt-2 ' >
      {/* numbers and chart  */}
      <div className='  flex flex-col flex-[3] ' >
      {/* overall numbers  */}
      <div className='flex flex-row' >
      <div className='h-[10rem] gap-x-3 flex items-center p-5 ' >
        <div className='h-auto p-5 flex flex-col w-[15rem] rounded-lg bg-white shadow-lg ' >
          <p className='text-gray-500' >Total orders</p>
          <div className='flex items-center gap-x-4 ' >
          <div className='h-[3rem]  w-[3rem] flex bg-blue-500 rounded-lg shadow-lg items-center justify-center ' >
            <BsBasket2Fill className='text-white fill-current ' color='white' size={25} />
          </div>
          <p className='text-xl font-bold italic ' >{isLoading ? <Skeleton height={10} /> : ordersCount}</p>
          </div>
          
        </div>
        <div className='h-auto p-5 flex flex-col w-[15rem] rounded-lg bg-white shadow-lg ' >
          <p className='text-gray-500' >Total deposits</p>
          <div className='flex items-center gap-x-4 ' >
          <div className='h-[3rem]  w-[3rem] flex bg-pink-500 rounded-lg shadow-lg items-center justify-center ' >
            <IoArrowDownSharp className='text-white fill-current ' color='white' size={25} />
          </div>
          <p className='text-xl font-bold italic ' >{isLoading ? <Skeleton height={10} /> : DepositCount}</p>
          </div>
          
        </div>
        <div className='h-auto p-5 flex flex-col w-[15rem] rounded-lg bg-white shadow-lg ' >
          <p className='text-gray-500' >Total withdrawals</p>
          <div className='flex items-center gap-x-4 ' >
          <div className='h-[3rem]  w-[3rem] flex bg-yellow-500 rounded-lg shadow-lg items-center justify-center ' >
            <IoArrowUpSharp className='text-white fill-current ' color='white' size={25} />
          </div>
          <p className='text-xl font-bold italic ' >{isLoading ? <Skeleton height={10} /> : withdrawalCount}</p>
          </div>
          
        </div>
      </div>
      </div>
      
      {/* // chart  */}
      <div className='z-50' >
     
      <LineChart width={730} height={550} data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="pv" stroke="#8884d8" />
  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
</LineChart>
       </div>
      </div>
      {/* notifications for admin  */}
      <div className='w-[20rem] flex-col bg-slate-50 h-[37rem] bg ' >
<div className='h-[3rem] bg-white drop-shadow-sm border-slate-100 border-2 shadow-sm flex items-center px-2 ' >
  <p className='text-lg font-bold '>TodoList</p>
</div>
{/* list of notifications */}
<ul className='overflow-y-scroll h-full border-slate-300 border-l-2  ' >
  {isLoading ? <>
  <Skeleton height={18} />
  <Skeleton height={18} />
  <Skeleton height={18} />
  <Skeleton height={18} />
  <Skeleton height={18} />
  <Skeleton height={18} />
  <Skeleton height={18} />
  </> : notifications.map(notification =>(
    <Notification notification={notification} />
  )) }
</ul>
      </div>
    </div>
  )
}

export default homeScreen