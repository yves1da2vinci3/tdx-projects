import { Modal, Tabs, Tooltip } from '@mantine/core'
import { IconMessageCircle, IconPhoto, IconReportMoney, IconSettings, IconShoppingCart } from '@tabler/icons'
import React from 'react'
import { useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts'

function UserMetricsModal({userMetrics,setUserMetrics}) {
    const data = [
        {
          "name": "Page A",
          "uv": 4000,
          "amt": 2400
        },
        {
          "name": "Page B",
          "uv": 3000,
          "amt": 2210
        },
        {
          "name": "Page C",
          "uv": 2000,
          "amt": 2290
        },
        {
          "name": "Page D",
          "uv": 2780,
          "amt": 2000
        },
        {
          "name": "Page E",
          "uv": 1890,
          "amt": 2181
        },
        {
          "name": "Page F",
          "uv": 2390,
          "amt": 2500
        },
        {
          "name": "Page G",
          "uv": 3490,
          "amt": 2100
        }
      ]
    const [currentId,setCurrentId] = useState(1)
    const dataVariationInput = [
        {
            id : 1,
            text : "1 week",
        },
        {
            id : 2,
            text : "1 month",
        },
        {
            id : 3,
            text : "3 months",
        },
        {
            id : 4,
            text : "6 months",
        },
        {
            id : 5,
            text : "1 year",
        },
        {
            id : 6,
            text : "all",
        },
    ]
  return (
    <Modal opened={userMetrics}  centered size="2xl" onClose={()=> setUserMetrics(false)}>
        <div className='h-[87vh] w-[80vh]' > 
        <Tabs s defaultValue="Orders">
      <Tabs.List>
        <Tabs.Tab value="Orders" icon={<IconShoppingCart size={14} />}>Orders</Tabs.Tab>
        <Tabs.Tab value="transactions" icon={<IconReportMoney size={14} />}>transactions</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Orders" pt="xl" >
        <div className='h-[100%] w-[100%]   ' >
            {/* total numbers */}
            <div className='flex h-[8rem] items-center gap-x-4 px-3 ' >
                <div className=' h-[6rem] items-center justify-center flex flex-col w-[12rem] rounded-xl shadow-lg bg-white ' >
                    <p className='text-2xl  ' > 23</p>
                    <p className='text-lg font-semibold'  >Metrics</p>

                </div>
                <div className=' h-[6rem] items-center justify-center flex flex-col w-[12rem] rounded-xl shadow-lg drop-shadow-md bg-white ' >
                    <p className='text-2xl  ' > 11</p>
                    <p className='text-lg font-semibold'  >Basic Orders</p>

                </div>
                <div className=' h-[6rem] items-center justify-center flex flex-col w-[12rem] rounded-xl shadow-lg drop-shadow-md bg-white ' >
                    <p className='text-2xl  ' > 12</p>
                    <p className='text-lg font-semibold'  >Advanced Orders</p>

                </div>
            </div>
            {/* mertics over the time */}
            <div className='h-[15rem] items-center  flex flex-col ' >
                <p className='text-lg text-center mt-3' >basic Orders</p>
                <div className='grid grid-cols-2' >
                <div className='h-[12rem] flex justify-center items-center w-[20rem]  ' >
                <LineChart width={330} height={200} data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  
  <Line type="monotone" dataKey="uv" stroke="#e617ce" />
</LineChart>
                </div>
                {/* variations */}
                <div className=' flex flex-col px-2 '>
                <p className='text-md font-semibold text-center' >variation</p>

              <div className='flex gap-2 justify-center items-center mt-5 flex-wrap' >
                {dataVariationInput.map(dataVariationInput => {
                if(dataVariationInput.id === currentId) {
                    return        <div onClick={()=> setCurrentId(dataVariationInput.id)} className='flex items-center bg-green-600 h-9 p-5 w-fit rounded-full  shadow-lg cursor-pointer hover: justify-center ' >
                    <p className='text-white' >{dataVariationInput.text}</p>
                </div>
                }else{
                    return        <div onClick={()=> setCurrentId(dataVariationInput.id)} className='flex items-center bg-white h-9 p-5 w-fit rounded-full  shadow-lg cursor-pointer hover: justify-center ' >
                    <p className='' >{dataVariationInput.text}</p>
                </div>
                }
            }
                )}
               
               
              </div>

                </div>
                </div>
               
            </div>
            <div className=' h-[15rem]' >
            <p className='text-lg text-center mt-3' >Advanced Orders</p>
                <div className='grid grid-cols-2' >
                <div className='h-[12rem] flex justify-center items-center w-[20rem]  ' >
                <LineChart width={330} height={200} data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  
  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
</LineChart>
                </div>
                {/* variations */}
                <div className=' flex flex-col px-2 '>
                <p className='text-md font-semibold text-center' >variation</p>

              <div className='flex gap-2 justify-center items-center mt-5 flex-wrap' >
                {dataVariationInput.map(dataVariationInput => {
                if(dataVariationInput.id === currentId) {
                    return        <div onClick={()=> setCurrentId(dataVariationInput.id)} className='flex items-center bg-green-600 h-9 p-5 w-fit rounded-full  shadow-lg cursor-pointer hover: justify-center ' >
                    <p className='text-white' >{dataVariationInput.text}</p>
                </div>
                }else{
                    return        <div onClick={()=> setCurrentId(dataVariationInput.id)} className='flex items-center bg-white h-9 p-5 w-fit rounded-full  shadow-lg cursor-pointer hover: justify-center ' >
                    <p className='' >{dataVariationInput.text}</p>
                </div>
                }
            }
                )}
               
               
              </div>

                </div>
                </div>
            </div>
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="transactions" pt="xs">
      <div className='h-[100%] w-[100%]   ' >
            {/* total numbers */}
            <div className='flex h-[8rem] items-center gap-x-4 px-3 ' >
                <div className=' h-[6rem] items-center justify-center flex flex-col w-[12rem] rounded-xl shadow-lg bg-white ' >
                    <p className='text-2xl  ' > 20</p>
                    <p className='text-lg font-semibold'  >Transactions</p>

                </div>
                <div className=' h-[6rem] items-center justify-center flex flex-col w-[12rem] rounded-xl shadow-lg drop-shadow-md bg-white ' >
                    <p className='text-2xl  ' > 11</p>
                    <p className='text-lg font-semibold'  >Deposits</p>

                </div>
                <div className=' h-[6rem] items-center justify-center flex flex-col w-[12rem] rounded-xl shadow-lg drop-shadow-md bg-white ' >
                    <p className='text-2xl  ' > 09</p>
                    <p className='text-lg font-semibold'  >Withdrawals</p>

                </div>
            </div>
            {/* mertics over the time */}
            <div className='h-[15rem] items-center  flex flex-col ' >
                <p className='text-lg text-center mt-3' >Deposits</p>
                <div className='grid grid-cols-2' >
                <div className='h-[12rem] flex justify-center items-center w-[20rem]  ' >
                <LineChart width={330} height={200} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
             <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="name" />
              <YAxis />
            <Tooltip />
            <Legend />
            
            <Line type="monotone" dataKey="uv" stroke="#e6de17" />
            </LineChart>
                </div>
                {/* variations */}
                <div className=' flex flex-col px-2 '>
                <p className='text-md font-semibold text-center' >variation</p>

              <div className='flex gap-2 justify-center items-center mt-5 flex-wrap' >
                {dataVariationInput.map(dataVariationInput => {
                if(dataVariationInput.id === currentId) {
                    return        <div onClick={()=> setCurrentId(dataVariationInput.id)} className='flex items-center bg-green-600 h-9 p-5 w-fit rounded-full  shadow-lg cursor-pointer hover: justify-center ' >
                    <p className='text-white' >{dataVariationInput.text}</p>
                </div>
                }else{
                    return        <div onClick={()=> setCurrentId(dataVariationInput.id)} className='flex items-center bg-white h-9 p-5 w-fit rounded-full  shadow-lg cursor-pointer hover: justify-center ' >
                    <p className='' >{dataVariationInput.text}</p>
                </div>
                }
            }
                )}
               
               
              </div>

                </div>
                </div>
               
            </div>
            <div className=' h-[15rem]' >
            <p className='text-lg text-center mt-3' >Withdrawals </p>
                <div className='grid grid-cols-2' >
                <div className='h-[12rem] flex justify-center items-center w-[20rem]  ' >
                <LineChart width={330} height={200} data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  
  <Line type="monotone" dataKey="uv" stroke="#1877f2" />
</LineChart>
                </div>
                {/* variations */}
                <div className=' flex flex-col px-2 '>
                <p className='text-md font-semibold text-center' >variation</p>

              <div className='flex gap-2 justify-center items-center mt-5 flex-wrap' >
                {dataVariationInput.map(dataVariationInput => {
                if(dataVariationInput.id === currentId) {
                    return        <div onClick={()=> setCurrentId(dataVariationInput.id)} className='flex items-center bg-green-600 h-9 p-5 w-fit rounded-full  shadow-lg cursor-pointer hover: justify-center ' >
                    <p className='text-white' >{dataVariationInput.text}</p>
                </div>
                }else{
                    return        <div onClick={()=> setCurrentId(dataVariationInput.id)} className='flex items-center bg-white h-9 p-5 w-fit rounded-full  shadow-lg cursor-pointer hover: justify-center ' >
                    <p className='' >{dataVariationInput.text}</p>
                </div>
                }
            }
                )}
               
               
              </div>

                </div>
                </div>
            </div>
        </div>
      </Tabs.Panel>

     
    </Tabs>
         </div>
        {/* orders */}

        {/* transactions */}

        
    </Modal>
    
  )
}

export default UserMetricsModal