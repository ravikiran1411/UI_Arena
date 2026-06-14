import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {

    const logoutSubmit = () => {

        try {
            setToken("");
            localStorage.removeItem("adminToken")
        } catch (error) {
            
        }
    } 

  return (
    <div className='bg-neutral-900 border-b border-neutral-800 px-4 sm:px-8 py-4'>

      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4'>

        <img src={assets.admin_logo} alt="UI Arena Admin" className='w-28 md:w-44'/>

        <div className='flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12'>

          <NavLink to='/' className={({ isActive }) => isActive ? 'text-rose-500 font-medium' : 'text-neutral-100 hover:text-rose-500 transition-all duration-300'}>
            Add Challenge
          </NavLink>

          <NavLink to='/list' className={({ isActive }) => isActive ? 'text-rose-500 font-medium' : 'text-neutral-100 hover:text-rose-500 transition-all duration-300'}>
            List Challenges
          </NavLink>

        </div>

        <button onClick={logoutSubmit} className='hidden sm:block bg-rose-500 hover:bg-rose-600 transition-all duration-300 px-4 py-2 rounded-lg text-white font-medium cursor-pointer'>
          Logout
        </button>

      </div>

    </div>
  )
}

export default Navbar