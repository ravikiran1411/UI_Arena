import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='border-t border-slate-800 mt-20'>
        <div className='max-w-7xl mx-auto px-4 py-12'>
            <div className='grid md:grid-cols-3 gap-5 sm:gap-20'>
                <div>
                    <h2 className='text-3xl font-bold text-cyan-500'>UIArena</h2>
                    <p className='text-slate-400 mt-4 leading-relaxed hidden md:block'>Practice real-world frontend challenges, improve your
                        HTML & CSS skills, and become a better developer through hands-on learning.
                    </p>
                </div>

                <div>
                    <h3 className='text-slate-100 font-semibold mb-2'>Quick Links</h3>
                    <div className='flex flex-col gap-2'>
                        <NavLink to='/' className='text-slate-400 hover:text-cyan-500 transition-colors'>Home</NavLink>
                        <NavLink to='/challenges' className='text-slate-400 hover:text-cyan-500 transition-colors'>Challenges</NavLink>
                        <NavLink to='/dashboard' className='text-slate-400 hover:text-cyan-500 transition-colors'>Dashboard</NavLink>
                        <NavLink to='/leaderboard' className='text-slate-400 hover:text-cyan-500 transition-colors'>Leaderboard</NavLink>
                    </div>
                </div>
                
                <div>
                    <h3 className='text-slate-100 font-semibold mb-2'>Contact</h3>
                    <div className='flex flex-col'>
                        <p className='text-slate-400 leading-relaxed'>Vishapatnam, India</p>
                        <p className='text-slate-400 leading-relaxed'>uiarena@gmail.com</p>
                        <p className='text-slate-400 leading-relaxed'>+91 863-XXX-XXXX</p>
                    </div> 

                </div> 
            </div>

            <div className='pt-5'>
                <div className="h-px bg-slate-800 w-full"></div>
                <p className='text-slate-500 text-sm text-center mt-5'>&copy; 2026 UIArena. All rights reserved.</p>

            </div>

      </div>

    </div>
  )
}

export default Footer