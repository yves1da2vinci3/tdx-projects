import { InputBase } from '@mantine/core'
import React from 'react'
import { useRef } from 'react'
import axios from 'axios'
import apiUrl from '../../../utils/ApiUrl'
import { showNotification } from '@mantine/notifications'
import { useNavigate } from 'react-router'
function createCountry() {
  const countryNumberInput = useRef(null)
  const countryNameInput = useRef(null)
  const countryImageInput = useRef(null)

  const navigate = useNavigate()
  /* A function that is called when the user clicks on the submit button. */
  const SubmitHandler = () => { 
    const countryNumber = Number(countryNumberInput.current.value)
    const countryImage = countryImageInput.current.value
    const countryName = countryNameInput.current.value
   
    try {
      const data = axios.post(`${apiUrl}/api/utils/countries`,{countryNumber,countryImage,countryName})
      showNotification({
        title: 'Country  Addition FeedBack',
        message: `Country  succesfully added`,
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
      navigate('/admin/settings/')
    } catch (error) {
      showNotification({
          title: 'addition  Failed',
          message: `country already there`,
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.red[6],
              borderColor: theme.colors.red[6],
  
              '&::before': { backgroundColor: theme.white },
            },
  
            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: theme.colors.red[7] },
            },
          })})
    }
   }
  return (
    <div className='flex w-full h-screen flex-col  items-center justify-center'>
      <p className='text-center font-bold '>Creation of a new country</p>
      <div className='h-[25rem] drop-shadow-md mt-8 shadow-2xl p-8 flex flex-col gap-y-2  bg-white rounded-lg w-[34rem]' >
      
    
  
      <label>Country name</label>
    <InputBase ref={countryNameInput}  />
      <label>Country Number</label>
    <InputBase ref={countryNumberInput} type="number" maxLength={3} />
  
    <label> Country Image</label>
    <InputBase  ref={countryImageInput} />
   <div onClick={SubmitHandler} className='mt-8'  >
               <input type='submit'
              className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
    value=" create country"
           /> 
           </div>
      </div>
    </div>
  )
}

export default createCountry