import React from 'react'
import { Link } from 'react-router-dom'
import depositIcon from '../../../assets/Icons/deposit.png'
import WithDrawalIcon from '../../../assets/Icons/withdrawal.png'
function HomeScreen() {
  return (
    <div className='flex flex-col  justify-center items-center h-screen gap-7' >
      <h1 className='text-xl font-semibold' >Choose a card</h1>
      <div className='flex gap-7 '> 
      <Link to='/admin/transactions/withdrawals' className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[24rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[24rem] bg-white' >
        <img src={WithDrawalIcon} className="h-[12rem] " />
        <p className='text-center font-bold' >Withdrawals</p>
      </Link>
      <Link to="/admin/transactions/deposits" className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[24rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[24rem] bg-white' >
        <img src={depositIcon} className="h-[12rem] " />
        <p className='text-center font-bold' > Deposits</p>
      </Link>
      </div>
      
    </div>
  )
}

export default HomeScreen