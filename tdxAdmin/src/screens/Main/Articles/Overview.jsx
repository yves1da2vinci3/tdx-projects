import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '../../../assets/Icons/add.png'
import { TextInput,  ActionIcon, useMantineTheme, LoadingOverlay } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';

import ArticleTableSort from '../../../Tables/ArticleTable'
import axios from 'axios';
import apiUrl from '../../../utils/ApiUrl';


function Overview() {
  const [articles,setArticles] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const fetchArticles = async () => { 
    
    try {
      const {data} =  await axios.get(`${apiUrl}/api/articles`)
      console.log(data)
      setArticles(data.articles)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)

    }


   }
  useEffect(()=>{
    fetchArticles()
  },[])




  return (
    <div className='h-screen w-full flex flex-col p-5 ' > 
 <p className=' text-center text-xl'>Article Adminstration</p>
      {/* statistiques */}
      <div className='bg-g gap-x-2 mb-8 justify-around flex items-center mt-8'>

<Link to='/admin/articles/create'  className='h-[10rem] flex flex-col pt-12  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer hover:bg-green-500 group'>
  <img src={AddIcon} className='h-[4rem] w-[4rem] self-center ' />
<p className='text-center text-md font-semibold group-hover:text-white '> Create a new article </p>
</Link>
<div className='h-[10rem] flex flex-col  w-[15rem] justify-between p-4 rounded-sm bg-white drop-shadow-md cursor-pointer  hover:bg-green-500 group'>
  <p className='text-center text-7xl italic group-hover:text-white ' >{articles.length}</p>
<p className='text-center text-xl font-semibold group-hover:text-white'> Articles</p>
</div>


  </div>

{/* tickers tables */}
{ isLoading ? <LoadingOverlay visible={isLoading} /> : articles.length >0 ? <ArticleTableSort data={articles} />  : (<div className='w-full h-full flex justify-center items-center' >
    <p>No articles registered,please add a new one</p>
    </div>)   }

    </div>
  )
}

export default Overview