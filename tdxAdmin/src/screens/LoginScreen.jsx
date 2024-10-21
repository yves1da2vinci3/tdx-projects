import React, { useRef } from 'react'

import TdxLogo from '../assets/TdxLogo.jpg'
import {PasswordInput,InputBase} from '@mantine/core'
import axios from 'axios'
import apiUrl from '../utils/ApiUrl.js'
import {showNotification} from "@mantine/notifications"
import { useNavigate } from 'react-router-dom'
// state managment 
import {useSetRecoilState} from 'recoil'
import userAtom from '../recoil/atoms/UserAtom'
import { useEffect } from 'react'
function LoginScreen() {
  const Navigate = useNavigate()
  // verify if there is user logged in
  useEffect(()=>{
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if(userInfo){
        Navigate('/admin/home')
      }

  },[])
  const setUserAtom = useSetRecoilState(userAtom)
 
  const EmailInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  const submitHandler = (e) => {
    e.preventDefault();
    console.table(EmailInputRef.current.value,passwordInputRef.current.value)
    const email = EmailInputRef.current.value;
    const password = passwordInputRef.current.value;
    axios.post(`${apiUrl}/api/admins/login`,{email,password}).then(data=>{
      console.log(data)
      setUserAtom(data.data)
      localStorage.setItem('userInfo',JSON.stringify(data.data) )
      Navigate('/admin/home')
    }).catch(err=>{
      showNotification({
        title: 'Connexion Failed',
        message: `${err.response.data.message}`,
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
      console.log(err)
    
    })
   }
  return (
    <section
    className="py-12  bg-white"
    style={{
      backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
      backgroundPosition: "center"
    }}
  >
    <div className=" flex items-center  justify-center flex-col gap-y-3">

        <div className="mb-6 text-center">
          <div className="inline-block mb-6" href="#">
 <img src={TdxLogo} className='h-36 w-64' />
          </div>
          <h3 className="mb-4 text-2xl md:text-3xl font-bold">
            Welcome to the TDX Administration
          </h3>
       
 
        </div>
        <form  onSubmit={submitHandler}   className='bg-white shadow-lg p-8  w-auto  md:w-[35rem] rounded-lg'>
          <div className="mb-6">
            <label
              className="block mb-2 text-coolGray-800 font-medium"
              htmlFor=""
            >
              Email
            </label>
       
          <InputBase  ref={EmailInputRef} type='email' required />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-coolGray-800 font-medium"
              htmlFor=""
            >
            password
            </label>
            <PasswordInput className=''
            ref={passwordInputRef}
            placeholder='***********'
            required
            
            />
          </div>
          <div className="flex flex-wrap items-center justify-between mb-6">
         
          </div>
      
               <input type='submit'
              className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center cursor-pointer leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
    value="  login"
           /> 
        
          
        </form>
      </div>

  </section>
  )
}

export default LoginScreen