"use client"

import qs from "query-string";
import { useState, useEffect } from "react";
import {
    usePathname,
    useRouter,
    useSearchParams
} from "next/navigation";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"

const navRoutes = [
    {
        label: "Year 1",
        path: "1st",
    },
    {
        label: "Year 2",
        path: "2nd",
    },
    {
        label: "Year 3",
        path: "3rd",
    },
    {
        label: "Year 4",
        path: "4th",
    }
]

const SidebarRoutes = () => {
    const [year, setYear] = useState('1st')

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedYear = searchParams.get("year");
    const currentTitle = searchParams.get("title");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                year: year,
            }
        }, { skipNull: true, skipEmptyString: true });
    
        router.push(url);
    }, [year, selectedYear, router, pathname])

    return (
        <div className="flex flex-col space-y-3">
            {navRoutes.map((route) => (
                <div
                    key={route.path}
                    onClick={() => setYear(route.path)}
                    className={cn(
                        "flex group p-3 w-full cursor-pointer justify-between rounded-lg transition items-center text-color-gray hover:text-color-black border hover:bg-color-gray",
                        selectedYear === route.path ? "bg-color-gray border-[#25202F] text-color-black" : ""
                    )}
                >
                    <div className="font-medium text-base">
                        {route.label}
                    </div>
                    <Badge
                        variant='gradient'
                        className="text-sm font-semibold py-0.5 px-3 border ml-2 tracking-wider"
                    >
                        3.78
                    </Badge>
                </div>
            ))}
        </div>
    )
}

export default SidebarRoutes