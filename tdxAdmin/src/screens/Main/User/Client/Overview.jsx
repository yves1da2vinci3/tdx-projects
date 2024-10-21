import React, { useState } from 'react'
import UserTableSort from '../../../../Tables/UserTableSort'
import AddIcon from '../../../../assets/Icons/add.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../../utils/ApiUrl'
import {LoadingOverlay} from '@mantine/core'
import { useEffect } from 'react'
function Overview() {
  const [isLoading,setisLoading] = useState(true)
  const [users,setUsers] = useState([])
  const [countries,setCountries] = useState([])
const fecthUsers = async () => { 
try {
  const {data} = await axios.get(`${apiUrl}/api/users`)
  setUsers(data.users)
  setCountries(data.countries)
  setisLoading(false)
} catch (error) {
  console.log(error)
  setisLoading(false)

}
 }

 useEffect(()=>{
fecthUsers()
 },[])
  return (
    <div className='p-5 flex flex-col h-screen w-full' >
      <h1 className='text-center font-bold' >Client Overview</h1>
         <div className='bg-g gap-x-2 mb-8 justify-around flex items-center mt-8'>

<Link to='/admin/client/create'  className='h-[10rem] flex flex-col pt-12  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer hover:bg-green-500 group'>
  <img src={AddIcon} className='h-[4rem] w-[4rem] self-center ' />
<p className='text-center text-md font-semibold group-hover:text-white '> Create a new client </p>
</Link>
<div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
  <p className='text-center text-7xl italic group-hover:text-white ' >{isLoading ? "..." : users.length}</p>
<p className='text-center text-xl font-semibold group-hover:text-white'> Client</p>
</div>


  </div>
  { isLoading? <LoadingOverlay visible={isLoading} />:   <UserTableSort countries={countries} data={users} /> }
     
    </div>
  )
}

export default Overview