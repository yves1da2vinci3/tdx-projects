import { Avatar, Button,  Indicator,  InputBase, Loader, LoadingOverlay, Menu, Modal,Skeleton} from '@mantine/core'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router';

import React, { useState,useEffect,useRef } from 'react'
import AdvancedSubOrdersTables from "../../../../Tables/AdvancedSubOrdersTables"
import './overview.css'
import suborderAtom from '../../../../recoil/atoms/SuborderAtom.js'
import {useSetRecoilState} from 'recoil'
import apiUrl from '../../../../utils/ApiUrl';
import axios from 'axios';
import formatDate from '../../../../utils/FomatDateFromDb';
import { IconAccessibleOff, IconCheckbox, IconEye, IconPencilPlus, IconSettings, IconTrash } from '@tabler/icons';
import { Calendar } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import FeeAtom from '../../../../recoil/atoms/FeeAtom.js'
import AddCommentOrder from '../../../../Modals/AddCommentOrder';
function SingleOrder() {
  const [isLoading,setIsLoading] = useState(true)
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate()
  // decleare the suborder atom setter
  const setSuborderAtom = useSetRecoilState(suborderAtom)
  const setFeeAtom = useSetRecoilState(FeeAtom)

  // declare the states
console.log("modia")
  
  const quantityRef = useRef(null) 
  const priceRef = useRef(null) 
const [subBasicOrderLoading,setsubBasicOrderLoading] = useState(true)
const [isSubmitLoading,setisSubmitLoading] = useState(false)
const [GTDModal,setGTDModal] = useState(false)
const [ seeCancelRequest,setSeeCancelRequest ] = useState(false)
  const {orderId} = useParams()
  const [Order,setOrder] = useState()
  const [subOrders,setSubOrders] = useState([])
  const [subOrder,setsubOrder] = useState()
 // 
 const fetchSingleOrder =  async() => { 
  try {
    const {data} = await axios.get(`${apiUrl}/api/orders/${orderId}/advanced`)
    console.log(data)
    setOrder(data)
    setSubOrders(data.subAdvancedOrders)
     const IsRequestExists = data.requests.length > 0 ? true : false
     setSeeCancelRequest(IsRequestExists)
    console.log(data.subAdvancedOrders)
    
    setIsLoading(false)
    setsubBasicOrderLoading(false)
  } catch (error) {
    console.log(error)
    setIsLoading(false)
    setsubBasicOrderLoading(false)
  }

 
  }
  const [addCommentModal,setAddCommentModal] = useState(false)
  const [OpenMenuModal,setOpenMenuModal] = useState(false)

  const submitHandler = async (e) => { 
    setisSubmitLoading(true)
    e.preventDefault()
    //-1 test if the quantity enter is superior of the order
    //-2 tet if the sum of qty for suborders already made + the new one is superior to the main order

    if( quantityRef.current.value > Order.advancedOrder.qty ){
      showNotification({
        title: 'suborders  Addition FeedBack',
        message: ` the new suborder  quantity  is superior to the quantity of the main order `,
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
        setisSubmitLoading(false)
    }
    else if((subOrders.reduce((previousValue,currentSubOrder)=> previousValue + currentSubOrder.qty ,0) + quantityRef.current.value) > Order.advancedOrder.qty   ){
      showNotification({
        title: 'suborders  Addition FeedBack',
        message: `the addition of  the new suborder  quantity and the quantities for the suborders already made is superior to the quantity of the main order `,
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
        setisSubmitLoading(false)
    }else{
      try {    
        const data = {
          userId : Order.advancedOrder.user.id,
          qty : quantityRef.current.value,
          orderCategory : Order.advancedOrder.orderCategory,
          title : Order.advancedOrder.ticker.title,
          price : priceRef.current.value
        }
        const reponse = await axios.post(`${apiUrl}/api/orders/${orderId}/advanced`,data)
        console.log(reponse)
        FecthSubOrders()
        setisSubmitLoading(false)
        showNotification({
          title: 'suborders  Addition FeedBack',
          message: `suborder   succesfully added`,
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
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

   }
   useEffect(()=>{
 
    fetchSingleOrder()
   },[isLoading])
 
   const FecthSubOrders = async () => { 
    setsubBasicOrderLoading(true)
    try {
      const {data} = await axios.get(`${apiUrl}/api/orders/${orderId}/advanced/suborders`)
      setSubOrders(data)
      setsubBasicOrderLoading(false)
    } catch (error) {
      setsubBasicOrderLoading(false)
      console.log(error)
    }
    }
    // move Add Fee 
    // move to the fee part
    const moveToFeeScreen = (id) => { 
      const suborderAtom = {
   type : 2,
   parentId : id
      }
      setSuborderAtom(suborderAtom)
      navigate("/admin/order/fee")
      
      }
      // move to fee Detail page
      const MoveToFeeDetail = (id,qty) => {
        const feeAtom = {
          type : 2,
          user: {
            fullName : Order.advancedOrder.user.firstName + " " + Order.advancedOrder.user.lastName,
            email : Order.advancedOrder.user.email,
            mobileNumber : Order.advancedOrder.user.mobileNumber
          },
          order : {
            id : id,
            qty : qty,
            category : Order.advancedOrder.orderCategory
          }
        }
        setFeeAtom(feeAtom)
        navigate("/admin/order/fee/detail")
        
      }

      // about cancellation request
      // **  approve cancellation
      const approveCancellation = async () => { 
        const data = {
          userId : Order.advancedOrder.userId,
          parentId:  Order.requests[0].parentId,
          type :  Order.requests[0].parentId,
          orderId : Order.advancedOrder.id
        }
        try {
          await axios.put(`${apiUrl}/api/requests/${Order.requests[0].id}/approve`,data)
          setIsLoading(true)
          setOpenMenuModal(false)
        } catch (error) {
          console.log(error)
        }

       }
      //** reject cancellation
      const rejectCancellation =  async() => { 
        const data = {
          userId : Order.advancedOrder.userId,
          parentId:  Order.requests[0].parentId,
          type :  Order.requests[0].parentId,
          orderId : Order.advancedOrder.id
        }
        try {
          await axios.put(`${apiUrl}/api/requests/${Order.requests[0].id}/reject`,data)
          setIsLoading(true)
          setOpenMenuModal(false)
        } catch (error) {
          console.log(error)
        }
       }
  return (
    <div className='h-screen w-full mt-8 relative ' >
<Modal title="Date for cancellation" centered onClose={()=> setGTDModal(false) }  opened={GTDModal} >
<div className='w-full flex justify-center items-center p-5 h-auto' >
<Calendar  initialMonth={new Date( Order?.advancedOrder?.dateValidity?.split('T')[0])}  renderDay={(date) => {
        const day = date.getDate();
        return (
          <Indicator size={10} color="red" offset={8} disabled={day !== new Date( Order?.advancedOrder?.dateValidity?.split('T')[0]).getDate()}>
            <div>{day}</div>
          </Indicator>
        );
      }} className='self-center'  />
</div>
</Modal>
      {/* new subOrder  */}
      <Modal  opened={opened} title="add new suborder" onClose={()=> setOpened(false) } centered>
        <form  onSubmit={(e) => submitHandler(e)} >


<label>quantity</label>
    <InputBase   ref={quantityRef} type='number' />
<label>price</label>
    <InputBase ref={priceRef}   type='number' />
    { isSubmitLoading ?  <div className='flex justify-center items-center p-3  mt-8 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm' >
<Loader color="white" />
    </div> :  <input type='submit'
              className="inline-block py-3 mt-8 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
    value=" confirm"
           />   }     
           </form>  

</Modal> 
<div className='flex justify-end px-3' >
<Menu  opened={OpenMenuModal}  classNames={{}} shadow="md" width={250}>
  
      <Menu.Target>
  <IconSettings onClick={()=> setOpenMenuModal(true)} size={28} className="cursor-pointer" />
        
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          <div className='flex justify-between px-2 items-center' >
            <p className='text-sm'>Settings</p>
            <p className='cursor-pointer' onClick={()=> setOpenMenuModal(false)} > X</p>
          </div>
             
           </Menu.Label>
        <Menu.Item onClick={()=> { 
          setOpenMenuModal(false)
          setAddCommentModal(true)
          }  } icon={<IconPencilPlus size={14} />}>add comments</Menu.Item>

        <Menu.Divider />
        { seeCancelRequest ? <>  <Menu.Label>Request actions</Menu.Label>
<Menu.Item onClick={()=> approveCancellation()} color="green" icon={<IconCheckbox size={14} />}>approve request </Menu.Item>
<Menu.Item onClick={()=>rejectCancellation()} color="red" icon={<IconAccessibleOff size={14} />}>Reject request</Menu.Item>
 </> : null  }

 <Menu.Label>Admin actions</Menu.Label>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>Decline order</Menu.Item>
      </Menu.Dropdown>
    </Menu>

  {/* menu */}
  {/* comment modal */}
  <AddCommentOrder addCommentModal={addCommentModal} setAddCommentModal={setAddCommentModal} />
</div>
<h1 className='text-2xl  font-semibold text-center'> order id: <span className='text-green-500 uppercase' > {isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.id.toString().padStart(10,"0") }</span>  </h1>

{/* userInfo and order details  */}
<div className='h-[20rem]  grid grid-cols-2' >
<div className='  flex  items-center  gap-x-4 p-2 ' >
{ isLoading ? <Skeleton height={34} circle /> :  <Avatar  src={Order.advancedOrder.user.userImgUrl}   className="rounded-full h-[10rem] w-[10rem]"  />  }
  
<div className='flex-1 flex gap-y-4 justify-center ml-8  flex-col'  >
             <p className='font-bold ' >Full Name: <span className='font-medium' > {isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.user.firstName + " " + Order.advancedOrder.user.lastName }</span>  </p>
             <p className='font-bold ' >email: <span className='font-medium' >{isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.user.email } </span>  </p>
             <p className='font-bold ' >phone Number: <span className='font-medium' >{isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.user.mobileNumber }</span>  </p>
             <Button className='bg-green-500 w-[12rem] hover:bg-green-800' >go to user profile </Button>
            </div>

          </div>
          {/* order Details  */}
<div  className='flex flex-col h-[20rem]   snap-mandatory overflow-y-scroll w-full' >
  <p className='text-center mb-4' >Order details</p>
<table className='table-auto shadow-lg border-separate  border-slate-400 border-2 w-full'>
   <thead>
     <tr>
       <td className='border border-slate-300 font-bold text-center'>Information Name</td>
       <td className='border border-slate-300 font-bold text-center'>Value</td>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td className='border border-slate-300 font-semibold'>Date</td>
       <td className='border flex justify-center border-slate-300'> {isLoading?  <Skeleton height={20} radius="xl" /> : formatDate(Order.advancedOrder.createdAt)   }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>commodity</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.ticker.commodity.commodityName  }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>commodity type name</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.ticker.commodityType.commodityTypeName  }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>ticker</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.ticker.title  }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>warehouse Location</td>
       <td className='border flex justify-center border-slate-300'>sandama</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>orderCategory</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.orderCategory===1 ? "BUY" :"SELL"  }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>orderType</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.orderType===1 ? "Market" :"Limit"  }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>harvest year</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.harverstYear }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>season</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.season }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Quantity</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.qty + " MT" }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Limit price</td>
       <td className='border flex justify-center border-slate-300'> {isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.limitPrice === 0 ? "No Limit Price" : Order.advancedOrder.limitPrice + "GHS"  } </td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Order validity</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.orderValidity ===1 ?"DAY" :Order.advancedOrder.orderValidity ===2 ? "GTC" : <div className='flex gap-x-3 items-center' > <p> GTD</p> <div  onClick={() => setGTDModal(true)} className='w-14 rounded-lg drop-shadow-sm cursor-pointer h-6 bg-green-600 justify-center flex  items-center hover:bg-green-800 ' ><IconEye className='text-white'/></div> </div>  }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Fill type </td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.fillType ===1 ?"Partial" :Order.advancedOrder.fillType ===2 ? "All or None" : "Fill or Kill"  }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>status</td>
       <td className='border flex justify-center border-slate-300'>
       {isLoading?  <Skeleton height={20} radius="xl" /> : Order.advancedOrder.status === 0 ?<div className='h-8 w-20 flex rounded-full bg-yellow-300 justify-center items-center' >
        <p className='text-yellow-700 text-sm' >pending</p>
      </div> :Order.advancedOrder.status ===1 ?<div className='h-8 w-20 flex rounded-full bg-pink-300 justify-center items-center' >
        <p className='text-pink-700 text-sm' >placed</p>
      </div> : Order.advancedOrder.status === 2? <div className='h-8 w-20 flex rounded-full bg-blue-300 justify-center items-center' >
        <p className='text-blue-700 text-sm' >partial</p>
      </div> : Order.advancedOrder.status === 3? <div className='h-8 w-20 flex rounded-full bg-green-300 justify-center items-center' >
        <p className='text-green-700 text-sm' >completed</p>
      </div> : Order.advancedOrder.status ===  4 ? <div className='h-8 w-20 flex rounded-full bg-red-300 justify-center items-center' >
        <p className='text-red-700 text-sm' >canceled</p>
      </div> : <div className='h-8 w-20 flex rounded-full bg-red-500 justify-center items-center' >
        <p className='text-red-700 text-sm' >Declined</p>
      </div>  }
        </td>
     </tr>
   </tbody>
 </table>
</div>
</div>

{/* subOrders details  */}
<h1 className='text-lg mb-5 text-center' >subOrders details</h1>
<Button onClick={()=> setOpened(true)} className='bg-green-500 w-[12rem] mb-4 hover:bg-green-800' >add new suborder </Button>
   
{ subBasicOrderLoading ? <LoadingOverlay visible={subBasicOrderLoading} /> : subOrders.length >0 ? <AdvancedSubOrdersTables MoveToFeeDetail={MoveToFeeDetail} moveToFeeScreen={moveToFeeScreen}   data={subOrders} />  : (<div className='w-full h-full flex justify-center items-center' >
       <p>No suborders orders yet</p>
       </div>)   }
<div className='w-full sticky bottom-0 h-[4rem] justify-between bg-white drop-shadow-sm border-2 flex items-center p-2 ' >
  <p className='text-lg font-bold' >total</p>
  <div className="w-[20rem]  self-end text-right " ><p>0 <span className='uppercase font-medium italic' >GHS</span></p>  </div>
  </div>       
    </div>
  )
}

export default SingleOrder