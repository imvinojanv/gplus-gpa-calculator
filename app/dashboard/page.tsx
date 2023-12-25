import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <div>
      <div className="overflow-y-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-color-black py-6 md:py-8 px-4 md:px-10">
          Overall GPA : <span className="font-black text-gradient">3.79</span>
        </h2>
      </div>
    </div>
  )
}

export default DashboardPage