import React, { useRef, useState } from 'react'
import { Button, FileButton, InputBase, Loader, Select, SelectChevronIcon, Skeleton } from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import axios from 'axios';
import apiUrl from '../../../utils/ApiUrl';
import { useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router';
function createCommodity() {
  const navigate = useNavigate()
  const commodityNameRef = useRef(null)
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [commoditiesCategory,setCommoditiesCategory] = useState([])
  const [commodityCategoryId,setCommodityCategoryId] = useState("")
const fetchCommoditiesCategory = async ()=>{
try {
  const {data} = await axios.get(`${apiUrl}/api/utils/commodityCategories`)
  setCommoditiesCategory(data)
  setIsLoading(false)
  console.log(data)
} catch (error) {
  setIsLoading(false)
  console.log(error)
}
}
/* A react hook that is called when the component is mounted. */
useEffect(()=>{
fetchCommoditiesCategory()
},[])

/**
 * 
 */
/**
 * 
 */
const onSelectCommodityCategory = (e) => { 
setCommodityCategoryId(commoditiesCategory.filter(commodityCategory => commodityCategory.commodityCategoryName = e )[0].id)

 }

 const createCommodity = async () => { 
  setIsSubmitLoading(true)
  const commodityName = commodityNameRef.current.value
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  const form = new FormData()
  form.append("categoryId",commodityCategoryId)
  form.append("file",file)
  form.append("commodityName",commodityName)
  try {
    await axios.post(`${apiUrl}/api/utils/commodities`,form,config)
    showNotification({
      title: 'Commodity Addition FeedBack',
      message: `commodity succesfully added`,
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
      navigate('/admin/settings')
    setIsSubmitLoading(false)
  } catch (error) {
    console.log(error)
    setIsSubmitLoading(false)
  }
  }
  return (
    <div className='flex w-full h-screen flex-col  items-center justify-center'>
      <p className='text-center font-bold '>Creation of a new commodity</p>
      <div className='h-[24rem] drop-shadow-md mt-8 shadow-2xl p-8 flex flex-col gap-y-2  bg-white rounded-lg w-[34rem]' >
      
    
  { isLoading ? <Skeleton height={20} /> : <Select
      label="Commodity category"
      placeholder="Pick one"
      searchable
      nothingFound="No options"
      onChange={onSelectCommodityCategory}
      data={commoditiesCategory.map(commodityCategory => commodityCategory.commodityCategoryName)}
    /> }
  
    <label>Commodity Name</label>
    <InputBase  ref={commodityNameRef} />
    <FileButton  onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button leftIcon={<IconUpload/>} className='h-24 bg-green-500 hover:bg-green-700' {...props}>Upload image</Button>}
        </FileButton>

              
           <div  onClick={createCommodity} className=" flex justify-center  mt-8 py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm" >
            {isSubmitLoading ? <Loader color="white"  /> : <p >create commodity</p> }
            
          
           </div>
      </div>
    </div>
  )
}

export default createCommodity