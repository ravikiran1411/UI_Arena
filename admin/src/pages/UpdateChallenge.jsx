import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'


const UpdateChallenge = ({ token }) => {

  const { id } = useParams()
  const navigate = useNavigate()

  const finalToken = token || localStorage.getItem("adminToken")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("Easy")
  const [category, setCategory] = useState("HTML")
  const [requirements, setRequirements] = useState("")
  const [validationRules, setValidationRules] = useState("")
  const [image, setImage] = useState(false)

  const fetchChallenge = async () => {
    try {
        
      const response = await axios.get(`${backendUrl}/api/challenge/singlechallenge/${id}`)
      

      if (response.data.success) {

        const challenge = response.data.challenge

        setTitle(challenge.title)
        setDescription(challenge.description)
        setDifficulty(challenge.difficulty)
        setCategory(challenge.category)
        setRequirements(challenge.requirements.join("\n"))
        setValidationRules(JSON.stringify(challenge.validationRules,null,2))

      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error.message)
      toast.error("Something went wrong")
    }
  }

  const updateChallenge = async (e) => {
    e.preventDefault()

    try {

      const formData = new FormData()

      formData.append("id", id)
      formData.append("title", title)
      formData.append("description", description)
      formData.append("difficulty", difficulty)
      formData.append("category", category)
      formData.append("requirements",JSON.stringify(requirements.split("\n").filter(item => item.trim() !== "")))
      formData.append("validationRules",validationRules)

      if (image) {
        formData.append("image", image)
      }

      const response = await axios.patch(`${backendUrl}/api/challenge/update/${id}`,formData,{headers: {token: finalToken}})

      if (response.data.success) {
        toast.success("Challenge Updated")
        navigate("/list")
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error.message)
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    fetchChallenge()
  }, [])

  return (
    <div className='max-w-4xl mx-auto px-4 py-10'>

      <form
        onSubmit={updateChallenge}
        className='bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-5'
      >

        <h1 className='text-3xl font-bold text-cyan-500 text-center'>
          Update Challenge
        </h1>

        <div className='flex flex-col gap-2'>
          <label className='text-slate-300 font-bold'>
            Title
          </label>

          <input
            type='text'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className='border border-slate-700 text-slate-100 rounded-lg h-12 px-4 outline-none focus:border-cyan-500'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-slate-300 font-bold'>
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className='border border-slate-700 focus:border-cyan-500 text-slate-100 bg-slate-900 rounded-lg p-4 outline-none'
          />
        </div>

        <div className='grid sm:grid-cols-2 gap-5'>

          <div className='flex flex-col gap-2'>
            <label className='text-slate-300 font-bold'>
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e)=>setDifficulty(e.target.value)}
              className='border border-slate-700 bg-slate-900 text-slate-100 rounded-lg h-12 px-4'
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-slate-300 font-bold'>
              Category
            </label>

            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className='border border-slate-700 bg-slate-900 text-slate-100 rounded-lg h-12 px-4'
            >
              <option>HTML</option>
              <option>CSS</option>
            </select>
          </div>

        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-slate-300 font-bold'>
            Requirements
          </label>

          <textarea
            rows={5}
            value={requirements}
            onChange={(e)=>setRequirements(e.target.value)}
            className='border border-slate-700 focus:border-cyan-500 text-slate-100 bg-slate-900 rounded-lg p-4 outline-none'
          />
        </div>

        <div className='flex flex-col gap-2'>
            <label className='text-slate-300 font-bold'>Validation Rules</label>

            <textarea
            rows={8}
            value={validationRules}
            onChange={(e)=>setValidationRules(e.target.value)}
            className='border border-slate-700 focus:border-cyan-500 text-slate-100 bg-slate-900 rounded-lg p-4 outline-none'
          />
        </div>

             <label htmlFor="image" className='flex flex-col gap-3'>
                  <p className='text-slate-300 font-bold'>Output Reference Image</p>
                  <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className="w-30 h-30 object-cover cursor-pointer border rounded" />
                  <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden/>
                </label>
        

        {/* <input
          type="file"
          onChange={(e)=>setImage(e.target.files[0])}
          className='text-slate-300'
        /> */}

        <button
          type='submit'
          className='bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-medium text-white'
        >
          Update Challenge
        </button>

      </form>

    </div>
  )
}

export default UpdateChallenge