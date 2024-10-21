import { LoadingOverlay } from '@mantine/core'
import axios from 'axios'
import React from 'react'
import { useState ,useEffect} from 'react'
import BasicOrdersTables from '../../../../Tables/BasicOrdersTables'
import apiUrl from '../../../../utils/ApiUrl'
function Overview() {
  const [isLoading,setIsLoading] = useState(true)
  const [orders,setBasicOrders] = useState([])
 
 


  const fecthSubOrders = async () => { 
    try {
      const {data} = await axios.get(`${apiUrl}/api/orders/basic`)
      setBasicOrders(data)
      setIsLoading(false)
    } catch (error) {

      console.log(error)
      setIsLoading(false)
    }
   
   }
  useEffect(()=>{
    fecthSubOrders()
  },[])
  return (
    <div className='h-screen w-full flex flex-col p-5 ' > 


    <p className=' text-center text-xl'>Basic orders Adminstration</p>
         {/* statistiques */}
         <div className='bg-g gap-x-2 w-[65rem] mb-8  overflow-x-scroll justify-around flex items-center mt-8'>
   <div className='h-[10rem] flex flex-col  w-[10rem] justify-between p-4 rounded-sm bg-blue-600 drop-shadow-md cursor-pointer   group'>
     <p className='text-center text-7xl italic text-white ' >{ isLoading? "..." : orders.length   }</p>
   <p className='text-center text-xl font-semibold text-white'> totals</p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[10rem] justify-between p-4 rounded-sm bg-yellow-400 drop-shadow-md cursor-pointer   group'>
     <p className='text-center text-7xl italic text-white ' >{ isLoading ?   "..." : orders.filter(elt => elt.status === 0 ).length }</p>
   <p className='text-center text-xl font-semibold text-white'> pending</p>
   </div>

   <div className='h-[10rem] flex flex-col  w-[10rem] justify-between p-4 rounded-sm bg-pink-400 drop-shadow-md cursor-pointer   group'>
     <p className='text-center text-7xl italic text-white ' >{ isLoading ?   "..." : orders.filter(elt => elt.status === 1 ).length }</p>
   <p className='text-center text-xl font-semibold text-white'> placed</p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[10rem] justify-between p-4 rounded-sm bg-green-600 drop-shadow-md cursor-pointer   group'>
     <p className='text-center text-7xl italic text-white ' >{ isLoading ?   "..." : orders.filter(elt => elt.status === 2 ).length }</p>
   <p className='text-center text-xl font-semibold text-white'> partial</p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[10rem] justify-between p-4 rounded-sm bg-green-800 drop-shadow-md cursor-pointer   group'>
     <p className='text-center text-7xl italic text-white ' >{ isLoading ?   "..." : orders.filter(elt => elt.status === 3 ).length }</p>
   <p className='text-center text-xl font-semibold text-white'> completed</p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[10rem] justify-between p-4 rounded-sm bg-red-400 drop-shadow-md cursor-pointer   group'>
     <p className='text-center text-7xl italic text-white ' >{ isLoading ?   "..." : orders.filter(elt => elt.status === 4 ).length }</p>
   <p className='text-center text-xl font-semibold text-white'> canceled</p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[10rem] justify-between p-4 rounded-sm bg-red-600 drop-shadow-md cursor-pointer   group'>
     <p className='text-center text-7xl italic text-white ' >{ isLoading ?   "..." : orders.filter(elt => elt.status === 5 ).length }</p>
   <p className='text-center text-xl font-semibold text-white'> declined</p>
   </div>
 
     </div>
  
   { isLoading ? <LoadingOverlay visible={isLoading} /> : orders.length >0 ? <BasicOrdersTables  data={orders} />  : (<div className='w-full h-full flex justify-center items-center' >
       <p>No orders yet</p>
       </div>)   }
   
       </div>
  )
}

export default Overview