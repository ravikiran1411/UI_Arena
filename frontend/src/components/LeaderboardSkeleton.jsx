
const LeaderboardSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse">

      <div className="h-10 w-48 bg-slate-800 rounded mx-auto mb-8"></div>

      <div className="bg-slate-900 rounded-xl p-5">

        {[...Array(10)].map((_,i)=>(
          <div
            key={i}
            className="grid grid-cols-[0.5fr_2fr_1fr] gap-4 py-4 border-b border-slate-800"
          >
            <div className="h-5 w-10 bg-slate-800 rounded"></div>

            <div className="h-5 w-32 bg-slate-800 rounded"></div>

            <div className="h-5 w-16 bg-slate-800 rounded justify-self-end"></div>
          </div>
        ))}

      </div>

    </div>
  )
}

export default LeaderboardSkeleton