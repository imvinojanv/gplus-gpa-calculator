import Image from "next/image";
import { UserButton, currentUser } from "@clerk/nextjs";

import SidebarRoutes from "@/components/sidebar-routes";
import Link from "next/link";

const Sidebar = async () => {
    const user = await currentUser();

    return (
        <div className="h-full flex flex-col overflow-y-auto bg-white justify-between">
            <div>
                <div className="px-6 py-8">
                    <Link href="/">
                        <Image
                            height={90}
                            width={90}
                            alt="logo"
                            src="/logo.svg"
                        />
                    </Link>
                </div>
                <div className="w-full px-3 mt-10">
                    <SidebarRoutes />
                </div>
            </div>
            <div className="flex items-center px-4 py-6 gap-3">
                <div className="border-2 rounded-full">
                    <UserButton afterSignOutUrl="/" />
                </div>
                <div>
                    <p className="text-color-black text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-color-gray text-xs font-normal">{user?.username}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar