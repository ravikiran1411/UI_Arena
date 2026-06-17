import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'

const Stats = () => {

    const {totalChallenges,completedCount,inprogressCount} = useContext(DataContext)

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-20 py-10'>
            <div className='flex flex-col gap-5'>
                <div className='text-center'>
                    <h1 className='text-2xl md:text-4xl font-bold text-cyan-400'>Track Your Progress</h1>
                </div>
                <div className='flex min-w-[70%] sm:min-w-0 sm:grid overflow-x-auto sm:grid-cols-3 gap-3 sm:gap-5'>
                    <div className='bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center hover:border-cyan-500 transition-all duration-300'>
                        <h2 className='text-5xl font-bold text-cyan-500'>{totalChallenges}</h2>
                        <p className='text-slate-400 mt-3'>Total Challenges</p>
                    </div>

                    <div className='bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center hover:border-emerald-500 transition-all duration-300'>
                        <h2 className='text-5xl font-bold text-emerald-500'>{completedCount}</h2>
                        <p className='text-slate-400 mt-3'>Completed</p>
                    </div>

                    <div className='bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center hover:border-yellow-500 transition-all duration-300'>
                        <h2 className='text-5xl font-bold text-yellow-500'>{inprogressCount}</h2>
                        <p className='text-slate-400 mt-3'>In Progress</p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Stats