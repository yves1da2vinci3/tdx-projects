import { InputBase } from '@mantine/core'
import React from 'react'
import { useRef } from 'react'
import axios from 'axios'
import apiUrl from '../../../utils/ApiUrl'
import { showNotification } from '@mantine/notifications'
import { useNavigate } from 'react-router'
function createHarvestYear() {
  const yearInput = useRef(null)
  const navigate = useNavigate()
const SubmitHandler = () => { 
  const year = yearInput.current.value
  try {
    const data = axios.post(`${apiUrl}/api/utils/harvests`,{year})
    showNotification({
      title: 'Harvest year Addition FeedBack',
      message: `Harvest year succesfully added`,
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
        title: 'Addition Failed',
        message: `harvest already there`,
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
    <p className='text-center font-bold '>Creation of a new harvest year</p>
    <div className='h-[15rem] drop-shadow-md mt-8 shadow-2xl p-8 flex flex-col gap-y-2  bg-white rounded-lg w-[34rem]' >
    
  

    <label> harvest year</label>
  <InputBase type="number" ref={yearInput} />
 
 <div onClick={SubmitHandler} className='mt-8'  >
             <input type='submit'
            className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
  value=" create harvest year"
         /> 
         </div>
    </div>
  </div>
  )
}

export default createHarvestYear