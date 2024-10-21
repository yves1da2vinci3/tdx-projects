import { Modal } from '@mantine/core'
import { IconBookUpload, IconCheck, IconChecklist, IconPlus, IconSend, IconTextPlus, IconTimeline, IconTrash } from '@tabler/icons'
import React, { useRef } from 'react'
import { useState } from 'react'
import Task from '../components/Task'

function AddCommentOrder({addCommentModal,setAddCommentModal}) {
    const inputRef = useRef(null)
    const [Tasks,setTasks] = useState([])
    const [indexTask,setIndexTask] = useState(0)
const statusVariables = {
    declared : 0,
    pending : 1,
    finished : 2
}
    const addTask = () => { 
       const text =  inputRef.current.value
       const task = {
        id : indexTask,
        content : text,
        status : statusVariables.declared
       }
       inputRef.current.value = ""
       const newTasks = [...Tasks,task]
       setTasks(newTasks)
       setIndexTask(indexTask+1)

     }

    const removeTask = (id) => { 
        const tasksCopyArray = [...Tasks]
        const index =  tasksCopyArray.findIndex((task)=>task.id === id)
        tasksCopyArray.splice(index,1)
        setTasks(tasksCopyArray)
     }
    const  markAsResolve = (id) => { 
        const tasksCopyArray = [...Tasks]
        const index =  tasksCopyArray.findIndex((task)=>task.id === id)
        tasksCopyArray[index].status = statusVariables.finished
        setTasks(tasksCopyArray)
     }
     const markAsPending = (id) => {
        const tasksCopyArray = [...Tasks]
        const index =  tasksCopyArray.findIndex((task)=>task.id === id)
        tasksCopyArray[index].status = statusVariables.pending
        setTasks(tasksCopyArray)
     }
    
  return (
    <Modal fullScreen onClose={()=> setAddCommentModal(false)  }  opened={addCommentModal} >
<div className='   w-full h-[90vh] grid grid-cols-3 relative ' >
    {/* total */}
    <div className=' bg-slate-100  border-l-2 flex flex-col relative  ' >
        <div className='flex justify-between items-center px-5' >
        <p className='text-center font-semibold' >Tasks</p>
<p>{Tasks.filter(task=> task.status === statusVariables.declared).length}<span> Items</span> </p>
        </div>
{/* tasks */}
<ul className='flex-col flex gap-y-2 items-center mt-2 overflow-y-scroll h-[40rem]' >
        {Tasks.filter(task=> task.status === statusVariables.declared).map((task) => (
    <Task  removeTask={removeTask} markAsResolve={markAsResolve} markAsPending={markAsPending}  task={task}  />
  ))}
        </ul>

        {/* input  */}
<div className='h-[4rem] w-[90%] bottom-2 absolute rounded-xl shadow-lg drop-shadow-lg bg-white gap-x-2  p-5 flex  mx-2' >
 <input ref={inputRef} className='flex-1 h-[2rem] outline-none focus:shadow-md caret-teal-600 px-2 focus:ring-2 rounded-lg focus:ring-green-500 '/>
 <div onClick={addTask} className='flex justify-center cursor-pointer items-center h-[2rem] hover:bg-green-700 bg-green-600 w-[2rem] rounded-full  p-2  ' >
 <IconPlus className='  text-white' size={28} />

 </div>
</div>

    </div>
    {/* in progress */}
    <div className='bg-yellow-100 flex flex-col' >
    <div className='flex justify-between items-center px-5' >
        <p className='text-center font-semibold' >in Progress</p>
<p>{Tasks.filter(task=> task.status === statusVariables.pending).length} <span>Items</span> </p>
        </div>
        <ul className='flex-col flex gap-y-2 items-center mt-2 overflow-y-scroll h-[40rem]' >
        {Tasks.filter(task=> task.status === statusVariables.pending).map((task) => (
    <Task  removeTask={removeTask} markAsResolve={markAsResolve} markAsPending={markAsPending}  task={task}  />
  ))}
        </ul>
    </div>
    {/* finihed */}
    <div className='bg-green-100 flex flex-col'>
    <div className='flex justify-between items-center px-5' >
        <p className='text-center font-semibold' >Finished</p>
<p>{Tasks.filter(task=> task.status === statusVariables.finished).length} <span>Items</span> </p>
        </div>
        <ul className='flex-col flex gap-y-2 items-center mt-2 overflow-y-scroll h-[40rem]' >
        {Tasks.filter(task=> task.status === statusVariables.finished).map((task) => (
    <Task  removeTask={removeTask} markAsResolve={markAsResolve} markAsPending={markAsPending}  task={task}  />
  ))}
        </ul>
    </div>
    <div  className='flex justify-center cursor-pointer items-center h-[4rem] hover:bg-blue-700 bg-blue-600 w-[4rem] absolute bottom-2 right-2 rounded-full  p-2  ' >
<IconChecklist className='  text-white' size={28} />

</div>
</div>
  </Modal>
  )
}

export default AddCommentOrder