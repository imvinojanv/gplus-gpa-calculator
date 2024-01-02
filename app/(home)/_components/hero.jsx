import HomeNavbar from "./home-navbar"

const Hero = () => {
    return (
        <div className="h-full flex-center">
            <div className='mx-auto max-w-screen-xl'>
                <HomeNavbar />
            </div>

            {/* background elements */}
            <div className="bg-elements"/>

            <div className="mx-auto max-w-screen-xl flex flex-col justify-center items-center hero-heading">
                <h2 className="text-color-violet text-center text-xl font-medium tracking-[0.18px]">Track Your Academic Performance</h2>
                <h1 className="text-color-black text-center font-black">
                    Navigate the Path to Success with Precision, Insight, and <span className="text-gradient">Effortless Grading</span>
                </h1>
                <h3 className="text-color-gray text-center font-normal tracking-[0.18px]">Elevate Your Grades - Elevate Your Future!</h3>
            </div>
        </div>
    )
}

export default Hero