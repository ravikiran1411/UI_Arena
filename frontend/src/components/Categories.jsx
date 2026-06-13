import React from 'react'

const Categories = () => {
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-20 py-20'>

      <div className='text-center'>
        <h2 className='text-4xl font-bold'>Categories</h2>
      </div>

      <div className='grid md:grid-cols-3 gap-6 mt-12'>
        
        <div className='bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-rose-500 hover:-translate-y-2 transition-all duration-300 cursor-pointer'>
          
          <h3 className='text-2xl text-rose-500 font-semibold text-center'>HTML</h3>
          <p className='text-neutral-400 mt-3'>Build semantic layouts and page structures</p>

        </div>

        <div className='bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-rose-500 hover:-translate-y-2 transition-all duration-300 cursor-pointer'>
          
          <h3 className='text-2xl font-semibold text-center text-rose-500'>CSS</h3>
          <p className='text-neutral-400 text-center'>Create responsive and modern user interfaces</p>

        </div>

        <div className='bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-rose-500 hover:-translate-y-2 transition-all duration-300 cursor-pointer'>
          
          <h3 className='text-2xl font-semibold text-center text-rose-500'>JavaScript</h3>
          <p className='text-neutral-400 mt-3'>Add interactivity and dynamic behavior</p>

        </div>

      </div>

    </section>
  )
}

export default Categories