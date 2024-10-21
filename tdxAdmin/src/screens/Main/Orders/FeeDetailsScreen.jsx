import React from 'react'
import { useState } from 'react'
import GhanaCommodityExchange from '../../../assets/commodityLogo.jpg'
import TraderexIcon from '../../../assets/TdxLogo.jpg'
import {Button, Skeleton} from '@mantine/core'
import {useRecoilValue} from 'recoil'
import FeeAtom from '../../../recoil/atoms/FeeAtom'
import { useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../../utils/ApiUrl'
function FeeDetailsScreen() {
  const feeAtom = useRecoilValue(FeeAtom)
    const [isLoading,setIsLoading] = useState(true)
    const [Fee,setFee] = useState({})
    const fetchFee =  async() => {
      const parameterBody = {
        type : feeAtom.type,
        orderId : feeAtom.order.id
      } 
  try {
    const {data} = await axios.post(`${apiUrl}/api/orders/fee`,parameterBody)
    console.log(data)
    setFee(data)
    setIsLoading(false)
  } catch (error) {
    setIsLoading(false)
    console.log(error)
  }
     }
     useEffect(()=>{
      console.log(feeAtom)
       fetchFee()
     },[])

  return (
    <div className='h-screen w-[80vw] flex-col justify-center items-center bg-gray-200 flex' >
        <div className='h-[50rem] flex  bg-white w-[40rem]  flex-col p-5  ' >
            {/* icon for tradrex  */}
            <div className=' flex  items-center justify-between  drop-shadow-sm ' >
            <img src={TraderexIcon} className="h-18 w-48 " />
            <img src={GhanaCommodityExchange} className="h-28 " />
            </div>
            <p className='text-lg text-center mt-2 font-semibold text-green-500' >Order & User info </p>
            <div className='grid grid-cols-2' >
                {/* user  */}
            <div className='flex-1 flex  justify-center ml-8  flex-col'  >
             <p className='font-bold ' >Full Name: <span className='font-medium' > {isLoading?  <Skeleton height={20} radius="xl" /> : feeAtom.user.fullName } </span>  </p>
             <p className='font-bold ' >email: <span className='font-medium' >{isLoading?  <Skeleton height={20} radius="xl" /> :feeAtom.user.email } </span>  </p>
             <p className='font-bold ' >phone Number: <span className='font-medium' >{isLoading?  <Skeleton height={20} radius="xl" /> : feeAtom.user.mobileNumber }</span>  </p>
            
            </div>
            {/* order */}
            <div className='flex-1 flex  justify-center ml-8  flex-col'  >
             <p className='font-bold ' >Oder Id: <span className='font-medium' > {isLoading?  <Skeleton height={20} radius="xl" /> : feeAtom.order.id.toString().padStart(10,"0") }</span>  </p>
             <p className='font-bold ' > Order Category: <span className='font-medium' >{isLoading?  <Skeleton height={20} radius="xl" /> : feeAtom.order.catergory ===1 ? "BUY" : "SELL"   } </span>  </p>
             <p className='font-bold ' >Quantity : <span className='font-medium' >{isLoading?  <Skeleton height={20} radius="xl" /> : feeAtom.order.qty }</span>  </p>
            
            </div>
            </div>
            <p className='text-lg text-center mt-2 font-semibold text-green-500 ' >Fee Details</p>
            <table className='table-auto shadow-lg border-separate  border-slate-400 border-2 w-full'>
   <thead>
     <tr>
       <td className='border border-slate-300 font-bold text-center'>Information Name</td>
       <td className='border border-slate-300 font-bold text-center'>Value</td>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td className='border border-slate-300 font-semibold'>Grading, Weighing & Rebagging (Per Bag)</td>
       <td className='border flex justify-center border-slate-300'>{isLoading ? <Skeleton height={20} /> : Fee.Grading }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Weighing (Per Bag)</td>
       <td className='border flex justify-center border-slate-300'>{isLoading ? <Skeleton height={20} /> : Fee.Weighing }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Central Depository (% Value)</td>
       <td className='border flex justify-center border-slate-300'>{isLoading ? <Skeleton height={20} /> : Fee.centralDepository }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Moisture Loss (% Volume)</td>
       <td className='border flex justify-center border-slate-300'>{isLoading ? <Skeleton height={20} /> : Fee.moistureLoss }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Receipting Fee (MT)</td>
       <td className='border flex justify-center border-slate-300'>{isLoading ? <Skeleton height={20} /> : Fee.receiptingFee }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Storage (Bag/Month)</td>
       <td className='border flex justify-center border-slate-300'>{isLoading ? <Skeleton height={20} /> : Fee.Storage }</td>
     </tr>
    
     <tr>
       <td className='border border-slate-300 font-semibold'>Handling (Per Bag)</td>
       <td className='border flex justify-center border-slate-300'>{isLoading ? <Skeleton height={20} /> : Fee.Handling }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Broker Commission (% Value)</td>
       <td className='border flex justify-center border-slate-300'>{isLoading ? <Skeleton height={20} /> : Fee.brokerCommission }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Trading Fee (% Value)</td>
       <td className='border flex justify-center border-slate-300'>{isLoading ? <Skeleton height={20} /> : Fee.tradingFee }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Regulatory Fee (% Value)</td>
       <td className='border flex justify-center border-slate-300'>{isLoading ? <Skeleton height={20} /> : Fee.regulatoryFee }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Drying (Per Bag)</td>
       <td className='border flex justify-center border-slate-300'>{isLoading ? <Skeleton height={20} /> : Fee.Drying }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Cleaning (Per bag)</td>
       <td className='border flex justify-center border-slate-300'>{isLoading ? <Skeleton height={20} /> : Fee.Cleaning }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Re-Bagging (Per bag)</td>
       <td className='border border-slate-300 selection flex justify-center font-semibold'>{isLoading ? <Skeleton height={20} /> : Fee.reBagging }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Fumigation (Per MT)</td>
       <td className='border border-slate-300 flex justify-center font-semibold'>{isLoading ? <Skeleton height={20} /> : Fee.fumigation }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-bold '>Total</td>
       <td className='border border-slate-300 font-semibold text-center'>{ isLoading ? <Skeleton height={20} /> : `${Fee.fumigation + Fee.reBagging + Fee.Cleaning + Fee.Drying+ Fee.regulatoryFee + Fee.tradingFee + Fee.brokerCommission + Fee.Handling+Fee.Storage+Fee.receiptingFee+Fee.moistureLoss+Fee.centralDepository+Fee.Weighing+Fee.Grading}GHS` }</td>
     </tr>
   </tbody>
 </table>
           
                   </div>
       
        </div>
  )
}

export default FeeDetailsScreen