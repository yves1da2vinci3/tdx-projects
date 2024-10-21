import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DepositTable from '../../../Tables/DepositTable'
import apiUrl from '../../../utils/ApiUrl'
import { Modal, Button, Avatar, Input, LoadingOverlay, Loader,  } from '@mantine/core';
import { IconEye } from '@tabler/icons';
import { useRef } from 'react';
import { showNotification } from '@mantine/notifications';
function Overview() {
  const [isLoading,setIsLoading] = useState(true)
  const [isLoadingReject,setIsLoadingReject] = useState(false)
  const [isLoadingAccept,setIsLoadingAccept] = useState(false)
  const [Deposits,setDeposits] = useState([])
  const [Deposit,setDeposit] = useState({})
  const [opened, setOpened] = useState(false);
  const [Zoom, setZoom] = useState(false);
  const [IsRejected, setIsRejected] = useState(false);
  const [isWireTransfer, setisWireTransfer] = useState(false);
  const reasonInput = useRef(null)
  const GHSInUSDInput = useRef(null)
   const fetchDeposits = async () => { 
    try {
      const {data} = await axios.get(`${apiUrl}/api/admins/deposits`)
      console.log(data)
      setDeposits(data)
      setIsLoading(false)
    } catch (error) {

      console.log(error)
      setIsLoading(false)
    }
   
   }
  useEffect(()=>{
    fetchDeposits()
  },[isLoading])
  /**
   * When the ZoomHandler function is called, it sets the Zoom state to the opposite of what it was
   * before.
   */
  const ZoomHandler = () => { 
    setZoom(!Zoom)
    }
   
/**
 * A function that is called when the reject button is clicked.
 */
  const RejectHandler = async () => {
    // test if the input for given reason is already there 
    if(IsRejected){
      setIsLoadingReject(true)
      try {
        const data = {
          reason : reasonInput.current.value,
           userId : Deposit.user.id
        }
        console.log(data)
        await axios.put(`${apiUrl}/api/admins/${Deposit.id}/deposits/decline`,{...data})
        showNotification({
          title: 'Decline  FeedBack',
          message: `deposit  successfully  declined`,
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
          setIsLoadingReject(false)
        setIsRejected(false)
        setOpened(false)
        setIsLoading(true)
      } catch (error) {
        console.log(error)
        
        showNotification({
          title: 'Decline Failed',
          message: `${error.response.data.message}`,
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
          setIsLoadingReject(false)
        setIsRejected(false)
        setIsLoading(true)
      }
    } else{
      setIsRejected(true)

    }
   
   }
/**
 * approve deposit
 */
   
    const ApproveHandler = async () => { 
      // it is not a wire Transfer 
      if(Deposit.type !==3 ) {
        setIsLoadingAccept(true)
        let data = {
          userId : Deposit.user.id,
          amount : Deposit.amount,
        }
  try {
    await axios.put(`${apiUrl}/api/admins/${Deposit.id}/deposits/approve`,{...data})
    showNotification({
      title: 'Approve  FeedBack',
      message: `approved successfully `,
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
      setIsLoadingAccept(false)
      setIsLoading(true)
  } catch (error) {
    console.log(error)
    showNotification({
      title: 'Approve Failed',
      message: `${error.response.data.message}`,
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
      setIsLoadingAccept(false)
  }
      }
      // the input is not there
      else if( Deposit.type ===3 && isWireTransfer === false ){
        setisWireTransfer(true)
      }else{
        setIsLoadingAccept(true)
        let data = {
          userId : Deposit.user.id,
          amount : Deposit.amount,
          GHSInUSD : GHSInUSDInput.current.value
        }
  try {
    await axios.put(`${apiUrl}/api/admins/${Deposit.id}/deposits/approve`,{...data})
    showNotification({
      title: 'Approve  FeedBack',
      message: `approved successfully `,
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
      setIsLoadingAccept(false)
      setIsLoading(true)
      setisWireTransfer(false)
  } catch (error) {
    console.log(error)
    showNotification({
      title: 'Approve Failed',
      message: `${error.response.data.message}`,
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
      setIsLoadingAccept(false)
  }
      }

     }
  return (
    <div className='h-screen w-full flex flex-col p-5 ' > 
<Modal
    centered
        opened={opened}
        onClose={() => setOpened(false)}
        title={Zoom ? "Bank Deposit reciept" : "Deposit information"}
        size="lg"
      >
         {Zoom ?<img onClick={ZoomHandler} src={Deposit.fileUploadUrl} className="h-full  cursor-pointer  w-full object-contain " /> : 
        <div className='h-auto flex flex-col' >
         
        <div className="h-[25rem] gap-y-3 grid auto-rows-auto grid-flow  " >
          <div className=' flex gap-x-5 p-2 ' >
            <Avatar  src={ Deposit.user ? Deposit.user.userImgUrl : ""}   className="rounded-full h-[10rem] w-[10rem]"  />
            <div className='flex-1 flex justify-center ml-8  flex-col'  >
             <p className='font-bold ' >Full Name: <span className='font-medium' >{Deposit.user ? Deposit.user.firstName + " "+ Deposit.user.lastName : "" }</span>  </p>
             <p className='font-bold ' >email: <span className='font-medium' >{ Deposit.user ? Deposit.user.email : ""}</span>  </p>
             <p className='font-bold ' >phone Number: <span className='font-medium' >{Deposit.user ?  Deposit.user.mobileNumber : ""}</span>  </p>
            </div>
          </div>
          <div>
            <div className='flex gap-x-4 items-center ' >
          <p className='text-lg' >Deposit Type : </p>
          <div className='h-6 w-auto p-2 flex rounded- bg-pink-300 justify-center items-center' >
        <p className='text-pink-700' >{Deposit?.type ===1 ? "Bank Deposit" : Deposit?.type === 2? "MTN Mobile Money" : "Wire Transfer" }</p>
      </div>
          </div>
          <div className=' flex gap-x-5 p-2 ' >
            <div className='flex-1 flex justify-center ml-8  flex-col'  >
              {Deposit.transactionId ? <p className='font-bold ' >TransactionId: <span className='font-medium' >{Deposit.transactionId   }</span>  </p> : null}
             
             <p className='font-bold ' >Amount: <span className='font-medium' >{ Deposit.amount ? Deposit.amount + " " +  `${ Deposit.type ===3 ? "USD" : "GHS"  }` : ""}</span>  </p>
            </div>
          </div>
          {Deposit.fileUploadUrl ?<div onClick={ZoomHandler} className='self-center mx-auto my-0 cursor-pointer hover:brightness-50 flex items-center group justify-center ' > <IconEye size={48} className='group-hover:opacity-100 opacity-0  text-white absolute' /> 
          {/* <img src={apiUrl + Deposit?.fileUploadUrl} className="h-[8rem]   w-[20rem] object-cover " /> */}
          <img src={Deposit.fileUploadUrl} className="h-[8rem]   w-[20rem] object-cover " />
          </div>   : ""}
          </div>
        </div>
        {IsRejected ? <>
        <label className='mt-12' >Reason of rejection</label>
        <Input ref={reasonInput} type="text" className='ring-green-200 ring-2' placeholder="we met some issue" />
        </> : "" }
        {isWireTransfer ? <>
        <label className='mt-12' > Value From USD to GHS </label>
        <Input ref={GHSInUSDInput} type="number" className='ring-green-200 ring-2' placeholder="320" />
        </> : "" }

        { Deposit.status !== 0 ? null : <div className='self-center flex gap-x-8' >
          {isLoadingReject ? <div className='bg-red-600 w-[14rem] rounded-lg h-[3rem] mt-3 flex items-center justify-center ' >
          <Loader size="lg" variant="dots"  color="white" />
          </div> :<Button    onClick={RejectHandler} className='bg-red-600 w-[14rem] hover:bg-red-700 mt-3' >{ IsRejected ? "Confirm" : "Reject"}</Button> }

{ isLoadingAccept ? <div className='bg-green-600 w-[14rem] rounded-lg h-[3rem] mt-3 flex items-center justify-center ' >
          <Loader size="lg" variant="dots"  color="white" />

          </div> :  IsRejected ? " " : <Button  onClick={ApproveHandler} className='bg-green-600 w-[14rem] hover:bg-green-700 mt-3' >{isWireTransfer ? "Confirm" : "Approve"}</Button> }
        </div>  }
        
        </div>
}
      </Modal>

    <p className=' text-center text-xl'>Deposits Adminstration  </p>
         {/* statistiques */}
         <div className='bg-g gap-x-2 mb-8 justify-around flex items-center mt-8'>
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-blue-600 drop-shadow-md cursor-pointer   group'>
     <p className='text-center text-7xl italic text-white ' >{ isLoading? "..." : Deposits.length   }</p>
   <p className='text-center text-xl font-semibold text-white'> totals</p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-yellow-400 drop-shadow-md cursor-pointer   group'>
     <p className='text-center text-7xl italic text-white ' >{ isLoading ?   "..." : Deposits.filter(elt => elt.status === 0 ).length }</p>
   <p className='text-center text-xl font-semibold text-white'> pending</p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-green-400 drop-shadow-md cursor-pointer   group'>
     <p className='text-center text-7xl italic text-white ' >{ isLoading ?   "..." : Deposits.filter(elt => elt.status === 1 ).length }</p>
   <p className='text-center text-xl font-semibold text-white'> approved</p>
   </div>
   
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-red-400 drop-shadow-md cursor-pointer   group'>
     <p className='text-center text-7xl italic text-white ' >{ isLoading ?   "..." : Deposits.filter(elt => elt.status === 2 ).length }</p>
   <p className='text-center text-xl font-semibold text-white'> rejected</p>
   </div>
     </div>
  
   { isLoading ? <LoadingOverlay visible={isLoading} /> : Deposits.length >0 ? <DepositTable openModal={setOpened}  setDeposit={setDeposit} data={Deposits} />  : (<div className='w-full h-full flex justify-center items-center' >
       <p>No Deposits yet</p>
       </div>)   }
   
       </div>
  )
}

export default Overview