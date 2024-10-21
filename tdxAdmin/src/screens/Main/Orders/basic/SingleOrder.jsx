import { Avatar, Button, Checkbox, Input, InputBase, Loader, LoadingOverlay, Menu, Modal, Radio, Select ,Skeleton} from '@mantine/core'
import { Calendar } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import BasicSubOrdersTable from "../../../../Tables/BasicSubOrdersTable"
import apiUrl from '../../../../utils/ApiUrl';
import formatDate from '../../../../utils/FomatDateFromDb';
import suborderAtom from '../../../../recoil/atoms/SuborderAtom.js'
import FeeAtom from '../../../../recoil/atoms/FeeAtom.js'
import {useSetRecoilState} from 'recoil'
import {useNavigate} from 'react-router-dom'
import { IconAccessibleOff, IconCheckbox,  IconPencilPlus,IconSettings, IconTrash, IconUnlink } from '@tabler/icons';
import CreateBasicSuborder from '../../../../Modals/CreateBasicSuborder';
import AddCommentOrder from '../../../../Modals/AddCommentOrder';
function SingleOrder() {
const navigate = useNavigate()
  // decleare the suborder atom setter
  const setSuborderAtom = useSetRecoilState(suborderAtom)
  // decleare the suborder atom setter
  const setFeeAtom = useSetRecoilState(FeeAtom)
  // declare the states
  const [isLoading,setIsLoading] = useState(true)
  const [OpenMenuModal,setOpenMenuModal] = useState(false)
  const [ seeCancelRequest,setSeeCancelRequest ] = useState(false)
  const [opened, setOpened] = useState(false);
  const [openedDetail, setOpenedDetail] = useState(false);
 

const [subBasicOrderLoading,setsubBasicOrderLoading] = useState(false)
  const {orderId} = useParams()
  const [Order,setOrder] = useState()
  const [subOrders,setSubOrders] = useState([])
  const [tickers,setTickers] = useState([])
 const [subOrder,setSubOrder] = useState({})
  const [addCommentModal,setAddCommentModal] = useState(false)
/**
 * It fetches the order from the database and sets the order, subOrders, tickers, isLoading, and
 * subBasicOrderLoading states.
 */
  const fetchSingleOrder =  async() => { 
    try {
      const {data} = await axios.get(`${apiUrl}/api/orders/${orderId}/basic`)
      console.log(data)
      setOrder(data)
      setSubOrders(data.subBasicOrders)
      const IsRequestExists = data.requests.length > 0 ? true : false
      setSeeCancelRequest(IsRequestExists)
      console.log(data.subBasicOrders)
      setTickers(data.tickers)
      setIsLoading(false)
      setsubBasicOrderLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setsubBasicOrderLoading(false)
    }
  
   }

/**
 * *|MARCADOR_CURSOR|*
 */

   

 useEffect(()=>{
 
  fetchSingleOrder()
 },[isLoading])


 // fetchSuborders
 const fetchSubOrders = async () => { 
  try {
    const {data} =  await axios.get(`${apiUrl}/api/orders/${orderId}/basic/suborders`)
    setSubOrders(data)
    setsubBasicOrderLoading(false)
  } catch (error) {
    console.log(error)
    setsubBasicOrderLoading(false)
  }
  }
  


   // move to the fee part
   const moveToFeeScreen = () => { 
    const suborderAtom = {
 type : 1,
 parentId : subOrder.id
    }
    setSuborderAtom(suborderAtom)
    navigate("/admin/order/fee")
    
    }
    const MoveToFeeDetail = () => {
      const feeAtom = {
        type : 1,
        user: {
          fullName : Order.basicOrder.user.firstName + " " + Order.basicOrder.user.lastName,
          email : Order.basicOrder.user.email,
          mobileNumber : Order.basicOrder.user.mobileNumber
        },
        order : {
          id : subOrder.id,
          qty : subOrder.qty,
          category : Order.basicOrder.orderCategory
        }
      }
      setFeeAtom(feeAtom)
      navigate("/admin/order/fee/detail")
      
    }

      // about cancellation request
      // **  approve cancellation
      const approveCancellation = async () => { 
        const data = {
          userId : Order.basicOrder.userId,
          parentId:  Order.requests[0].parentId,
          type :  Order.requests[0].parentId,
          orderId : Order.basicOrder.id
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
          userId : Order.basicOrder.userId,
          parentId:  Order.requests[0].parentId,
          type :  Order.requests[0].parentId,
          orderId : Order.basicOrder.id
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
      {/* suborder Details  */}
      <Modal  title="Suborder detail" centered opened={openedDetail} onClose={ ()=> setOpenedDetail(false)} >
        <div className='flex flex-col gap-y-4' >

       
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
       <td className='border flex justify-center border-slate-300'>{ !subOrder.createdAt ? '' :  formatDate(subOrder?.createdAt) }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>commodity</td>
       <td className='border flex justify-center border-slate-300'>{!subOrder.createdAt ? '' :subOrder?.ticker.commodity.commodityName}</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>commodity type name</td>
       <td className='border flex justify-center border-slate-300'>{!subOrder.createdAt ? '' :subOrder?.ticker.commodityType.commodityTypeName}</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>ticker</td>
       <td className='border flex justify-center border-slate-300'>{!subOrder.createdAt ? '' :subOrder?.ticker.title}</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>warehouse Location</td>
       <td className='border flex justify-center border-slate-300'>sandama</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Quantity</td>
       <td className='border flex justify-center border-slate-300'>{!subOrder.createdAt ? '' :subOrder?.qty}</td>
     </tr>
    
     <tr>
       <td className='border border-slate-300 font-semibold'>orderType</td>
       <td className='border flex justify-center border-slate-300'>{!subOrder.createdAt ? '' :subOrder?.orderType ===1 ? "Market" : "Limit"}</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>harvest year</td>
       <td className='border flex justify-center border-slate-300'>{!subOrder.createdAt ? '' :subOrder?.harverstYear}</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>season</td>
       <td className='border flex justify-center border-slate-300'>{!subOrder.createdAt ? '' :subOrder?.season}</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Limit price</td>
       <td className='border flex justify-center border-slate-300'>{!subOrder.createdAt ? '' :subOrder?.limitPrice ? (subOrder?.limitPrice + "" + "GHS") : "NO PRICE" }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Order validity</td>
       <td className='border flex justify-center border-slate-300'>{!subOrder.createdAt ? '' :subOrder?.orderValidity ===1 ? "DAY": subOrder?.orderValidity ===2 ? "GTC" : "GTD"  }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Fill type </td>
       <td className='border flex justify-center border-slate-300'>All or None</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>status</td>
       <td className='border flex justify-center border-slate-300'>
        {subOrder?.status ===0 ? <div className='h-8 w-20 flex rounded-full bg-yellow-300 justify-center items-center' >
        <p className='text-yellow-700 text-sm' >on going</p>
      </div> : <div className='h-8 w-20 flex rounded-full bg-green-300 justify-center items-center' >
        <p className='text-green-700 text-sm' >completed</p>
      </div> }
        </td>
     </tr>
   </tbody>
 </table>
 {/* add fee btn  */}
{ subOrder.status === 2 ? <Button onClick={()=> MoveToFeeDetail() }  className='bg-green-500 w-[12rem] self-center mb-4 hover:bg-green-800' >See fee details </Button> : <Button onClick={()=> moveToFeeScreen() }  className='bg-green-500 w-[12rem] self-center mb-4 hover:bg-green-800' >add fee </Button>   }
 
 </div>
      </Modal>
<CreateBasicSuborder setOpened={setOpened} opened={opened} Order={Order} fetchSubOrders={fetchSubOrders} subOrders={subOrders} tickers={tickers} /> 
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
<h1 className='text-2xl  font-semibold text-center'> order Id: <span className='text-green-500 uppercase' >{isLoading ?  <Skeleton height={20} radius="xl" /> : Order.basicOrder.id.toString().padStart(10,"0") }</span>  </h1>

{/* userInfo and order details  */}
<div className='h-[20rem]  grid grid-cols-2 mr-4' >
<div className='  flex  items-center  gap-x-4 p-2 ' >
  { isLoading ? <Skeleton height={34} circle /> :  <Avatar  src={Order.basicOrder.user.userImgUrl}   className="rounded-full h-[10rem] w-[10rem]"  />  }
           
            <div className='flex-1 flex gap-y-4 justify-center ml-8  flex-col'  >
             <p className='font-bold ' >Full Name: <span className='font-medium' > {isLoading?  <Skeleton height={20} radius="xl" /> : Order.basicOrder.user.firstName + " " + Order.basicOrder.user.lastName }</span>  </p>
             <p className='font-bold ' >email: <span className='font-medium' >{isLoading?  <Skeleton height={20} radius="xl" /> : Order.basicOrder.user.email } </span>  </p>
             <p className='font-bold ' >phone Number: <span className='font-medium' >{isLoading?  <Skeleton height={20} radius="xl" /> : Order.basicOrder.user.mobileNumber }</span>  </p>
             <Button className='bg-green-500 w-[12rem] hover:bg-green-800' >go to user profile </Button>
            </div>

          </div>
          {/* order Details  */}
<div className='flex flex-col w-full' >
  <p className='text-center mb-4' >Order details</p>
<table className='table-auto border-separate  border-slate-400 border-2 w-full'>
   <thead>
     <tr>
       <td className='border border-slate-300 font-bold text-center'>Information Name</td>
       <td className='border border-slate-300 font-bold text-center'>Value</td>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td className='border border-slate-300 font-semibold'>Order Category</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.basicOrder.orderCategory ===1 ?<p className='uppercase text-lg text-green-400' >buy</p> : <p className='uppercase text-lg text-red-400' >sell</p> }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>Date</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : formatDate(Order.basicOrder.createdAt) }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>commodity</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.basicOrder.commoditType.commodity.commodityName }</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>commodity type name</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.basicOrder.commoditType.commodityTypeName}</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>quantity</td>
       <td className='border flex justify-center border-slate-300'>{isLoading?  <Skeleton height={20} radius="xl" /> : Order.basicOrder.qty}</td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>quantity filled </td>
       <td className='border flex justify-center border-slate-300'>{isLoading ? <Skeleton height={15} /> : subOrders?.reduce((previousValue,currentValue)=>previousValue  + currentValue.qty ,0) }  </td>
     </tr>
     <tr>
       <td className='border border-slate-300 font-semibold'>status</td>
       <td className='border flex justify-center border-slate-300'>
       {isLoading?  <Skeleton height={20} radius="xl" /> : Order.basicOrder.status === 0 ?<div className='h-8 w-20 flex rounded-full bg-yellow-300 justify-center items-center' >
        <p className='text-yellow-700 text-sm' >pending</p>
      </div> :Order.basicOrder.status ===1 ?<div className='h-8 w-20 flex rounded-full bg-pink-300 justify-center items-center' >
        <p className='text-pink-700 text-sm' >placed</p>
      </div> : Order.basicOrder.status === 2? <div className='h-8 w-20 flex rounded-full bg-yellow-300 justify-center items-center' >
        <p className='text-yellow-700 text-sm' >partial</p>
      </div> : Order.basicOrder.status === 3? <div className='h-8 w-20 flex rounded-full bg-green-300 justify-center items-center' >
        <p className='text-green-700 text-sm' >completed</p>
      </div> : Order.basicOrder.status ===  4 ? <div className='h-8 w-20 flex rounded-full bg-red-300 justify-center items-center' >
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
   
{ subBasicOrderLoading ? <div className='w-full h-[14rem] flex justify-center items-center' ><Loader /></div>  : subOrders.length >0 ? <BasicSubOrdersTable subOrders={subOrders} setSubOrder={setSubOrder} setOpened={setOpenedDetail} data={subOrders} />  : (<div className='w-full h-[14rem] flex justify-center items-center' >
       <p>No suborders yet</p>
       </div>)   }
<div className='w-full sticky bottom-0 h-[4rem] justify-between bg-white drop-shadow-sm border-2 flex items-center p-2 ' >
  <p className='text-lg font-bold' >total</p>
  <div className="w-[20rem]  self-end text-right " ><p>{subOrders?.reduce((previousValue,currentValue) => previousValue +(currentValue.qty * currentValue.ticker.prices[0].priceValue ) ,0)} <span className='uppercase font-medium italic' >GHS</span></p>  </div>
  </div>       
    </div>
  )
}

export default SingleOrder