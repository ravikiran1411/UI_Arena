import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'

const Login = ({setToken}) => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const onSubmitHandler = async (e) => {

    e.preventDefault()

    try {
        
        const response = await axios.post(backendUrl+'/api/auth/adminlogin',{email,password})

        if (response.data.success) {
            
            setToken(response.data.token)
            localStorage.setItem("adminToken",response.data.token)
            setEmail("")
            setPassword("")
            toast.success("login successfull")
        }
        else{
            console.log(response.data.message);
            toast.error(response.data.message)            
        }

    } catch (error) {
        console.log(error.message);
        toast.error("something went wrong")
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>

      <form onSubmit={onSubmitHandler} className='bg-neutral-800 border border-neutral-800 p-8 rounded-xl w-[400px] max-w-[90%] flex flex-col gap-5'>

        <h1 className='text-xl md:text-3xl font-bold text-center text-rose-500'>ADMIN LOGIN</h1>

        <div className='flex flex-col gap-2'>
          <label className='text-neutral-400'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className='border border-neutral-700 text-white rounded-lg h-12 px-4 outline-none focus:border-rose-500'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-neutral-400'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className='border border-neutral-700 text-white rounded-lg h-12 px-4 outline-none focus:border-rose-500'
          />
        </div>

        <button type='submit' className='bg-rose-500 hover:bg-rose-600 transition-all duration-300 py-3 rounded-lg font-medium'>
          Login
        </button>

      </form>

    </div>
  )
}

export default Login