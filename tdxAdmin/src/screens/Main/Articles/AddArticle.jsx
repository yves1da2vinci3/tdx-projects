import { Button, FileButton, InputBase, Loader, MultiSelect, Select, Skeleton } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconUpload } from '@tabler/icons'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import apiUrl from '../../../utils/ApiUrl'

function AddArticle() {
  const navigate = useNavigate()
  const [Commodities,setCommodities] = useState([])

  const [CommoditiesLinkIds,setCommoditiesLinkIds] = useState([])

  const [file,setFile] = useState(null)

const [isLoading,setIsLoading] = useState(true)

const [isSubmitLoading, setIsSubmitLoading] = useState(false);

const ArticleTitleRef = useRef(null)
const articleLinkRef = useRef(null)
  const fetchCommodities =  async() => { 
try {
   const {data} = await  axios.get(`${apiUrl}/api/utils/commodities`)
   setCommodities(data)
   setIsLoading(false)
} catch (error) {
  setIsLoading(false)
  console.log(error)
}
   }
   useEffect(()=>{
fetchCommodities()
   },[])

   const createArticle = async () => {
    setIsSubmitLoading(true)
    const articleLink = articleLinkRef.current.value
    const ArticleTitle = ArticleTitleRef.current.value
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    const form = new FormData()
    form.append("commoditiesLinked",CommoditiesLinkIds)
    form.append("file",file)
    form.append("link",articleLink)
    form.append("title",ArticleTitle)
    // console.log(CommoditiesLinkIds)
    // for( let index =0; index < CommoditiesLinkIds.length ; index++){
    //   console.log( typeof CommoditiesLinkIds[index] )
    //  }
    // setIsSubmitLoading(false)

    try {
      await axios.post(`${apiUrl}/api/articles/`,form,config)
      showNotification({
        title: 'Article Addition FeedBack',
        message: `article succesfully added`,
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
     const handleCommodotiesSelection = (arrays) => { 
      let data = []
       for( let index =0; index < arrays.length ; index++){
        data.push( Number(arrays[index]))
       }
       setCommoditiesLinkIds(data)
      }
  return (
    <div className='flex w-full h-screen flex-col  items-center justify-center'>
    <p className='text-center font-bold '>Creation of a new Article</p>
    <div className='h-[32rem] drop-shadow-md mt-8 shadow-2xl p-8 flex flex-col gap-y-2  bg-white rounded-lg w-[34rem]' >
    
  
    
    <label>Article Title</label>
  <InputBase  ref={ArticleTitleRef} />
    <label>Article link</label>
  <InputBase ref={articleLinkRef}  />
  <label>Commodities related</label>
  {isLoading ? <Skeleton  height={20}  /> :   <MultiSelect  onChange={(e)=>  handleCommodotiesSelection(e) }
  data={ Commodities.map(commodity => ({
    label : commodity.commodityName,
    value : Number( commodity.id)
  })) }
/> }
<label>Article Image</label>
    <FileButton   onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button leftIcon={<IconUpload/>} className='h-[4rem] bg-green-500 hover:bg-green-700' {...props}>Upload image</Button>}
        </FileButton>


 

        <div  onClick={createArticle} className=" flex justify-center  mt-8 py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm" >
            {isSubmitLoading ? <Loader color="white"  /> : <p >create article</p> }
            
          
           </div>
    </div>
  </div>
  )
}

export default AddArticle