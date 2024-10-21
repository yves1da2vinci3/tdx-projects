import { Button, Modal, Textarea } from '@mantine/core'
import { IconEye, IconPlane, IconSend } from '@tabler/icons'
import React from 'react'

function SendNotification({setSendingNotification,SendNotification}) {
  return (
    <Modal  title="Sending Notification" centered size="md" onClose={()=> setSendingNotification(false)} opened={SendNotification}  > 
    
    <div className='h-[10rem] flex flex-col justify-center ' >
        <Textarea variant="filled" size='lg' placeholder="Message  "
      ></Textarea>
      <div className='flex items-center self-end justify-center mt-4' >
      <Button  rightIcon={<IconSend/>}  className='bg-green-500 hover:bg-green-800 w-30'  backgroundColor="yellow" color='yellow' >send the message</Button> 

      </div>
    </div>

    </Modal>
  )
}

export default SendNotification