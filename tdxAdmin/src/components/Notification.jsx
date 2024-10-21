import React from 'react'
import {BsBasket, BsBasket2Fill} from 'react-icons/bs'
import {IoArrowUpSharp,IoArrowDownSharp} from 'react-icons/io5'
import orderIcon from '../assets/Icons/orderNotfication.png'
import deposit from '../assets/Icons/depositNotification.png'
import customerIcon from '../assets/Icons/customerService.png'
import issueIcon from '../assets/Icons/warning.png'
import withdrawalIcon from '../assets/Icons/cashWithdrawal.png'
import requestIcon from '../assets/Icons/cancelled.png'
import formatDate from '../utils/FomatDateFromDb'
import { Link } from 'react-router-dom'
function Notification({notification}) {
  const NotificationTypes = {
    deposit : 1,
    basicOrder : 2,
    withdrawal : 3,
    call : 4,
    issue : 5,
    advancedOrder : 6,
    request : 7
  }
  const LinkToParent = notification.type ===2? `/admin/orders/basic/single/${notification.parentId}` : notification.type === 1 ?   `/admin/deposits/single/${notification.parentId}`  : notification.type === 6 ?  `/admin/orders/advanced/${notification.parentId}/single` : `/admin/withdrawals/basic/single/${notification.parentId}`
  return (
    <Link to={LinkToParent} className='h-[5.2rem] cursor-pointer hover:bg-slate-100 p-2 flex flex-col w-full  bg-white  border-b-2 ' >
          <div className='flex items-center gap-x-4 ' >
            {notification.type ===NotificationTypes.deposit ? <img src={deposit} className="h-[3rem] w-[3rem] " /> : notification.type ===NotificationTypes.basicOrder ||  notification.type === NotificationTypes.advancedOrder  ? <div className='h-[3.5rem]  w-[3.5rem] flex bg-blue-100 rounded-lg shadow-lg items-center justify-center ' >
           <img src={orderIcon} className='h-[1.5rem] ' />
          </div> : notification.type ===NotificationTypes.withdrawal ?  <img src={withdrawalIcon} className="h-[3rem] w-[3rem]"  /> : notification.type === NotificationTypes.call?  <img src={customerIcon} className="h-[3rem] w-[3rem]"  /> : notification.type ===  NotificationTypes.issue? <img src={issueIcon} className="h-[3rem] w-[3rem]"  /> :  <img src={requestIcon} className="h-[3rem] w-[3rem]"  /> } 
          
          <p className='text-sm font-medium italic ' >{notification.notificationContent} </p>
          
          </div>
          <p className='text-gray-600 italic self-end text-sm ' >{formatDate(notification.createdAt)}</p>
</Link>
  )
}

export default Notification