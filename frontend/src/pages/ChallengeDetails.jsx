import React, { useState } from 'react'
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ChallengeDetails = () => {

  const {token,backendUrl,challenge} = useContext(DataContext)
  const [oneChallenge,setOneChallenge]=useState(null)

  const {id} = useParams()

  const singleChallenge = async () => {
    const response = await axios.get(`${backendUrl}/api/challenge/singlechallenge/${id}`)

    if (response.data.success) {
      setOneChallenge(response.data.challenge)
    }
  }

  useEffect(()=>{
    singleChallenge()
  },[id])

  if (!oneChallenge) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin'></div>
      </div>
    )
  }
 

  return (
    <div className='px-2 md:px-20 pt-3 md:py-8'>

      <div className='grid lg:grid-cols-[35%_65%] gap-8'>

        <div className='bg-slate-900 border border-slate-800 rounded-xl p-3 sm:py-6 sm:px-10 h-fit lg:sticky lg:top-6'>
          <p className='inline-block bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 px-3 py-1 rounded-full text-sm'>Challenge #{oneChallenge.challengeNumber}</p>
          <h1 className='text-3xl font-bold text-slate-100 mt-2'>{oneChallenge.title}</h1>

          <div className='flex gap-3 mt-4'>
            <span className='bg-slate-800 text-emerald-500 px-3 py-1 rounded-lg text-sm'>{oneChallenge?.difficulty}</span>
            <span className='bg-slate-800 text-slate-300 px-3 py-1 rounded-lg text-sm'>{oneChallenge?.category}</span>
          </div>

          <div className='mt-8'>

            <h2 className='text-xl font-semibold text-slate-100'>
              Description
            </h2>

            <p className='text-slate-400 mt-3 leading-relaxed'>
              {oneChallenge?.description}
            </p>

          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">Reference Output</h2>
            <img
            src={oneChallenge.outputImage}
            alt={oneChallenge.title}
            className="rounded-xl border border-slate-800"
            />
          </div>


          <div className='mt-8'>

            <h2 className='text-xl font-semibold text-slate-100'>
              Requirements
            </h2>
            <ul className='mt-4 space-y-1 text-slate-400 list-disc pl-5'>

            {
              oneChallenge?.requirements?.map((item)=><li>{item}</li>)
            }
            </ul>

          </div>


        </div>

        {/* Right Side */}

        <div className='flex flex-col gap-6 px-3'>

          {/* Code Editor */}

          <div className='bg-slate-900 border border-slate-800 rounded-xl overflow-hidden'>

            <div className='border-b border-slate-800 px-4 py-3 flex justify-between'>
              <h2 className='text-slate-100 font-medium'>
                Code Editor
              </h2>
              <button className='bg-cyan-500 hover:bg-cyan-600 px-4 py-1 rounded-lg text-white text-sm'>Submit</button>
            </div>

            <textarea
              // value={code}
              // onChange={(e) => setCode(e.target.value)}
              className='w-full h-125 bg-slate-900 text-slate-100 p-4 outline-none resize-none font-mono'
            />

          </div>

          {/* Preview */}

          <div className='bg-slate-900 border border-slate-800 rounded-xl overflow-hidden'>

            <div className='border-b border-slate-800 px-4 py-3'>
              <h2 className='text-slate-100 font-medium'>
                Live Preview
              </h2>
            </div>

            <div className='bg-white h-125'>
              <iframe
                title='preview'
                // srcDoc={code}
                className='w-full h-full'
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ChallengeDetails