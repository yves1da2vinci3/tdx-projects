import { Button, InputBase, LoadingOverlay, Select, SelectChevronIcon, Skeleton } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { BsFillBagPlusFill, BsPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import apiUrl from '../../../../utils/ApiUrl';

function CreateUser() {
  const [isLoading,setIsLoading] = useState(true)
  const [submitLoading,setsubmitLoading] = useState(false)
  const [countryId,setCountryId] = useState()
  const [countries,setCountries] = useState([])
const countrySelect = useRef(null)
// state for form
const  firstNameRef = useRef(null)
const lastNameRef = useRef(null)
const emailRef = useRef(null)
const mobileNumberRef = useRef(null)
const bankAccountNumberRef = useRef(null)
const passwordRef = useRef(null)
const confirmPasswordRef = useRef(null)

const navigate = useNavigate()

const createUser = async() => { 
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  const formData = new FormData()
  formData.append("firstName",firstNameRef.current.value)
  formData.append("lastName",lastNameRef.current.value)
  formData.append("password",passwordRef.current.value)
  formData.append("mobileNumber",mobileNumberRef.current.value)
  formData.append("email",emailRef.current.value)
  formData.append("bankAccountNumber",bankAccountNumberRef.current.value)
  formData.append("countryId",countryId)
  formData.append("file",file)

  try {
    setsubmitLoading(true)
     await axios.post(`${apiUrl}/api/users`,formData,config)
     showNotification({
      title: ' Client Creation FeedBack',
      message: `Client  succesfully created`,
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.green[6],
          borderColor: theme.colors.green[6],

          '&::before': { backgroundColor: theme.white },
        },

        title: { color: theme.white },
        description: { color: theme.white },
        closeButton: {
          color: theme.white,
          '&:hover': { backgroundColor: theme.colors.green[7] },
        },
      })})
      navigate('/admin/client')
  } catch (error) {
    console.log(error)
    setsubmitLoading(false)
  }
 }

const countryOnChange = (value) => { 
  const index = countries.findIndex(country => country.countryName === value)
  setCountryId(countries[index].id)
 }

  const fetchCountries =  async() => { 
    try {
      const {data} = await axios.get(`${apiUrl}/api/utils/countries`)
      setCountries(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)

    }
   }
   useEffect(()=>{
    fetchCountries()
   },[])
  const fileInput = useRef(null)
const [file,setFile] = useState(null)
const fileHandler = (e) => { 
  setFile(e.target.files[0])
 }
  return (
    <div className='flex w-full h-screen flex-col  items-center justify-center'>
      <p className='text-center font-bold '>Creation of a new client</p>
      <div className='h-auto drop-shadow-md mt-8 shadow-2xl p-8 flex flex-col gap-y-2  bg-white rounded-lg w-auto' >
        <LoadingOverlay color='green' visible={submitLoading} /> 
        <input onChange={fileHandler} type="file" className='hidden' ref={fileInput} />
      <div className='h-36 w-36  rounded-full self-center relative' >
        <img  className='h-36 w-36 rounded-full'  src={file ? URL.createObjectURL(file) : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
        <div onClick={()=> fileInput.current.click() } className='h-10 w-10 cursor-pointer hover:bg-green-800 bg-green-600 bottom-0 right-2 absolute flex items-center justify-center rounded-full ' >
          <BsPlus size={28} color='white' />
        </div>
      </div>
      <div className='flex gap-x-4 w-full  items-center ' >
        <div className='flex-1' >
        <label>First Name</label>
    <InputBase  ref={firstNameRef} /> 
        </div>
      
      <div className='flex-1' >
      <label>Last Name</label>
    <InputBase ref={lastNameRef}  /> 
      </div>
    
      </div>
       
       <div className='flex gap-x-4' >
        <div className='flex-1' >
        <label>Email </label>
    <InputBase ref={emailRef} type='email' />   
        </div>
     
     <div className='flex-1'>
     <label>Phone Number </label>
    <InputBase ref={mobileNumberRef} type='text' /> 
     </div>
        
    
       </div>
       <label>Bank Account Number</label>
    <InputBase ref={bankAccountNumberRef} type='text' />   
      <label>Password </label>
    <InputBase ref={passwordRef} type='password'  minLength={8} />   
      <label>Confirm  Password </label>
    <InputBase ref={confirmPasswordRef} type='password' minLength={8}  />   

 
    {isLoading ? <Skeleton height={17} radius="xl" /> :   <Select
     ref={countrySelect}
    label="Country Name"
    onChange={countryOnChange}
    placeholder="Pick one"
    searchable
    nothingFound="No options"
    data={countries.map((country) => ( country.countryName ))}
  /> }
   <div onClick={createUser} className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm" >
               <p>create client</p>
               
     
           
           </div>
      </div>
    </div>
  )
}

export default CreateUser