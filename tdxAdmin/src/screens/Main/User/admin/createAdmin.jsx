import { Button, InputBase, Select,PasswordInput } from '@mantine/core';
import React, { useRef, useState } from 'react'



function CreateAdmin() {

  return (
    <div className='flex w-full h-screen flex-col  items-center justify-center'>
      <p className='text-center font-bold '>Creation of a new administator</p>
      <div className='h-[35rem] drop-shadow-md mt-8 shadow-2xl p-8 flex flex-col gap-y-2  bg-white rounded-lg w-[34rem]' >
      
      <label>First Name</label>
    <InputBase  />   
      <label>Last Name</label>
    <InputBase  />   
      <label>Email </label>
    <InputBase type='email' />   
      <label>Password </label>
    <PasswordInput   minLength={8} />   
      <label>Confirm  Password </label>
    <PasswordInput  minLength={8}  />   

 
   <Select
      label="role"
      placeholder="Pick one"
      searchable
      nothingFound="No options"
      data={['Super Admin', 'Senior Broker', 'Associate Broker', 'Assistance Broker']}
    />
   <div  >
               <input type='submit'
              className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
    value=" create administrator"
           /> 
           </div>
      </div>
    </div>
  )
}

export default CreateAdmin