import { Avatar, Indicator, Loader, LoadingOverlay, Skeleton } from '@mantine/core'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import CallTable from "../../../Tables/CallTable"
import apiUrl from  "../../../utils/ApiUrl"
import { Modal, Button, Group } from '@mantine/core';
import { Calendar } from '@mantine/dates'
function IssueScreen() { 
  const [opened, setOpened] = useState(false);
  const [Calls,setCalls] = useState()
  const [Call,setCall] = useState({})
  const [isLoading,setisLoading] = useState(true)
  const [callLoading,setcallLoading] = useState(false)
  const fetchIssues = async () => {
    try {
        const {data}  = await axios.get(`${apiUrl}/api/calls`)
        console.log(data)
        setCalls(data)
        setisLoading(false)
    } catch (error) {
      console.log(error)
      setisLoading(false)
    }
    }
  useEffect(()=>{
fetchIssues()
  },[isLoading])

  const modalHandler = () => { 
    setOpened(true)
    setTimeout(()=>{
setOpened(false)
    },2000)
   }
   const markAsMade =  async() => { 
    setcallLoading(true)
    try {
      await  axios.put(`${apiUrl}/api/calls/${Call.id}`)
      setisLoading(true)
      setOpened(false)
      setcallLoading(false)
    } catch (error) {
      console.log(error)
    }
    }
  return (
    <div className='h-screen w-full flex flex-col p-5 ' > 
    <Modal
    centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Call information"
        size="lg"
      >
        <div className='h-auto flex flex-col' >
        <div className="h-auto gap-y-3 grid grid-rows-2  " >
          <div className=' flex gap-x-5 p-2 ' >
  <Avatar  src={Call.user?.userImgUrl}   className="rounded-full h-[10rem] w-[10rem]"  />  
          
          
            <div className='flex-1 flex justify-center ml-8  flex-col'  >
            <p className='font-bold ' >Full Name: <span className='font-medium' >  { Call.user?.firstName + " " + Call.user?.lastName} </span>  </p>
             <p className='font-bold ' >email: <span className='font-medium' > { Call.user?.email } </span>  </p>
             <p className='font-bold ' >phone Number: <span className='font-medium' >  {Call.user?.mobileNumber}</span>  </p>
            </div>
          </div>
          
            {isLoading ? <Skeleton height={80} /> : <div className=' border-t-2 border-slate-400  flex-col  flex justify-center ' > 
          <Calendar  initialMonth={new Date( Call?.callDate?.split('T')[0])}  renderDay={(date) => {
        const day = date.getDate();
        return (
          <Indicator size={10} color="red" offset={8} disabled={day !== new Date( Call?.callDate?.split('T')[0]).getDate()}>
            <div>{day}</div>
          </Indicator>
        );
      }} className='self-center'  />
      <p className='font-bold ' >from: <span className='font-medium' >  { Call?.fromTime } </span>  </p>
             <p className='font-bold ' >to: <span className='font-medium' > { Call?.endTime } </span>  </p>
       </div>}
          </div>
        
        {Call.status ? null :  <div className='self-center border-t-2 border-slate-400 w-full justify-center flex p-2' >
        { callLoading ? <div className='bg-green-600 hover:bg-green-700 mt-3 h-[3rem] rounded-lg flex items-center justify-center w-[28rem]' >
            <Loader color="white" />
          </div>  :  <Button onClick={markAsMade}  className='bg-green-600 hover:bg-green-700 mt-3' >mark as Made</Button>}
        </div>}
        

        </div>
      </Modal>

    <p className=' text-center text-xl'>call Adminstration</p>
         {/* statistiques */}
         <div className='bg-g gap-x-2 mb-8 justify-around flex items-center mt-8'>
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
     <p className='text-center text-7xl italic group-hover:text-white ' >{ isLoading ? "..." : Calls.length}</p>
   <p className='text-center text-xl font-semibold group-hover:text-white'> calls</p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
     <p className='text-center text-7xl italic group-hover:text-white ' >{ isLoading ? "..." : Calls.filter(elt => elt.status === false ).length}</p>
   <p className='text-center text-xl font-semibold group-hover:text-white'> not made </p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
     <p className='text-center text-7xl italic group-hover:text-white ' >{ isLoading ? "..." : Calls.filter(elt => elt.status === true ).length}</p>
   <p className='text-center text-xl font-semibold group-hover:text-white'> already made</p>
   </div>

     </div>
   
  
   {/* tickers tables */}
   { isLoading ? <LoadingOverlay visible={isLoading} /> : Calls.length >0 ? <CallTable openModal={setOpened} setCall={setCall} data={Calls} />  : (<div className='w-full h-full flex justify-center items-center' >
       <p>No calls registered</p>
       </div>)   }
   
       </div>
  )
}

export default IssueScreen