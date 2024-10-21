import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import apiUrl from '../../../utils/ApiUrl'
import { Modal, Button, Avatar, Input, LoadingOverlay, Indicator, Loader } from '@mantine/core';
import WithDrawalTable from '../../../Tables/WithdrawalsTable'
import { Calendar } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
function WithdrawalsOverview() {
  const [isLoading,setIsLoading] = useState(true)

  const [isLoadingReject,setIsLoadingReject] = useState(false)

  const [isLoadingAccept,setIsLoadingAccept] = useState(false)

  const [Withdrawals,setWithdrawals] = useState([])

  const [Withdrawal,setWithdrawal] = useState({})

  const [opened, setOpened] = useState(false);

  const [IsRejected, setIsRejected] = useState(false);

  const GHSInUSDInput = useRef(null)

  const [isWireTransfer, setisWireTransfer] = useState(false);

  const reasonInput = useRef(null)
   const FecthWithdrawals = async () => { 
    try {
      const {data} = await axios.get(`${apiUrl}/api/admins/withdrawals`)
      console.log(data)
      setWithdrawals(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
   
   }
  useEffect(()=>{
    FecthWithdrawals()
  },[isLoading])
 /* A function that is called when the admin wants to reject a withdrawal. */
  const RejectHandler = async () => {
    // test if the input for given reason is already there 
    if(IsRejected){
      setIsLoadingReject(true)
      try {
        const data = {
          reason : reasonInput.current.value,
           userId : Withdrawal.user.id
        }
        console.log(data)
        await axios.put(`${apiUrl}/api/admins/${Withdrawal.id}/withdrawals/decline`,{...data})
        showNotification({
          title: 'Decline  FeedBack',
          message: `Withrawal  successfully  declined`,
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
   const ApproveHandler = async () => { 
    // test if it is not a wire transfer
    if(Withdrawal?.withDrawalTo !== "Wire Transfer"){
      setIsLoadingAccept(true)
      let data = {
        userId : Withdrawal.user.id,
        amount : Withdrawal?.amount,
        type : Withdrawal.type ? Withdrawal.type : null,
        tickerId : Withdrawal.ticker ? Withdrawal.ticker.id : null ,
        qty : Withdrawal.qty ? Withdrawal.qty : null
      }
  try {
  await axios.put(`${apiUrl}/api/admins/${Withdrawal.id}/withdrawals/approve`,{...data})
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
    // test if  it is wireTransfer and the button is not there
    else if(Withdrawal.withDrawalTo ==="Wire Transfer" && isWireTransfer === false ){
setisWireTransfer(true)
    }
    //
    else{
      setIsLoadingAccept(true)
      let data = {
        userId : Withdrawal.user.id,
        amount : Withdrawal?.amount,
        type : Withdrawal.type ? Withdrawal.type : null,
        tickerId : Withdrawal.ticker ? Withdrawal.ticker.id : null ,
        qty : Withdrawal.qty ? Withdrawal.qty : null,
        GHSInUSD : GHSInUSDInput.current.value
      }
  try {
  await axios.put(`${apiUrl}/api/admins/${Withdrawal.id}/withdrawals/approve`,{...data})
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
            title="Withdrawal information"
            size="lg"
          >
            <div className='h-auto flex flex-col' >
             {/* modal body  */}
            <div className="h-auto gap-y-3 grid auto-rows-auto grid-flow  " >
              {/* userInfo  */}
              <div className=' flex gap-x-5 p-2 ' >
                <Avatar  src={ Withdrawal.user ? Withdrawal.user.userImgUrl : ""}   className="rounded-full h-[10rem] w-[10rem]"  />
                <div className='flex-1 flex justify-center ml-8  flex-col'  >
                 <p className='font-bold ' >Full Name: <span className='font-medium' >{Withdrawal.user ? Withdrawal.user.firstName + " "+ Withdrawal.user.lastName : "" }</span>  </p>
                 <p className='font-bold ' >email: <span className='font-medium' >{ Withdrawal.user ? Withdrawal.user.email : ""}</span>  </p>
                 <p className='font-bold ' >phone Number: <span className='font-medium' >{Withdrawal.user ?  Withdrawal.user.mobileNumber : ""}</span>  </p>
                </div>
              </div>
              <div>
                <div className='flex gap-x-4 items-center ' >
              <p className='text-lg' >Withdrawal Type : </p>
              <div className='h-6 w-auto p-2 flex rounded- bg-pink-300 justify-center items-center' >
            <p className='text-pink-700' >{Withdrawal?.type ===1 ? "Cash Withdrawal" : "Commodity withdrawal" }</p>
          </div>
              </div>
              <div className=' flex gap-x-5 p-2 ' >
                {Withdrawal.type ===2 ?
                 <div className='flex-1 flex justify-center ml-8  flex-col'  >
                 <p className='font-bold ' >Ticker: <span className='font-medium' >{ Withdrawal.ticker.title  }</span>  </p>
                </div> :  <div className='flex-1 flex justify-center ml-8  flex-col'  >
                 <p className='font-bold ' >Amount: <span className='font-medium' >{ Withdrawal.amount  + " " +  `${ Withdrawal.withDrawalTo ==="Wire Transfer"? "USD" :"GHS"}` }</span>  </p>
                </div>
                }

                {
                  Withdrawal.type === 2 ? <div className='flex-1 flex justify-center ml-8  flex-col'  >
                  <p className='font-bold ' >Quantity : <span className='font-medium' >{ Withdrawal.qty + " " + "MT" }</span>  </p>
                 </div> :  <div className='flex-1 flex justify-center ml-8  flex-col'  >
                 <p className='font-bold ' >Withdrawal to: <span className='font-medium' >{ Withdrawal.withDrawalTo }</span>  </p>
                </div>
                }
               
               
              </div>
              {/* // Calendar  */}
              {Withdrawal.type ===2 ? <div className='flex justify-center ' >  <Calendar  initialMonth={new Date( Withdrawal.dateToWithdrawal.split('T')[0])}  renderDay={(date) => {
        const day = date.getDate();
        return (
          <Indicator size={10} color="red" offset={8} disabled={day !== new Date( Withdrawal.dateToWithdrawal.split('T')[0]).getDate()}>
            <div>{day}</div>
          </Indicator>
        );
      }} className='self-center'  /> </div> : null}
              </div>
            </div>
            {/* input for reason  */}
            {IsRejected ? <>
        <label className='mt-12' >Reason of rejection</label>
        <Input ref={reasonInput} type="text" className='ring-green-200 ring-2' placeholder="we met some issue" />
        </> : "" }
        {isWireTransfer ? <>
        <label className='mt-12' > Value From USD to GHS </label>
        <Input ref={GHSInUSDInput} type="number" className='ring-green-200 ring-2' placeholder="320" />
        </> : "" }

       {  Withdrawal.status !== 0 ? null :  <div className='self-center flex gap-x-8' >
          {isLoadingReject ? <div className='bg-red-600 w-[14rem] rounded-lg h-[3rem] mt-3 flex items-center justify-center ' >
          <Loader size="lg" variant="dots"  color="white" />
          </div> :<Button    onClick={RejectHandler} className='bg-red-600 w-[14rem] hover:bg-red-700 mt-3' >{ IsRejected ? "Confirm" : "Reject"}</Button> }

{ isLoadingAccept ? <div className='bg-green-600 w-[14rem] rounded-lg h-[3rem] mt-3 flex items-center justify-center ' >
          <Loader size="lg" variant="dots"  color="white" />

          </div> :  IsRejected ? " " : <Button  onClick={ApproveHandler} className='bg-green-600 w-[14rem] hover:bg-green-700 mt-3' >Approve</Button> }
        </div>
        }
       

        </div>
          </Modal>
    
        <p className=' text-center text-xl'>Withdrawals Adminstration   </p>
             {/* statistiques */}
             <div className='bg-g gap-x-2 mb-8 justify-around flex items-center mt-8'>
       <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-blue-600 drop-shadow-md cursor-pointer   group'>
         <p className='text-center text-7xl italic text-white ' >{ isLoading? "..." : Withdrawals.length   }</p>
       <p className='text-center text-xl font-semibold text-white'> totals</p>
       </div>
       <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-yellow-400 drop-shadow-md cursor-pointer   group'>
         <p className='text-center text-7xl italic text-white ' >{ isLoading ?   "..." : Withdrawals.filter(elt => elt.status === 0 ).length }</p>
       <p className='text-center text-xl font-semibold text-white'> pending</p>
       </div>
       <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-green-400 drop-shadow-md cursor-pointer   group'>
         <p className='text-center text-7xl italic text-white ' >{ isLoading ?   "..." : Withdrawals.filter(elt => elt.status === 1 ).length }</p>
       <p className='text-center text-xl font-semibold text-white'> approved</p>
       </div>
       
       <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-red-400 drop-shadow-md cursor-pointer   group'>
         <p className='text-center text-7xl italic text-white ' >{ isLoading ?   "..." : Withdrawals.filter(elt => elt.status === 2 ).length }</p>
       <p className='text-center text-xl font-semibold text-white'> rejected</p>
       </div>
         </div>
      
       { isLoading ? <LoadingOverlay visible={isLoading} /> : Withdrawals.length >0 ? <WithDrawalTable openModal={setOpened}  setWithdrawal={setWithdrawal} data={Withdrawals} />  : (<div className='w-full h-full flex justify-center items-center' >
           <p>No Withdrawals yet</p>
           </div>)   }
       
           </div>
  )
}

export default WithdrawalsOverview