import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface DegreesProps {
    degrees: {
        _id: string;
        name: string;
        degree: string;
        duration: number;
    }[];
    slug: string;
    hasUniversities: boolean;
}

const Degrees = ({
    degrees,
    slug,
    hasUniversities
}: DegreesProps) => {
    return (
        <div>
            <div 
                className={cn(
                    'flex flex-col gap-2 h-[310px] border bg-white/30 rounded-xl p-2 overflow-y-auto no-scrollbar', 
                    (degrees && degrees.length > 3) && "h-[410px]", 
                    !degrees && "border-none outline-dashed outline-1 outline-slate-400 outline-offset-1",
                    !hasUniversities && "hidden"
                )}
            >
                {degrees && degrees.map((degree: any) => (
                    <Link
                        href={`/dashboard/${slug}/${degree._id}?year=1`}
                        key={degree._id}
                        className='w-full group max-sm:px-3 max-sm:py-4 px-6 py-5 rounded-lg flex flex-row justify-between cursor-pointer items-end md:items-start transition-all degree'
                    >
                        <div className='flex flex-col items-start gap-1'>
                            <h3 className='text-color-black text-base font-medium line-clamp-1'>{degree.name}</h3>
                            <p className='text-color-gray text-sm font-normal line-clamp-1'>{degree.degree}</p>
                        </div>
                        <Badge variant="duration" className='text-xs font-medium'>
                            {degree.duration}&nbsp;Years
                        </Badge>
                    </Link>
                ))}
                {!degrees && (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <Image
                            src='/book-cap.png'
                            alt="cap"
                            width={100}
                            height={100}
                            className="ml-2"
                        />
                        <p className="mt-2 text-sm text-center text-gray-500">Please select your university!</p>
                    </div>
                )}
            </div>
            {degrees && (degrees.length > 4) && (
                <p className='text-sm text-end text-slate-500 mt-2 md:mt-1 mr-3'>Scroll to more...</p>
            )}
        </div>
    )
}

export default Degrees