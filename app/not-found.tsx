import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const NotFoundPage = () => {
    return (
        <div className="h-screen">
            <main className="h-full w-full md:p-[8px]">
                <div className="h-full md:border-2 md:rounded-xl bg-color-gray flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <div className="p-8 flex flex-col justify-start items-start">
                            <Link
                                href="/"
                                className="flex items-center text-md font-medium opacity-75 hover:opacity-100 transition -mt-6 mb-6 pl-6"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to home
                            </Link>
                            <Image
                                src='/404.svg'
                                alt=""
                                width={500}
                                height={500}
                            />
                        </div>
                        <Image
                            height={120}
                            width={120}
                            alt="logo"
                            src="/logo.svg"
                            className="grayscale -mt-6 sm:-mt-16 w-24 sm:w-32"
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default NotFoundPage