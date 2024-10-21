import React from 'react'
import { Link } from 'react-router-dom'
import basicOrderIcon from '../../../assets/Icons/delivery.png'
import advancedOrderIcon from '../../../assets/Icons/order.png'
function HomeScreen() {
  return (
    <div className='flex flex-col  justify-center items-center h-screen gap-7' >
      <h1 className='text-xl font-semibold' >Choose a card</h1>
      <div className='flex gap-7 '> 
      <Link to='/admin/orders/basic' className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[24rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[24rem] bg-white' >
        <img src={basicOrderIcon} className="h-[12rem] " />
        <p className='text-center font-bold' >basic Orders</p>
      </Link>
      <Link to="/admin/orders/advanced" className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[24rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[24rem] bg-white' >
        <img src={advancedOrderIcon} className="h-[12rem] " />
        <p className='text-center font-bold' >advanced orders</p>
      </Link>
      </div>
      
    </div>
  )
}

export default HomeScreen