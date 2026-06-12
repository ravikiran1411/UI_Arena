import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { DataContext } from '../context/DataContext.jsx'

const Navbar = () => {
    
    const [open, setOpen] = useState(false)
    const {token,setToken} = useContext(DataContext)

    const finalToken = localStorage.getItem("token") || token


  return (
    <div id="navbar" className='bg-slate-900/80 border-b border-slate-800 px-4 sm:px-20 py-3 sm:py-5 sticky top-0 z-50 backdrop-blur-md'>
        <div className='max-w-7xl mx-auto flex justify-between'>

            <NavLink to='/'>
                <img src={assets.logo} alt='logo' className='w-25 sm:w-40'/>
            </NavLink>
            <div>
                <div className='sm:flex gap-8 pt-2 items-center hidden '>
                    <NavLink to='/challenges' className={({isActive})=> isActive ? "text-violet-500 text-xl" : "text-white hover:text-violet-400 transition-all duration-300 text-xl"}>Challenges</NavLink>
                    <NavLink to='/dashboard' className={({isActive})=> isActive ? "text-violet-500 text-xl" : "text-white hover:text-violet-400 transition-all duration-300 text-xl"} >Dashboard</NavLink>
                    <NavLink to='/leaderboard' className={({isActive})=> isActive ? "text-violet-500 text-xl" : "text-white hover:text-violet-400 transition-all duration-300 text-xl"}>Leaderboard</NavLink>
                </div>
            </div>

            <div className='sm:hidden flex items-center'>
                {
                open ? <X size={28} className='cursor-pointer' onClick={() => setOpen(false)}/> :
                <Menu size={28} className='cursor-pointer' onClick={() => setOpen(true)}/>
                }
            </div>

            <div className='flex gap-10 items-center' >
                {
                    !finalToken && (
                        <div className=' text-xl'>
                            <NavLink to='/login' className='hover:text-violet-500 transition-all duration-300 font-medium'>Login</NavLink>
                        </div>
                    )
                }

                <NavLink to='/profile' className='hidden sm:block gap-2'>
                    <img src={assets.profile_icon} className="w-10 hover:scale-110 transition-all duration-300" />
                </NavLink>
            </div>

        </div>
        {
            open && (
                <div className='sm:hidden mt-4 flex flex-col gap-4 bg-slate-900 rounded-xl p-4'>
                    <NavLink to='/challenges' onClick={() => setOpen(false)} className='hover:text-violet-500'>Challenges</NavLink>
                    <NavLink to='/dashboard' onClick={() => setOpen(false)} className='hover:text-violet-500'>Dashboard</NavLink>
                    <NavLink to='/leaderboard' onClick={() => setOpen(false)} className='hover:text-violet-500'>Leaderboard</NavLink>
                    <NavLink to='/profile' onClick={() => setOpen(false)} className='hover:text-violet-500'>Profile</NavLink>
                </div>
            )
        }
        
    </div>
  )
}

export default Navbar