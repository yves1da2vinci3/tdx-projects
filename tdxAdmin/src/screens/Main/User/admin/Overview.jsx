import React from 'react'
import TableSort from '../../../../Tables/TableSort'
import AddIcon from '../../../../assets/Icons/add.png'
import { Link } from 'react-router-dom'
import apiUrl from '../../../../utils/ApiUrl';
import { LoadingOverlay, Button, Group } from '@mantine/core'
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';
function Overview() {
  const [admins,setAdmins] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const fetchAdmin = async () => { 
    try {
      const {data} =  await axios.get(`${apiUrl}/api/admins`)
      console.log(data)
      setAdmins(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)

    }


   }
  useEffect(()=>{
    fetchAdmin()
  },[])
  const data = [
    {
     imageUrl : "https://upload.wikimedia.org/wikipedia/commons/f/fe/Paul_Kagame_2014.jpg",
     name : "Yves lionel",
     email : "yves.lionel.diomande",
     role : "senior Broker"
  },
    {
      imageUrl : "https://upload.wikimedia.org/wikipedia/commons/f/fe/Paul_Kagame_2014.jpg",
     name : "EdwardMensah",
     email : "edward.mensah@hotmail.com",
     role : "super Admin"
  },
    {
      imageUrl : "https://upload.wikimedia.org/wikipedia/commons/f/fe/Paul_Kagame_2014.jpg",
     name : "Berand Fereole",
     email : "berand.fereole@gmail.com",
     role : "Associate Broker "
  },
    {
      imageUrl : "data:image/jpeg;base64,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",
     name : "Syntiche attoh",
     email : "yves.lionel.diomande",
     role : "	Assistant Broker "
  },
]
  return (
    <div className='p-5 flex flex-col h-screen w-full' >
      <h1 className='text-center font-bold' >Adiministration Overview</h1>
         <div className='bg-g gap-x-2 mb-8 justify-around flex items-center mt-8'>

<Link to='/admin/administrator/create'  className='h-[10rem] flex flex-col pt-12  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer hover:bg-green-500 group'>
  <img src={AddIcon} className='h-[4rem] w-[4rem] self-center ' />
<p className='text-center text-md font-semibold group-hover:text-white '> Create a new administrator </p>
</Link>
<div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
  <p className='text-center text-7xl italic group-hover:text-white ' >{admins.length}</p>
<p className='text-center text-xl font-semibold group-hover:text-white'> administrators</p>
</div>


  </div>
  { isLoading ? <LoadingOverlay visible={isLoading} /> : <TableSort data={admins} />    }
       
    </div>
  )
}

export default Overview