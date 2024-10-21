import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '../../../assets/Icons/add.png'
import { TextInput,  ActionIcon, useMantineTheme, LoadingOverlay } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';

import TickerTableSort from '../../../Tables/TickerTableSort'
import axios from 'axios';
import apiUrl from '../../../utils/ApiUrl';


function Overview() {
  const [tickers,setTickers] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const fetcTickers = async () => { 
    try {
      const {data} =  await axios.get(`${apiUrl}/api/tickers`)
      console.log(data)
      setTickers(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)

    }


   }
  useEffect(()=>{
    fetcTickers()
  },[])
  const data = [
    {
     tickerName : "GTAYSB2",
     country : "Ghana",
     commodity : "Soya Bean",
     commodityType : "agricultiral",
     warehouse : "Tamale",
     grade : "2",

  },
    {
     tickerName : "GAYSB2",
     country : "Ghana",
     commodity : "Soya Bean",
     commodityType : "Yellow Soya Bean",
     warehouse : "Accra",
     grade : "2",

  },
    {
     tickerName : "GTAYSB2",
     country : "Ghana",
     commodity : "Soya Bean",
     commodityType : "agricultiral",
     warehouse : "Tamale",
     grade : "2",

  },
    
]
  const theme = useMantineTheme();


  return (
    <div className='h-screen w-full flex flex-col p-5 ' > 
 <p className=' text-center text-xl'>Ticker Adminstration</p>
      {/* statistiques */}
      <div className='bg-g gap-x-2 mb-8 justify-around flex items-center mt-8'>

<Link to='/admin/tickers/create'  className='h-[10rem] flex flex-col pt-12  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer hover:bg-green-500 group'>
  <img src={AddIcon} className='h-[4rem] w-[4rem] self-center ' />
<p className='text-center text-md font-semibold group-hover:text-white '> Create a new ticker </p>
</Link>
<div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
  <p className='text-center text-7xl italic group-hover:text-white ' >{tickers.length}</p>
<p className='text-center text-xl font-semibold group-hover:text-white'> Tickers</p>
</div>


  </div>

{/* tickers tables */}
{ isLoading ? <LoadingOverlay visible={isLoading} /> : tickers.length >0 ? <TickerTableSort data={tickers} />  : (<div className='w-full h-full flex justify-center items-center' >
    <p>No tickers registered,please add a new one</p>
    </div>)   }

    </div>
  )
}

export default Overview