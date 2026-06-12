import React, { useContext, useState } from 'react'
import { DataContext } from '../context/DataContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

    const {token,setToken,backendUrl} = useContext(DataContext);

    const [loginType,setLoginType] = useState("signUp")

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate=useNavigate()

    const switchMode = (type) => {
        setLoginType(type)
        setName("")
        setEmail("")
        setPassword("")
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            if (loginType==="signUp") {
                
                const response = await axios.post(backendUrl+'/api/auth/register',{name,email,password})
                if (response.data.success) {
                    
                    setToken(response.data.token)
                    localStorage.setItem("token",response.data.token)
                    toast.success("account created succesfully..")
                    navigate('/')
                }
            }
            else {
                console.log("before");
                
                const response = await axios.post(backendUrl+'/api/auth/login',{email,password})
                
                
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem("token",response.data.token)
                    toast.success("login successfull..")
                    console.log(response.data.token);
                    
                    navigate('/')
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong..please login again")
            
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center">

        <form onSubmit={submitHandler} className="bg-neutral-900 w-112.5 max-w-[90%] mx-auto mt-20 p-8 rounded-xl border border-neutral-800 flex flex-col gap-5">
            <div>
                <h1 className='text-3xl font-bold uppercase text-center '>{loginType}</h1>
            </div>
            <div className='flex flex-col gap-3'>
                { loginType === 'signUp' && (
                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-medium text-neutral-400'>Enter user name</label>
                        <input 
                        type='text' 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className='outline-none border border-neutral-700 text-xl w-full h-12 px-4 rounded-lg focus:border-rose-500' 
                        />
                    </div>
                    )   
                }

                <div className='text-xl flex flex-col gap-2'>
                    <label className='text-lg font-medium text-neutral-400'>Enter Email:</label>
                    <input 
                    type='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className='outline-none border border-neutral-700 text-xl w-full h-12 px-4 rounded-lg focus:border-rose-500' 
                    />
                </div>

                <div className='text-xl flex flex-col gap-2'>
                    <label className='text-lg font-medium text-neutral-400'>Enter Password</label>
                    <input 
                    type='password' 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className='outline-none border border-neutral-700 text-xl w-full h-12 px-4 rounded-lg focus:border-rose-500' 
                    />
                </div>
            </div>

            <div className='flex justify-between gap-5'>

                <p className="text-neutral-400 hover:text-rose-500 cursor-pointer">Forgot Password?</p>

                <div>
                    {
                        loginType==="login" && (
                        <p className="text-neutral-400">Don't have an account?
                            <span onClick={()=>switchMode("signUp")} className="text-rose-500  cursor-pointer ml-1">
                                Sign Up
                            </span>
                        </p>
                        )
                    }
                {
                loginType==='signUp' && (
                    <span onClick={()=>switchMode("login")} className='text-lg font-medium text-rose-500'>login</span>
                )
                }
                </div>
            </div>
            
            <button type='submit' className='border p-2 text-white bg-rose-500 hover:bg-rose-600 rounded transition-all duration-300 text-xl uppercase'>{loginType}</button>
        </form>
    </div>
  )
}

export default Login 