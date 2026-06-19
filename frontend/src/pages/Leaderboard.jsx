import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { assets } from '../assets/assets';
import Login from './Login';

const Leaderboard = () => {
  
  const {leaderboard,currentUser,token} = useContext(DataContext);
  const finalToken = localStorage.getItem('token') || token 

  return (
    <div>
      {
        finalToken ? (
          <div>
            <div className='mt-10'>
              <h1 className='text-center text-4xl md:text-6xl text-slate-100 font-bold'> Leaderboard</h1>
              <p className='text-center text-slate-400 mt-4'>See how you rank against other UI Arena builders.</p>
            </div>
            <div className="mt-10 bg-slate-900 border border-slate-800 rounded-xl px-2 sm:px-15 mx-3 sm:mx-50 py-4">
              <div className="grid grid-cols-[50px_1fr_80px] sm:grid-cols-3 text-slate-400 font-medium sm:px-3">
                <p>Rank</p>
                <p>User Name</p>
                <p className="text-right">Total Points</p>
              </div>
              <div className="mt-3 flex flex-col sm:gap-3">
                {
                leaderboard.map((user,index)=>(
                <div
                key={user._id}
                className="bg-slate-900 border border-slate-800 rounded-xl px-6 py-4 hover:border-cyan-500/30 transition-all"
                >
                  <div className="grid grid-cols-[50px_1fr_80px] sm:grid-cols-3 items-center">
                    <div>
                      <p className={`font-bold text-lg ${index === 0 ? "text-yellow-500" : index === 1 ? "text-slate-300" : index === 2 ? "text-orange-500" : "text-cyan-400"}`}>#{index+1}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <img src={user.profileImage || assets.profile_icon} alt="" className="w-10 h-10 rounded-full object-cover"/>
                      <p className="font-medium text-slate-100">{user.name}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-slate-100">{user.points} pts</p>
                    </div>
                  </div>
                </div>
                ))}
              </div>

              <div className="mt-12">
                <h2 className="text-2xl text-cyan-400 font-semibold mb-5">Your Position</h2>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-6 py-5">

                  <div className="grid grid-cols-[50px_1fr_80px] sm:grid-cols-3 items-center">
                    <p className="text-cyan-400 font-bold text-xl">#{currentUser?.rank}</p>
                    <div className='flex items-center gap-2'> 
                      <img src={currentUser.profileImg || assets.profile_icon}  className="w-10 h-10 rounded-full object-cover" />
                      <p className="font-medium text-cyan-400">{currentUser?.name}</p>
                    </div>
                    <p className="text-right text-cyan-400 font-bold">{currentUser?.points} pts</p>
                  </div>
                </div>
              </div>

            </div>

          </div> ):(
            <div><Login/></div>
          )

        
      }

    </div>
  )
}

export default Leaderboard