import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

import SidebarRoutes from "@/components/sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto bg-white justify-between">
        <div>
            <div className="px-6 py-8">
                <Image
                    height={90}
                    width={90}
                    alt="logo"
                    src="/logo.svg"
                />
            </div>
            <div className="w-full px-3 mt-10">
                <SidebarRoutes />
            </div>
        </div>
        <div className="flex items-center p-6 gap-2">
            <div className="border-2 rounded-full">
                <UserButton afterSignOutUrl="/"/>
            </div>
            <p className="text-color-black font-normal">Firstname</p>
        </div>
    </div>
  )
}

export default Sidebar