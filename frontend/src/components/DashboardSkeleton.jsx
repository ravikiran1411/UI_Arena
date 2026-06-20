import {react} from 'react'

const DashboardSkeleton = () => {
    
  return (
    <div className='mx-5 sm:mx-10 my-5 px-3 sm:px-30 animate-pulse'>

      <div className="h-8 w-64 bg-slate-800 rounded"></div>
      <div className="h-4 w-80 bg-slate-800 rounded mt-3"></div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">

        <div className="bg-slate-800 rounded-full w-60 h-60"></div>

        <div className="flex flex-col gap-3">
          <div className="bg-slate-800 rounded-xl h-28"></div>
          <div className="bg-slate-800 rounded-xl h-28"></div>
        </div>

      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-10">

        <div className="bg-slate-800 rounded-xl h-24"></div>
        <div className="bg-slate-800 rounded-xl h-24"></div>
        <div className="bg-slate-800 rounded-xl h-24"></div>

      </div>

      <div className="mt-10 flex flex-col gap-3">

        <div className="bg-slate-800 rounded-xl h-20"></div>
        <div className="bg-slate-800 rounded-xl h-20"></div>
        <div className="bg-slate-800 rounded-xl h-20"></div>

      </div>

    </div>
  )
}

export default DashboardSkeleton