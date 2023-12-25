import { UserButton } from "@clerk/nextjs";
import SidebarMobile from "./sidebar-mobile";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 md:hidden">
        <SidebarMobile/>
        <div className="border-4 rounded-full">
            <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
  )
}

export default Navbar