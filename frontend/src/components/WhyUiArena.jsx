import React from 'react'
import { Check } from 'lucide-react'

const WhyUiArena = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-10 py-8 sm:py-15 bg-slate-900 mt-10 sm:mt-20 rounded-xl'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div>
                <p className='text-cyan-500 font-medium'>WHY UIARENA</p>
                <h2 className='text-4xl sm:text-5xl font-bold text-slate-100 mt-4 leading-tight'>Learn frontend by building real interfaces</h2>
                <p className='hidden sm:block text-slate-400 mt-6 text-lg leading-relaxed'>UIArena helps you improve through hands-on practice.
                    Build real UI components, validate your solutions and track your progress as you grow.
                </p>
            </div>

            <div className='space-y-5'>
                <div className='flex items-start gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500 transition-all duration-300'>
                    <div className='h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center'>
                        <Check className='text-cyan-500' size={18} />
                    </div>
                    <h3 className='text-slate-100 font-semibold'>Real-World Challenges</h3>
                </div>

                <div className='flex items-start gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-purple-500 transition-all duration-300'>
                    <div className='h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center'>
                        <Check className='text-purple-500' size={18} />
                    </div>
                    <h3 className='text-slate-100 font-semibold'>Instant Validation</h3>
                </div>

                <div className='flex items-start gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500 transition-all duration-300'>

                    <div className='h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center'>
                        <Check className='text-emerald-500' size={18} />
                    </div>
                    <h3 className='text-slate-100 font-semibold'>Track Progress</h3>
                </div>

                <div className='flex items-start gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-yellow-500 transition-all duration-300'>

                    <div className='h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center'>
                        <Check className='text-yellow-500' size={18} />
                    </div>
                    <h3 className='text-slate-100 font-semibold'>Responsive-First Practice</h3>
                </div>
            </div>
        </div>

    </div>
  )
}

export default WhyUiArena