import React from 'react'
import warehouseIcon from '../../../assets/Icons/warehouse.png'
import commodityIcon from '../../../assets/Icons/commodity.png'
import commodityCategoryIcon from '../../../assets/Icons/commodityCategory.png'
import countryIcon from '../../../assets/Icons/country.png'
import harverstIcon from '../../../assets/Icons/harvest.png'
import calendarIcon from '../../../assets/Icons/calendar.png'
import { Link } from 'react-router-dom'
function HomeScreen() {
  return (
    <div className='flex flex-col   justify-center items-center h-screen gap-7' >
      <h1 className='text-xl font-semibold' >Choose a card</h1>
      <div className='flex gap-7 justify-center flex-wrap '> 
      <Link to='/admin/warehouse/create' className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[20rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[20rem] bg-white' >
        <img src={warehouseIcon} className="h-[12rem] " />
        <p className='text-center font-bold' >create a warehouse</p>
      </Link>
      <Link to='/admin/commodity/create' className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[20rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[20rem] bg-white' >
        <img src={commodityIcon} className="h-[12rem] " />
        <p className='text-center font-bold' >create a commodity</p>
      </Link>
      <Link to='/admin/settings/createCountry' className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[20rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[20rem] bg-white' >
        <img src={countryIcon} className="h-[12rem] " />
        <p className='text-center font-bold' >create a country</p>
      </Link>
      <Link to='/admin/settings/createCommodityCategory' className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[20rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[20rem] bg-white' >
        <img src={commodityCategoryIcon} className="h-[12rem] " />
        <p className='text-center font-bold' >create a commodity category</p>
      </Link>
      <Link to='/admin/settings/createCommodityType' className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[20rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[20rem] bg-white' >
        <img src={harverstIcon} className="h-[12rem] " />
        <p className='text-center font-bold' >create a commodity type</p>
      </Link>
      <Link to='/admin/settings/createHarvest' className=' cursor-pointer rounded-lg hover:bg-green-300 drop-shadow-md h-[20rem] gap-y-3 items-center flex-col justify-center flex p-5 w-[20rem] bg-white' >
        <img src={calendarIcon} className="h-[12rem] " />
        <p className='text-center font-bold' >create a harvest year</p>
      </Link>
      </div>
      
    </div>
  )
}

export default HomeScreen