import React from 'react'

const HowItWorks = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-20 py-3 my-5 bg-slate-900 rounded-2xl'>

      <div className='text-center'>

        <h2 className='text-4xl sm:text-5xl font-bold text-slate-100 mt-3'>
          How It Works
        </h2>

      </div>

      <div className='hidden md:block mt-15'>
        <div className='flex items-center'>

          <div className='flex flex-col items-center flex-1'>
            <div className='h-16 w-16 rounded-full bg-cyan-500/10 border border-cyan-500 flex items-center justify-center text-cyan-500 text-xl font-bold'>01</div>
            <h3 className='mt-6 text-xl font-semibold text-slate-100'>Choose Challenge</h3>
            <p className='text-slate-400 text-sm text-center mt-3 max-w-62.5'>Browse HTML & CSS challenges and pick one based on your skill level</p>
          </div>

          <div className='flex-1 h-0.5 bg-linear-to-r from-cyan-500 to-slate-100'></div>

          <div className='flex flex-col items-center flex-1'>
            <div className='h-16 w-16 rounded-full bg-cyan-500/10 border border-cyan-500 flex items-center justify-center text-cyan-500 text-xl font-bold'>02</div>
            <h3 className='mt-6 text-xl font-semibold text-slate-100'>Build Solution</h3>
            <p className='text-slate-400 text-sm text-center mt-3 max-w-62.5'>Write your solution using Monaco Editor with live preview support</p>
          </div>

          <div className='flex-1 h-0.5 bg-linear-to-r from-cyan-500 to-slate-200'></div>

          <div className='flex flex-col items-center flex-1'>
            <div className='h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-500 text-xl font-bold'>03</div>
            <h3 className='mt-6 text-xl font-semibold text-slate-100'>Submit & Validate</h3>
            <p className='text-slate-400 text-center mt-3 max-w-62.5'>Run validations, save progress and complete challenges</p>
          </div>

        </div>

      </div>



      <div className='md:hidden mt-14 flex flex-col gap-8'>

        <div className='flex gap-4'>
            <div className='flex flex-col items-center'>
                <div className='h-12 w-12 rounded-full bg-cyan-500/10 border border-cyan-500 flex items-center justify-center text-cyan-500 font-bold'>01</div>
                <div className='w-0.5 flex-1 bg-slate-800 mt-2'></div>
            </div>

            <div>
                <h3 className='text-lg font-semibold text-slate-100'>Choose Challenge</h3>
                <p className='text-slate-400 mt-2'>Browse HTML & CSS challenges and start building</p>
            </div>

        </div>

        <div className='flex gap-4'>

          <div className='flex flex-col items-center'>
            <div className='h-12 w-12 rounded-full bg-cyan-500/10 border border-cyan-200 flex items-center justify-center text-cyan-500 font-bold'>02</div>
            <div className='w-0.5 flex-1 bg-slate-800 mt-2'></div>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-slate-100'>Build Solution</h3>
            <p className='text-slate-400 mt-2'>Code with Monaco Editor and preview changes instantly.</p>
          </div>

        </div>

        <div className='flex gap-4'>

          <div className='h-12 w-12 rounded-full bg-cyan-500/10 border border-cyan-500 flex items-center justify-center text-cyan-500 font-bold'>03</div>

          <div>
            <h3 className='text-lg font-semibold text-slate-100'>Submit & Validate</h3>
            <p className='text-slate-400 mt-2'>Validate your solution and track your progress</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default HowItWorks