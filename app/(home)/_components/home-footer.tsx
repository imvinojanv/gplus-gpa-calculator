import { Separator } from "@/components/ui/separator"
import Image from "next/image"

const HomeFooter = () => {
    return (
        <footer className="w-full footer">
            <div className="mx-auto max-w-screen-xl px-4 flex flex-col justify-center items-center gap-16">
                <div className="w-full flex flex-row justify-between items-end">
                    <div className="flex flex-col items-start gap-1 tracking-[0.18px]">
                        <h1 className="text-color-black font-medium text-3xl">Let's Connect with Vinojan!</h1>
                        <p className="text-[#7E7F86] font-normal text-sm">Feel free to reach out me and explore more. I'm just a message away!</p>
                    </div>
                    <div className="flex flex-row gap-4">
                        <a href="" className="grayscale hover:grayscale-0 transition-all duration-200 opacity-85 hover:opacity-100" target="_blank">
                            <Image src="/email.svg" alt="email" width={40} height={40} />
                        </a>
                        <a href="" className="grayscale hover:grayscale-0 transition-all duration-200 opacity-85 hover:opacity-100" target="_blank">
                            <Image src="/linkedin.svg" alt="linkedin" width={40} height={40} />
                        </a>
                        <a href="" className="grayscale hover:grayscale-0 transition-all duration-200 opacity-85 hover:opacity-100" target="_blank">
                            <Image src="/github.svg" alt="github" width={40} height={40} />
                        </a>
                        <a href="" className="grayscale hover:grayscale-0 transition-all duration-200 opacity-85 hover:opacity-100" target="_blank">
                            <Image src="/facebook.svg" alt="facebook" width={40} height={40} />
                        </a>
                    </div>
                </div>
                
                <Separator className="h-0.5 rounded-md mt-4" />

                <div className="-mt-4 w-full text-sm tracking-[0.18px] text-color-black flex flex-row justify-between items-center">
                    <div className="font-medium">
                        © 2024,&nbsp;
                        <a 
                            href="" 
                            target="_blank" 
                            className="font-bold underline-offset-3 hover:underline transition"
                        >
                            imvinojanv
                        </a>.&nbsp;
                        All rights reserved
                    </div>
                    <a 
                        href=""
                        target="_blank"
                        className="font-normal underline-offset-3 hover:underline transition"
                    >
                        see the recent update on <span className="font-medium">GitHub</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default HomeFooter