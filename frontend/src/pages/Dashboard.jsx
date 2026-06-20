import React, { useContext,useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import Login from './Login';
import DashboardSkeleton from '../components/DashboardSkeleton';
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
  
  const {token,submissions,totalChallenges,completedCount,inprogressCount,easyCount,mediumCount,hardCount,HTMLCount,CSSCount,userName,loading} = useContext(DataContext);
  const finalToken = localStorage.getItem("token") || token
  const inProgress = submissions?.filter((item)=>item.status==="in-progress") || []
  const challenges = [...(submissions || [])].sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt)).slice(0,5)

  const navigate = useNavigate()

  if (!finalToken) {
    return <Login />
  }
  
  if (loading) {
    return <DashboardSkeleton/>
  }


  return (
      finalToken ? 
        (
        <div className='mx-5 sm:mx-10 my-5 px-3 sm:px-30 text-slate-100'>
          <div>
            <div className="mb-10">
              <h1 className="text-2xl sm:text-4xl font-bold text-slate-100">Welcome Back, <span>{userName || "Guest"}</span></h1>
              <p className="text-slate-400 mt-3 text-xs sm:text-sm">Track your progress and continue buildingreal-world frontend interfaces.</p>
            </div>

            <h1 className='text-center text-3xl md:text-5xl font-semibold md:font-bold my-8'>Track Your Progress</h1>

            <div className='flex flex-col items-center rounded justify-evenly gap-8'>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:ml-15 lg:ml-100'>

                <div className='bg-slate-900 rounded-full w-60 h-60 pt-18 text-center flex flex-col items-center'>
                  <h1 className='text-4xl font-bold'>
                    <span className='text-cyan-400'>{completedCount}</span>
                    <span className='text-slate-400'>/{totalChallenges}</span>
                  </h1>
                  <p className='text-slate-400 mt-2'>Challenges Solved</p>
                </div>

                <div className='flex flex-row sm:flex-col gap-3 '>
                  <div className='bg-slate-900 rounded-xl p-3 sm:p-6 text-center'>
                    <h1 className='text-4xl font-bold text-cyan-400'>{HTMLCount}</h1>
                    <p className='text-slate-100 mt-2'>HTML Challenges</p>
                  </div>
                  
                  <div className='bg-slate-900 rounded-xl p-3 sm:p-6 text-center'>
                    <h1 className='text-4xl font-bold text-cyan-400'>{CSSCount}</h1>
                    <p className='text-slate-100 mt-2'>CSS Challenges</p>
                  </div>

                </div>
              </div>

              <div className='grid sm:grid-cols-3 gap-4 w-full'>
                <div className='bg-slate-900 rounded-xl p-5 text-center border border-emerald-500/20'>
                  <h1 className='text-3xl font-bold text-emerald-500'>{easyCount}</h1>
                  <p className='text-slate-100'>Easy</p>
                </div>

                <div className='bg-slate-900 rounded-xl p-5 text-center border border-yellow-500/20'>
                  <h1 className='text-3xl font-bold text-yellow-500'>{mediumCount}</h1>
                  <p className='text-slate-100'>Medium</p>
                </div>
                
                <div className='bg-slate-900 rounded-xl p-5 text-center border border-red-500/20'>
                  <h1 className='text-3xl font-bold text-red-500'>{hardCount}</h1>
                  <p className='text-slate-100'>Hard</p>
                </div>
                
              </div>

            </div>

            <div className='mt-10 md:mt-25'>
              <h1 className='text-center text-3xl md:text-5xl font-semibold md:font-bold'>Challenges where you left</h1>
              
              <div>
                {
                  inProgress.length > 0 ? (
                    <div className='flex flex-col gap-3 mt-5'> 
                      {
                        inProgress.map((item)=>(
                          <div key={item._id} className='bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 sm:p-4 mt-5 flex flex-col sm:grid sm:grid-cols-[3fr_0.5fr_1fr] gap-3 items-center hover:border-cyan-500 transition-all duration-300'>
                            <div className='flex items-center gap-2 sm:gap-5'>
                              <h2 className='text-lg text-cyan-400 shrink-0'>#{item.challengeId.challengeNumber}</h2>
                              <h2 className='text-slate-100 text-base sm:text-lg font-medium'>{item.challengeId.title}</h2>
                            </div>

                            <p className='bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm font-medium hidden sm:block text-center'>In Progress</p>

                            <button onClick={() =>navigate(`/challengedetails/${item.challengeId._id}`)} className='w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-white'
>
                              Continue
                            </button>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <div className='bg-slate-900 border border-slate-800 rounded-xl p-8 text-center mt-8'>
                      <p className='text-slate-400'>No challenges in progress</p>
                    </div>
                  )
                }
              </div>
            </div>

            <div className='mt-10 md:mt-25'>
              <h1 className='text-center text-3xl md:text-5xl font-semibold md:font-bold mb-5'>Recent Activities</h1>
              {
                challenges.length>0 ? (
                  <div>
                    {
                      challenges.map((item)=>(
                        <div key={item._id} className=' bg-slate-900 border border-slate-800 rounded-xl p-4 sm:px-8 flex flex-col sm:grid sm:grid-cols-[2fr_1fr_0.4fr_0.5fr] items-center gap-4 '>

                          <div className='flex items-start gap-2 sm:gap-5'>
                            <div className='flex items-center mt-1 sm:mt-2'>
                              <div className={`h-3 w-3 rounded-full ${ item.status === "completed" ? "bg-emerald-500" : "bg-yellow-500"}`}></div>
                            </div>
                            <div className='flex gap-1 sm:gap-2 text-sm sm:text-lg'>
                              <span className='text-cyan-400 shrink-0'>{item.challengeId.challengeNumber}</span>
                              <h2 className='text-slate-100 font-medium'>{item.challengeId.title}</h2>
                            </div>
                          </div>

                          <h1 className={`hidden sm:block ${item.challengeId.difficulty === "Easy" ? "text-emerald-500" : item.challengeId.difficulty === "Medium" ? "text-yellow-500" : "text-red-500"}`}>{item.challengeId.difficulty}</h1>
                          <span className={`hidden sm:block px-3 py-1 text-center rounded-full text-sm font-medium ${ item.status === "completed" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"}`}>
                            {item.status}
                          </span>
                          <span className='hidden sm:block text-slate-500 text-sm'>{new Date(item.updatedAt).toLocaleDateString()}</span>

                        </div>
                        
                      ))
                    }
                  </div>
                ) : (
                <div className='bg-slate-900 border border-slate-800 rounded-xl p-8 text-center'> 
                  <p className='text-slate-400'>No recent activity found</p>
                </div>)
              }

            </div>

          </div>
        </div>)
        : (<Login/>)

  )
}

export default Dashboard