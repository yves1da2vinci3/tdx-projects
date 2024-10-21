import { Chip, InputBase, Loader } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import {useRecoilValue} from "recoil"
import suborderAtom from '../../../recoil/atoms/SuborderAtom'
import apiUrl from '../../../utils/ApiUrl'
function FeeScreen() {
  // get the suborder sdetsail
   const suborderAtomValue =  useRecoilValue(suborderAtom)
   console.log(suborderAtomValue)
   const navigate = useNavigate()
 /* A react hook that is used to set the state of the component. */
  const [Drying,setDrying] = useState(false)
  const [Cleaning,setCleaning] = useState(false)
  const [Rebagging,setRebagging] = useState(false)
  const [Fumigation,setFumigation] = useState(false)
  const [submitLoading,setSubmitLoading] = useState(false)
  // define ref for 
  const  gradingValueRef = useRef(0)
  const  WeighingRef = useRef(0)
  const  centralDepositoryRef = useRef(0)
  const  MoistureLossRef = useRef(0)
  const  receiptingFeeRef = useRef(0)
  const  storageRef = useRef(0)
  const  handlingRef = useRef(0)
  const  brokerCommissionRef = useRef(0)
  const  tradingFeeRef = useRef(0)
  const  RegulatoryRef = useRef(0)
  const  DryingRef = useRef(0)
  const  cleaningRef = useRef(0)
  const  rebaggingRef = useRef(0)
  const  fumigationRef = useRef(0)
  //handle save fee
  const handleFee = async (e) => { 
    setSubmitLoading(true)
     const feeStructure = {
      Grading : gradingValueRef.current?.value ? Number(gradingValueRef.current?.value) : 0,
      Weighing : WeighingRef.current?.value ?Number(WeighingRef.current?.value) : 0,
      centralDepository : centralDepositoryRef.current?.value ? Number(centralDepositoryRef.current?.value) : 0,
      moistureLoss :MoistureLossRef.current?.value ? Number(MoistureLossRef.current?.value) : 0,
      receiptingFee : receiptingFeeRef.current?.value? Number(receiptingFeeRef.current?.value) : 0,
      Storage : storageRef.current.value?Number(storageRef.current.value):0,
      Handling : handlingRef.current?.value? Number(handlingRef.current?.value) : 0,
      brokerCommission : brokerCommissionRef.current?.value? Number(brokerCommissionRef.current?.value) : 0,
      tradingFee : tradingFeeRef.current?.value? Number(tradingFeeRef.current?.value) : 0,
      regulatoryFee : RegulatoryRef.current?.value? Number(RegulatoryRef.current?.value) : 0,
      Drying  : DryingRef.current?.value? Number(DryingRef.current?.value) : 0,
      Cleaning  : cleaningRef.current?.value? cleaningRef.current?.value : 0,
      reBagging  : rebaggingRef.current?.value? Number(rebaggingRef.current?.value) : 0,
      fumigation  : fumigationRef.current?.value? Number(fumigationRef.current?.value) : 0,
      parentId : suborderAtomValue.parentId
     }
     if(suborderAtomValue.type ===1){
      await axios.post(`${apiUrl}/api/orders/fee/basic`,feeStructure)
      console.log("got it")
      setSubmitLoading(false)
      showNotification({
       title: 'Fee  Addition FeedBack',
       message: `fee succesfully added`,
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
       navigate(-1)
     }else{
      await axios.post(`${apiUrl}/api/orders/fee/advanced`,feeStructure)
      console.log("got it")
      setSubmitLoading(false)
      showNotification({
       title: 'Fee  Addition FeedBack',
       message: `fee succesfully added`,
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
       navigate(-1)
     }
   }
  return (
    <div className='flex w-full h-screen flex-col  items-center justify-center'>
      <p className='text-center font-bold '></p>
      <div className={`h-auto drop-shadow-md mt-8 shadow-2xl p-8 flex flex-col gap-y-2   bg-white rounded-lg w-[46rem]`} >
      
  <p className='text-green-500 capitalize'>Mandatory Fees : </p> 
   <div className='flex gap-x-2 w-full  justify-between '>
    <div className='w-[25rem]' > 
   <label>Grading, Weighing & Rebagging (Per Bag)</label>
    <InputBase type="number" ref={gradingValueRef}  />
    </div>
    <div className='flex-1'>
    <label>Weighing (Per Bag)</label>
    <InputBase type="number"  ref={WeighingRef}  />
    </div>

   </div>
   <div className='flex gap-x-2 w-full  justify-between '>
    <div className='w-[22rem]' > 
   <label> Central Depository (% Value)</label>
    <InputBase type="number"  ref={centralDepositoryRef}  />
    </div>
    <div className='flex-1'>
    <label>Moisture Loss (% Volume)</label>
    <InputBase type="number"  ref={MoistureLossRef} />
    </div>

   </div>
   <div className='flex gap-x-2 w-full  justify-between '>
    <div className='w-[22rem]' > 
   <label>Receipting Fee (MT)</label>
    <InputBase type="number"   ref={receiptingFeeRef} />
    </div>
    <div className='flex-1'>
    <label>Storage (Bag/Month)</label>
    <InputBase type="number"  ref={storageRef}  />
    </div>

   </div>
   <div className='flex gap-x-2 w-full  justify-between '>
    <div className='w-[22rem]' > 
   <label>Handling (Per Bag)</label>
    <InputBase type="number"  ref={handlingRef}  />
    </div>
    <div className='flex-1'>
    <label>Broker Commission (% Value)</label>
    <InputBase type="number"  ref={brokerCommissionRef}  />
    </div>

   </div>
   <div className='flex gap-x-2 w-full  justify-between '>
    <div className='w-[22rem]' > 
   <label>Trading Fee (% Value)</label>
    <InputBase type="number"   ref={tradingFeeRef} />
    </div>
    <div className='flex-1'>
    <label>Regulatory Fee (% Value)</label>
    <InputBase type="number"   ref={RegulatoryRef} />
    </div>

   </div>

   {/* // optional  */}
   <p className='text-green-500 capitalize' >optional parameteres : </p>
   <div className='flex gap-x-2 w-full  justify-between '>
    { Drying ?  <div className='w-[25rem]' > 
   <label>Drying (Per Bag)</label>
    <InputBase ref={DryingRef}   />
    </div> : null }
    { Cleaning ?  <div className='flex-1'>
    <label>Cleaning (Per bag)</label>
    <InputBase  ref={cleaningRef}  />
    </div> : null }
   

   </div>
   <div className='flex gap-x-2 w-full  justify-between '>
   { Rebagging ?  <div className='w-[25rem]' > 
   <label>Re-Bagging (Per bag)</label>
    <InputBase ref={rebaggingRef}   />
    </div> : null }
    { Fumigation ?   <div className='flex-1'>
    <label>Fumigation (Per MT)</label>
    <InputBase ref={fumigationRef}  />
    </div> : null  }
    </div>
   
   <div className='p-5 flex gap-x-4  items-center'>
   <Chip  defaultChecked={false} onChange={ (value) => setDrying(value)}  color="green" variant="filled">Drying</Chip>
   <Chip defaultChecked={false} onChange={(value)=> setCleaning(value)  }   color="green" variant="filled">Cleaning</Chip>
   <Chip  defaultChecked={false} onChange={(value)=> setRebagging(value)  }      color="green" variant="filled">Re-Bagging</Chip>
   <Chip  defaultChecked={false} onChange={(value)=> setFumigation(value)  }     color="green" variant="filled">Fumigation</Chip>
   </div>

   {submitLoading ? <div className='py-3 mt-8 px-7 justify-center flex  mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm' >
    <Loader color="white" />
    </div>  : <input onClick={handleFee} type='submit'
              className="inline-block py-3 mt-8 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
    value=" confirm"
           />   }
               
          
      </div>
    </div>
  )
}

export default FeeScreen