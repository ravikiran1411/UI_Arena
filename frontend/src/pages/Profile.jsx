import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { assets } from '../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { LogIn } from 'lucide-react'

const Profile = () => {

  const {profileData,completedCount,currentUser,bookmark,submissions,backendUrl,token,setToken,getProfileData}= useContext(DataContext)   
  const [editProfile,setEditProfile] = useState(false)
  const [name,setName] = useState(profileData?.name || "")
  const [profileImage,setProfileImage] = useState(null)

  const finalToken = localStorage.getItem('token') || token
  const navigate = useNavigate()

  const getStatus = (id) => {
        
    const submission = submissions.find((item)=>item.challengeId._id.toString() === id.toString())      
    return submission?.status

  }

  const updateProfile = async () => {
    try {
      let formData = new FormData();

      formData.append("name",name);

      if (profileImage) {
        formData.append("profileImage",profileImage);
      }

      const response = await axios.post(backendUrl+'/api/profile/update',formData,{headers:{token:finalToken}})

      if (response.data.success) {
        await getProfileData()
      }

    } catch (error) {
      
    }
  }

  const logoutHandler = () => {
    try {
      
      setToken("")
      localStorage.removeItem('token')
      toast.success("Logged out successfully");
      navigate('/login')

    } catch (error) {
      console.log(error);
    }
  }

  if (!finalToken) {
    return <LogIn/>
  }

  useEffect(() => {
    if(profileData){
      setName(profileData.name)
    }
  }, [profileData])
 

  return (
    <div className='sm:px-15 mx-3 sm:mx-10 sm:mt-5'>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:px-85 lg:px-125 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-900"/>
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-28"> 
            <div className="absolute inset-0 rounded-full bg-cyan-400 p-0.75">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={profileData?.profileImage || assets.profile_icon} alt="" className="w-full h-full object-cover "/>
              </div>
            </div> 
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-100 tracking-wide">{profileData?.name}</h1>
          <p className="text-slate-500 text-sm mt-1">{profileData?.email}</p>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <div className="bg-slate-800 px-5 py-2 rounded-2xl text-cyan-400 text-sm font-medium flex items-center gap-2">
              {profileData?.points || 0} Points
            </div>
            <h1 className="bg-cyan-950/50 px-5 py-2 rounded-full text-yellow-400 text-sm font-medium flex items-center gap-2">
              #{currentUser?.rank || "-"} Rank
            </h1>
            <div className="bg-slate-500/10 px-5 py-2 rounded-full text-slate-100 text-sm font-medium flex items-center gap-2">
              {completedCount} Solved
            </div>
          </div>
        
          <button onClick={() => { 
            setName(profileData.name) 
            setEditProfile(true)}}
            className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 transition-colors duration-200 px-5 py-2.5 rounded-xl font-semibold text-white tracking-wide"
            >
            
              Edit Profile
          </button>
        </div>
      </div>


      <div className="p-6 mt-8">
        <h2 className="text-xl sm:text-4xl text-center font-semibold mb-5 text-slate-100">Account Details</h2>
        <div className="space-y-5 sm:grid sm:grid-cols-3 mt-10 md:px-10 bg-slate-900 border border-slate-800 rounded-2xl sm:py-5">
          <div>
            <p className="text-slate-500 text-sm">Full Name</p>
            <p className="text-slate-100 mt-1">{profileData?.name}</p>
          </div>

          <div>
            <p className="text-slate-500 text-sm">Email Address</p>
            <p className="text-slate-100 mt-1">{profileData?.email}</p>
          </div>

          <div>
            <p className="text-slate-500 text-sm">Member Since</p>
            <p className="text-slate-100 mt-1">{new Date(profileData?.createdAt).toLocaleDateString()}</p>
          </div>

        </div>
      </div>

      <div className=" p-6 mt-8">
        <div className="flex items-center justify-center gap-2 mb-6 text-base sm:text-4xl">
          <h2 className="font-semibold text-slate-100">Bookmarked Challenges</h2>
          <span className="text-slate-400">({bookmark.length})</span>
        </div>

        {
        bookmark.length > 0 ? (
        <div className='mt-8 flex flex-col gap-3 bg-slate-900 border border-slate-800 rounded-2xl'>
          {
          bookmark.map((item) => (
          <div key={item._id} className='p-4'>
            <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-center gap-4'>
              <p className='text-slate-100 font-medium'>#{item.challengeNumber}</p>
              <p className='text-slate-100 font-medium text-lg'>{item.title}</p>
              <p className='text-slate-400'>{item.category}</p>
              <p className={ item.difficulty === "Easy" ? "text-emerald-500" : item.difficulty === "Medium" ? "text-yellow-500" : "text-red-500"}>{item.difficulty}</p>
              {
              getStatus(item._id) === "completed" ? (
              <button onClick={()=>navigate(`/challengedetails/${item._id}`)} className="bg-emerald-500 px-4 py-2 rounded-lg text-white w-35">Completed</button>) : 
              getStatus(item._id) === "in-progress" ? (
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
                {
                getStatus(item._id) === "completed" ? (
                <button onClick={()=>navigate(`/challengedetails/${item._id}`)} className="bg-emerald-500 mt-4 px-2 py-2 rounded-lg text-white w-full">Completed</button>
                ) : getStatus(item._id) === "in-progress" ? (
                <button onClick={()=>navigate(`/challengedetails/${item._id}`)} className="bg-yellow-500 mt-4 px-2 py-2 rounded-lg text-white w-full">Continue</button>
                ) : ( <button onClick={()=>navigate(`/challengedetails/${item._id}`)} className="bg-cyan-500 mt-4 px-2 py-2 rounded-lg text-white w-full ">Start Challenge</button>
                )}
          
              </div>
              <div className='w-full border border-cyan-400/10 mt-2'></div>
          </div>
          ))}
          
        </div>
          ) : (
                <div className="text-center py-10 text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
                    No bookmark challenges yet.
                </div>
            )
        }
      </div>

      <div className='w-full border border-slate-400 mt-10'></div>

      <button onClick={()=>logoutHandler()} className="mt-10 bg-red-500/10 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-xl sm:text-2xl font-semibold transition-all">LogOut</button>

      {
      editProfile && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 w-[95%] max-w-md rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">Edit Profile</h2>
            <div className="flex justify-center mb-5">
              <label htmlFor="profile">
                <img src={profileImage ? URL.createObjectURL(profileImage) : profileData?.profileImage || assets.profile_icon} alt="" className="w-28 h-28 rounded-full object-cover cursor-pointer"/>
              </label>
              <input hidden id="profile" type="file" onChange={(e)=> setProfileImage( e.target.files[0])}/>
            </div>

            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full text-slate-100 text-lg bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none"/>
            
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditProfile(false)} className="flex-1 border border-slate-700 rounded-lg py-3 text-slate-200">Cancel</button>
              <button onClick={updateProfile} className="flex-1 bg-cyan-500 rounded-lg py-3 text-slate-200"> Save</button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Profile