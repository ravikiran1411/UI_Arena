import React from 'react'
import { backendUrl } from '../App'
import { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import {toast} from 'react-toastify'

const AddChallenge = ({token}) => {
  
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [difficulty,setDifficulty] = useState("Easy")
  const [category,setCategory] = useState("HTML")
  const [requirements,setRequirements] = useState("")
  const [validationRules,setValidationRules] = useState("")
  const [image,setImage]=useState(false)
  const [challengeNumber,setChallengeNumber] = useState(false)

  const submitHandler = async (e) => {

    e.preventDefault()

    try {
      const finalToken = token || localStorage.getItem("adminToken")      

      const formData = new FormData();

      formData.append("title",title);
      formData.append("description",description);
      formData.append("difficulty",difficulty);
      formData.append("category",category);
      formData.append("validationRules",validationRules);
      formData.append("image",image);

      formData.append("requirements",JSON.stringify(requirements.split("\n").filter(item => item.trim() !== "")))

      const response = await axios.post(backendUrl+'/api/challenge/addchallenge',formData,{headers:{token:finalToken}})

        if (response.data.success) {
          console.log("challenge added");
          toast.success(response.data.message)

          setTitle("")
          setDescription("")
          setValidationRules("")
          setRequirements("")
          setImage(false)
    
        }
        else{
          console.log("error");
          toast.error(response.data.message)
        }
      
    } catch (error) {
      console.log(error.message);
    }
  }



  return (

    <div className='max-w-4xl mx-auto px-4 py-10'>
      <form onSubmit={submitHandler}className='bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-5'>
        <h1 className='text-3xl font-bold text-cyan-500 text-center'>Add New Challenge</h1>
        
        <div className='flex flex-col gap-2'>
          <label className='text-slate-300 font-bold'>Title</label>
          <input
          type='text'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className='border border-slate-700 text-slate-100 rounded-lg h-12 px-4 outline-none focus:border-cyan-500'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-slate-300 font-bold'>Description</label>
          <textarea
          rows={5}
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          className='border rounded-lg p-4 outline-none  border-slate-700 focus:border-cyan-500 text-slate-100 bg-slate-900 placeholder:text-slate-400'
          />
        </div>

        <div className='grid sm:grid-cols-2 gap-5'>
          <div className='flex flex-col gap-2'>
            <label className='text-slate-300 font-bold'>Difficulty</label>
            <select
            value={difficulty}
            onChange={(e)=>setDifficulty(e.target.value)}
            className='border rounded-lg h-12 px-4 border-slate-700 bg-slate-900 text-slate-100 focus:border-cyan-500'
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-slate-300 font-bold'>Category</label>
            <select
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className='border rounded-lg h-12 px-4 border-slate-700 bg-slate-900 text-slate-100 focus:border-cyan-500'
            >
              <option>HTML</option>
              <option>CSS</option>
            </select>
          </div>

        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-slate-300 font-bold'>Requirements</label>
          <textarea
          rows={5}
          value={requirements}
          onChange={(e)=>setRequirements(e.target.value)}
          placeholder='One requirement per line'
          className='border rounded-lg p-4 outline-none  border-slate-700 focus:border-cyan-500 text-slate-100 bg-slate-900 placeholder:text-slate-400'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-slate-300 font-bold'>Validation Rules</label>
          <textarea
          rows={8}
          value={validationRules}
          onChange={(e)=>setValidationRules(e.target.value)}
          placeholder='Enter JSON array'
          className='border rounded-lg p-4 outline-none  border-slate-700 focus:border-cyan-500 text-slate-100 bg-slate-900 placeholder:text-slate-400'
          />
        </div>

    
        <label htmlFor="image" className='flex flex-col gap-3'>
          <p className='text-slate-300 font-bold'>Output Reference Image</p>
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className="w-30 h-30 object-cover cursor-pointer border rounded" />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden/>
        </label>

        <button type='submit' className='bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 py-3 rounded-lg font-medium'>Add Challenge</button>

      </form>

    </div>
  )

}

export default AddChallenge