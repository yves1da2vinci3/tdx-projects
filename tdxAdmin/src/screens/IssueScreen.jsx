import { Avatar, Loader, LoadingOverlay } from '@mantine/core'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import IssueTable from "../Tables/IssueTable"
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
        const {data}  = await axios.get(`${apiUrl}/api/issues`)
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
      await  axios.put(`${apiUrl}/api/issues/${issue.id}`)
      setisLoading(true)
      setOpened(false)
      setissueLoading(false)
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
        title="issue information"
        size="lg"
      >
        <div className='h-auto flex flex-col' >
        <div className="h-[22rem] gap-y-3 grid grid-rows-2  " >
          <div className=' flex gap-x-5 p-2 ' >
            <Avatar  src={issue?.user?.userImgUrl}   className="rounded-full h-[10rem] w-[10rem]"  />
            <div className='flex-1 flex justify-center ml-8  flex-col'  >
             <p className='font-bold ' >Full Name: <span className='font-medium' >{issue.user ? issue.user.firstName + " "+ issue.user.lastName : "" }</span>  </p>
             <p className='font-bold ' >email: <span className='font-medium' >{ issue.user ? issue.user.email : ""}</span>  </p>
             <p className='font-bold ' >phone Number: <span className='font-medium' >{issue.user ?  issue.user.mobileNumber : ""}</span>  </p>
            </div>
          </div>
          <div className='bg-gray-400 bg-opacity-40 p-8 rounded-xl' >
           <p className='text-md font-semibold italic' >{ issue.user ? issue.content : ""}</p>
          </div>
        </div>
        { issue.status ? null : <div className='self-center' >
          { issueLoading ? <div className='bg-green-600 hover:bg-green-700 mt-3 h-[3rem] rounded-lg flex items-center justify-center w-[28rem]' >
            <Loader color="white" />
          </div>  :  <Button onClick={markAsResolve}  className='bg-green-600 hover:bg-green-700 mt-3' >mark as resolve</Button>}

        </div>  }
        
        </div>
      </Modal>

    <p className=' text-center text-xl'>issue Adminstration</p>
         {/* statistiques */}
         <div className='bg-g gap-x-2 mb-8 justify-around flex items-center mt-8'>
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
     <p className='text-center text-7xl italic group-hover:text-white ' >{ isLoading ? "..." : issues.length}</p>
   <p className='text-center text-xl font-semibold group-hover:text-white'> issues</p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
     <p className='text-center text-7xl italic group-hover:text-white ' >{ isLoading ? "..." : issues.filter(issue => issue.status === false  ).length}</p>
   <p className='text-center text-xl font-semibold group-hover:text-white'> on going</p>
   </div>
   <div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
     <p className='text-center text-7xl italic group-hover:text-white ' >{ isLoading ? "..." : issues.filter(issue => issue.status === true ).length}</p>
   <p className='text-center text-xl font-semibold group-hover:text-white'> resolved</p>
   </div>

     </div>
   
   {/* tickers tables */}
   { isLoading ? <LoadingOverlay visible={isLoading} /> : issues.length >0 ? <IssueTable openModal={setOpened} setIssue={setIssue} data={issues} />  : (<div className='w-full h-full flex justify-center items-center' >
       <p>No issues registered</p>
       </div>)   }
   
       </div>
  )
}

export default IssueScreen