const DashboardLoading = () => {
  return (
    <div>
      <div className="animate-pulse bg-slate-200 rounded-md h-8 md:h-10 w-48 md:w-56 my-6 md:my-8 mx-4 md:mx-10"/>
      <div className="px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-pulse mt-6 mb-4 md:mb-6">
            <div className="h-5 w-28 rounded-full bg-slate-200"/>
            <div className="mt-2 rounded-lg bg-slate-200 w-full h-52"/>
          </div>

          <div className="animate-pulse mt-6 mb-4 md:mb-6">
            <div className="h-5 w-28 rounded-full bg-slate-200"/>
            <div className="mt-2 rounded-lg bg-slate-200 w-full h-52"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLoading