import { Avatar, Button, Skeleton } from '@mantine/core'
import { IconTrashOff } from '@tabler/icons'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import deposit from '../../../../assets/Icons/depositNotification.png'
import warehouseIcon from '../../../../assets/Icons/delivery.png'
import commodityIcon from '../../../../assets/Icons/SendNotification.png'
import commodityCategoryIcon from '../../../../assets/Icons/moneyBag.png'
import countryIcon from '../../../../assets/Icons/edit.png'
import harverstIcon from '../../../../assets/Icons/transactionHistory.png'
import calendarIcon from '../../../../assets/Icons/comment.png'
import metricIcon from '../../../../assets/Icons/graph.png'
import {countryImg, UserImgUrl} from '../../../../utils/DummyData.js'
import axios from 'axios'
import apiUrl from '../../../../utils/ApiUrl'
import formatMoney from '../../../../utils/formatMoney'
import UserMetricsModal from '../../../../Modals/userActionsModal/UserMetricsModal'
import SendNotification from '../../../../Modals/userActionsModal/SendNotification'
import ModifyUserModal from '../../../../Modals/userActionsModal/ModifyUserModal'
function SingleUser() {
  const [isLoading,setIsLoading] = useState(true)
// state for managind user Actions
const [userMetrics,setUserMetrics] =useState(false)
const [SendingNotification,setSendingNotification] =useState(false)
const [ModifyUserModalStatus,setModifyUserModalStatus] =useState(false)
// others statre
  const {userId} = useParams()
  const [User,setUser] = useState({})
  const fetchSingleUser =  async() => { 
    try {
      const {data} = await axios.get(`${apiUrl}/api/users/${userId}`)
      setUser(data)
      console.log(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
   }
   useEffect(() => {
    fetchSingleUser()
   
   }, [])
 
  return (
    <div className='h-[90vh] flex   ml-0' >
      {/* actions for user */}
      {/* modals for actions */}
      {/* ** place an order */}
      {/* send notification */}
      <SendNotification setSendingNotification={setSendingNotification} SendNotification={SendingNotification} />
      {/* modify account */}
      <ModifyUserModal setModifyUserModalStatus={setModifyUserModalStatus}  ModifyUserModalStatus={ModifyUserModalStatus} />
      {/* see userMertics */}
      <UserMetricsModal setUserMetrics={setUserMetrics} userMetrics={userMetrics} />
      {/* add user Comment */}
      {/* place deposits or withdrawal */}
      {/* modify cash Balance */}
     <div className='flex-1 flex flex-col px-2 ' >
          {/* user Info */}
          <div className='h-[18rem]'>
          <div className='  flex  items-center justify-center   gap-x-4 p-2 ' >
  { isLoading ? <Skeleton height={34} circle /> :  <Avatar  src={User.userImgUrl}   className="rounded-full h-[10rem] w-[10rem]"  />  }
           
            <div className='flex-1 flex gap-y-4 justify-center ml-8  flex-col'  >
             <p className='font-bold ' >Full Name: <span className='font-medium' > {isLoading?  <Skeleton height={20} radius="xl" /> : User.firstName + " " + User.lastName    }</span>  </p>
             <p className='font-bold ' >email: <span className='font-medium' >{isLoading?  <Skeleton height={20} radius="xl" /> : User.email} </span>  </p>
             <p className='font-bold ' >phone Number: <span className='font-medium' >{isLoading?  <Skeleton height={20} radius="xl" /> : User.mobileNumber }</span>  </p>
             <p className='font-bold ' >bank Account Number: <span className='font-medium' >{isLoading?  <Skeleton height={20} radius="xl" /> : User.bankAccountNumber }</span>  </p>
             <p className='font-bold ' >Money Account: <span className='font-medium' >{isLoading?  <Skeleton height={20} radius="xl" /> : formatMoney(User.moneyAccount)  }</span>  </p>
             <Button leftIcon={<IconTrashOff />} className='bg-red-500 w-[12rem] hover:bg-red-800' >Ban User </Button>
            </div>
             <div className=' w-[12rem] h-[18rem]   flex items-center flex-col justify-start  py-8 ' >
              <p className='text-lg font-semibold'>Country</p>
              <div className='w-[10rem] h-[7rem] bg-blue-600 '>
                <img src={countryImg} className='w-[10rem] h-[7rem] object-cover' />
              </div>
             </div>
          </div>
          </div>
          {/* actions on a particular user */}
          <div className='h-[40rem]   flex-col flex p-4  ' >
    <p className='text-lg text-center font-semibold' > Actions on User </p>
                  {/* actions card */}
                  <div className='flex gap-4  justify-center flex-wrap '> 
      <Link to='/admin/warehouse/create' className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[10rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[10rem] bg-white' >
        <img src={warehouseIcon} className="h-[5rem] " />
        <p className='text-center font-bold' >place an order</p>
      </Link>
      <div  onClick={()=> setSendingNotification(true)}  className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[10rem] gap-y-3 items-center flex-col justify-center flex p-2 w-[10rem] bg-white' >
        <img src={commodityIcon} className="h-[5rem] " />
        <p className='text-center font-bold' >send an notification</p>
      </div>
      <div onClick={()=> setModifyUserModalStatus(true)} className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[10rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[10rem] bg-white' >
        <img src={countryIcon} className="h-[5rem] " />
        <p className='text-center font-bold text-sm' >Modify Account Information</p>
      </div>
      <Link to='/admin/settings/createCommodityCategory' className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[10rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[10rem] bg-white' >
        <img src={commodityCategoryIcon} className="h-[5rem] " />
        <p className='text-center font-bold' >Modify money cash </p>
      </Link>
      <Link to='/admin/settings/createCommodityType' className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[10rem] gap-y-3 items-center flex-col justify-center flex p-2 w-[10rem] bg-white' >
        <img src={harverstIcon} className="h-[5rem] " />
        <p className='text-center text-sm font-bold' >Place a withdrawal or deposit</p>
      </Link>
      <Link to='/admin/settings/createHarvest' className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[10rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[10rem] bg-white' >
        <img src={calendarIcon} className="h-[5rem] " />
        <p className='text-center font-bold' >add comment</p>
      </Link>
      <div onClick={()=> setUserMetrics(true)} className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[10rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[10rem] bg-white' >
        <img src={metricIcon} className="h-[5rem] " />
        <p className='text-center font-bold' >see User Metrics</p>
      </div>
      </div>
          </div>
     </div>
     <div className='w-[20rem] flex-col bg-slate-50 h-[43.2rem] bg ' >
<div className='h-[3rem] bg-white drop-shadow-sm border-slate-100 border-2 shadow-sm flex items-center px-2 ' >
  <p className='text-lg font-bold '>User pending opertations </p>
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
  </> : [...new Array(10).keys()].map(nothing => (
      <Link to="/" className='h-[5.2rem] cursor-pointer hover:bg-slate-100 p-2 flex flex-col w-full  bg-white  border-b-2 ' >
      <div className='flex items-center gap-x-4 ' >
         <img src={deposit} className="h-[3rem] w-[3rem] " /> 
      
      <p className='text-sm font-medium italic ' > User X Made a new Deposit</p>
      
      </div>
      <p className='text-gray-600 italic self-end text-sm ' >12/12/2022</p>
</Link>
  ))  }
</ul>
      </div>
      </div>
  )
}

export default SingleUser