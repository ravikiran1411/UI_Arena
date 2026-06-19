import React, { useContext, useState } from 'react'
import axios from 'axios'
import { DataContext } from '../context/DataContext'
import {useNavigate} from 'react-router-dom';

const Challenges = () => {

  const navigate = useNavigate();
  const {backendUrl,token,challenge,setChallenge,submissions} = useContext(DataContext)

  const [search, setSearch] = useState("")
  const [category,setCategory]=useState("All")
  const [difficulty,setDifficulty]=useState("All")

  const categoryChallenges = category==="All" ? challenge : challenge.filter((item)=>item.category.toLowerCase().includes(category.toLowerCase()))

  const difficultyChallenges = difficulty==="All" ? categoryChallenges : categoryChallenges.filter((item)=>item.difficulty.toLowerCase().includes(difficulty.toLowerCase()))

  const filteredChallenges = search.trim() !=="" ? challenge.filter((item=> item.title.toLowerCase().includes(search.toLowerCase()) 
  || item.challengeNumber.toString().includes(search) )) : difficultyChallenges

  const getStatus = (id) => {
        
    const submission = submissions.find((item)=>item.challengeId._id.toString() === id.toString())    
    

    return submission?.status

  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>

      <h1 className='text-4xl font-bold text-slate-100'>Challenges</h1>
      <p className='text-slate-400 mt-2'>Practice real UI challenges and improve your frontend skills</p>

      <div className='mt-8'>
        <input
          type="text"
          placeholder="Search challenges..."
          value={search}
          onChange={(e) =>{ 
            setSearch(e.target.value)
            if (e.target.value.trim() !== "") {
              setCategory("All");
              setDifficulty("All");
            }
          }}
          className='w-full bg-slate-900 border border-slate-800 rounded-xl h-12 px-4 text-slate-100 outline-none focus:border-cyan-500 placeholder:text-slate-400'
        />
      </div>

      <div className='flex flex-col lg:flex-row lg:justify-between md:px-20 gap-6 mt-6'>
        <div className='flex flex-col flex-wrap gap-3'>
          <h1 className='text-xl text-center text-white'>Category</h1>

          <div className='flex flex-wrap gap-3'>
            <button 
            onClick={()=>setCategory("All")}
            className={` px-5 py-2 rounded-lg text-slate-100 transition-all hover:border hover:border-cyan-500 duration-300 ${category==="All" ? "bg-cyan-500 " : "bg-slate-900" }`}
            >
              All
            </button>

            <button 
            onClick={()=> setCategory("HTML")}
            className={` px-5 py-2 rounded-lg text-slate-100 transition-all hover:border hover:border-cyan-500 duration-300 ${category==="HTML" ? "bg-cyan-500 " : "bg-slate-900" }`}
            >
              HTML
            </button>

            <button 
            onClick={()=>setCategory("CSS")}
            className={` px-5 py-2 rounded-lg text-slate-100 transition-all hover:border hover:border-cyan-500 duration-300 ${category==="CSS" ? "bg-cyan-500 " : "bg-slate-900" }`}
            >
              CSS
            </button>

          </div>


        </div>

        <div className='flex flex-col flex-wrap gap-3'>

          <h1 className='text-xl text-white text-center'>Difficulty</h1>
          <div className='flex flex-wrap gap-3'>

            <button
            onClick={()=>setDifficulty("All")}
            className={`bg-slate-900 px-5 py-2 rounded-lg text-slate-100 transition-all duration-300 border  ${difficulty==="All" ? "border-cyan-500 " : "border-slate-800" }`}
            >
              All
            </button>

            <button
            onClick={()=>setDifficulty("Easy")}
            className={`bg-slate-900 border px-5 py-2 rounded-lg text-emerald-500 transition-all duration-300  ${difficulty==="Easy" ? "border-emerald-500" : "border-slate-800" } `}
            >
              Easy
            </button>

            <button 
            onClick={()=>setDifficulty("Medium")}
            className={`bg-slate-900 border px-5 py-2 rounded-lg text-yellow-500 transition-all duration-300 ${difficulty==="Medium" ? "border-yellow-500" : "border-slate-800" }  `}
            >
              Medium
            </button>

            <button 
            onClick={()=>setDifficulty("Hard")}
            className={`bg-slate-900 border px-5 py-2 rounded-lg text-red-500 transition-all duration-300 ${difficulty==="Hard" ? "border-red-500" : "border-slate-800"  }`}
            >
              Hard
            </button>
          </div>

        </div>
      </div>

      {
        filteredChallenges.length === 0 && (
          <div className='text-center py-16'>
            <p className='text-slate-400 text-lg'>
              No challenges found
            </p>
          </div>
        )
      }

      <div className='mt-8 flex flex-col gap-3'>
        {
          filteredChallenges.map((item) => (

            <div
              key={item._id}
              className='bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-cyan-500 transition-all duration-300'
            >

              <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_auto] items-center gap-4'>

                <p className='text-slate-100 font-medium'>#{item.challengeNumber}</p>
                <p className='text-slate-100 font-medium'>{item.title}</p>
                <p className='text-slate-400'>{item.category}</p>
                <p className={ item.difficulty === "Easy" ? "text-emerald-500" : item.difficulty === "Medium" ? "text-yellow-500" : "text-red-500"}>{item.difficulty}</p>
             
                {
                  getStatus(item._id) === "completed" ? (
                    <button onClick={()=>navigate(`/challengedetails/${item._id}`)} className="bg-emerald-500 px-4 py-2 rounded-lg text-white w-35">Completed</button>
                  ) : getStatus(item._id) === "in-progress" ? (
                    <button onClick={()=>navigate(`/challengedetails/${item._id}`)} className="bg-yellow-500 px-4 py-2 rounded-lg text-white w-35">Continue</button>
                  ) : (
                    <button onClick={()=>navigate(`/challengedetails/${item._id}`)} className="bg-cyan-500 px-3 py-2 rounded-lg text-white w-35">Start Challenge</button>
                  )
                }

              </div>

              <div className='md:hidden'>

                <div className='flex gap-2 items-center'>
                  <p className='text-cyan-500 font-semibold'>#{item.challengeNumber}</p>
                  <span className='text-cyan-500 font-semibold'> {item.title}</span>
                </div>
                <div className='flex justify-evenly gap-3 mt-2'>
                  <span className='text-slate-400'>{item.category}</span>
                  <span className={item.difficulty === "Easy" ? "text-emerald-500" : item.difficulty === "Medium" ? "text-yellow-500" : "text-red-500"}>{item.difficulty}</span>
                </div>

                {/* <button 
                className='w-full mt-4 bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg text-slate-100 transition-all duration-300'
                onClick={()=>navigate(`/challengedetails/${item._id}`)}
                >
                  Start Challenge
                </button> */}

                {
                  getStatus(item._id) === "completed" ? (
                    <button onClick={()=>navigate(`/challengedetails/${item._id}`)} className="bg-emerald-500 mt-4 px-2 py-2 rounded-lg text-white w-full">Completed</button>
                  ) : getStatus(item._id) === "in-progress" ? (
                    <button onClick={()=>navigate(`/challengedetails/${item._id}`)} className="bg-yellow-500 mt-4 px-2 py-2 rounded-lg text-white w-full">Continue</button>
                  ) : (
                    <button onClick={()=>navigate(`/challengedetails/${item._id}`)} className="bg-cyan-500 mt-4 px-2 py-2 rounded-lg text-white w-full ">Start Challenge</button>
                  )
                }


              </div>

            </div>

          ))
        }

      </div>

    </div>
  )
}

export default Challenges