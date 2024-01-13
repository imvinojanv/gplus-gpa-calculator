import { Separator } from "@/components/ui/separator"
import Image from "next/image"

const HomeFooter = () => {
    return (
        <footer className="w-full footer container-padding">
            <div className="mx-auto max-w-screen-xl flex flex-col justify-center items-center gap-12 md:gap-16">
                <div className="w-full flex flex-col md:flex-row md:justify-between items-start md:items-end gap-6">
                    <div className="flex flex-col items-start gap-1 tracking-[0.18px]">
                        <h1 className="text-color-black font-medium text-[26px] md:text-3xl">Let's Connect with Vinojan!</h1>
                        <p className="text-[#7E7F86] font-normal text-sm">Feel free to reach out me and explore more. I'm just a message away!</p>
                    </div>
                    <div className="flex flex-row gap-5 md:gap-4">
                        <a href="mailto:vinojan@dechorizon.com" className="hover:grayscale grayscale-0 transition-all duration-200 hover:opacity-85">
                            <Image src="/email.svg" alt="email" width={40} height={40} />
                        </a>
                        <a href="https://www.linkedin.com/in/imvinojanv/" className="hover:grayscale grayscale-0 transition-all duration-200 hover:opacity-85" target="_blank">
                            <Image src="/linkedin.svg" alt="linkedin" width={40} height={40} />
                        </a>
                        <a href="https://github.com/imvinojanv" className="hover:grayscale grayscale-0 transition-all duration-200 hover:opacity-85" target="_blank">
                            <Image src="/github.svg" alt="github" width={40} height={40} />
                        </a>
                        <a href="https://www.facebook.com/imvinojanv/" className="hover:grayscale grayscale-0 transition-all duration-200 hover:opacity-85" target="_blank">
                            <Image src="/facebook.svg" alt="facebook" width={40} height={40} />
                        </a>
                    </div>
                </div>
                
                <Separator className="h-0.5 rounded-md mt-0 md:mt-4" />

                <div className="-mt-4 w-full text-sm tracking-[0.18px] text-color-black flex flex-col md:flex-row justify-between items-center gap-2">
                    <div className="font-medium">
                        © 2024,&nbsp;
                        <a 
                            href="http://www.vinojan.online" 
                            target="_blank" 
                            className="font-bold underline-offset-3 hover:underline transition"
                        >
                            imvinojanv
                        </a>.&nbsp;
                        All rights reserved
                    </div>
                    <a 
                        href="https://github.com/imvinojanv/gplus-gpa-calculator"
                        target="_blank"
                        className="font-normal underline-offset-3 hover:underline transition"
                    >
                        collaborate on <span className="font-medium">GitHub</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default HomeFooter