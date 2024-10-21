import { IconCheck, IconTimeline, IconTrash } from '@tabler/icons'
import React from 'react'

function Task({task,markAsPending,markAsResolve,removeTask}) {
  return (
    <li className='w-[90%] break-words h-auto p-4  shadow-lg drop-shadow-lg font-medium bg-white rounded-lg flex flex-col  ' >
    <p> {task.content}</p>
<div className='flex justify-end items-center gap-x-3' >
    {/* mark as pending */}
  {task.status === 1 ? null : task.status === 2 ?  null :  <div  onClick={()=>markAsPending(task.id)} className='flex justify-center cursor-pointer items-center h-[2rem] hover:bg-yellow-700 bg-yellow-400 w-[2rem] rounded-full  p-2  ' >
<IconTimeline className='  text-white' size={28} />

</div> }  

{/* mark as resolve */}
{task.status === 2 ? null : <div onClick={()=>markAsResolve(task.id) }  className='flex justify-center cursor-pointer items-center h-[2rem] hover:bg-green-700 bg-green-600 w-[2rem] rounded-full  p-2  ' >
<IconCheck className='  text-white' size={28} />

</div>  }

<div onClick={()=>removeTask(task.id)} className='flex justify-center cursor-pointer items-center h-[2rem] hover:bg-red-700 bg-red-600 w-[2rem] rounded-full  p-2  ' >
<IconTrash className='  text-white' size={28} />

</div>
</div>
   </li>
  )
}

export default Task