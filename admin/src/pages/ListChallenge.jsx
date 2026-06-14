import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";

const ListChallenge = ({token}) => {

  const [challenges,setChallenges] = useState([])
  const finalToken = token || localStorage.getItem("adminToken")
  const navigate = useNavigate()

  const challengeList = async () => {

    try {

      const response = await axios.get(backendUrl+'/api/challenge/list')

      if (response.data.success) {
        setChallenges(response.data.challenges)
      }
      else{
        console.log(response.data.message);
        toast.error("something is fishy..");
        
      }
      
    } catch (error) {
      console.log(error.message);
      toast.error("something went wrong..")
    }
  }

  const deleteChallenge = async (id) => {
    try {            
      
      const response = await axios.post(`${backendUrl}/api/challenge/delete/${id}`,{},{headers:{token:finalToken}})      

      if (response.data.success) {
        toast.success("challenge deleted succesfully..")
        challengeList()
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error.message);
      toast.error("something went wrong")
    }
  }

  useEffect(()=>{
    challengeList()
  },[])

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>

      <h1 className='text-3xl font-bold text-cyan-500 mb-6'>Challenges</h1>

      <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] bg-slate-900 border border-slate-800 p-4 rounded-lg text-slate-300 font-semibold'>
        <p>No</p>
        <p>Title</p>
        <p>Category</p>
        <p>Difficulty</p>
        <p>Actions</p>
      </div>


      <div className='pt-4 flex flex-col gap-3'>

        {
          challenges.map((item)=>(

            <div key={item._id}>
              <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-center border border-slate-800 bg-slate-900 p-4 rounded-lg'>
                
                <p className='text-slate-100'>{item.challengeNumber}</p>

                <p className='text-slate-100'>{item.title}</p>

                <p className='text-slate-400'>{item.category}</p>

                <p className={item.difficulty === "Easy" ? "text-emerald-500" : item.difficulty === "Medium" ? "text-yellow-500" : "text-red-500"}>
                  {item.difficulty}
                </p>

                <div className='flex gap-2'>

                  <button 
                  onClick={()=>navigate(`/update/${item._id}`)}
                  className='bg-cyan-500 hover:bg-cyan-600 px-3 py-1 rounded text-white transition-all duration-300'
                  >
                    Edit
                  </button>

                  <button 
                  onClick={()=>deleteChallenge(item._id)}
                  className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white transition-all duration-300'
                  >
                    Delete
                  </button> 

                </div>

              </div>

              <div className='md:hidden border border-slate-800 bg-slate-900 rounded-lg p-4'>

                <p className='text-cyan-500 font-semibold'>{item.challengeNumber}</p>

                <h2 className='text-slate-100 text-lg font-medium mt-2'>{item.title}</h2>

                <p className='text-slate-400 mt-1'>{item.category}</p>

                <p className={item.difficulty === "Easy" ? "text-emerald-500 mt-1" : item.difficulty === "Medium" ? "text-yellow-500 mt-1" : "text-red-500 mt-1"}>
                  {item.difficulty}
                </p>

                <div className='flex gap-3 mt-4'>

                  <button 
                  onClick={()=>navigate(`/update/${item._id}`)}
                  className='flex-1 bg-cyan-500 hover:bg-cyan-600 py-2 rounded text-white transition-all duration-300'>
                    Edit
                  </button>

                  <button 
                  onClick={()=>deleteChallenge(item._id)}
                  className='flex-1 bg-red-500 hover:bg-red-600 py-2 rounded text-white transition-all duration-300'>
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  )
}

export default ListChallenge