import { Button, InputBase, Select, SelectChevronIcon,Skeleton } from '@mantine/core';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import apiUrl from '../../../utils/ApiUrl';
import axios from 'axios'
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
function AddTicker() {
  const navigate = useNavigate()
  // state for different utils
const [countries,setCountries] = useState()
const [warehouses,setWarehouses] = useState()
const [grades,setGrades] = useState()
const [commodities,setCommodities] = useState()
const [commodityTypes,setCommodityTypes] = useState()
const [isLoading,setIsLoading] = useState(true)
//ref Values
const countrySelect = useRef(null)
const warehouseSelect = useRef(null)
const commodityNameSelect = useRef(null)
const commodityTypeNameSelect = useRef(null)
const gradeSelect = useRef(null)
const TickerNameInput = useRef(null)

  /* A function that is called when the component is mounted. It makes a request to the backend
  to get the different utils that are needed to create a ticker. */
  const GetUtils = async () => { 
     
     const [countries,warehouses,grades,commodities,commoditiesTypes] = await Promise.all([axios.get(`${apiUrl}/api/utils/countries`),
     axios.get(`${apiUrl}/api/utils/warehouses`),axios.get(`${apiUrl}/api/utils/grades`),
     axios.get(`${apiUrl}/api/utils/commodities`),axios.get(`${apiUrl}/api/utils/commodityTypes`)])
    /* Returning an object with the three properties. */
   setCountries( countries.data )
   setWarehouses( warehouses.data)
   setGrades( grades.data)
   setCommodities( commodities.data)
   setCommodityTypes( commoditiesTypes.data)
    setIsLoading(false)
   }

console.log(commodityTypes)
// neccessary call

useEffect(()=>{
 GetUtils()

},[])

// request to add ticker

/* A function that takes in the name of the utils and returns the id of the utils. */
const retreieveIdOfUtils = (countryName,warehouseLocation,commodityName,commodityTypeName,gradeValue) => {
  console.log()
  const countryId = countries[countries.findIndex( country => country.countryName === countryName)].id
  const warehouseId = warehouses[warehouses.findIndex( warehouse => warehouse.warehouseLocation === warehouseLocation)].id
  const commodityId = commodities[commodities.findIndex( commodity => commodity.commodityName === commodityName)].id
  const commodityTypeId = commodityTypes[commodityTypes.findIndex( commodityType => commodityType.commodityTypeName === commodityTypeName)].id
  const gradeId = grades[grades.findIndex( grade => grade.gradeValue === Number(gradeValue))].id
 return {gradeId,countryId,warehouseId,commodityId,commodityTypeId}

 }

 const submitHandler = async() => { 
   const UtilsIds= retreieveIdOfUtils(countrySelect.current.value,warehouseSelect.current.value,commodityNameSelect.current.value,commodityTypeNameSelect.current.value,gradeSelect.current.value)
   const title = TickerNameInput.current.value
  try {
    const data = await axios.post(`${apiUrl}/api/tickers`,{...UtilsIds,title})
    showNotification({
      title: 'Ticker Addition FeedBack',
      message: `ticker succesfully added`,
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
      navigate('/admin/tickers')
  } catch (error) {
    showNotification({
      title: 'addition Failed',
      message: `${error.response.data.message}`,
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
      <p className='text-center font-bold '>Creation of a new ticker</p>
      <div className={`h-[${isLoading ? 20 : 30}rem] drop-shadow-md mt-8 shadow-2xl p-8 flex flex-col gap-y-2   bg-white rounded-lg w-[34rem]`} >
      {isLoading ? <Skeleton height={17} radius="xl" /> :   <Select
     ref={countrySelect}
    label="Country Name"
    placeholder="Pick one"
    searchable
    nothingFound="No options"
    data={countries.map((country) => ( country.countryName ))}
  /> }
   
   {isLoading ? <Skeleton height={17} radius="xl" />:  <Select
      label="Warehouse Location"
      ref={warehouseSelect}
      placeholder="Pick one"
      searchable
      nothingFound="No options"
      data={warehouses.map((warehouse) => ( warehouse.warehouseLocation ))}
    /> }

  
     
   <div className='flex flex-row gap-x-2 justify-between' >
   
   {isLoading ? <Skeleton height={17} radius="xl" /> :   <Select
      label="Commodity"
  ref={commodityNameSelect}
      placeholder="Pick one"
      searchable
      nothingFound="No options"
      data={commodities.map((commodity) => ( commodity.commodityName ))}
    />}
 
  {isLoading ?  <Skeleton height={17} radius="xl" /> :    <Select
      label="Commodity Type"
      ref={commodityTypeNameSelect}
      placeholder="Pick one"
      searchable
      nothingFound="No options"
      data={commodityTypes.map((commodityType)=>(commodityType.commodityTypeName) )}
    /> }
  
   </div>
   {isLoading ? <Skeleton height={17} radius="xl" /> :<Select
      label="grade"
      ref={gradeSelect}
      placeholder="Pick one"
      searchable
      nothingFound="No options"
      data={grades.map((grade) => ( grade.gradeValue.toString() ))}
    /> }
   
    <label>Ticker Name</label>
    <InputBase ref={TickerNameInput} maxLength={8} />
   <div onClick={submitHandler}  >
               <input type='submit'
              className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
    value=" create ticker"
           /> 
           </div>
      </div>
    </div>
  )
}

export default AddTicker