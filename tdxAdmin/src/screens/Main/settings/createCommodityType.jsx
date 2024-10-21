import { InputBase, Select,Skeleton } from '@mantine/core'
import React,{useEffect, useRef, useState} from 'react'
import apiUrl from '../../../utils/ApiUrl';
import axios from 'axios'
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
function createCommodityType() {
  const commoditySelect = useRef(null)
  const commodityTypeNameInput = useRef(null)
  const commodityTypeSymbolInput = useRef(null)
  const [isLoading,setIsLoading] = useState(true)
   const getCommodities = async () => { 
  const {data} = await axios.get(`${apiUrl}/api/utils/commodities`) 
  console.log(data)
  setCommodities(data)
  setIsLoading(false)
    }
  const [commodities,setCommodities] = useState()

  useEffect(()=>{
  getCommodities()
  },[])
  const SubmitHandler = async () => { 
    const commodityName = commoditySelect.current.value
    const commodityTypeName = commodityTypeNameInput.current.value
    const commodityTypeSymbol = commodityTypeSymbolInput.current.value
    const commodityId = commodities[commodities.findIndex( commodity => commodity.commodityName === commodityName)].id
      
    try {
      await axios.post(`${apiUrl}/api/utils/commodityTypes`,{commodityTypeName,commodityTypeSymbol,commodityId})
      showNotification({
        title: 'commidity type  Addition FeedBack',
        message: `commidity type  succesfully added`,
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
          message: `commidity type already there`,
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
    <p className='text-center font-bold '>Creation of a new commodity Type</p>
    <div className='h-[23rem] drop-shadow-md mt-8 shadow-2xl p-8 flex flex-col gap-y-2  bg-white rounded-lg w-[34rem]' >
    
  

    {isLoading ? <Skeleton height={17} radius="xl" />:  <Select
      label="Commodity Name"
      ref={commoditySelect}
      placeholder="Pick one"
      searchable
      nothingFound="No options"
      data={commodities.map((commodity) => ( commodity.commodityName ))}
    /> }
  <label>Commodity Type Name</label>
  <InputBase  ref={commodityTypeNameInput} />
  <label>Commodity Type Symbol</label>
  <InputBase  ref={commodityTypeSymbolInput} />

 <div onClick={SubmitHandler} className='mt-8'  >
             <input type='submit'
            className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
  value=" create commodity type"
         /> 
         </div>
    </div>
  </div>
  )
}

export default createCommodityType