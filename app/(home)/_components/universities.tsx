"use client"

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import qs from "query-string";
import {
    usePathname,
    useRouter,
    useSearchParams
} from "next/navigation";
import { cn } from "@/lib/utils";

interface UniversitiesProps {
    universities: {
        _id: string;
        name: string;
        slug: string;
        image: string;
    }[];
}

const Universities = ({
    universities
}: UniversitiesProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedUniversity = searchParams.get("university");
    const currentTitle = searchParams.get("title");

    const onClick = (slug: string) => {
        const isSelected = selectedUniversity === slug;

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                university: isSelected ? null : slug,
            }
        }, { skipNull: true, skipEmptyString: true });
    
        router.push(url, { scroll: false });
    }

    return (
        <div>
            <div 
                className={cn(
                    'flex flex-row md:flex-col gap-4 md:h-[310px] overflow-auto no-scrollbar', 
                    (universities && universities.length > 3) && "md:h-[410px]",
                    !universities && "rounded-xl bg-white/30 outline-dashed outline-1 outline-slate-400 outline-offset-1"
                )}
            >
                {universities && universities.map((university: any) => (
                    <div
                        key={university._id}
                        onClick={() => onClick(university.slug)}
                        className={cn(
                            'w-full group py-2 pl-3 pr-4 md:py-6 md:pl-6 md:pr-4 bg-white/30 rounded-lg hover:bg-white/50 cursor-pointer flex flex-row justify-between items-center transition-all university',
                            selectedUniversity === university.slug && "bg-white/60 university-active"
                        )}
                    >
                        <div className='flex flex-row justify-start items-center gap-1 md:gap-3'>
                            <div className='border-2 rounded-full max-md:w-8'>
                                <Image
                                    src={university.image}
                                    alt={university.slug}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <h3 
                                className={cn(
                                    'text-color-gray group-hover:text-color-black text-sm md:text-base font-medium md:line-clamp-1 md:w-[90%] max-md:hidden',
                                    selectedUniversity === university.slug && "text-color-black"
                                )}
                            >{university.name}</h3>
                            <h3 
                                className={cn(
                                    'text-color-gray group-hover:text-color-black text-sm tracking-[0.18px] font-medium uppercase md:hidden',
                                    selectedUniversity === university.slug && "text-color-black"
                                )}
                            >{university.slug}</h3>
                        </div>
                        <ArrowRight 
                            className={cn(
                                'h-4 w-4 text-[#9CA3AF] group-hover:text-color-black max-md:hidden',
                                selectedUniversity === university.slug && "text-color-black"
                            )} 
                        />
                    </div>
                ))}
                {!universities && (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <Image
                            src='/no-results.png'
                            alt="cap"
                            width={100}
                            height={100}
                        />
                        <p className="text-sm text-center text-gray-500">Universities not found!</p>
                    </div>
                )}
            </div>
            {universities.length > 4 && (
                <>
                    <p className='text-sm text-end text-slate-500 mt-1 mr-1 max-md:hidden'>Scroll to more...</p>
                    <p className='text-sm text-end text-slate-500 mt-2 mr-1 md:hidden'>Swipe to more...</p>
                </>
            )}
        </div>
    );
};

export default Universities;