import { AlignLeft } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";

const SidebarMobile = () => {
  return (
    <Sheet>
        <SheetTrigger className="pr-4 hover:opacity-75 transition">
            <AlignLeft/>        {/* Menu Icon */}
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white">
            <Sidebar />
        </SheetContent>
    </Sheet>
  )
}

export default SidebarMobile