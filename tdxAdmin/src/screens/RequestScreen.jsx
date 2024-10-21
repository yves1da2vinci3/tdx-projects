import { Avatar, Loader, LoadingOverlay } from '@mantine/core'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import RequestTable from "../Tables/RequestTables"
import apiUrl from '../utils/ApiUrl'
import { Modal, Button, Group } from '@mantine/core';
function IssueScreen() { 
  const [opened, setOpened] = useState(false);
  const [issues,setIssues] = useState()
  const [issue,setIssue] = useState({})
  const [isLoading,setisLoading] = useState(true)
  const [issueLoading,setissueLoading] = useState(false)

  const fetchIssues = async () => {
    try {
        const {data}  = await axios.get(`${apiUrl}/api/requests`)
        setIssues(data)
        setisLoading(false)
    } catch (error) {
      console.log(error)
      setisLoading(false)
    }
    }
  useEffect(()=>{
fetchIssues()
  },[isLoading])

  const markAsResolve = async () => { 
    setissueLoading(true)
    try {
      await  axios.put(`${apiUrl}/api/requests/${issue.id}`)
      setisLoading(true)
      setOpened(false)
      setissueLoading(false)
    } catch (error) {
      console.log(error)
    }
   }
  return (
    <div className='h-screen w-full flex flex-col p-5 ' > 
    

    <p className=' text-center text-xl'>Requests Adminstration</p>
         {/* statistiques */}
         <div className='bg-g gap-x-2 mb-8 justify-around flex items-center mt-8'>
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
     <p className='text-center text-7xl italic group-hover:text-white ' >{ isLoading ? "..." : issues.length}</p>
   <p className='text-center text-xl font-semibold group-hover:text-white'> Requests</p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
     <p className='text-center text-7xl italic group-hover:text-white ' >{ isLoading ? "..." : issues.filter(issue => issue.status === 1  ).length}</p>
   <p className='text-center text-xl font-semibold group-hover:text-white'> pending</p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
     <p className='text-center text-7xl italic group-hover:text-white ' >{ isLoading ? "..." : issues.filter(issue => issue.status === 2 ).length}</p>
   <p className='text-center text-xl font-semibold group-hover:text-white'> approved</p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
     <p className='text-center text-7xl italic group-hover:text-white ' >{ isLoading ? "..." : issues.filter(issue => issue.status === 3 ).length}</p>
   <p className='text-center text-xl font-semibold group-hover:text-white'> rejected</p>
   </div>

     </div>
   
   {/* tickers tables */}
   { isLoading ? <LoadingOverlay visible={isLoading} /> : issues.length >0 ? <RequestTable openModal={setOpened} setIssue={setIssue} data={issues} />  : (<div className='w-full h-full flex justify-center items-center' >
       <p>No issues registered</p>
       </div>)   }
   
       </div>
  )
}

export default IssueScreen