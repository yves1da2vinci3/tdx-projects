import React from 'react'
import { Button, InputBase, Select, SelectChevronIcon } from '@mantine/core';
import { useRef } from 'react'
import axios from 'axios'
import apiUrl from '../../../utils/ApiUrl'
import { showNotification } from '@mantine/notifications'
import { useNavigate } from 'react-router'
function createWarehouse() {
  const warehouseNameInput = useRef(null)
  const warehouseLocationInput = useRef(null)
  const warehouseSymbolInput = useRef(null)
  const navigate = useNavigate()
  /* A function that is called when the user clicks on the submit button. */
  const SubmitHandler = () => { 
    const warehouseName = warehouseNameInput.current.value
    const warehouseLocation = warehouseLocationInput.current.value
    const warehouseSymbol = warehouseSymbolInput.current.value
    try {
      const data = axios.post(`${apiUrl}/api/utils/warehouses`,{warehouseName,warehouseLocation,warehouseSymbol})
      showNotification({
        title: 'warehouse  Addition FeedBack',
        message: `warehouse  succesfully added`,
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
          title: 'addition Failed',
          message: `warehouse already there`,
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
      <p className='text-center font-bold '>Creation of a new warehouse</p>
      <div className='h-[25rem] drop-shadow-md mt-8 shadow-2xl p-8 flex flex-col gap-y-2  bg-white rounded-lg w-[34rem]' >
      
    
  
      <label>warehouse name</label>
    <InputBase  ref={warehouseNameInput}  />
      <label>warehouse Location</label>
    <InputBase  ref={warehouseLocationInput} />
  
    <label>Warehouse Symbol</label>
    <InputBase  ref={warehouseSymbolInput} />
   <div  onClick={SubmitHandler} className='mt-8'  >
               <input type='submit'
              className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
    value=" create warehouse"
           /> 
           </div>
      </div>
    </div>
  )
}

export default createWarehouse