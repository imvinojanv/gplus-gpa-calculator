"use client"

import qs from "query-string";
import { useState, useEffect } from "react";
import {
    usePathname,
    useRouter,
    useSearchParams
} from "next/navigation";

import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge"

const navRoutes = [
    {
        label: "Year 1",
        path: "1",
    },
    {
        label: "Year 2",
        path: "2",
    },
    {
        label: "Year 3",
        path: "3",
    },
    {
        label: "Year 4",
        path: "4",
    }
]

const SidebarRoutes = ({
    userId
}: { userId: string | undefined }) => {
    const [year, setYear] = useState('1');
    const [gpaFromDb, setGpaFromDb] = useState<any[]>([]);

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Separate the degreeId from the pathname
    const degreeId = pathname.substring(pathname.lastIndexOf("/") + 1);

    const selectedYear = searchParams.get("year");

    const fetchGPAFromDb = async () => {
        try {
            const { data, error } = await supabase
                .from('degree')
                .select('*')
                .match({
                    degree_id: degreeId,
                    user_id: userId,
                });
            // console.log(data);

            if (error) {
                console.error('[ERROR_SIDEBAR]:', error);
                return null;
            }
            setGpaFromDb(data as any)
        } catch (error) {
            console.error('[ERROR_FETCHING_GPA_FOR_SIDEBAR]:', error);
        }
    };

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                year: year,
            }
        }, { skipNull: true, skipEmptyString: true });

        router.replace(url);
        // router.refresh();

        fetchGPAFromDb();
    }, [year, router, pathname]);

    // Realtime Implementation
    useEffect(() => {
        const channels = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { 
                    event: '*', 
                    schema: 'public', 
                    table: 'degree',
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    // console.log('Change receiveddd!', JSON.stringify(payload.new));
                    if ([payload.new].length > 0) {
                        // console.log("UserId is sameee...");
                        setGpaFromDb([payload.new])
                    }
                }
            )
            .subscribe();

        return () => {
            channels.unsubscribe();
        };
    }, [supabase, gpaFromDb, setGpaFromDb]);

    return (
        <div className="flex flex-col space-y-3">
            {navRoutes.map((route, index) => (
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
                        variant={gpaFromDb.length > 0 && gpaFromDb[0][`year${index + 1}_gpa`] !== null ? 'gradient' : 'outline'}
                        className="text-sm py-0.5 px-3 border ml-2 tracking-wider"
                    >
                        {gpaFromDb.length > 0 ? (
                            gpaFromDb[0][`year${index + 1}_gpa`] !== null
                                ? gpaFromDb[0][`year${index + 1}_gpa`].toFixed(2)
                                : '0.00'
                        ) : '0.00'}
                    </Badge>
                </div>
            ))}
        </div>
    )
}

export default SidebarRoutes