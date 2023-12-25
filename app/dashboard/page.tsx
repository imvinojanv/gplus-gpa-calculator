import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <div>
      <p className="border px-10 py-2 border-slate-50 bg-slate-400 rounded-md">DashboardPage</p>
      <div className="">
        <UserButton afterSignOutUrl="/"/>
        <Button variant="default">
          Hello
        </Button>
      </div>
    </div>
  )
}

export default DashboardPage