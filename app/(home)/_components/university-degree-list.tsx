import { ArrowRight, MoveRight } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';

const uni = [
    {
        _id: '156eff50-4f85-4dbe-b3b9-b165d3b9fe09',
        name: 'Sabaragamuwa University of Sri Lanka',
        slug: 'susl',
        image: 'https://cdn.sanity.io/images/q2n9hbn0/production/072aac349ea2a73e846515473370bd2adc950e17-220x216.png'
    },
    {
        _id: '2f6ad9b9-ae2f-44ef-b907-95878cff1bee',
        name: 'University of Kelaniya',
        slug: 'uok',
        image: 'https://cdn.sanity.io/images/q2n9hbn0/production/81a9f172356de499d7d41f13b0292edc084d01d1-300x291.png',
    },
    {
        _id: '2f6ad9b9-ae2f-44ef-b907-95878cff1bee',
        name: 'University of Kelaniya',
        slug: 'uok',
        image: 'https://cdn.sanity.io/images/q2n9hbn0/production/81a9f172356de499d7d41f13b0292edc084d01d1-300x291.png',
    },
    {
        _id: '2f6ad9b9-ae2f-44ef-b907-95878cff1bee',
        name: 'University of Kelaniya',
        slug: 'uok',
        image: 'https://cdn.sanity.io/images/q2n9hbn0/production/81a9f172356de499d7d41f13b0292edc084d01d1-300x291.png',
    },
    {
        _id: '2f6ad9b9-ae2f-44ef-b907-95878cff1bee',
        name: 'University of Kelaniya',
        slug: 'uok',
        image: 'https://cdn.sanity.io/images/q2n9hbn0/production/81a9f172356de499d7d41f13b0292edc084d01d1-300x291.png',
    }
]

const degree = [
    {
        name: 'Software Engineering',
        degree: 'B.Sc (Hons) in Software Engineering',
        duration: 4,
        _id: 'fd2179e9-813d-4cb4-9371-3ef239106bcf'
    },
    {
        name: 'Management & Information Technology',
        degree: 'B.Sc (Hons) in MIT',
        duration: 4,
        _id: 'cd42e93f-116f-4f1f-b0dc-b80a9a4f990c'
    },
    {
        name: 'Management & Information Technology',
        degree: 'B.Sc (Hons) in MIT',
        duration: 4,
        _id: 'cd42e93f-116f-4f1f-b0dc-b80a9a4f990c'
    },
    {
        name: 'Management & Information Technology',
        degree: 'B.Sc (Hons) in MIT',
        duration: 4,
        _id: 'cd42e93f-116f-4f1f-b0dc-b80a9a4f990c'
    },
    {
        name: 'Management & Information Technology',
        degree: 'B.Sc (Hons) in MIT',
        duration: 4,
        _id: 'cd42e93f-116f-4f1f-b0dc-b80a9a4f990c'
    }
]

const UniversityDegreeList = () => {
    return (
        <div className='w-full px-4 flex flex-col items-start university-degree-list'>
            <h2 className='text-color-black font-medium'>Select your degree</h2>

            <div className='w-full mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12'>
                <div>
                    <div className='flex flex-col gap-4 h-[410px] overflow-y-auto no-scrollbar'>
                        {uni.map((university) => (
                            <div 
                                key={university._id} 
                                className='w-full group py-6 pl-6 pr-4 bg-white/20 rounded-lg hover:bg-white/50 flex flex-row justify-between items-center transition-all university'
                            >
                                <div className='flex flex-row justify-start items-center gap-3'>
                                    <div className='border-2 rounded-full'>
                                        <Image 
                                            src={university.image}
                                            alt={university.slug}
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    <h3 className='text-color-gray group-hover:text-color-black text-base font-medium line-clamp-1 w-[90%]'>{university.name}</h3>
                                </div>
                                <ArrowRight className='h-4 w-4 text-[#9CA3AF] group-hover:text-color-black' />
                            </div>
                        ))}
                    </div>
                    {uni.length > 4 && (
                        <p className='text-sm text-end text-slate-500 mt-1 mr-1'>Scroll to more...</p>
                    )}
                </div>

                <div>
                    <div className='flex flex-col gap-4 h-[410px] bg-white/30 p-2 overflow-y-auto no-scrollbar'>
                        {degree.map((degree) => (
                            <div 
                                key={degree._id} 
                                className='w-full group px-6 py-5 rounded-lg flex flex-row justify-between items-start transition-all degree'
                            >
                                <div className='flex flex-col items-start gap-1'>
                                    <h3 className='text-color-black text-base font-medium line-clamp-1'>{degree.name}</h3>
                                    <p className='text-color-gray text-sm font-normal line-clamp-1'>{degree.degree}</p>
                                </div>
                                <Badge variant="duration" className='text-xs font-medium'>
                                    {degree.duration}&nbsp;<span className='font-normal'>Years</span>
                                </Badge>
                            </div>
                        ))}
                    </div>
                    {degree.length > 4 && (
                        <p className='text-sm text-end text-slate-500 mt-1 mr-3'>Scroll to more...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UniversityDegreeList